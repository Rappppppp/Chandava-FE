import { useState } from "react";
import Icon from "@components/Icon"
import type { RoomType } from "@features/admin/accommodations/types/types";
import toast from "react-hot-toast";
import { AccommodationService } from "@features/admin/accommodations/services/AccommodationService";
import { AxiosError } from "axios";
import api from "@services/api";
import { Modal } from "@components/Modal";

interface ManageRoomTypesProps {
    roomTypes: RoomType[];
    fetchRoomLoading: boolean;
    fetchAllRoomTypes: () => void;
}


const ManageRoomTypes = ({ roomTypes, fetchRoomLoading, fetchAllRoomTypes }: ManageRoomTypesProps) => {
    const [roomTypeName, setRoomTypeName] = useState("");
    const [roomTypeModal, setRoomTypeModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
    const [editInput, setEditInput] = useState("");

    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const openEditModal = (room: RoomType) => {
        setEditInput(room.accommodation_type_name);
        setSelectedRoom(room);
        setRoomTypeModal(true);
    }

    const openDeleteModal = (room: RoomType) => {
        setSelectedRoom(room);
        setDeleteModal(true);
    }

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

    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            await api.delete(`/accommodation-types/${selectedRoom.id}`);
            toast.success("Room type deleted successfully");
            setDeleteModal(false);
            fetchAllRoomTypes();
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
                return;
            }
            toast.error("Error deleting room type:", error);
        } finally {
            setDeleteLoading(false);
        }
    }

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setUpdateLoading(true);
            await api.put(`/accommodation-types/${selectedRoom.id}`, {
                accommodation_type_name: editInput
            })
            toast.success("Room type updated successfully");
            setRoomTypeModal(false);
            fetchAllRoomTypes();
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
                return;
            }
            toast.error("Error updating room type:", error);
        } finally {
            setUpdateLoading(false);
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
                                <button onClick={() => openEditModal(roomType)} className="text-blue-500 hover:text-blue-700 transition">
                                    <Icon name="Pencil" size={18} color="#1447e6" />
                                </button>
                                <button
                                    onClick={() => openDeleteModal(roomType)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <Icon name="Trash" size={18} color="#fb2c36" />
                                </button>
                            </div>
                        </div>
                    ))
                }






            </div>


            <Modal isOpen={roomTypeModal} setIsOpen={setRoomTypeModal} className="max-w-2xl min-w-xl max-h-[90vh] overflow-y-auto">
                <h1 className="font-bold text-2xl">Edit Room Type</h1>
                <form autoComplete="off" onSubmit={handleEdit} className="grid grid-cols-1 gap-5">
                    <input
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        placeholder="Room type"
                        className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 
             focus:border-primary focus:ring-0 px-2 py-3"
                    />

                    <button
                        type="submit"
                        disabled={updateLoading}
                        className=" w-full cursor-pointer py-3 rounded-lg bg-primary text-white font-bold">
                        {updateLoading ? "Loading..." : "Save"}
                    </button>
                </form>
            </Modal>

            <Modal isOpen={deleteModal} setIsOpen={setDeleteModal} className="max-w-2xl min-w-xl max-h-[90vh] overflow-y-auto">
                <h1 className="font-bold text-2xl">Delete Room Type</h1>
                <p className="text-gray-700">Are you sure you want to delete this room type?</p>
                <div className="flex gap-2 mt-5">
                    <button
                        className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                        onClick={() => setDeleteModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
                         onClick={handleDelete}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? "Loading..." : "Delete"}
                    </button>
                </div>

            </Modal>
        </div>


    );
}

export default ManageRoomTypes;