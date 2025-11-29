"use client"

import { X, Printer } from "lucide-react"
import { useEffect, useState } from "react"
import api from "@services/api"

interface BookingDetails {
  id: string
  type: string
  period: string
  bookings: number
  status: string
  payments: string
  checkIns: number
  year: number
  user: {
    id: string
    name: string
    email: string
  }
  room: {
    id: string
    name: string
  }
}

interface ReportData {
  id: string
  type: string
  period: string
  bookings: number
  status: string
  checkIns: number
  payments: string
  year: number
  check_in: string
  check_out: string
  week_start?: string
  week_end?: string
}

interface ReportPreviewModalProps {
  report: ReportData | null
  isOpen: boolean
  onClose: () => void
}

export function ReportPreviewModal({ report, isOpen, onClose }: ReportPreviewModalProps) {
  const [bookings, setBookings] = useState<BookingDetails[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  if (!isOpen || !report) return

  setLoading(true)

  const isWeekly = Array.isArray(report)
  const reportType = report.type.toLowerCase().includes("weekly")
    ? "weekly"
    : report.type.toLowerCase().includes("daily")
      ? "daily"
      : "yearly"

  // Determine check_in and check_out for API
  const check_in = isWeekly
    ? report[report.length - 1].week_start // earliest week
    : report.check_in
  const check_out = isWeekly
    ? report[0].week_end // latest week
    : report.check_out

  api
    .get("/dashboard/reports/get-report-details", {
      params: {
        type: reportType,
        year: isWeekly ? report[0].year : report.year,
        check_in,
        check_out,
      },
    })
    .then((res) => {

        setBookings(res.data.bookings_detail)
        // setSummary({
        //   bookings: report.bookings || 0,
        //   checkIns: report.checkIns || 0,
        //   payments: parseFloat(report.payments?.replace(/[₱,]/g, "") || "0"),
        // })
  
    })
    .catch(() => {
      setBookings([])
      // setSummary({ bookings: 0, checkIns: 0, payments: 0 })
    })
    .finally(() => setLoading(false))
}, [isOpen, report])


  const handlePrint = () => {
    const table = document.getElementById("booking-details-table")
    if (!table) return

    const printWindow = window.open("", "_blank", "width=1000,height=800")
    if (!printWindow) return

    const tableClone = table.cloneNode(true) as HTMLElement
    tableClone.id = ""

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Booking Report</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #1f2937; background: white; line-height: 1.6; }
            .report-header { margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
            .report-title { font-size: 28px; font-weight: bold; color: #1e40af; margin-bottom: 8px; }
            .report-period { font-size: 14px; color: #6b7280; margin-bottom: 10px; }
            .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
            .summary-item { background: #f0f9ff; padding: 15px; border-radius: 6px; border: 1px solid #bfdbfe; text-align: center; }
            .summary-value { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 5px; }
            .summary-label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
            .table-container { overflow-x: auto; margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; background: white; }
            thead { background: #f3f4f6; border-bottom: 2px solid #d1d5db; }
            th { padding: 12px 10px; text-align: left; font-weight: 600; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            td { padding: 12px 10px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #4b5563; }
            tbody tr:hover { background: #f9fafb; }
            tbody tr:last-child td { border-bottom: none; }
            .status-completed { display: inline-block; background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 3px; font-weight: 600; font-size: 11px; }
            .status-pending { display: inline-block; background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 3px; font-weight: 600; font-size: 11px; }
            .payment-cell { font-weight: 600; color: #1f2937; }
            .print-time { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; text-align: right; }
          </style>
        </head>
        <body>
          <div class="report-header">
            <div class="report-title">${report?.type || "Report"}</div>
            <div class="report-period">${report?.period || ""}</div>
          </div>
          <div class="summary">
            <div class="summary-item">
              <div class="summary-value">${report?.bookings.toLocaleString() || 0}</div>
              <div class="summary-label">Total Bookings</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">${report?.checkIns || 0}</div>
              <div class="summary-label">Check-ins</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">${report?.payments || "—"}</div>
              <div class="summary-label">Total Payments</div>
            </div>
          </div>
          <div class="table-container">${tableClone.outerHTML}</div>
          <div class="print-time"><p>Generated on: ${new Date().toLocaleString()}</p></div>
        </body>
      </html>
    `)

    printWindow.document.close()
    setTimeout(() => {
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  if (!isOpen || !report) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-6xl z-50 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{report.type}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(report.check_in).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              {report.type !== "Daily Report" && report.check_out && (
                <> - {new Date(report.check_out).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</>
              )}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500 hover:text-gray-700" aria-label="Close preview">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-6">Report Summary</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{report.bookings.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{report.checkIns.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Check-ins</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{report.payments}</div>
                  <p className="text-sm text-gray-600">Total Payments</p>
                </div>
              </div>
            </div>

            {/* Booking Table */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Booking Details</h3>
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              ) : bookings.length === 0 ? (
                <p className="text-center text-gray-500 py-6">No bookings found for this report.</p>
              ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table id="booking-details-table" className="w-full text-sm text-left">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Guest Name</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Room</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">Payment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-600">{b.period}</td>
                          <td className="px-4 py-3 text-gray-900 font-medium">{b.user?.name ?? 'NA'}</td>
                          <td className="px-4 py-3 text-gray-600">{b.user?.email ?? 'NA'}</td>
                          <td className="px-4 py-3 text-gray-600">{b.room?.name ?? 'NA'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-900">{b.payments}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end flex-shrink-0">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors">
            Close
          </button>
          <button onClick={handlePrint} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print Report
          </button>
        </div>
      </div>
    </>
  )
}
