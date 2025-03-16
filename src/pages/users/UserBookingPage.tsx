import { useState } from "react";
import Table, { Column } from "@components/Table";
import Icon from "@components/Icon";

type Booking = {
    id: number;
    roomType: string;
    status: "Completed" | "Pending" | "Cancelled";
    checkInDate: string;
    checkOutDate: string;
};

// Sample static data
const initialBookings: Booking[] = [
    { id: 1, roomType: "Concrete Cottage", status: "Completed", checkInDate: "2024-03-01", checkOutDate: "2024-03-05" },
    { id: 2, roomType: "Nipa Huts", status: "Cancelled", checkInDate: "2024-04-10", checkOutDate: "2024-04-15" },
    { id: 3, roomType: "Floating Cottage", status: "Cancelled", checkInDate: "2024-05-20", checkOutDate: "2024-05-25" },
    { id: 4, roomType: "Rainproof Tents", status: "Completed", checkInDate: "2024-06-05", checkOutDate: "2024-06-10" },
    { id: 5, roomType: "Concrete Cottage", status: "Completed", checkInDate: "2024-07-01", checkOutDate: "2024-07-07" },

];

const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
        case "Completed":
            return "bg-green-100 text-green-800";
        case "Pending":
            return "bg-yellow-100 text-yellow-800";
        case "Cancelled":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const UserBookingPage = () => {
    const [data] = useState<Booking[]>(initialBookings);

    const columns: Column<Booking>[] = [
        { label: "Room Type", key: "roomType" },
        { label: "Check-In", key: "checkInDate" },
        { label: "Check-Out", key: "checkOutDate" },
        {
            label: "Status",
            key: "status",
            render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(value as Booking["status"])}`}>
                    {value}
                </span>
            ),
        },
    ];


    return (
        <div className="flex flex-col gap-5 px-[0.1875rem]">

            <div className="w-full rounded-2xl shadow-sm p-5 md:px-10 flex flex-col gap-5">
                <h1 className="text-primary font-bold">Active Booking</h1>
                <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-20">
                    <div className="flex gap-3 relative">
                        <div className=" bg-primary w-[0.3125rem]"></div>
                        <div className="w-full">
                            <p className="text-sm font-bold text-primary">Booking ID: 123</p>
                            <p className="text-gray-600">Room 206</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-primary">Number of Guests</p>
                        <p className="text-gray-600">10 guests</p>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-primary">Check in/Checkout Date</p>
                        <p className="text-gray-600">March 20 - March 21, 2025</p>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-primary">Tour Type</p>
                        <p className="text-gray-600">Overnight Tour</p>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-primary">View all details</p>
                        <p className="text-gray-600 underline inline-flex gap-2 cursor-pointer">Click here <Icon name="SquareArrowOutUpRight" size={15} color="#387A57" /></p>
                    </div>
                </div>

                <div className=" flex items-center justify-center border-t border-primary pt-3 gap-2 cursor-pointer">
                    <Icon name="MessageCircle" size={30} color="#387A57" />
                    <p>Chat with the stuff</p>
                </div>
            </div>

            <Table columns={columns} data={data} tableTitle="Booking History" />

        </div>
    );
};

export default UserBookingPage;
