import { useState } from "react";
import Icon from "@components/Icon";

const AddAccommodation = () => {
    const [showPredefinedInclusions, setShowPredefinedInclusions] = useState(false);
    return (
        <div className="border border-gray-300 rounded-xl w-full xl:w-1/2 p-5">
            <h1 className="font-bold text-black mb-3">Add accommodation</h1>

            <div className="mb-3">
                <p className="mb-2">Upload accommodation image (5 images max)</p>
                <div className="flex flex-wrap gap-2">
                    <div className="border aspect-square w-[4.6875rem] border-gray-300 rounded-xl flex items-center justify-center">
                        <Icon name="ImageUp" size={30} color="gray" />
                    </div>
                    {/* <div className="border aspect-square w-[4.6875rem] border-gray-300 rounded-xl flex items-center justify-center">
                        <Icon name="ImageUp" size={30} color="gray" />
                    </div>
                    <div className="border aspect-square w-[4.6875rem] border-gray-300 rounded-xl flex items-center justify-center">
                        <Icon name="ImageUp" size={30} color="gray" />
                    </div>
                    <div className="border aspect-square w-[4.6875rem] border-gray-300 rounded-xl flex items-center justify-center">
                        <Icon name="ImageUp" size={30} color="gray" />
                    </div>
                    <div className="border aspect-square w-[4.6875rem] border-gray-300 rounded-xl flex items-center justify-center">
                        <Icon name="ImageUp" size={30} color="gray" />
                    </div> */}
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="">Room Name</label>
                <input
                    type="text"
                    placeholder="Room name"
                    className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 focus:border-primary focus:ring-0 px-3 py-2" />
            </div>

            <div className="mb-3">
                <label htmlFor="">Room Description</label>
                <input
                    type="text"
                    placeholder="Room description"
                    className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 focus:border-primary focus:ring-0 px-3 py-2" />
            </div>




            <div className="mb-3">
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

            <div className="mb-3">
                <label htmlFor="">Room Inclusions (separate with commas)</label>
                <input
                    type="text"
                    placeholder="Room inclusions"
                    onFocus={() => setShowPredefinedInclusions(true)}
                    className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 focus:border-primary focus:ring-0 px-3 py-2" />
            </div>

            {
                showPredefinedInclusions && <div className="mb-3">
                    <h2 className="font-semibold text-gray-700 mb-2">Select from pre-defined inclusions</h2>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox text-primary h-5 w-5" />
                            <span className="text-gray-700">Free Breakfast</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox text-primary h-5 w-5" />
                            <span className="text-gray-700">WiFi Access</span>
                        </label>

                    </div>
                </div>
            }

            <div className="mb-3">
                <label htmlFor="">Day/Night tour price</label>
                <input
                    type="text"
                    placeholder="Day/Night tour price"
                    className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 focus:border-primary focus:ring-0 px-3 py-2" />
            </div>


            <div className="mb-3">
                <label htmlFor="">Overnight Tour Price</label>
                <input
                    type="text"
                    placeholder="Overnight Tour Price"
                    className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 focus:border-primary focus:ring-0 px-3 py-2" />
            </div>

            <div className="mb-3">
                <label htmlFor="">Additional Notes</label>
                <input
                    type="text"
                    placeholder="Additional notes (optional)"
                    className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 focus:border-primary focus:ring-0 px-3 py-2" />
            </div>



        </div>
    );
}

export default AddAccommodation;