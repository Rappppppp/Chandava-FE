import { Link } from "react-router-dom"
import type { RoomInclusions } from "@/types/accomodationType"

import { useAuth } from "@contexts/AuthContext"
import { User2, Users } from "lucide-react"

interface AccommodationCardProps {
  roomId: number
  roomName: string
  accommodationTypeName: string
  dayNightTourPrice: string
  roomInclusions: RoomInclusions[]
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
  const { user } = useAuth();

  return (
    <Link to={user ? `/rooms/${roomId}` : `/login`} className="no-underline">
      <div className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        {/* Image section - clean and full */}
        <div className="overflow-hidden bg-neutral-100 h-48">
          <img
            src={`${import.meta.env.VITE_BE_BASE_URL}/storage/uploads/images/${roomImage}`}
            alt={roomName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content section - generous spacing */}
        <div className="p-6 space-y-4">
          {/* Header with title and price */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-neutral-900 leading-tight">{roomName}</h2>
              <p className="text-sm text-neutral-500 mt-1">{accommodationTypeName}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-semibold text-neutral-900">₱ {Number(dayNightTourPrice) * Number(maxGuests)}</p>
                <div>
              <p className="text-sm flex items-center gap-2"><Users width={15} /> {maxGuests}</p>
            </div>
            </div>
          </div>
        

          {/* Inclusions - simple list */}
          <div className="pt-2 border-t border-neutral-100">
            <div className="text-xs text-neutral-600 space-y-1">
              {roomInclusions.slice(0, 3).map((inclusion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-neutral-400">•</span>
                  <span>{inclusion.inclusion_name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AccommodationCard
