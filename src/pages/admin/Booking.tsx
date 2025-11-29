import Table, { Column } from "@components/Table";
import { MyBooking, User } from "@/types/myBooking";
import { Accomodation } from "@/types/accomodationType";
import api, { AxiosError } from "@services/api";
import { useEffect, useState, useCallback } from "react";
import { Modal } from "@components/Modal";
import toast from "react-hot-toast";
import { getStatusColor } from "@helpers/index";

const Booking = () => {
    const [myBookings, setMyBookings] = useState<MyBooking[]>([]);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const [bookingDetailsModal, setBookingDetailsModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<MyBooking | null>(null);

    const [changeStatusModal, setChangeStatusModal] = useState(false);
    const [idToChange, setIdToChange] = useState<number | null>(null);
    const [roomIdToChange, setRoomIdToChange] = useState<number | null>(null);
    const [changeCheckInModal, setChangeCheckInModal] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    // Debounce
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500); // 500ms debounce
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const fetchBooking = useCallback(
        async (page: number = 1) => {
            try {
                setLoading(true);
                const res = await api.get("/bookings", {
                    params: {
                        per_page: perPage,
                        page,
                        search: debouncedSearch || undefined,
                    },
                });
                setMyBookings(res.data.data);

                const meta = res.data.meta || {};
                setCurrentPage(meta.current_page ?? page);
                setPerPage(meta.per_page ?? perPage);
                setTotalItems(meta.total ?? res.data.data.length);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch bookings.");
            } finally {
                setLoading(false);
            }
        },
        [debouncedSearch, perPage]
    );

    useEffect(() => {
        fetchBooking(1); // reset to first page when search changes
    }, [fetchBooking]);

    const handlePageChange = (page: number) => {
        fetchBooking(page);
    };

    const handleViewDetails = (booking: MyBooking) => {
        setSelectedBooking(booking);
        setBookingDetailsModal(true);
    };

    const handleChangeStatus = async (id: number | null, status: string) => {
        if (!id) return;
        try {
            setActionLoading(true);
            await api.patch("/update-booking-status", { id, status });
            toast.success("Status updated successfully");
            setChangeStatusModal(false);
            fetchBooking(currentPage);
        } catch (err) {
            if (err instanceof AxiosError) toast.error(err?.response?.data?.message || "Error updating status");
        } finally {
            setActionLoading(false);
        }
    };

    const handleCheckIn = async (id: number | null) => {
        if (!id) return;
        try {
            setActionLoading(true);
            await api.patch("/update-check-in-status", { id, status: true });
            toast.success("Checked in successfully");
            setChangeCheckInModal(false);
            fetchBooking(currentPage);
        } catch (err) {
            if (err instanceof AxiosError) toast.error(err?.response?.data?.message || "Error checking in");
        } finally {
            setActionLoading(false);
        }
    };

    const columns: Column<MyBooking>[] = [
        {
            label: "Status",
            key: "status",
            render: (value) => <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(value as MyBooking["status"])}`}>{value as string}</span>
        },
        {
            label: "Customer",
            key: "user",
            render: (value) => {
                const user = value as User;
                return <span>{user?.first_name} {user?.last_name}</span>;
            }
        },
        {
            label: "Room Name",
            key: "room",
            render: (value) => <span>{(value as Accomodation)?.room_name}</span>
        },
        { label: "Check-In", key: "check_in" },
        { label: "Check-Out", key: "check_out" },
        {
            label: "Change Status",
            key: "id",
            render: (value) => <button className="text-blue-500 underline" onClick={() => { setIdToChange(value as number); setChangeStatusModal(true); }}>Change</button>
        },
        {
            label: "Check-In",
            key: "room_id",
            render: (value) => <button className="text-blue-500 underline" onClick={() => { setRoomIdToChange(value as number); setChangeCheckInModal(true); }}>Check In</button>
        },
        {
            label: "View Details",
            key: "no_guests",
            render: (_, row) => <button className="text-blue-500 underline" onClick={() => handleViewDetails(row)}>View</button>
        }
    ];

    return (
        <>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search customer or room name..."
                    className="border px-3 py-2 rounded w-full max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {
                loading ? <>
                 <div className="w-full p-4 bg-white rounded-2xl shadow-md animate-pulse">
            {/* Table Header */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 mb-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-4 bg-gray-300 rounded w-full"
                    ></div>
                ))}
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
                        {Array.from({ length: 8 }).map((_, colIndex) => (
                            <div
                                key={colIndex}
                                className="h-4 bg-gray-200 rounded w-full"
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-between mt-4">
                <div className="h-6 w-20 bg-gray-300 rounded"></div>
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-6 w-20 bg-gray-300 rounded"></div>
            </div>
        </div>
                </> : <>
                
            <Table
                columns={columns}
                data={myBookings}
                tableTitle="All Bookings"
                currentPage={currentPage}
                perPage={perPage}
                totalItems={totalItems}
                onPageChange={handlePageChange}
                loading={loading}
            />

            {/* Change Status Modal */}
            <Modal isOpen={changeStatusModal} setIsOpen={setChangeStatusModal}>
                <p className="font-semibold text-xl mb-4">Change Status</p>
                <div className="flex flex-col gap-2">
                    {["completed", "confirmed", "cancelled"].map((status) => (
                        <button
                            key={status}
                            className={`px-4 py-2 rounded ${status === "cancelled" ? "bg-gray-200 text-gray-700" : "bg-blue-500 text-white"}`}
                            onClick={() => handleChangeStatus(idToChange, status)}
                        >
                            {actionLoading ? "Loading..." : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </Modal>

            {/* Check-In Modal */}
            <Modal isOpen={changeCheckInModal} setIsOpen={setChangeCheckInModal}>
                <p className="font-semibold text-xl mb-4">Check In Room</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleCheckIn(roomIdToChange)}>
                    {actionLoading ? "Loading..." : "Confirm Check-In"}
                </button>
            </Modal>

            {/* Booking Details Modal */}
            <Modal isOpen={bookingDetailsModal} setIsOpen={setBookingDetailsModal} className="max-w-3xl">
                {selectedBooking && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">{selectedBooking.user.first_name} {selectedBooking.user.last_name}</h2>
                        <p>Status: <span className={`px-2 py-1 rounded-full ${getStatusColor(selectedBooking.status)}`}>{selectedBooking.status}</span></p>
                        <p>Room: {selectedBooking.room.room_name}</p>
                        <p>Check-In: {selectedBooking.check_in}</p>
                        <p>Check-Out: {selectedBooking.check_out}</p>
                        <p>Guests: {selectedBooking.no_guests}</p>
                        <p>Total Price: ₱{selectedBooking.total_price}</p>
                    </div>
                )}
            </Modal>
            </>
            }
        </>
    );
};

export default Booking;
