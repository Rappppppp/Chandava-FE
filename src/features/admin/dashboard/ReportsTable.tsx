import { useState, useEffect } from "react"
import { Eye, TrendingUp, DollarSign, CheckCircle, Calendar } from "lucide-react"
import { ReportPreviewModal } from "./ReportPreviewModal"
import api from "@services/api"

interface Report {
    id: string
    type: string
    period: string
    bookings: number
    checkIns: number
    status: string
    payments: string
    year: number
    month?: number
    check_in: string
    check_out: string
    week_start?: string
    week_end?: string
}

export function ReportsTable() {
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
    const [reportType, setReportType] = useState<'daily' | 'weekly' | 'yearly'>('daily')
    const [reports, setReports] = useState<Report[]>([])
    const [years, setYears] = useState<number[]>([])
    const [loading, setLoading] = useState(false)
    const [previewReport, setPreviewReport] = useState<Report | null>(null)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null)

    const months = [
        { label: "All", value: null },
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 },
    ]

    // Fetch available years
    useEffect(() => {
        api.get("/dashboard/reports/get-booking-years").then((res) => setYears(res.data))
    }, [])

    // Fetch reports whenever year/type changes
    useEffect(() => {
        setLoading(true)
        api
            .get("/dashboard/reports", { params: { type: reportType, year: selectedYear } })
            .then((res) => {
                const mappedReports = res.data.map((r: any, idx: number) => {
                    let period = ''
                    if (reportType === 'daily') {
                        const date = new Date(r.check_in)
                        period = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
                    } else if (reportType === 'weekly') {
                        const start = new Date(r.week_start)
                        const end = new Date(r.week_end)
                        period = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                    } else {
                        period = new Date(r.check_in).getFullYear().toString()
                    }

                    return {
                        id: idx.toString(),
                        type: reportType === 'daily' ? 'Daily Report' : reportType === 'weekly' ? 'Weekly Report' : 'Yearly Report',
                        period,
                        bookings: r.bookings,
                        checkIns: r.checkIns,
                        payments: `₱${Number(r.payments).toLocaleString()}`,
                        year: selectedYear,
                        month: reportType === 'daily' ? new Date(r.check_in).getMonth() + 1 : undefined,
                        check_in: r.check_in,
                        check_out: r.check_out,
                        week_start: r.week_start,
                        week_end: r.week_end,
                    }
                })
                setReports(mappedReports)
            })
            .finally(() => setLoading(false))
    }, [selectedYear, reportType])

    const handleView = (report: Report) => {
        setPreviewReport(report)
        setIsPreviewOpen(true)
    }

    const handleClosePreview = () => {
        setIsPreviewOpen(false)
        setTimeout(() => setPreviewReport(null), 300)
    }

    const filteredReports = reportType === 'daily' && selectedMonth
        ? reports.filter(r => r.month === selectedMonth)
        : reports

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                    <label htmlFor="type-filter" className="text-sm font-semibold text-gray-700">Type:</label>
                    <select
                        id="type-filter"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value as 'daily' | 'weekly' | 'yearly')}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 font-medium cursor-pointer"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="year-filter" className="text-sm font-semibold text-gray-700">Year:</label>
                    <select
                        id="year-filter"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 font-medium cursor-pointer"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {reportType === 'daily' && (
                    <div className="flex items-center gap-2">
                        <label htmlFor="month-filter" className="text-sm font-semibold text-gray-700">Month:</label>
                        <select
                            id="month-filter"
                            value={selectedMonth ?? ""}
                            onChange={(e) => setSelectedMonth(e.target.value ? Number(e.target.value) : null)}
                            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 font-medium cursor-pointer"
                        >
                            {months.map((m) => (
                                <option key={m.label} value={m.value ?? ""}>{m.label}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Report Display */}
            {loading ? (
                <div className="text-center py-12">
                    <span className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></span>
                </div>
            ) : reports.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No reports available for the selected year and type</p>
                </div>
            ) : reportType === 'daily' ? (
                <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bookings</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Check-ins</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Payments</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="bg-gray-100 font-bold">
                                <td className="px-6 py-4 whitespace-nowrap">Total</td>
                                <td className="px-6 py-4 whitespace-nowrap">{filteredReports.reduce((sum, r) => sum + Number(r.bookings), 0).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{filteredReports.reduce((sum, r) => sum + Number(r.checkIns), 0).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">₱{filteredReports.reduce((sum, r) => sum + Number(r.payments.replace(/₱|,/g, '')), 0).toLocaleString()}</td>
                                <td></td>
                            </tr>

                            {filteredReports.map((report) => (
                                <tr key={report.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{report.period}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{report.bookings.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{report.checkIns.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{report.payments}</td>
                                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                        <button onClick={() => handleView(report)} className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs">
                                            <Eye className="w-3 h-3" /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <div key={report.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    <p className="font-bold text-blue-900">
                                        {reportType === 'weekly' && report.week_start && report.week_end
                                            ? `${new Date(report.week_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(report.week_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                                            : new Date(report.check_in).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <TrendingUp className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Total Bookings</span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-600">{report.bookings.toLocaleString()}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Check-ins</span>
                                    </div>
                                    <span className="text-lg font-bold text-green-600">{report.checkIns.toLocaleString()}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <DollarSign className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Total Payments</span>
                                    </div>
                                    <span className="text-lg font-bold text-purple-600">{report.payments}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 px-6 py-4 bg-gray-50 border-t border-gray-100">
                                <button onClick={() => handleView(report)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                                    <Eye className="w-4 h-4" /> View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ReportPreviewModal
                report={previewReport}
                isOpen={isPreviewOpen}
                onClose={handleClosePreview}
            />
        </div>
    )
}
