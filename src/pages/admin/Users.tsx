import { useEffect, useState } from "react";
import api, { AxiosError } from "@services/api";
import Table, { Column } from "@components/Table";

interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    contact_number: string,
    address: string,
}
const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const columns: Column<User>[] = [
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Email", key: "email" },
        { label: "Contact Number", key: "contact_number" },
        { label: "Address", key: "address" },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await api.get("/users?role[in]=user");
                setUsers(res.data.data)
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data.message)
                }

            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return "Loading..."

    return ( <>
              <Table columns={columns} data={users} tableTitle="All Users" />
    </> );
}
 
export default Users;