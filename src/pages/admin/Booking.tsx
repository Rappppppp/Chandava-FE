import Table, { Column } from "@components/Table";
import { MyBooking, User } from "@/types/myBooking";
import { Accomodation } from "@/types/accomodationType";
import api, { AxiosError } from "@services/api";
import { useEffect, useState } from "react";
import { Modal } from "@components/Modal";
import toast from "react-hot-toast";

const Booking = () => {

    const [myBookings, setMyBookings] = useState<MyBooking[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
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
        }
        fetchData()
    }, [])



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
        }



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


        </>
    );
}

export default Booking;