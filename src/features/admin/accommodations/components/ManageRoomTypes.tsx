import { useState } from "react";
import Icon from "@components/Icon"
import type { RoomType } from "@features/admin/accommodations/types/types";
import toast from "react-hot-toast";
import { AccommodationService } from "@features/admin/accommodations/services/AccommodationService";
import { AxiosError } from "axios";

interface ManageRoomTypesProps {
    roomTypes: RoomType[];
    fetchRoomLoading: boolean;
    fetchAllRoomTypes: () => void;
}


const ManageRoomTypes = ({ roomTypes, fetchRoomLoading, fetchAllRoomTypes }: ManageRoomTypesProps) => {
    const [roomTypeName, setRoomTypeName] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            setLoading(true);
            await AccommodationService.store({ accommodation_type_name: roomTypeName });
            setRoomTypeName("");
            fetchAllRoomTypes();
            toast.success("Room type added successfully");

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
                return;
            }
            console.error("Error adding room type:", error);
            toast.error("Error adding room type");
        } finally {
            setLoading(false);
        }

    }


    return (
        <div className="border border-gray-300 rounded-xl p-5">
            <h1 className="font-bold text-black mb-3">Manage Room Types</h1>
            <form className="flex gap-3 w-full " onSubmit={handleSubmit} autoComplete="off">
                <input
                    type="text"
                    value={roomTypeName}
                    onChange={(e) => setRoomTypeName(e.target.value)}
                    placeholder="Room type"
                    className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 
             focus:border-primary focus:ring-0 px-3"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-all duration-300 text-white">
                    {loading ? "Loading..." : "Add"}

                </button>
            </form>
            <div className="mt-3 max-h-[40vh] overflow-y-auto">
                {
                    fetchRoomLoading ? "Loading..." : roomTypes.map((roomType, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between hover:bg-gray-100 p-3 rounded-lg border border-gray-300 mb-3"
                        >
                            <p className="text-gray-700">{roomType.accommodation_type_name}</p>
                            <div className="flex gap-2">
                                <button className="text-blue-500 hover:text-blue-700 transition">
                                    <Icon name="Pencil" size={18} color="#1447e6" />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <Icon name="Trash" size={18} color="#fb2c36" />
                                </button>
                            </div>
                        </div>
                    ))
                }






            </div>
        </div>


    );
}

export default ManageRoomTypes;