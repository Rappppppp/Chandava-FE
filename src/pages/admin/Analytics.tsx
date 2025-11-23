import { Tent, PhilippinePeso, Calendar, Star, TrendingUp, TrendingDown } from "lucide-react"
import { useState, useEffect, useMemo } from "react";
import api, { AxiosError } from "@services/api";
import DefaultLoader from "@components/loaders/DefaultLoader";

interface MetricCardProps {
    title: string
    value: string | number
    change?: number
    icon: React.ReactNode
    subtitle?: string
}


function MetricCard({ title, value, change, icon, subtitle }: MetricCardProps) {

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                    </div>
                </div>
                {change !== undefined && (
                    <div className={`flex items-center space-x-1 ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="text-sm font-medium">{Math.abs(change)}%</span>
                    </div>
                )}
            </div>
        </div>
    )
}


interface ReviewBarProps {
    stars: number
    count: number
    percentage: number
    total: number
}

function ReviewBar({ stars, count, percentage }: ReviewBarProps) {
    return (
        <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 w-16">
                <span className="text-sm font-medium text-gray-700">{stars}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="text-sm text-gray-600 w-16 text-right">
                {count} ({percentage}%)
            </div>
        </div>
    )
}

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState<any>({
        campsites: {
            total: 0,
            available: 0,
            occupied: 0,
        },
        sales: {
            daily: 0,
            weekly: 0,
            monthly: 0,
        },
        bookings: {
            daily: 0,
            weekly: 0,
            monthly: 0,
        },
        reviews: {
            total: 0,
            fiveStars: 0,
            fourStars: 0,
            threeStars: 0,
            twoStars: 0,
            oneStar: 0,
        },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/analytics`);

                // Merge defaults with API data to prevent missing fields
                setAnalyticsData((prev: any) => ({
                    ...prev,
                    ...res.data,
                    campsites: {
                        ...prev.campsites,
                        ...(res.data.campsites ?? {})
                    },
                    sales: {
                        ...prev.sales,
                        ...(res.data.sales ?? {})
                    },
                    bookings: {
                        ...prev.bookings,
                        ...(res.data.bookings ?? {})
                    },
                    reviews: {
                        ...prev.reviews,
                        ...(res.data.reviews ?? {})
                    }
                }));
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error.response?.data.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const reviewPercentages = useMemo(() => {
        const total = analyticsData?.reviews?.total ?? 0;
        if (total === 0) {
            return { fiveStars: 0, fourStars: 0, threeStars: 0, twoStars: 0, oneStar: 0 };
        }
        return {
            fiveStars: Math.round((analyticsData.reviews.fiveStars / total) * 100),
            fourStars: Math.round((analyticsData.reviews.fourStars / total) * 100),
            threeStars: Math.round((analyticsData.reviews.threeStars / total) * 100),
            twoStars: Math.round((analyticsData.reviews.twoStars / total) * 100),
            oneStar: Math.round((analyticsData.reviews.oneStar / total) * 100),
        };
    }, [analyticsData]);


    if (loading) return <DefaultLoader />
    return (
        <main className="p-6 space-y-8">
            {/* Campsite Availability */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Campsite Availability</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Total Campsites"
                        value={analyticsData.campsites.total ?? 0}
                        icon={<Tent className="w-6 h-6 text-blue-600" />}
                    />
                    <MetricCard
                        title="Available"
                        value={analyticsData.campsites.available}
                        icon={<Tent className="w-6 h-6 text-green-600" />}
                        subtitle="Ready for booking"
                    />
                    <MetricCard
                        title="Occupied"
                        value={analyticsData.campsites.occupied}
                        icon={<Tent className="w-6 h-6 text-orange-600" />}
                        subtitle="Currently booked"
                    />
                </div>
            </section>

            {/* Sales Metrics */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Daily Sales"
                        value={new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 }).format(analyticsData.sales.daily)}
                        icon={<PhilippinePeso className="w-6 h-6 text-green-600" />}
                    />

                    <MetricCard
                        title="Weekly Sales"
                        value={new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 }).format(analyticsData.sales.weekly)}
                        icon={<PhilippinePeso className="w-6 h-6 text-green-600" />}
                    />

                    <MetricCard
                        title="Monthly Sales"
                        value={new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 }).format(analyticsData.sales.monthly)}
                        icon={<PhilippinePeso className="w-6 h-6 text-green-600" />}
                    />
                </div>
            </section>

            {/* Booking Metrics */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Daily Bookings"
                        value={analyticsData.bookings.daily}
                        icon={<Calendar className="w-6 h-6 text-blue-600" />}
                    />
                    <MetricCard
                        title="Weekly Bookings"
                        value={analyticsData.bookings.weekly}
                        icon={<Calendar className="w-6 h-6 text-blue-600" />}
                    />
                    <MetricCard
                        title="Monthly Bookings"
                        value={analyticsData.bookings.monthly}
                        icon={<Calendar className="w-6 h-6 text-blue-600" />}
                    />
                </div>
            </section>

            {/* Customer Engagement */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Engagement</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-yellow-50 rounded-lg">
                                <Star className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Review Distribution</h3>
                                <p className="text-sm text-gray-600">Total Reviews: {analyticsData.reviews.total ?? 0}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <ReviewBar
                                stars={5}
                                count={analyticsData.reviews.fiveStars}
                                percentage={reviewPercentages.fiveStars}
                                total={analyticsData.reviews.total ?? 0}
                            />
                            <ReviewBar
                                stars={4}
                                count={analyticsData.reviews.fourStars}
                                percentage={reviewPercentages.fourStars}
                                total={analyticsData.reviews.total ?? 0}
                            />
                            <ReviewBar
                                stars={3}
                                count={analyticsData.reviews.threeStars}
                                percentage={reviewPercentages.threeStars}
                                total={analyticsData.reviews.total ?? 0}
                            />
                            <ReviewBar
                                stars={2}
                                count={analyticsData.reviews.twoStars}
                                percentage={reviewPercentages.twoStars}
                                total={analyticsData.reviews.total ?? 0}
                            />
                            <ReviewBar
                                stars={1}
                                count={analyticsData.reviews.oneStar}
                                percentage={reviewPercentages.oneStar}
                                total={analyticsData.reviews.total ?? 0}
                            />
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}

export default Analytics;