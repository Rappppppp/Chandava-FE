import { Calendar, Users, AudioLines as PhilippinePeso, Tent, LucideLoader2 } from "lucide-react"
import { ReportsTable } from "@features/admin/dashboard/ReportsTable"
import { CheckInsList } from "@features/admin/dashboard/CheckInsList"

import { useEffect, useState } from "react"
import api, { AxiosError } from "@services/api"
import { MyBooking } from "@/types/myBooking"
import { Link } from "react-router-dom"

interface CardData {
  total_bookings: number,
  total_users: number,
  total_revenue: number,
  available_rooms: number,
  recent_bookings: MyBooking[]
}

export default function Dashboard() {
  const [cardData, setCardData] = useState<CardData>({
    total_bookings: 0,
    total_users: 0,
    total_revenue: 0,
    available_rooms: 0,
    recent_bookings: []
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await api.get("/dashboard");
        setCardData(res.data)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data.message)
        }

      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your bookings, check-ins, and financial analytics</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Bookings Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? <LucideLoader2 className="animate-spin w-8 h-8 text-gray-600" />  : cardData.total_bookings.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Check-ins Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Guests</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? <LucideLoader2 className="animate-spin w-8 h-8 text-gray-600" />  : cardData.total_users.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? <LucideLoader2 className="animate-spin w-8 h-8 text-gray-600" />  :  new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                    maximumFractionDigits: 0,
                  }).format(cardData.total_revenue)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <PhilippinePeso className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Available Rooms Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Rooms</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? <LucideLoader2 className="animate-spin w-8 h-8 text-gray-600" /> : cardData.available_rooms}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Tent className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Financial Reports</h2>
              <p className="text-gray-600 mt-1">View and manage your detailed financial records</p>
            </div>
          </div>
          <ReportsTable />
        </div>

        {/* Check-ins Section */}
        <div className="space-y-6">
          <CheckInsList />
        </div>
      </div>
    </main>
  )
}
