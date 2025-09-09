import Table, { Column } from "@components/Table";
import api, { AxiosError } from "@services/api";
import { useEffect, useState, useCallback } from "react";
import type { ChangeSchedule } from "@/types/changeSchedule";
import { Modal } from "@components/Modal";
import toast from "react-hot-toast";

const ChangeSchedule = () => {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState<ChangeSchedule[]>([]);

    const fetchBooking = useCallback(async () => {
        try {
            setLoading(true)
            const res = await api.get(`/change-schedule`);
            setRequests(res.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message)
            }

        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])

    const columns: Column<ChangeSchedule>[] = [
        { label: "Requester Name", key: "user_full_name" },
        { label: "Booking ID", key: "booking_id" },
        { label: "Check-In", key: "check_in" },
        { label: "Check-Out", key: "check_out" },
        { label: "Status", key: "status" },
        {
            label: "Action", key: "id", render: (_, row) => (
                row.status === "pending" ? (
                    <button onClick={() => handleOpenModal(row.id as number)} className="text-sm underline underline-offset-2 text-blue-500 cursor-pointer">View</button>
                ): (
                    <p className="text-sm  text-gray-600">No action required</p>
                )
            ),
        },
    ];


    const [openModal, setOpenModal] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState<number | string | null>(null);
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    const handleOpenModal = (id: number | string) => {
        setSelectedRequestId(id);
        setOpenModal(true);
    }

    const handleChangeStatus = async (status: string) => {
        try {
            if (status === "approved") {
                setApproveLoading(true);
            } else {
                setRejectLoading(true);
            }
            await api.post(`/change-schedule/change-status`, {
                request_id: selectedRequestId,
                status
            })
            fetchBooking();
            toast.success("Status changed successfully");
            setOpenModal(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message)
            }
        } finally {
            setApproveLoading(false);
            setRejectLoading(false);
        }
    }

    if (loading) return "Loading..."

    return (<>
        <Table columns={columns} data={requests} tableTitle="All Requests" />


        <Modal isOpen={openModal} setIsOpen={setOpenModal} className="max-w-2xl min-w-lg">
            <p className="text-xl font-semibold">Change Status</p>
            <div className="flex flex-col gap-2 ">
                <button
                    disabled={approveLoading || rejectLoading}
                    onClick={() => handleChangeStatus("approved")} className="px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark">
                    {approveLoading ? "Loading..." : "Approve"}
                </button>

                <button
                    disabled={approveLoading || rejectLoading}
                    onClick={() => handleChangeStatus("rejected")} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-primary-dark">
                    {rejectLoading ? "Loading..." : "Reject"}
                </button>

            </div>
        </Modal>

    </>);
}

export default ChangeSchedule;