import { Calendar, Tent, Users, ChevronRight, PhilippinePeso } from "lucide-react"
import { useEffect, useState } from "react"
import api, { AxiosError } from "@services/api";
import { MyBooking } from "@/types/myBooking";
import { Link } from "react-router-dom";

interface CardData {
  total_bookings: number,
  total_users: number,
  total_revenue: number,
  available_rooms: number,
  recent_bookings: MyBooking[]
}

const Dashboard = () => {
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

  console.log(cardData)

  if (loading) return "Loading..."

  return (
    <div className="min-h-screen ">
      {/* Header */}


      {/* Main Content */}
      <main className="">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-semibold text-gray-800">{cardData.total_bookings}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>

          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Campers</p>
                <p className="text-2xl font-semibold text-gray-800">{cardData.total_users}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>

          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-semibold text-gray-800">P {cardData.total_revenue}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <PhilippinePeso className="h-5 w-5 text-purple-600" />
              </div>
            </div>

          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Rooms</p>
                <p className="text-2xl font-semibold text-gray-800">{cardData.available_rooms}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Tent className="h-5 w-5 text-amber-600" />
              </div>
            </div>

          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-sm text-green-600 font-medium flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Site
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cardData.recent_bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800">{booking.user.first_name} {booking.user.last_name}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{booking.room.room_name}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{booking.check_in}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{booking.check_out}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{booking.total_price}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

  
      </main>
    </div>
  )
}

export default Dashboard

