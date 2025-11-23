"use client"

import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import RoomImages from "@features/roomdetails/components/RoomImages"
import RoomPricing from "@features/roomdetails/components/RoomPricing"
import type { Accomodation } from "@/types/accomodationType"
import api from "@services/api"
import { useAuth } from "@contexts/AuthContext"
import { Star, AlertCircle } from "lucide-react"

const RoomDetails = () => {
  const { roomId } = useParams()
  const { user } = useAuth()
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [accommodation, setAccommodation] = useState<Accomodation | null>(null)

  const location = useLocation()
  const isUsersPage = location.pathname.split("/")[1] === "users"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNotFound(false)
        setLoading(true)
        const response = await api.get(`/public-rooms?id=${roomId}`)
        if (response.data.data.length <= 0) {
          setNotFound(true)
        }
        setAccommodation(response.data.data[0])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [roomId])

  if (loading)
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 bg-gray-200 rounded-lg h-96"></div>
          <div className="w-full md:w-80 space-y-4">
            <div className="bg-gray-200 rounded-lg h-40"></div>
            <div className="bg-gray-200 rounded-lg h-20"></div>
          </div>
        </div>
      </div>
    )

  if (notFound)
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <AlertCircle className="w-16 h-16 text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-700">Room Not Found</h2>
        <p className="text-gray-500">This room doesn't exist or has been removed.</p>
      </div>
    )

  if (!accommodation) return null

  return (
    <>
      {/* Room Overview Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <RoomImages accommodation={accommodation} />
        <RoomPricing accommodation={accommodation} isAuthPage={isUsersPage} />
      </div>

      {/* Customer Feedbacks Header Section */}
      <div className="mb-10">
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

          {/* Rating Summary */}
          {accommodation.avg_rating ? (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="text-6xl font-bold text-blue-600">{accommodation.avg_rating}</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5"
                      fill={star <= Math.round(accommodation.avg_rating) ? "#3B82F6" : "#E5E7EB"}
                      stroke="none"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Based on <span className="font-semibold">{accommodation.feedbacks.length}</span> reviews
                </p>
              </div>
              <div className="hidden md:flex flex-col gap-3 flex-1">
                <p className="text-gray-700">
                  <span className="font-semibold text-lg">Excellent</span> overall experience from guests
                </p>
                <p className="text-sm text-gray-600">
                  Guests consistently praise the cleanliness, comfort, and hospitality
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>

      {/* Feedbacks List */}
      {accommodation.feedbacks.length > 0 ? (
        <div className="space-y-4">
          {accommodation.feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              {/* Header with user info */}
              <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {String(user?.id) === String(feedback.user_id) ? "You" : feedback.user?.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(feedback.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {/* Star rating */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5"
                        fill={star <= Number(feedback.rate) ? "#FBBF24" : "#E5E7EB"}
                        stroke="none"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-gray-700 mb-4 leading-relaxed">{feedback.comment}</p>

              {/* Review Images */}
              {feedback.images && feedback.images.length > 0 && (
                <div className="flex gap-3 mb-4 flex-wrap">
                  {feedback.images.map((img, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer"
                    >
                      <img
                        src={`${import.meta.env.VITE_BE_BASE_URL}/storage/uploads/images/${img.image}`}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Admin Response */}
              {feedback.response && (
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 mt-4">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Management Response</p>
                  <p className="text-sm text-blue-800">{feedback.response.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <p className="text-gray-600">No reviews yet. Book this room and share your experience!</p>
        </div>
      )}
    </>
  )
}

export default RoomDetails
