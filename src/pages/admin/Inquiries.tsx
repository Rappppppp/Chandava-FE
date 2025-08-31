import { useEffect, useState } from "react";
import api, { AxiosError } from "@services/api";
import Table, { Column } from "@components/Table";
import { Modal } from "@components/Modal";

interface Inquiry {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    subject: string,
    message: string,
}


const Inquiries = () => {

    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [inquiryModal, setInquiryModal] = useState(false);

    const openInquiryModal = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setInquiryModal(true);
    }


    const columns: Column<Inquiry>[] = [
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Email", key: "email" },
        { label: "Subject", key: "subject" },
        {
            label: "Message",
            key: "message",
            render: (_, row) => {
                return (
                    <p className="text-sm text-gray-700">{row.message.length > 20 ? `${row.message.substring(0, 20)}...` : row.message}</p>
                );
            }
        },
        {
            label: "Action",
            key: "id",
            render: (_, row) => (
                <button
                    onClick={() => openInquiryModal(row)}
                    className="text-sm underline underline-offset-2 text-blue-500 cursor-pointer">View</button>
            ),
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await api.get("/contact-us");
                setInquiries(res.data)
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

    return (<>
        <Table columns={columns} data={inquiries} tableTitle="All Inquiries" />

        <Modal
            isOpen={inquiryModal}
            setIsOpen={setInquiryModal}
            className="max-w-2xl min-w-lg"
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                <p className="text-xl font-semibold text-gray-800">Inquiry Details</p>
                <button
                    onClick={() => setInquiryModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition"
                >
                    ✕
                </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">First Name</p>
                        <p className="font-medium text-gray-800">{selectedInquiry?.first_name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p className="font-medium text-gray-800">{selectedInquiry?.last_name}</p>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{selectedInquiry?.email}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p className="font-medium text-gray-800">{selectedInquiry?.subject}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Message</p>
                    <div className="mt-1 text-gray-700">
                        {selectedInquiry?.message}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-2 border-t border-gray-200 pt-4">
                <button
                    onClick={() => setInquiryModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
                >
                    Close
                </button>
                {/* <a
                    href={`mailto:${selectedInquiry?.email}?subject=Re: ${encodeURIComponent(
                        selectedInquiry?.subject || ""
                    )}`}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                    Reply via Email
                </a> */}
            </div>
        </Modal>


    </>);
}

export default Inquiries;