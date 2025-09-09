import Table, { Column } from "@components/Table";
import { MyBooking, User } from "@/types/myBooking";
import { Accomodation } from "@/types/accomodationType";
import api, { AxiosError } from "@services/api";
import { useEffect, useState, useCallback } from "react";
import { Modal } from "@components/Modal";
import toast from "react-hot-toast";

const Booking = () => {

    const [myBookings, setMyBookings] = useState<MyBooking[]>([]);
    const [loading, setLoading] = useState(false);
    // const [rescheduleLoading, setRescheduleLoading] = useState(false);
    // const [rescheduleModal, setRescheduleModal] = useState(false);
    // const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    // const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    // const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);


    const [bookingDetailsModal, setBookingDetailsModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<MyBooking | null>(null);

    // const handleSubmitNewSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (!checkInDate || !checkOutDate || !selectedBookingId) {
    //         toast.error("Please select both check-in and check-out dates.");
    //         return;
    //     }

    //     // Example payload
    //     const payload = {
    //         id: selectedBookingId,
    //         check_in: checkInDate.toISOString().split("T")[0], // YYYY-MM-DD
    //         check_out: checkOutDate.toISOString().split("T")[0],
    //     };



    //     try {
    //         setRescheduleLoading(true);
    //         await api.patch("/update-booking-date", payload);
    //         toast.success("Reschedule submitted successfully.");
    //         setRescheduleModal(false);
    //         fetchBooking();
    //     } catch (error) {
    //         console.error("Error submitting reschedule:", error);
    //         toast.error("Error submitting reschedule.");
    //     } finally {
    //         setRescheduleLoading(false);
    //     }



    // }

    // const handleOpenRescheduleModal = (id: number) => {
    //     setSelectedBookingId(id);
    //     setRescheduleModal(true);
    // }

    const fetchBooking = useCallback(async () => {
        try {
            setLoading(true)
            const res = await api.get("/bookings");
            setMyBookings(res.data.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message)
            }

        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchBooking();
    }, [fetchBooking])

    const handleViewDetails = async (row: MyBooking) => {
        setBookingDetailsModal(true);
        setSelectedBooking(row);
        console.log(row)
    }



    const columns: Column<MyBooking>[] = [
        {
            label: "Customer",
            key: "user",
            render: (value) => {
                if (typeof value === 'object' && value !== null && 'first_name' in value && 'last_name' in value) {
                    return <span className="text-sm">{(value as User).first_name} {(value as User).last_name}</span>;
                }
                return null;
            }
        },
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
            label: "Change Status",
            key: "id",
            render: (value) => (
                <button onClick={() => handleClickConfirm(value as MyBooking["id"])} className="text-sm underline underline-offset-2 text-blue-500 cursor-pointer">Change</button>
            ),
        },

        {
            label: "Mark as Checked In",
            key: "room_id",
            render: (value) => (
                <button onClick={() => handleClickCheckIn(value as MyBooking["room_id"])} className="text-sm underline underline-offset-2 text-blue-500 cursor-pointer">Mark as Checked In</button>
            ),
        },

        // {
        //     label: "Change Schedule",
        //     key: "user_id",
        //     render: (_, row) => (
        //         <button onClick={() => handleOpenRescheduleModal(row.id)} className="text-sm underline underline-offset-2 text-blue-500 cursor-pointer">Reschedule</button>
        //     ),
        // },



        {
            label: "View Details",
            key: "no_guests",
            render: (_, row) => (
                <button onClick={() => handleViewDetails(row)} className="text-sm underline underline-offset-2 text-blue-500 cursor-pointer">View</button>
            ),
        },



    ];


    const [changeStatusModal, setChangeStatusModal] = useState(false);
    const [idToChange, setIdToChange] = useState<number | null>(null);
    const [roomIdToChange, setRoomIdToChange] = useState<number | null>(null);
    const [changeCheckInModal, setChangeCheckInModal] = useState(false);



    const handleClickCheckIn = async (id: number) => {
        setRoomIdToChange(id)
        setChangeCheckInModal(true)

    }

    const handleClickConfirm = async (id: number) => {
        setIdToChange(id)
        setChangeStatusModal(true)

    }

    const [changeStatusLoading, setChangeStatusLoading] = useState(false);
    const changeStatus = async (id: number, status: string) => {
        try {
            setChangeStatusLoading(true);
            await api.patch(`/update-booking-status`, { id, status });
            toast.success("Booking status changed successfully");
            setChangeStatusModal(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)
                return;
            }
            toast.error("Something went wrong. Please try again.")
        } finally {
            setChangeStatusLoading(false);
        }
    }

    const changeCheckIn = async (id: number) => {
        try {
            setChangeStatusLoading(true);
            await api.patch(`/update-check-in-status`, { id, status: true });
            toast.success("Checked in successfully");
            setChangeCheckInModal(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)
                return;
            }
            toast.error("Something went wrong. Please try again.")
        } finally {
            setChangeStatusLoading(false);
        }
    }

    if (loading) return "Loading..."

    return (
        <>
            <Table columns={columns} data={myBookings} tableTitle="All Bookings" />

            <Modal isOpen={changeStatusModal} setIsOpen={setChangeStatusModal} className="max-w-2xl min-w-lg">
                <p className="text-xl font-semibold">Change Status</p>
                <div className="flex flex-col gap-2 ">
                    <button onClick={() => changeStatus(idToChange, "completed")} className="px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark">
                        {changeStatusLoading ? "Loading..." : "Mark as Completed"}
                    </button>

                    <button onClick={() => changeStatus(idToChange, "confirmed")} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-primary-dark">
                        {changeStatusLoading ? "Loading..." : "Confirm Booking"}
                    </button>

                    <button onClick={() => changeStatus(idToChange, "cancelled")} className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100">
                        {changeStatusLoading ? "Loading..." : "Cancel Booking"}
                    </button>
                </div>
            </Modal>

            <Modal isOpen={changeStatusModal} setIsOpen={setChangeStatusModal} className="max-w-2xl min-w-lg">
                <p className="text-xl font-semibold">Change Status</p>
                <div className="flex flex-col gap-2 ">
                    <button onClick={() => changeStatus(idToChange, "completed")} className="px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark">
                        {changeStatusLoading ? "Loading..." : "Mark as Completed"}
                    </button>

                    <button onClick={() => changeStatus(idToChange, "confirmed")} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-primary-dark">
                        {changeStatusLoading ? "Loading..." : "Confirm Booking"}
                    </button>

                    <button onClick={() => changeStatus(idToChange, "cancelled")} className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100">
                        {changeStatusLoading ? "Loading..." : "Cancel Booking"}
                    </button>
                </div>
            </Modal>

            <Modal isOpen={changeCheckInModal} setIsOpen={setChangeCheckInModal} className="max-w-2xl min-w-lg">
                <p className="text-xl font-semibold">Change Room Check In Status</p>
                <p>Are you sure that the customer want to check in this room?</p>

                <div className="flex flex-col gap-2 ">
                    <button onClick={() => changeCheckIn(roomIdToChange)} className="px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark">
                        {changeStatusLoading ? "Loading..." : "Check In"}
                    </button>
                </div>

            </Modal>


            {/* <Modal
                isOpen={rescheduleModal}
                setIsOpen={setRescheduleModal}
                className="max-w-2xl min-w-lg"
            >
                <p className="text-xl font-semibold mb-4">
                    Change Check In and Check Out Date
                </p>

                <form onSubmit={handleSubmitNewSchedule} className="space-y-4">
           
                    <div>
                        <label className="block text-sm font-medium mb-1">Check In Date</label>
                        <input
                            type="date"
                            value={checkInDate ? checkInDate.toISOString().split("T")[0] : ""}
                            onChange={(e) => setCheckInDate(e.target.value ? new Date(e.target.value) : null)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

          
                    <div>
                        <label className="block text-sm font-medium mb-1">Check Out Date</label>
                        <input
                            type="date"
                            value={checkOutDate ? checkOutDate.toISOString().split("T")[0] : ""}
                            onChange={(e) => setCheckOutDate(e.target.value ? new Date(e.target.value) : null)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

        
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setRescheduleModal(false)}
                            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={rescheduleLoading}
                            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            {rescheduleLoading ? "Loading..." : "Submit Changes"}
                        </button>
                    </div>
                </form>
            </Modal> */}


            <Modal
                isOpen={bookingDetailsModal}
                setIsOpen={setBookingDetailsModal}
                className="max-w-3xl min-w-lg"
            >
                <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b pb-3">
                        <h2 className="text-2xl font-semibold text-gray-800">Booking Details</h2>
                        <p className="text-sm text-gray-500">Review guest and booking information below</p>
                    </div>

                    {/* Guest Info */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <h3 className="font-medium text-lg mb-2">Guest Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <p><span className="font-medium text-gray-600">Name:</span> {selectedBooking?.user.first_name} {selectedBooking?.user.last_name}</p>
                            <p><span className="font-medium text-gray-600">Email:</span> {selectedBooking?.user.email}</p>
                            <p><span className="font-medium text-gray-600">Contact:</span> {selectedBooking?.user.contact_number}</p>
                            <p><span className="font-medium text-gray-600">Address:</span> {selectedBooking?.user.address}</p>
                        </div>
                    </div>

                    {/* Booking Info */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <h3 className="font-medium text-lg mb-2">Booking Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <p><span className="font-medium text-gray-600">Check-in:</span> {selectedBooking?.check_in}</p>
                            <p><span className="font-medium text-gray-600">Check-out:</span> {selectedBooking?.check_out}</p>
                            <p><span className="font-medium text-gray-600">Guests:</span> {selectedBooking?.no_guests}</p>
                            <p><span className="font-medium text-gray-600">Tour Type:</span> {selectedBooking?.tour_type}</p>
                            <p><span className="font-medium text-gray-600">Status:</span>
                                <span className={`ml-2 px-2 py-1 text-xs rounded-full 
            ${selectedBooking?.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                    {selectedBooking?.status}
                                </span>
                            </p>
                            <p><span className="font-medium text-gray-600">Total Price:</span> ₱{selectedBooking?.total_price}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <h3 className="font-medium text-lg mb-2">Payment Information</h3>
                        {selectedBooking?.receipt ? (
                            <div className="flex items-center gap-4">
                                <img
                                    src={`${import.meta.env.VITE_BE_BASE_URL}/storage/uploads/images/${selectedBooking.receipt}`}
                                    alt="Receipt"
                                    className="w-40 h-40 object-cover rounded-lg border shadow-sm"
                                />
                                <div className="text-sm text-gray-600">
                                    <p className="font-medium">Receipt Uploaded</p>
                                    <a
                                        href={`${import.meta.env.VITE_BE_BASE_URL}/storage/uploads/images/${selectedBooking.receipt}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-block text-indigo-600 hover:underline"
                                    >
                                        View Full Receipt
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No receipt uploaded</p>
                        )}
                    </div>

                    {/* Room Info */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <h3 className="font-medium text-lg mb-2">Room Information</h3>
                        <div className="flex gap-4">
                            {selectedBooking?.room.room_images?.[0] && (
                                <img
                                    src={`${import.meta.env.VITE_BE_BASE_URL}/storage/uploads/images/${selectedBooking.room.room_images[0].file}`}
                                    alt={selectedBooking.room.room_name}
                                    className="w-32 h-24 rounded-lg object-cover shadow"
                                />
                            )}
                            <div className="flex-1">
                                <p className="text-lg font-semibold">{selectedBooking?.room.room_name}</p>
                                <p className="text-sm text-gray-500 mb-2">
                                    {selectedBooking?.room.accommodation_type.accommodation_type_name}
                                </p>
                                <ul className="flex flex-wrap gap-2 text-xs">
                                    {selectedBooking?.room.room_inclusions?.map((inc) => (
                                        <li key={inc.id} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                                            {inc.inclusion_name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>



        </>
    );
}

export default Booking;