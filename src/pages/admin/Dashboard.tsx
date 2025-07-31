import { Calendar, Tent, Users, MapPin, Clock, ChevronRight, PhilippinePeso } from "lucide-react"

const Dashboard = () => {
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
                <p className="text-2xl font-semibold text-gray-800">1,248</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center">
              <span>+12% from last month</span>
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Campers</p>
                <p className="text-2xl font-semibold text-gray-800">342</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center">
              <span>+8% from last week</span>
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-semibold text-gray-800">P24,389</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <PhilippinePeso className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center">
              <span>+18% from last month</span>
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Rooms</p>
                <p className="text-2xl font-semibold text-gray-800">28</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Tent className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-red-600 mt-2 flex items-center">
              <span>-4% from last week</span>
            </p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
            <button className="text-sm text-green-600 font-medium flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </button>
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
                {[
                  {
                    id: 1,
                    customer: "Michael Johnson",
                    site: "Pine Ridge #12",
                    checkIn: "Aug 24, 2023",
                    checkOut: "Aug 28, 2023",
                    amount: "$345",
                    status: "Confirmed",
                  },
                  {
                    id: 2,
                    customer: "Sarah Williams",
                    site: "Lakeside #08",
                    checkIn: "Aug 22, 2023",
                    checkOut: "Aug 25, 2023",
                    amount: "$280",
                    status: "Checked In",
                  },
                  {
                    id: 3,
                    customer: "David Brown",
                    site: "Mountain View #15",
                    checkIn: "Aug 26, 2023",
                    checkOut: "Aug 30, 2023",
                    amount: "$420",
                    status: "Pending",
                  },
                  {
                    id: 4,
                    customer: "Emily Davis",
                    site: "Riverside #03",
                    checkIn: "Aug 25, 2023",
                    checkOut: "Aug 29, 2023",
                    amount: "$375",
                    status: "Confirmed",
                  },
                  {
                    id: 5,
                    customer: "Robert Wilson",
                    site: "Sunset Point #21",
                    checkIn: "Aug 27, 2023",
                    checkOut: "Aug 31, 2023",
                    amount: "$390",
                    status: "Pending",
                  },
                ].map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800">{booking.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{booking.site}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{booking.checkIn}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{booking.checkOut}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{booking.amount}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Checked In"
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

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Reservations */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Check-ins</h2>
              <button className="text-sm text-green-600 font-medium flex items-center gap-1">
                <span>View Calendar</span>
                <Calendar className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              {[
                { id: 1, customer: "Jennifer Adams", site: "Lakeside #04", time: "Today, 2:00 PM", guests: 4 },
                { id: 2, customer: "Thomas Moore", site: "Pine Ridge #09", time: "Today, 4:30 PM", guests: 2 },
                { id: 3, customer: "Lisa Campbell", site: "Mountain View #11", time: "Tomorrow, 11:00 AM", guests: 6 },
                { id: 4, customer: "Kevin Taylor", site: "Riverside #07", time: "Tomorrow, 3:00 PM", guests: 3 },
              ].map((checkin) => (
                <div
                  key={checkin.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{checkin.customer}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {checkin.site}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-800 flex items-center justify-end gap-1">
                      <Clock className="h-3 w-3" /> {checkin.time}
                    </p>
                    <p className="text-xs text-gray-500">{checkin.guests} guests</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Camping Sites */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Popular Camping Sites</h2>
              <button className="text-sm text-green-600 font-medium flex items-center gap-1">
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              {[
                { id: 1, name: "Lakeside Camping Area", occupancy: "92%", total: 25, available: 2 },
                { id: 2, name: "Pine Ridge Campground", occupancy: "84%", total: 30, available: 5 },
                { id: 3, name: "Mountain View Sites", occupancy: "78%", total: 18, available: 4 },
                { id: 4, name: "Riverside Camping", occupancy: "96%", total: 22, available: 1 },
              ].map((site) => (
                <div key={site.id} className="py-3 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-800">{site.name}</p>
                    <p className="text-sm font-semibold text-green-600">{site.occupancy}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: site.occupancy }}></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {site.available} sites available out of {site.total}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

