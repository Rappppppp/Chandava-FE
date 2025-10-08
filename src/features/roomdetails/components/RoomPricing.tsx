import Paragraph from "@components/Paragraph";
import { Accomodation } from "@/types/accomodationType";
import { useState, useMemo } from "react";
import { Modal } from "@components/Modal";
import { Input, FileInput, Select } from "@components/elements";
import { useInput } from "@hooks/useInput";
import api, { AxiosError } from "@services/api";
import toast from "react-hot-toast";
import { useAuth } from "@contexts/AuthContext";
import PaymentMethod from "@assets/images/payment_method.png"
const RoomPricing = ({ isAuthPage = false, accommodation }: { isAuthPage: boolean, accommodation: Accomodation }) => {
    if (!accommodation) return <div>Loading...</div>;
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();



    const { values, handleChange, isValid, getPayload, reset, handleArrayChange } = useInput({
        no_guests: { value: "", required: true },
        check_in: { value: "", required: true },
        check_out: { value: "", required: true },
        tour_type: { value: "", required: true },
        receipt: { value: [] as string[], required: true },
    });

    const noOfDays = useMemo(() => {
        const checkInDate = new Date(values.check_in.value);
        const checkOutDate = new Date(values.check_out.value);
        const diffInDays = Math.round(Math.abs((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)));
        return diffInDays;
    }, [values.check_in.value, values.check_out.value]);


    const priceMultiplier = useMemo(() => {
        if (values.tour_type.value === "day") {
            return Number(accommodation.day_night_tour_price)
        } else if (values.tour_type.value === "night") {
            return Number(accommodation.overnight_price)
        } else {
            return undefined;
        }
    }, [values.tour_type.value]);

    const totalPrice = useMemo(() => {
        if (noOfDays && priceMultiplier && values.no_guests.value) {
            return (noOfDays * priceMultiplier) * Number(values.no_guests.value);
        }
    }, [noOfDays, priceMultiplier, values.no_guests.value]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid()) return;
        setLoading(true);
        const payload = getPayload(values);
        try {
            await api.post("/bookings", {
                ...payload,
                receipt: values.receipt.value[0],
                total_price: totalPrice,
                room_id: accommodation.id,
                user_id: user?.id,
            });

            toast.success("Booking successful");
            reset();
            setOpenModal(false)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)
                return;
            }
            toast.error("Something went wrong. Please try again.")

        } finally {
            setLoading(false);

        }
    }
//push to main

    return (
        <div className="w-full md:1/2">
            <div className="flex justify-between mb-3">
                <div className="tracking-tight">
                    <h1 className="text-xl md:text-2xl font-bold text-primary">{accommodation.room_name}</h1>
                    <Paragraph>{accommodation.accommodation_type?.accommodation_type_name ?? ""}</Paragraph>
                </div>
            </div>

            <Paragraph className="mb-5">{accommodation.description}</Paragraph>

            <div className="flex gap-4 mb-3">
                <h1 className="text-xl md:text-2xl font-bold text-primary">
                    P {accommodation.day_night_tour_price}<span className="text-sm text-gray-500">\Day or night tour</span>
                </h1>

                <h1 className="text-xl md:text-2xl font-bold text-primary">
                    P {accommodation.overnight_price}<span className="text-sm text-gray-500">\Overnight (22 hours)</span>
                </h1>
            </div>

            {
                accommodation.notes && <p className="italic mb-5">Note: {accommodation.notes}</p>
            }




            <h1 className="text-xl md:text-2xl font-bold text-primary">Inclusions</h1>
            <ol className="list-disc list-inside text-sm md:text-base">
                {
                    accommodation.room_inclusions.map((inclusion, index) => (
                        <li key={index}>{inclusion.inclusion_name}</li>
                    ))
                }

            </ol>

            {isAuthPage && <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="mt-5 w-full cursor-pointer py-3 rounded-lg bg-primary text-white font-bold">Book Now</button>}

            <Modal isOpen={openModal} setIsOpen={setOpenModal} className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <h1 className="font-bold text-2xl">Make a New Booking</h1>
                <p className="text-gray-700 mt-2">
                    Before proceeding, please review the following important information:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>
                        <strong>No Refund Policy:</strong> All bookings are final and non-refundable.
                    </li>
                    <li>
                        <strong>50% Minimum Payment:</strong> You are required to pay at least 50% of the total price to confirm your booking.
                    </li>
                    <li>
                        <strong>Payment Method:</strong> Please use <span className="font-semibold">GCASH</span> for payment. This will allow us to validate your receipt quickly and securely.
                    </li>
                </ul>
                <p className="text-gray-700 mt-4">
                    By proceeding, you acknowledge and agree to the terms above.
                </p>

                <div className="h-px w-full bg-gray-300"></div>

                <form autoComplete="off" onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
                    <Input
                        label="Number of Guests"
                        placeholder="Number of Guests"
                        name="no_guests"
                        value={values.no_guests.value}
                        onChange={handleChange}
                        type="number"
                        required
                    />

                    <div className="grid md:grid-cols-2 grid-col-1 gap-5">
                        <Input
                            label="Check-in Date"
                            placeholder="Check-in Date"
                            name="check_in"
                            value={values.check_in.value}
                            onChange={handleChange}
                            type="date"
                            required
                        />

                        <Input
                            label="Check-out Date"
                            placeholder="Check-out Date"
                            name="check_out"
                            value={values.check_out.value}
                            onChange={handleChange}
                            type="date"
                            required
                        />
                    </div>

                    <Select
                        label="Tour Type"
                        name="tour_type"
                        options={[{ value: "day", label: "Day" }, { value: "night", label: "Night" }]}
                        value={values.tour_type.value}
                        onChange={handleChange}
                    />

                    <div className="h-px w-full bg-gray-300 my-2"></div>

                    {totalPrice !== undefined && (
                        <>
                            <div className="space-y-2">
                                <p className="font-bold text-lg">
                                    Total Price:{" "}
                                    <span className="text-blue-600">
                                        ₱{totalPrice.toLocaleString()}
                                    </span>
                                </p>
                                <p className="text-gray-700">
                                    Minimum 50% Payment:{" "}
                                    <span className="font-semibold text-green-600">
                                        ₱{(totalPrice * 0.5).toLocaleString()}
                                    </span>
                                </p>
                            </div>

                            <div className="h-px w-full bg-gray-300 my-2"></div>

                            <p className="text-gray-700">Send your payment by scanning the QR code below, and uploading the receipt.</p>
                            <div className="flex items-center justify-center">
                                <img src={PaymentMethod} alt="payment method" className="w-full max-w-[20rem] rounded-lg" />
                            </div>

                            <FileInput
                                label="Transaction Receipt (GCASH)"
                                name="receipt"
                                onChange={handleArrayChange}
                                minimumAmount={Number((totalPrice * 0.5).toFixed(2))}
                                maxFiles={1}
                                isForGcash={true}

                            />

                            <button
                                disabled={loading}
                                type="submit" className="mt-5 w-full cursor-pointer py-3 rounded-lg bg-primary text-white font-bold">
                                {loading ? "Loading..." : "Book Now"}
                            </button>
                        </>
                    )}






                </form>
            </Modal>



        </div>
    );
}

export default RoomPricing;