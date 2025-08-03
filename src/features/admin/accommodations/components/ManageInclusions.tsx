import { useState } from "react";
import Icon from "@components/Icon"
import type { Inclusion } from "@features/admin/accommodations/types/types";
import toast from "react-hot-toast";
import { InclusionService } from "@features/admin/accommodations/services/InclusionService";
import { AxiosError } from "axios";
import api from "@services/api";
import { Modal } from "@components/Modal";

interface ManageInclusionsProps {
    inclusions: Inclusion[];
    fetchAllInclusions: () => void;
    fetchInclusionLoading: boolean;
}

const ManageInclusions = ({ inclusions, fetchAllInclusions, fetchInclusionLoading }: ManageInclusionsProps) => {
    const [inclusionName, setInclusionName] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editInput, setEditInput] = useState("");
    const [selectedInclusion, setSelectedInclusion] = useState<Inclusion | null>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await InclusionService.store({ inclusion_name: inclusionName });
            setInclusionName("");
            fetchAllInclusions();
            toast.success("Inclusion added successfully");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
                return;
            }
            console.error("Error adding inclusion:", error);
            toast.error("Error adding inclusion");
        } finally {
            setLoading(false);
        }
    }

    const openUpdateModal = (inclusion: Inclusion) => {
        setEditInput(inclusion.inclusion_name);
        setSelectedInclusion(inclusion);
        setUpdateModal(true);
    }
    const openDeleteModal = (inclusion: Inclusion) => {
        setSelectedInclusion(inclusion);
        setDeleteModal(true);
    }

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setUpdateLoading(true);
            await api.put(`/inclusions/${selectedInclusion.id}`, {
                inclusion_name: editInput
            })
            toast.success("Inclusion updated successfully");
            setUpdateModal(false);
            fetchAllInclusions();
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

    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            await api.delete(`/inclusions/${selectedInclusion.id}`);
            toast.success("Inclusion deleted successfully");
            setDeleteModal(false);
            fetchAllInclusions();
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

    return (
        <div className="border border-gray-300 rounded-xl p-5">
            <h1 className="font-bold text-black mb-3">Manage Inclusions</h1>
            <form className="flex gap-3 w-full " onSubmit={handleSubmit} autoComplete="off">
                <input
                    type="text"
                    value={inclusionName}
                    onChange={(e) => setInclusionName(e.target.value)}
                    placeholder="Inclusions"
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
                {fetchInclusionLoading ? "Loading..." : inclusions.map((inclusion, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between hover:bg-gray-100 p-3 rounded-lg border border-gray-300 mb-3"
                    >
                        <p className="text-gray-700">{inclusion.inclusion_name}</p>
                        <div className="flex gap-2">
                            <button onClick={() => openUpdateModal(inclusion)} className="text-blue-500 hover:text-blue-700 transition">
                                <Icon name="Pencil" size={18} color="#1447e6" />
                            </button>
                            <button onClick={() => openDeleteModal(inclusion)} className="text-red-500 hover:text-red-700 transition">

                                <Icon name="Trash" size={18} color="#fb2c36" />
                            </button>
                        </div>
                    </div>
                ))}



            </div>

            <Modal isOpen={updateModal} setIsOpen={setUpdateModal} className="max-w-2xl min-w-xl max-h-[90vh] overflow-y-auto">
                <h1 className="font-bold text-2xl">Edit Inclusion</h1>
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
                <h1 className="font-bold text-2xl">Delete Inclusion</h1>
                <p className="text-gray-700">Are you sure you want to delete this inclusion?</p>
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

export default ManageInclusions;