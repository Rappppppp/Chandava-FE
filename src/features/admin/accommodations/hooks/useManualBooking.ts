
import api, { AxiosError } from "@services/api";
import { useState } from "react";
import toast from "react-hot-toast";

type DisplayRoomList = {
    id: number;
    room_name: string;
    day_night_tour_price: number
    overnight_price: number
}

export type BookingPayload = {
    room_id: number;
    check_in: string;
    check_out: string;
    tour_type: string;
    admin_note: string;
    email: string | null;
}

function useManualBooking() {
    const [rooms, setRooms] = useState<DisplayRoomList[]>([]);

    const getRooms = async () => {
        const response = await api.get("/room-list");
        setRooms(response.data);
        return response.data;
    }

    const submitBooking = async (booking: BookingPayload) => {
        try {
            await api.post("/bookings", {
                ...booking,
            });
            toast.success("Booking submitted successfully");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)
                return;
            }
            toast.error("Something went wrong. Please try again.")
        }
    }


    return {
        rooms,
        getRooms,
        submitBooking
    }
}

export default useManualBooking;