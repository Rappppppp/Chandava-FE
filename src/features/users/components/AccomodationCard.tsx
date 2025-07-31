
import type { RoomInclusions } from "@/types/accomodationType";
import { Link } from "react-router-dom";

interface AccomodationCardProps {
    roomId: number;
    roomName: string;
    accommodationTypeName: string;
    dayNightTourPrice: string;
    roomInclusions: RoomInclusions[]
    roomImage: string;
}

const AccomodationCard = ({ roomId, roomName, accommodationTypeName, dayNightTourPrice, roomInclusions, roomImage }: AccomodationCardProps) => {
    return (
        <Link to={`/users/room/${roomId}`}>
            <div className=" shadow-md rounded-4xl overflow-hidden">
                <div className="bg-black relative rounded-4xl">
                    <img src={`${import.meta.env.VITE_BE_BASE_URL}/storage/uploads/images/${roomImage}`} alt="Room name" className="w-full aspect-video  object-cover rounded-4xl opacity-65" />
                </div>
                <div className="p-[1rem]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-primary">{roomName}</h1>
                            <p className="text-sm md:text-base text-gray-500">{accommodationTypeName}</p>
                        </div>

                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-secondary">P {dayNightTourPrice}</h1>

                        </div>

                    </div>
                    <p className="text-gray-500 text-sm md:text-base mt-3">
                        {
                            roomInclusions?.map((inclusion, index) => (
                                <span key={index}>• {inclusion.inclusion_name}</span>
                            ))
                        }
                    </p>
                </div>
            </div>
        </Link>



    );
}

export default AccomodationCard;