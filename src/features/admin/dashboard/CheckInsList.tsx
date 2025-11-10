import { useState } from "react"
import { Clock, Calendar, MapPin, Phone, Mail, Download, Users } from "lucide-react"

interface CheckIn {
  id: string
  userName: string
  email: string
  phone: string
  bookingId: string
  roomType: string
  location: string
  checkInDate: string
  checkOutDate: string
  duration: number
  checkInTime: string
  status: "checked-in" | "pending" | "completed"
  numberOfGuests: number
  totalAmount: string
}

// Mock data - check-ins
const allCheckIns: CheckIn[] = [
  {
    id: "c1",
    userName: "John Smith",
    email: "john.smith@email.com",
    phone: "+63 912 345 6789",
    bookingId: "BK-001-2025",
    roomType: "Deluxe Suite",
    location: "Manila",
    checkInDate: "Nov 8, 2025",
    checkOutDate: "Nov 10, 2025",
    duration: 2,
    checkInTime: "14:30",
    status: "checked-in",
    numberOfGuests: 2,
    totalAmount: "₱12,500",
  },
  {
    id: "c2",
    userName: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+63 923 456 7890",
    bookingId: "BK-002-2025",
    roomType: "Standard Room",
    location: "Cebu",
    checkInDate: "Nov 7, 2025",
    checkOutDate: "Nov 9, 2025",
    duration: 2,
    checkInTime: "15:45",
    status: "checked-in",
    numberOfGuests: 1,
    totalAmount: "₱8,500",
  },
  {
    id: "c3",
    userName: "Robert Johnson",
    email: "robert.j@email.com",
    phone: "+63 934 567 8901",
    bookingId: "BK-003-2025",
    roomType: "Penthouse",
    location: "Manila",
    checkInDate: "Nov 9, 2025",
    checkOutDate: "Nov 15, 2025",
    duration: 6,
    checkInTime: "13:00",
    status: "pending",
    numberOfGuests: 4,
    totalAmount: "₱45,000",
  },
  {
    id: "c4",
    userName: "Angela Santos",
    email: "angela.santos@email.com",
    phone: "+63 945 678 9012",
    bookingId: "BK-004-2025",
    roomType: "Family Suite",
    location: "Davao",
    checkInDate: "Nov 5, 2025",
    checkOutDate: "Nov 8, 2025",
    duration: 3,
    checkInTime: "16:20",
    status: "completed",
    numberOfGuests: 5,
    totalAmount: "₱22,500",
  },
  {
    id: "c5",
    userName: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+63 956 789 0123",
    bookingId: "BK-005-2025",
    roomType: "Business Room",
    location: "Manila",
    checkInDate: "Nov 8, 2025",
    checkOutDate: "Nov 9, 2025",
    duration: 1,
    checkInTime: "12:15",
    status: "checked-in",
    numberOfGuests: 1,
    totalAmount: "₱5,500",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "checked-in":
      return "bg-green-50 text-green-700 border-green-200"
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200"
    case "completed":
      return "bg-gray-100 text-gray-700 border-gray-300"
    default:
      return "bg-gray-100 text-gray-700 border-gray-300"
  }
}

export function CheckInsList() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredCheckIns = allCheckIns.filter((checkIn) => {
    const matchesSearch =
      checkIn.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkIn.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkIn.bookingId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || checkIn.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleExportCSV = () => {
    const headers = [
      "Guest Name",
      "Email",
      "Phone",
      "Booking ID",
      "Room Type",
      "Location",
      "Check-in Date",
      "Check-out Date",
      "Duration (nights)",
      "Check-in Time",
      "Guests",
      "Total Amount",
      "Status",
    ]

    const rows = filteredCheckIns.map((c) => [
      c.userName,
      c.email,
      c.phone,
      c.bookingId,
      c.roomType,
      c.location,
      c.checkInDate,
      c.checkOutDate,
      c.duration,
      c.checkInTime,
      c.numberOfGuests,
      c.totalAmount,
      c.status,
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `checkins-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Check-ins Log</h2>
        <p className="text-gray-600 mt-1">View and manage all guest check-ins</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name, email, or booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all w-full sm:w-64"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="checked-in">Checked-in</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="space-y-3">
        {filteredCheckIns.length > 0 ? (
          filteredCheckIns.map((checkIn) => (
            <div
              key={checkIn.id}
              className="rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Main Row */}
              <button
                onClick={() => setExpandedId(expandedId === checkIn.id ? null : checkIn.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {checkIn.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 font-semibold truncate">{checkIn.userName}</h3>
                    <p className="text-gray-500 text-sm">{checkIn.bookingId}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-gray-900 text-sm font-medium">{checkIn.roomType}</p>
                      <p className="text-gray-500 text-xs">{checkIn.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-semibold">{checkIn.totalAmount}</p>
                      <p className="text-gray-500 text-xs flex items-center gap-1 justify-end">
                        <Users className="w-3 h-3" /> {checkIn.numberOfGuests} guests
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(checkIn.status)}`}
                    >
                      {checkIn.status.charAt(0).toUpperCase() + checkIn.status.slice(1)}
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {expandedId === checkIn.id && (
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Contact Information */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Contact Info</h4>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <a href={`mailto:${checkIn.email}`} className="text-blue-600 hover:text-blue-700 truncate">
                          {checkIn.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <a href={`tel:${checkIn.phone}`} className="text-blue-600 hover:text-blue-700">
                          {checkIn.phone}
                        </a>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Booking Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Room Type:</span>
                          <span className="text-gray-900 font-medium">{checkIn.roomType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="text-gray-900 font-medium flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            {checkIn.location}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Guests:</span>
                          <span className="text-gray-900 font-medium">{checkIn.numberOfGuests}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dates and Times */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Dates & Times</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check-in:</span>
                          <span className="text-gray-900 font-medium flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {checkIn.checkInDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check-out:</span>
                          <span className="text-gray-900 font-medium">{checkIn.checkOutDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check-in Time:</span>
                          <span className="text-gray-900 font-medium flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {checkIn.checkInTime}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-300">
                          <span className="text-gray-600">Duration:</span>
                          <span className="text-green-600 font-semibold">{checkIn.duration} night(s)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status and Amount */}
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(checkIn.status)}`}
                    >
                      {checkIn.status.charAt(0).toUpperCase() + checkIn.status.slice(1)}
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 text-sm">Total Amount</p>
                      <p className="text-green-600 text-2xl font-bold">{checkIn.totalAmount}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">No check-ins found matching your criteria</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">Total Check-ins</p>
          <p className="text-gray-900 text-2xl font-bold mt-2">{filteredCheckIns.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">Checked In</p>
          <p className="text-green-600 text-2xl font-bold mt-2">
            {filteredCheckIns.filter((c) => c.status === "checked-in").length}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-amber-600 text-2xl font-bold mt-2">
            {filteredCheckIns.filter((c) => c.status === "pending").length}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-blue-600 text-2xl font-bold mt-2">
            ₱
            {filteredCheckIns
              .reduce((sum, c) => sum + Number.parseInt(c.totalAmount.replace("₱", "").replace(/,/g, "")), 0)
              .toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
