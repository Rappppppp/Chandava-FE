import { useMemo, useState, useEffect } from "react";

import type { Inclusion, RoomType } from "@features/admin/accommodations/types/types";
import { Input, MultiSelect, Select, FileInput, Button } from "@components/elements";
import { useInput } from "@hooks/useInput";
import toast from "react-hot-toast";
import { RoomService } from "@features/admin/accommodations/services/RoomService";
import { AxiosError } from "axios"


interface AddAccommodationProps {
    inclusions: Inclusion[];
    roomTypes: RoomType[];
    defaultValues?: any;
    action?: "add" | "edit";
    idToEdit?: number;
    refetch?: () => void;
    onClose?: () => void;

}



const AddAccommodation = ({ inclusions, roomTypes, defaultValues, action = "add", idToEdit, onClose, refetch }: AddAccommodationProps) => {
    const [loading, setLoading] = useState(false);
    const inclusionOptions = useMemo(() => inclusions.map((inclusion) => ({ value: inclusion.id, label: inclusion.inclusion_name })), [inclusions]);
    const roomTypeOptions = useMemo(() => roomTypes.map((roomType) => ({ value: roomType.id, label: roomType.accommodation_type_name })), [roomTypes]);



    const { values, handleChange, errors, isValid, handleArrayChange, getPayload, reset, setDefaultValues } = useInput({
        room_name: { value: "", required: true },
        accommodation_type_id: { value: "", required: true, numbers: true },
        description: { value: "", required: true },
        day_night_tour_price: { value: "", required: true, numbers: true },
        overnight_price: { value: "", required: true, numbers: true },
        inclusion_ids: { value: [] as number[], required: true },
        notes: { value: "", required: false },
        images: { value: [] as string[], required: true },

    });

    // console.log(values)

    useEffect(() => {
        if (defaultValues) {
            setDefaultValues(defaultValues)
        }
    }, [defaultValues])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!isValid()) return;

        if (action === "add") {
            try {
                setLoading(true);
                await RoomService.storeRoom(getPayload(values));
                toast.success("Accommodation added successfully");
                reset();
            } catch (error) {

                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message)
                    return;
                }
                toast.error("Something went wrong. Please try again.")
            } finally {
                setLoading(false);
            }
        } else if (action === "edit") {
            const payload = getPayload(values);

            const cleanPayload = {
                ...payload,
                ...(Array.isArray(payload.images) && payload.images.length === 0
                    ? { images: undefined } // or simply omit entirely if your backend ignores undefined
                    : { images: payload.images }),
            };




            try {
                setLoading(true);
                await RoomService.updateRoom(idToEdit, cleanPayload);
                toast.success("Accommodation update successfully");
                refetch?.();
                onClose?.();
                reset();
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

    }




    return (
        <form onSubmit={handleSubmit} className={`border border-gray-300 rounded-xl w-full ${action === "add" ? "xl:w-1/2" : ""} p-5 flex flex-col gap-y-3`}>

            <h1 className="font-bold text-black ">{action === "add" ? "Add" : "Edit"} accommodation</h1>

            {/* <div>
                <p className="mb-2">Upload accommodation image (5 images max)</p>
                <div className="flex flex-wrap gap-2">
                    <div className="border aspect-square w-[4.6875rem] border-gray-300 rounded-xl flex items-center justify-center">
                        <Icon name="ImageUp" size={30} color="gray" />
                    </div>

                </div>
            </div> */}

            <FileInput
                label="Upload accommodation image (5 images max)"
                name="images"
                maxFiles={5}
                onChange={handleArrayChange}
            />

            <Input
                label="Room Name"
                placeholder="Room name"
                name="room_name"
                value={values.room_name.value}
                onChange={handleChange}
                error={errors.room_name}
                required={values.room_name.required}
            />

            <Input
                name="description"
                label="Room Description"
                placeholder="Room description"
                value={values.description.value}
                onChange={handleChange}
                error={errors.description}
                required={values.description.required}
            />


            <Select
                label="Accommodation Type"
                name="accommodation_type_id"
                options={roomTypeOptions}
                value={values.accommodation_type_id.value}
                onChange={handleChange}
            />


            <MultiSelect
                label="Select from pre-defined inclusions"
                name="inclusion_ids"
                options={inclusionOptions}
                values={values.inclusion_ids.value}
                onChange={handleArrayChange}
            />



            <Input
                name="day_night_tour_price"
                label="Day/Night tour price"
                placeholder="Enter Day/Night tour price"
                value={values.day_night_tour_price.value}
                onChange={handleChange}
                error={errors.day_night_tour_price}
                required={values.day_night_tour_price.required}
            />


            <Input
                name="overnight_price"
                label="Overnight Tour Price"
                placeholder="Overnight Tour Price"
                value={values.overnight_price.value}
                onChange={handleChange}
                error={errors.overnight_price}
                required={values.overnight_price.required}
            />

            <Input
                name="notes"
                label="Additional Notes"
                placeholder="Additional notes (optional)"
                value={values.notes.value}
                onChange={handleChange}
                error={errors.notes}
                required={values.notes.required}
            />

            <Button type="submit" loading={loading} label="Submit" />
        </form>
    );
}

export default AddAccommodation;