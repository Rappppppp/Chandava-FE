import { MyBooking } from "@/types/myBooking";

export const getStatusColor = (status: MyBooking["status"]) => {
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