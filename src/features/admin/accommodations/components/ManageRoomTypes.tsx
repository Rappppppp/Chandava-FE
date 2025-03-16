import Icon from "@components/Icon"

const ManageRoomTypes = () => {
    return (
        <div className="border border-gray-300 rounded-xl p-5">
            <h1 className="font-bold text-black mb-3">Manage Room Types</h1>
            <div className="flex gap-3 w-full ">
                <input
                    type="text"
                    placeholder="Room type"
                    className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 
             focus:border-primary focus:ring-0 px-3"
                />

                <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-all duration-300 text-white">Add</button>
            </div>
            <div className="mt-3">
                <div
                    className="flex items-center justify-between hover:bg-gray-100 p-3 rounded-lg border border-gray-300 mb-3"
                >
                    <p className="text-gray-700">Concrete Cottage</p>
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

                <div
                    className="flex items-center justify-between hover:bg-gray-100 p-3 rounded-lg border border-gray-300 mb-3"
                >
                    <p className="text-gray-700">Nipa Huts</p>
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

                <div
                    className="flex items-center justify-between hover:bg-gray-100 p-3 rounded-lg border border-gray-300 mb-3"
                >
                    <p className="text-gray-700">Floating Cottage</p>
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
            </div>
        </div>


    );
}

export default ManageRoomTypes;