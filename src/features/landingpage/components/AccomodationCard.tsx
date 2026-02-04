import { Link } from "react-router-dom"
import type { RoomInclusions } from "@/types/accomodationType"
import { useAuth } from "@contexts/AuthContext"
import { Users } from "lucide-react"

interface AccommodationCardProps {
  roomId: number
  roomName: string
  accommodationTypeName: string
  dayNightTourPrice: string
  roomInclusions: number | RoomInclusions[]
  isAvailable: boolean
  roomImage: string
  maxGuests: number
}

const AccommodationCard = ({
  roomId,
  roomName,
  accommodationTypeName,
  dayNightTourPrice,
  maxGuests,
  roomInclusions,
  roomImage,
}: AccommodationCardProps) => {
  const { user } = useAuth()

  const isArray = Array.isArray(roomInclusions)
  const inclusionsArray = isArray ? roomInclusions : []

  return (
    <Link
      to={user ? `/users/room/${roomId}` : `/login`}
      className="block group no-underline"
    >
      <div
        className="
          bg-white border border-neutral-200 rounded-xl overflow-hidden 
          shadow-md hover:shadow-xl hover:-translate-y-1 
          transition-all duration-300
        "
      >
        {/* Image */}
        <div className="relative h-52 bg-neutral-100 overflow-hidden">
          <img
            src={`${import.meta.env.VITE_BE_BASE_URL}/storage/uploads/images/${roomImage}`}
            alt={roomName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.src = "/logo/fallback.jpg"
            }}
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>

          {/* Price Badge */}
          <div
            className="
              absolute bottom-3 right-3 
              bg-white/90 backdrop-blur-sm 
              px-3 py-1 rounded-md shadow
              text-sm font-semibold text-neutral-900
            "
          >
            ₱ {Number(dayNightTourPrice).toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title + Guests */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-primary line-clamp-1">
                {roomName}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                {accommodationTypeName}
              </p>
            </div>

            <div className="flex items-center gap-1 text-neutral-600 text-sm">
              <Users size={16} />
              {maxGuests}
            </div>
          </div>

          {/* Inclusions */}
          {isArray && inclusionsArray.length > 0 && (
            <div className="pt-3 border-t border-neutral-100">
              <div className="space-y-1">
                {inclusionsArray.slice(0, 3).map((inc, i) => (
                  <div
                    key={i}
                    className="flex items-center text-sm text-neutral-600"
                  >
                    <span className="mr-2 text-neutral-400">•</span>
                    {inc.inclusion_name}
                  </div>
                ))}
              </div>

              {inclusionsArray.length > 3 && (
                <p className="text-xs text-blue-600 mt-2 group-hover:underline">
                  View more inclusions →
                </p>
              )}
            </div>
          )}

          {/* If backend sends a number instead of array */}
          {!isArray && Number(roomInclusions) > 0 && (
            <div className="pt-3 border-t border-neutral-100 text-sm text-neutral-600">
              {roomInclusions} inclusions available
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default AccommodationCard
