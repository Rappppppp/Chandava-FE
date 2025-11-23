import Table, { Column } from "@components/Table";
import api, { AxiosError } from "@services/api";
import { useEffect, useState, useCallback } from "react";
import type { ChangeSchedule } from "@/types/changeSchedule";
import { useAuth } from "@contexts/AuthContext";
import DefaultLoader from "@components/loaders/DefaultLoader";


const UserRequestsPage = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState<ChangeSchedule[]>([]);

    const fetchBooking = useCallback(async () => {
        try {
            setLoading(true)
            const res = await api.get(`/change-schedule/get/${user?.id}`);
            setRequests(res.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data.message)
            }

        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])

    const columns: Column<ChangeSchedule>[] = [

        { label: "Booking ID", key: "booking_id" },
        { label: "Check-In", key: "check_in" },
        { label: "Check-Out", key: "check_out" },
        { label: "Status", key: "status" },
    ];

    if (loading) return <DefaultLoader />

    return (<>
        <Table columns={columns} data={requests} tableTitle="All Requests" />

    </>);
}

export default UserRequestsPage;