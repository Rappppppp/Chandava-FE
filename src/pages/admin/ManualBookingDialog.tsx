'use client'

import { useEffect, useState, Fragment, useMemo } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon, CalendarIcon, UserIcon, PencilSquareIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import useManualBooking, { type BookingPayload } from "@features/admin/accommodations/hooks/useManualBooking";

const inputClasses = "block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 border transition-all duration-200 outline-none";

type Errors = Partial<Record<keyof BookingPayload, string>>;

export default function ManualBookingDialog() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const { rooms, getRooms, submitBooking } = useManualBooking();

  const [form, setForm] = useState<BookingPayload>({
    room_id: 0,
    check_in: "",
    check_out: "",
    tour_type: "",
    admin_note: "",
    email: null,
  });

  // --- CALCULATION LOGIC ---
  const calculation = useMemo(() => {
    if (!form.room_id || !form.check_in || !form.check_out || !form.tour_type) {
      return { days: 0, total: 0 };
    }

    const start = new Date(form.check_in);
    const end = new Date(form.check_out);

    // Calculate difference in days
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return { days: 0, total: 0 };

    const selectedRoom = rooms?.find(r => r.id === form.room_id);
    if (!selectedRoom) return { days: diffDays, total: 0 };

    // Determine price based on tour type
    const unitPrice = form.tour_type === 'Overnight'
      ? Number(selectedRoom.overnight_price)
      : Number(selectedRoom.day_night_tour_price);

    return {
      days: diffDays,
      total: diffDays * unitPrice
    };
  }, [form, rooms]);

  useEffect(() => {
    if (open) getRooms();
  }, [open, submitting]);

  const update = (key: keyof BookingPayload, value: string | number | null) => {
    const val = key === "room_id" ? Number(value) : value;
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.room_id) next.room_id = "Select a room to proceed";
    if (!form.check_in) next.check_in = "Check-in is required";
    if (!form.check_out) next.check_out = "Check-out is required";
    if (!form.tour_type) next.tour_type = "Select a booking type";

    if (form.check_in && form.check_out && new Date(form.check_out) <= new Date(form.check_in)) {
      next.check_out = "Check-out must be after check-in";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      // submit booking first
      await submitBooking(form);

      // Close modal and reset form
      setOpen(false);
      setForm({
        room_id: 0,
        check_in: "",
        check_out: "",
        tour_type: "",
        admin_note: "",
        email: null
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
      >
        <span>+</span> Manual Booking
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog onClose={() => setOpen(false)} className="relative z-50">
          <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200">
              <DialogPanel className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b border-gray-100 px-8 py-6">
                  <div>
                    <DialogTitle className="text-xl font-bold text-gray-900">Manual Booking</DialogTitle>
                    <p className="mt-1 text-sm text-gray-500">Fill in the guest details to lock this accommodation.</p>
                  </div>
                  <button onClick={() => setOpen(false)} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={submit} className="flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

                    <Field label="Guest Email (Optional)" icon={<UserIcon className="h-4 w-4" />}>
                      <input type="email" value={form.email || ""} onChange={e => update("email", e.target.value)} className={inputClasses} placeholder="guest@example.com" />
                    </Field>

                    <Field label="Select Room" error={errors.room_id}>
                      <select value={form.room_id || ""} onChange={e => update("room_id", e.target.value)} className={inputClasses}>
                        <option value="">Choose a room...</option>
                        {rooms?.map(room => (
                          <option key={room.id} value={room.id}>{room.room_name}</option>
                        ))}
                      </select>
                    </Field>

                    <div className="grid grid-cols-2 gap-6">
                      <Field label="Check-in Date" error={errors.check_in} icon={<CalendarIcon className="h-4 w-4" />}>
                        <input type="date" value={form.check_in} onChange={e => update("check_in", e.target.value)} className={inputClasses} />
                      </Field>
                      <Field label="Check-out Date" error={errors.check_out} icon={<CalendarIcon className="h-4 w-4" />}>
                        <input type="date" value={form.check_out} onChange={e => update("check_out", e.target.value)} className={inputClasses} />
                      </Field>
                    </div>

                    <Field label="Stay Type" error={errors.tour_type}>
                      <div className="grid grid-cols-3 gap-2">
                        {['Day Tour', 'Night Tour', 'Overnight'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => update("tour_type", type)}
                            className={`rounded-lg border py-2 text-xs font-medium transition-all ${form.tour_type === type ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                              }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </Field>

                    <Field label="Internal Notes" icon={<PencilSquareIcon className="h-4 w-4" />}>
                      <textarea rows={2} value={form.admin_note} onChange={e => update("admin_note", e.target.value)} className={`${inputClasses} resize-none`} placeholder="Notes..." />
                    </Field>

                    {/* --- TOTAL PRICE SUMMARY SECTION --- */}
                    {calculation.total > 0 && (
                      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BanknotesIcon className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Estimated Total</span>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-700">
                              ₱{calculation.total.toLocaleString()}
                            </p>
                            <p className="text-[10px] uppercase tracking-wider text-blue-500 font-semibold">
                              {calculation.days} {calculation.days === 1 ? 'Day' : 'Days'} • {form.tour_type}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 px-8 py-5">
                    <button type="button" onClick={() => setOpen(false)} className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-4 py-2">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                      {submitting ? "Processing..." : `Confirm Booking`}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function Field({ label, error, icon, children }: { label: string; error?: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="group">
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 group-focus-within:text-blue-600">
        {icon && <span className="text-gray-400 group-focus-within:text-blue-500">{icon}</span>}
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}