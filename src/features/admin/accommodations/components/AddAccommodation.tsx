import { useState } from "react";
import Icon from "@components/Icon";
import type { Inclusion, RoomType } from "@features/admin/accommodations/types/types";
import { Input } from "@components/elements";
import { useInput } from "@hooks/useInput";

interface AddAccommodationProps {
    inclusions: Inclusion[];
    roomTypes: RoomType[];
}



const AddAccommodation = ({ inclusions, roomTypes }: AddAccommodationProps) => {

    console.log("roomTypes", roomTypes);
    console.log("inclusions", inclusions);

    const { values, handleChange, errors, isValid } = useInput({
        room_name: { value: "", required: true },
        accommodation_type_id: { value: "", required: true, numbers: true },
        description: { value: "", required: true },
        day_night_tour_price: { value: "", required: true, numbers: true },
        overnight_price: { value: "", required: true, numbers: true },
        notes: { value: "", required: false },
    });

    console.log(values)

    const [showPredefinedInclusions, setShowPredefinedInclusions] = useState(false);


    return (
        <div className="border border-gray-300 rounded-xl w-full xl:w-1/2 p-5 flex flex-col gap-y-3">
            <h1 className="font-bold text-black ">Add accommodation</h1>

            <div className="">
                <p className="mb-2">Upload accommodation image (5 images max)</p>
                <div className="flex flex-wrap gap-2">
                    <div className="border aspect-square w-[4.6875rem] border-gray-300 rounded-xl flex items-center justify-center">
                        <Icon name="ImageUp" size={30} color="gray" />
                    </div>

                </div>
            </div>

            <Input
                label="Room Name"
                placeholder="Room name"
                value={values.room_name.value}
                onChange={handleChange}
                error={errors.room_name}
                required={values.room_name.required}
            />

            <Input
                label="Room Description"
                placeholder="Room description"
                value={values.description.value}
                onChange={handleChange}
                error={errors.description}
                required={values.description.required}
            />




            <div className="">
                <label htmlFor="">Room Type</label>
                <select
                    name=""
                    id=""
                    className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 focus:border-primary focus:ring-0 px-3 py-2">
                    <option value="">Select</option>
                    <option value="1">Concrete Cottage</option>
                    <option value="2">Nipa Huts</option>
                    <option value="3">Floating Cottage</option>
                </select>

            </div>


            <div className="">
                <h2 className="font-semibold text-gray-700 mb-2">Select from pre-defined inclusions</h2>
                <div className="grid grid-cols-2 gap-2">
                    {
                        inclusions.map((inclusion, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input type="checkbox" className="form-checkbox text-primary h-5 w-5" />
                                <span className="text-gray-700">{inclusion.inclusion_name}</span>
                            </label>
                        ))
                    }
                   

                </div>
            </div>


            <Input
                label="Day/Night tour price"
                placeholder="Day/Night tour price"
                value={values.day_night_tour_price.value}
                onChange={handleChange}
                error={errors.day_night_tour_price}
                required={values.day_night_tour_price.required}
            />


            <Input
                label="Overnight Tour Price"
                placeholder="Overnight Tour Price"
                value={values.overnight_price.value}
                onChange={handleChange}
                error={errors.overnight_price}
                required={values.overnight_price.required}
            />

            <Input
                label="Additional Notes"
                placeholder="Additional notes (optional)"
                value={values.notes.value}
                onChange={handleChange}
                error={errors.notes}
                required={values.notes.required}
            />



        </div>
    );
}

export default AddAccommodation;