import { useEffect, useState, useCallback } from "react";
import api, { AxiosError } from "@services/api";
import Table, { Column } from "@components/Table";
import { Modal } from "@components/Modal";
import type { Accomodation } from "@/types/accomodationType";
import Icon from "@components/Icon";
import { useAccommodationData } from "@features/admin/accommodations/hooks/useAccommodationData";
import AddAccommodation from "@features/admin/accommodations/components/AddAccommodation";


const Rooms = () => {

    const {
        roomTypes,
        inclusions
    } = useAccommodationData();


    const [rooms, setRooms] = useState<Accomodation[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [editModal, setEditModal] = useState(false);


    const [idToEdit, setIdToEdit] = useState<number | null>(null);
    const [editDefaultValues, setEditDefaultValues] = useState<any>(null);

    const openEditModal = (row: Accomodation) => {
        setIdToEdit(row.id);
        console.log(row)
        const defaultValues = {
            room_name: row.room_name,
            accommodation_type_id: row.accommodation_type.id,
            description: row.description,
            day_night_tour_price: row.day_night_tour_price,
            overnight_price: row.overnight_price,
            notes: row.notes,
            inclusion_ids: row.room_inclusions.map((inclusion) => String(inclusion.id)),

        }
        setEditDefaultValues(defaultValues);
        setEditModal(true);
    }


    const openDeleteModal = (id: number) => {
        setIdToDelete(id);
        setDeleteModal(true);
    }

    const deleteAccomodation = async () => {
        try {
            setDeleteLoading(true);
            await api.patch(`/delete-room/${idToDelete}`);
            fetchData();
            setDeleteModal(false);
        } catch (error) {
            console.log(error);
        } finally {
            setDeleteLoading(false);
        }
    }




    const columns: Column<Accomodation>[] = [
        { label: "Room Name", key: "room_name" },
        {
            label: "Occupied",
            key: "is_already_check_in",
            render: (_, row) => {
                return row.is_already_check_in ? "Yes" : "No"
            }
        },
        {
            label: "Action",
            key: "id",
            render: (_, row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => openEditModal(row)}
                        className="cursor-pointer"><Icon name="Pencil" className="text-blue-500 w-5 h-5" /></button>
                    <button
                        onClick={() => openDeleteModal(row.id)}
                        className="cursor-pointer"><Icon name="Trash" className="text-red-500 w-5 h-5" /></button>

                </div>
            ),
        },
    ]

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const res = await api.get("/rooms?is_deleted[eq]=0");
            console.log(res.data.data)
            setRooms(res.data.data)
            // setInquiries(res.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message)
            }

        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    if (loading) return "Loading..."

    return (<>
        <Table columns={columns} data={rooms} tableTitle="All Accommodations" />

        <Modal
            isOpen={deleteModal}
            setIsOpen={setDeleteModal}
            className="max-w-2xl min-w-lg"
        >

            <h2 className="text-lg font-semibold text-gray-800">
                Are you sure you want to delete this?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
                This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
                {/* Cancel Button */}
                <button
                    onClick={() => setDeleteModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                    disabled={deleteLoading}
                >
                    Cancel
                </button>

                {/* Delete Button */}
                <button
                    onClick={deleteAccomodation}
                    disabled={deleteLoading}
                    className={`px-4 py-2 rounded-lg text-white ${deleteLoading
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                        }`}
                >
                    {deleteLoading ? "Deleting..." : "Delete"}
                </button>
            </div>

        </Modal>

        <Modal
            isOpen={editModal}
            setIsOpen={setEditModal}
            className="max-w-2xl min-w-lg"
        >

            <AddAccommodation
                inclusions={inclusions}
                roomTypes={roomTypes}
                idToEdit={idToEdit}
                defaultValues={editDefaultValues}
                action="edit"
                refetch={fetchData}
                onClose={() => setEditModal(false)}
            />

        </Modal>



    </>);
}

export default Rooms;