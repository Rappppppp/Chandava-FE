import { useState, useEffect, useCallback } from "react";
import Table, { Column } from "@components/Table";
import Icon from "@components/Icon";
import api, { AxiosError } from "@services/api";
import toast from "react-hot-toast";
import { useAuth } from "@contexts/AuthContext";
import type { MyBooking } from "@/types/myBooking";
import type { Accomodation } from "@/types/accomodationType";
import { Modal } from "@components/Modal";
import { Star } from 'lucide-react';
import { MessageService } from "@services/messageService";
import { useNavigate } from "react-router-dom";
import { FileInput } from "@components/elements";
import { useInput } from "@hooks/useInput";




const getStatusColor = (status: MyBooking["status"]) => {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-800";
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "cancelled":
            return "bg-red-100 text-red-800";
        case "confirmed":
            return "bg-blue-100 text-blue-800"; // You can change the color if you prefer
        default:
            return "bg-gray-100 text-gray-800";
    }
};


const UserBookingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [myBookings, setMyBookings] = useState<MyBooking[]>([]);
    const [allDetailsModal, setAllDetailsModal] = useState(false);
    const [activeBooking, setActiveBooking] = useState<MyBooking | null>(null);
    const [cancelLoading, setCancelLoading] = useState(false);

    const [selectedRoomIdForReview, setSelectedRoomIdForReview] = useState<number | null>(null);
    const [reviewModal, setReviewModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);

    const [creatingConvo, setCreatingConvo] = useState(false);



    const { values, isValid, getPayload, reset, handleArrayChange } = useInput({
        images: { value: [] as string[], required: true },
    });

    const fetchMyBookings = useCallback(async (userId: string) => {
        try {
            setLoading(true);
            const response = await api.get(`/bookings?user_id=${userId}`);

            const activeBooking = response.data.data.find(
                (booking: MyBooking) => booking.status === "pending" || booking.status === "confirmed"
            );
            setActiveBooking(activeBooking);
            setMyBookings(
                response.data.data.filter((booking: MyBooking) =>
                    booking.status !== "pending" && booking.status !== "confirmed"
                )
            );
            // setData(response.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)
                return;
            }
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCancelBooking = async (id: string | number) => {
        if (!id) return;
        setCancelLoading(true);
        try {
            await api.patch(`/update-booking-status`, { id, status: "cancelled" });
            toast.success("Booking cancelled successfully");
            await fetchMyBookings(user.id);

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)
                return;
            }
            toast.error("Something went wrong. Please try again.")
        } finally {
            setCancelLoading(false);
        }
    }


    useEffect(() => {
        if (!user) return;
        fetchMyBookings(user.id);
    }, [fetchMyBookings, user]);


    const columns: Column<MyBooking>[] = [
        {
            label: "Room Name",
            key: "room",
            render: (value) => {
                if (typeof value === 'object' && value !== null && 'room_name' in value) {
                    return <span className="text-sm">{(value as Accomodation).room_name}</span>;
                }
                return null;
            }
        },
        { label: "Check-In", key: "check_in" },
        { label: "Check-Out", key: "check_out" },
        {
            label: "Status",
            key: "status",
            render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(value as MyBooking["status"])}`}>
                    {value as MyBooking["status"]}
                </span>
            ),
        },
        {
            label: "Action",
            key: "room_id",
            render: (value, row) =>
                row.status === "cancelled" ? (
                    <span className="text-sm text-gray-500">No Action Required</span>
                ) : (
                    <button
                        onClick={() => handleClickWriteReview(value as MyBooking["room_id"])}
                        className="text-sm underline underline-offset-2 text-blue-500 cursor-pointer"
                    >
                        Write a Review
                    </button>
                ),
        }

    ];

    const handleClickWriteReview = async (id: number) => {
        console.log(id)
        setSelectedRoomIdForReview(id);
        setReviewModal(true);
    }

    const submitReview = async () => {
        if (selectedRoomIdForReview && rating && comment.trim() !== '') {
            const payload = getPayload(values)
            try {
                setReviewLoading(true)
                await api.post(`/feedbacks`, {
                    user_id: user?.id,
                    room_id: selectedRoomIdForReview,
                    rate: rating,
                    comment,
                    ...(payload.images && payload.images.length > 0 ? { images: payload.images } : {})
                });
                setReviewModal(false);
                setComment('');
                setRating(0);
                reset();
                toast.success("Review submitted successfully");
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message)
                    return;
                }
                toast.error("Something went wrong. Please try again.")
            } finally {
                setReviewLoading(false)
            }
        }
    }

    const createConvo = async () => {
        try {
            setCreatingConvo(true);
            const res = await MessageService.createConvo({
                user_id: user?.id,
                receiver_id: 1,
                title: `Booking ID: ${activeBooking?.id}`,
            })
            if (res.message === "Conversation with this title already exists.") {
                navigate(`/users/messages/${res.conversation.id}`)
                return;
            }
            navigate(`/users/messages/${res.id}`)

        } catch (error) {

        }
    }

    if (loading) return "Loading..."

    return (
        <div className="flex flex-col gap-5 px-[0.1875rem]">

            {activeBooking && (
                <div className="w-full rounded-2xl shadow-sm p-5 md:px-10 flex flex-col gap-5">
                    <h1 className="text-primary font-bold">Active Booking</h1>
                    <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-20">
                        <div className="flex gap-3 relative">
                            <div className=" bg-primary w-[0.3125rem]"></div>
                            <div className="w-full">
                                <p className="text-sm font-bold text-primary">Booking ID: {activeBooking.id}</p>
                                <p className="text-gray-600">{activeBooking.room.room_name}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-primary">Number of Guests</p>
                            <p className="text-gray-600">{activeBooking.no_guests} guests</p>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-primary">Check in/Checkout Date</p>
                            <p className="text-gray-600">{activeBooking.check_in} - {activeBooking.check_out}</p>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-primary">Tour Type</p>
                            <p className="text-gray-600">{activeBooking.tour_type === "day" ? "Day" : "Overnight"} Tour</p>
                        </div>

                        <div onClick={() => setAllDetailsModal(true)}>
                            <p className="text-sm font-bold text-primary">View all details</p>
                            <p className="text-gray-600 underline inline-flex gap-2 cursor-pointer">Click here <Icon name="SquareArrowOutUpRight" size={15} color="#387A57" /></p>
                        </div>
                    </div>

                    <div
                        onClick={createConvo}
                        className=" flex items-center justify-center border-t border-primary pt-3 gap-2 cursor-pointer">
                        <Icon name="MessageCircle" size={30} color="#387A57" />
                        <p>Chat with the stuff</p>
                    </div>
                </div>
            )}

            <Table columns={columns} data={myBookings} tableTitle="Booking History" />


            <Modal isOpen={activeBooking ? allDetailsModal : false} setIsOpen={setAllDetailsModal} className="max-w-2xl min-w-2xl">
                {activeBooking && <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Booking Details</h2>

                    <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span className="font-medium">Room:</span>
                            <span>{activeBooking.room.room_name}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Check-in:</span>
                            <span>{activeBooking.check_in}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Check-out:</span>
                            <span>{activeBooking.check_out}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Tour Type:</span>
                            <span>{activeBooking.tour_type === "day" ? "Day" : "Overnight"} Tour</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Guests:</span>
                            <span>{activeBooking.no_guests}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Total Price:</span>
                            <span>₱{parseFloat(activeBooking.total_price).toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Status:</span>
                            <span className="capitalize px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                {activeBooking.status}
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-6">
                        You can still cancel this booking. <span className="font-medium text-gray-600">Once confirmed, cancellation is no longer allowed.</span>
                    </p>

                    {activeBooking.status === "pending" && <button
                        onClick={() => handleCancelBooking(activeBooking.id)} // replace with your cancel handler
                        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded"
                    >
                        {cancelLoading ? "Loading..." : "Cancel Booking"}
                    </button>}


                </>}


            </Modal>
            <Modal isOpen={reviewModal} setIsOpen={setReviewModal} className="max-w-2xl min-w-2xl">

                <h2 className="text-xl font-semibold mb-6">Leave a Review</h2>
                <div className="space-y-6">
                    {/* Rating */}
                    <div>
                        <label htmlFor="rating" className="block text-base font-medium text-slate-700">
                            Rating <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-500 mb-2">Select from 1 to 5 stars</p>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className={`w-8 h-8 transition-colors duration-200 cursor-pointer ${(hoverRating || rating) >= star
                                        ? 'text-yellow-400'
                                        : 'text-gray-300 hover:text-yellow-200'
                                        }`}
                                    fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
                                    strokeWidth={1.5}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Feedback */}
                    <div>
                        <label htmlFor="review" className="block text-base font-medium text-slate-700">
                            Your Feedback <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-500 mb-2">Share your experience with this booking</p>
                        <textarea
                            id="review"
                            className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition shadow-sm"
                            rows={5}
                            placeholder="Write your comment here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div>
                        <FileInput
                            label="Upload photos (optional)"
                            name="images"
                            onChange={handleArrayChange}
                            maxFiles={5}
                        />
                    </div>
                </div>


                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                        onClick={() => setReviewModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark"
                        onClick={submitReview}
                        disabled={rating === 0 || comment.trim() === '' || reviewLoading}
                    >
                        {reviewLoading ? "Loading..." : "Submit"}
                    </button>
                </div>

            </Modal>

            <Modal isOpen={creatingConvo} setIsOpen={setReviewModal} className="max-w-2xl ">
                <p>Creating conversation, please wait...</p>
            </Modal>







        </div>
    );
};

export default UserBookingPage;
