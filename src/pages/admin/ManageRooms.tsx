import ManageRoomTypes from "@features/admin/accommodations/components/ManageRoomTypes";
import ManageInclusions from "@features/admin/accommodations/components/ManageInclusions";
import AddAccommodation from "@features/admin/accommodations/components/AddAccommodation";


const ManageRooms = () => {
    return (<div className="flex gap-5 flex-col xl:flex-row">
        <div className="flex flex-col gap-5 w-full xl:w-1/2">
            <ManageRoomTypes />
            <ManageInclusions />
        </div>s

        <AddAccommodation />



    </div>);
}

export default ManageRooms;