

import type React from "react"

import { useState } from "react"
import Icon from "@components/Icon"
import { RoomType } from "../types/types"
import toast from "react-hot-toast"
import { AccommodationService } from "../services/AccommodationService"
import { AxiosError } from "axios"
import { Modal } from "@components/Modal"
import api from "@services/api"

interface ManageRoomTypesProps {
    roomTypes: RoomType[]
    fetchRoomLoading: boolean
    fetchAllRoomTypes: () => void
}

const ManageRoomTypes = ({ roomTypes, fetchRoomLoading, fetchAllRoomTypes }: ManageRoomTypesProps) => {
    const [roomTypeName, setRoomTypeName] = useState("")
    const [roomMaxGuests, setRoomMaxGuests] = useState(1)
    const [loading, setLoading] = useState(false)
    const [roomTypeModal, setRoomTypeModal] = useState(false)
    const [editInput, setEditInput] = useState("")
    const [editMaxGuests, setEditMaxGuests] = useState(1)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const openEditModal = (roomType: RoomType) => {
        setSelectedRoom(roomType)
        setEditInput(roomType.accommodation_type_name)
        setEditMaxGuests(roomType.max_guests)
        setRoomTypeModal(true)
    }

    const openDeleteModal = (roomType: RoomType) => {
        setSelectedRoom(roomType)
        setDeleteModal(true)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            setLoading(true);
            await AccommodationService.store({ accommodation_type_name: roomTypeName, max_guests: roomMaxGuests });
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
                accommodation_type_name: editInput,
                max_guests: editMaxGuests
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
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Manage Room Types</h1>
                <p className="text-sm text-muted-foreground mt-1">Create and manage different accommodation room types</p>
            </div>

            <form
                className="bg-card border border-gray-300 rounded-lg p-6 space-y-4"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <h2 className="text-lg font-semibold text-foreground">Add New Room Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="room_type_name" className="block text-sm font-medium text-foreground mb-2">Room Type Name</label>
                        <input
                        type="text"
                        value={roomTypeName}
                        onChange={(e) => setRoomTypeName(e.target.value)}
                        placeholder="Room type name (e.g., Standard, Deluxe)"
                        className="col-span-1 md:col-span-2 bg-background border border-gray-300 rounded-lg outline-none shadow-none ring-0 
                 focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-foreground placeholder-muted-foreground transition-all"
                    />
                    </div>

                    <div>
                        <label htmlFor="max_guests" className="block text-sm font-medium text-foreground mb-2">Maximum Guests</label>
                        <input
                        type="number"
                        value={roomMaxGuests}
                        onChange={(e) => setRoomMaxGuests(Number(e.target.value))}
                        placeholder="Max guests"
                        min="1"
                        className="bg-background border border-gray-300 rounded-lg outline-none shadow-none ring-0 
                 focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-foreground placeholder-muted-foreground transition-all"
                    />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 active:bg-primary/80 transition-all duration-200 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Adding...
                        </span>
                    ) : (
                        "Add Room Type"
                    )}
                </button>
            </form>

            <div className="bg-card border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-primary/90 border-b border-gray-300 px-6 py-4">
                    <h2 className="font-semibold text-white">Room Types ({roomTypes.length})</h2>
                </div>

                <div className="max-h-[50vh] overflow-y-auto">
                    {fetchRoomLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                <p className="text-muted-foreground">Loading room types...</p>
                            </div>
                        </div>
                    ) : roomTypes.length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-muted-foreground">No room types yet. Create one to get started.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border divide-gray-300">
                            {roomTypes.map((roomType, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between px-6 py-4 hover:bg-primary/10 transition-colors duration-150 group"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">{roomType.accommodation_type_name}</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Max {roomType.max_guests} guest{roomType.max_guests !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(roomType)}
                                            className="cursor-pointer p-2 hover:bg-background rounded-lg transition-colors text-primary"
                                            title="Edit room type"
                                        >
                                            <Icon name="Pencil" size={18} color="currentColor" />
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(roomType)}
                                            className="cursor-pointer p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                                            title="Delete room type"
                                        >
                                            <Icon name="Trash" size={18} color="currentColor" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={roomTypeModal}
                setIsOpen={setRoomTypeModal}
                className="max-w-md min-w-sm max-h-[90vh] overflow-y-auto"
            >
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Edit Room Type</h1>
                        <p className="text-sm text-muted-foreground mt-2">Update the room type details below</p>
                    </div>

                    <form autoComplete="off" onSubmit={handleEdit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Room Type Name</label>
                            <input
                                type="text"
                                value={editInput}
                                onChange={(e) => setEditInput(e.target.value)}
                                placeholder="e.g., Standard, Deluxe, Suite"
                                className="w-full bg-background border border-gray-300 rounded-lg outline-none shadow-none ring-0 
                         focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-foreground placeholder-muted-foreground transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Maximum Guests</label>
                            <input
                                type="number"
                                value={editMaxGuests}
                                onChange={(e) => setEditMaxGuests(Number(e.target.value))}
                                placeholder="e.g., 2"
                                min="1"
                                className="w-full bg-background border border-gray-300 rounded-lg outline-none shadow-none ring-0 
                         focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-foreground placeholder-muted-foreground transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={updateLoading}
                            className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {updateLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                    Saving...
                                </span>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </form>
                </div>
            </Modal>

            <Modal isOpen={deleteModal} setIsOpen={setDeleteModal} className="max-w-sm">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Delete Room Type</h1>
                        <p className="text-sm text-muted-foreground mt-2">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-foreground">"{selectedRoom?.accommodation_type_name}"</span>? This
                            action cannot be undone.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            className="flex-1 px-4 py-3 text-foreground border border-gray-300 rounded-lg hover:bg-secondary/50 transition-colors font-medium"
                            onClick={() => setDeleteModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-1 px-4 py-3 text-destructive-foreground bg-destructive hover:bg-destructive/90 active:bg-destructive/80 rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleDelete}
                            disabled={deleteLoading}
                        >
                            {deleteLoading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageRoomTypes
