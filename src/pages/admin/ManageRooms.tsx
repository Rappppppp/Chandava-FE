import ManageRoomTypes from "@features/admin/accommodations/components/ManageRoomTypes";
import ManageInclusions from "@features/admin/accommodations/components/ManageInclusions";
import AddAccommodation from "@features/admin/accommodations/components/AddAccommodation";
import { useAccommodationData } from "@features/admin/accommodations/hooks/useAccommodationData";


const ManageRooms = () => {
    const {
        roomTypes,
        inclusions,
        fetchRoomLoading,
        fetchAllRoomTypes,
        fetchAllInclusions,
        fetchInclusionLoading,
    } = useAccommodationData();

    console.log("roomTypes", roomTypes);
    console.log("inclusions", inclusions);


    return (<div className="flex gap-5 flex-col xl:flex-row">
        <div className="flex flex-col gap-5 w-full xl:w-1/2">
            <ManageRoomTypes
                roomTypes={roomTypes}
                fetchRoomLoading={fetchRoomLoading}
                fetchAllRoomTypes={fetchAllRoomTypes}
            />
            <ManageInclusions
                inclusions={inclusions}
                fetchAllInclusions={fetchAllInclusions}
                fetchInclusionLoading={fetchInclusionLoading} />
        </div>

        <AddAccommodation
            inclusions={inclusions}
            roomTypes={roomTypes}
        />



    </div>);
}

export default ManageRooms;