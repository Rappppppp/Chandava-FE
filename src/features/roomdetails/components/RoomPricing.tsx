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
import DefaultLoader from "@components/loaders/DefaultLoader";
const RoomPricing = ({ isAuthPage = false, accommodation }: { isAuthPage: boolean, accommodation: Accomodation }) => {
  if (!accommodation) return <div><DefaultLoader /></div>;
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { values, handleChange, isValid, getPayload, reset, handleArrayChange } = useInput({
    // no_guests: { value: "", required: true },
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
    if (noOfDays && priceMultiplier) {
      return (noOfDays * priceMultiplier); //;
    }
  }, [noOfDays, priceMultiplier]);

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
    <div className="w-full max-w-4xl">
      <div className="mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{accommodation.room_name}</h1>
          <p className="text-lg text-gray-600">{accommodation.accommodation_type?.accommodation_type_name ?? ""}</p>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed mb-8 text-base">{accommodation.description}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Day or Night Tour</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ₱{Number(accommodation.day_night_tour_price)}
            </span>
            <span className="text-sm text-gray-500">per tour</span>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Overnight (22 Hours)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ₱{Number(accommodation.overnight_price)}
            </span>
            <span className="text-sm text-gray-500">per night</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-semibold">Maximum Guests:</span>
          <span>
            {accommodation.accommodation_type.max_guests}{" "}
            {accommodation.accommodation_type.max_guests === 1 ? "guest" : "guests"}
          </span>
        </div>
        {accommodation.notes && (
          <p className="text-sm text-gray-600 italic border-l-4 border-gray-300 pl-4">{accommodation.notes}</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
        <ul className="space-y-3">
          {accommodation.room_inclusions.map((inclusion, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700">
              <span className="text-primary font-bold mt-1">✓</span>
              <span>{inclusion.inclusion_name}</span>
            </li>
          ))}
        </ul>
      </div>

      {isAuthPage && (
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="w-full py-4 px-6 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
        >
          Book Now
        </button>
      )}

      <Modal isOpen={openModal} setIsOpen={setOpenModal} className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h1 className="font-bold text-3xl text-gray-900 mb-3">Make a New Booking</h1>
            <p className="text-gray-600 leading-relaxed mb-5">
              Before proceeding, please review the following important information:
            </p>

            <div className="space-y-3 bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="flex gap-3">
                <span className="text-primary font-bold text-lg flex-shrink-0">•</span>
                <div>
                  <p className="font-semibold text-gray-900">No Refund Policy</p>
                  <p className="text-gray-600 text-sm">All bookings are final and non-refundable.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold text-lg flex-shrink-0">•</span>
                <div>
                  <p className="font-semibold text-gray-900">50% Minimum Payment</p>
                  <p className="text-gray-600 text-sm">
                    You are required to pay at least 50% of the total price to confirm your booking.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold text-lg flex-shrink-0">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Payment Method</p>
                  <p className="text-gray-600 text-sm">
                    Please use <span className="font-semibold text-gray-900">GCASH</span> for payment. This will allow
                    us to validate your receipt quickly and securely.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm">By proceeding, you acknowledge and agree to the terms above.</p>

          <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
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
              options={[
                { value: "day", label: "Day" },
                { value: "night", label: "Night" },
              ]}
              value={values.tour_type.value}
              onChange={handleChange}
            />

            <div className="border-t border-gray-200 pt-6">
              {totalPrice !== undefined && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                    <p className="text-gray-700 mb-2">Total Price</p>
                    <p className="text-4xl font-bold text-blue-600">₱{totalPrice.toLocaleString()}</p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                    <p className="text-gray-700 mb-2">Minimum 50% Payment Required</p>
                    <p className="text-3xl font-bold text-green-600">₱{(totalPrice * 0.5).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            {totalPrice !== undefined && (
              <>
                <div className="space-y-4">
                  <p className="text-gray-600 font-medium">
                    Scan the QR code below to send your payment via GCash, then upload the receipt.
                  </p>
                  <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6 border border-gray-300">
                    <img
                      src={PaymentMethod || "/placeholder.svg"}
                      alt="payment method qr code"
                      className="w-full max-w-xs rounded-lg"
                    />
                  </div>
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
                  type="submit"
                  className="w-full py-4 px-6 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? "Processing..." : "Confirm Booking"}
                </button>
              </>
            )}
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default RoomPricing;