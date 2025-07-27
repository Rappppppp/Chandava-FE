import { useState } from "react";
import Icon from "@components/Icon"
import type { Inclusion } from "@features/admin/accommodations/types/types";
import toast from "react-hot-toast";
import { InclusionService } from "@features/admin/accommodations/services/InclusionService";
import { AxiosError } from "axios";

interface ManageInclusionsProps {
    inclusions: Inclusion[];
    fetchAllInclusions: () => void;
    fetchInclusionLoading: boolean;
}

const ManageInclusions = ({ inclusions, fetchAllInclusions, fetchInclusionLoading }: ManageInclusionsProps) => {
    const [inclusionName, setInclusionName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await InclusionService.store({ inclusion_name: inclusionName });
            setInclusionName("");
            fetchAllInclusions();
            toast.success("Inclusion added successfully");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
                return;
            }
            console.error("Error adding inclusion:", error);
            toast.error("Error adding inclusion");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="border border-gray-300 rounded-xl p-5">
            <h1 className="font-bold text-black mb-3">Manage Inclusions</h1>
            <form className="flex gap-3 w-full " onSubmit={handleSubmit} autoComplete="off">
                <input
                    type="text"
                    value={inclusionName}
                    onChange={(e) => setInclusionName(e.target.value)}
                    placeholder="Inclusions"
                    className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 
             focus:border-primary focus:ring-0 px-3"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-all duration-300 text-white">
                    {loading ? "Loading..." : "Add"}
                </button>
            </form>

            <div className="mt-3 max-h-[40vh] overflow-y-auto">
                {fetchInclusionLoading ? "Loading..." : inclusions.map((inclusion, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between hover:bg-gray-100 p-3 rounded-lg border border-gray-300 mb-3"
                    >
                        <p className="text-gray-700">{inclusion.inclusion_name}</p>
                        <div className="flex gap-2">
                            <button className="text-blue-500 hover:text-blue-700 transition">
                                <Icon name="Pencil" size={18} color="#1447e6" />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                <Icon name="Trash" size={18} color="#fb2c36" />
                            </button>
                        </div>
                    </div>
                ))}



            </div>

        </div>
    );
}

export default ManageInclusions;