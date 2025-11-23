import DefaultLoader from "@components/loaders/DefaultLoader";
import { Accomodation } from "@/types/accomodationType";



const RoomImages = ({ accommodation }: { accommodation: Accomodation }) => {
    if (!accommodation) return <DefaultLoader />;

    return (


        <div className="w-full md:1/2">
            <div className="w-full aspect-video bg-primary rounded-xl  flex overflow-hidden mb-3 justify-center items-center relative">
                <img
                    className="object-cover w-full h-full"
                    src={`${import.meta.env.VITE_BE_BASE_URL}/storage/uploads/images/${accommodation.room_images.find(img => img.is_main_image)?.file}`} alt="" />
            </div>
            <div className="grid grid-cols-5 gap-3">
        
                {
                    accommodation.room_images.filter(img => !img.is_main_image).map((img, index) => (
                        <div key={index} className="w-full aspect-square bg-primary rounded-xl flex  overflow-hidden justify-center items-center relative">
                            <img src={`${import.meta.env.VITE_BE_BASE_URL}/storage/uploads/images/${img.file}`} alt="" />
                            <p className="text-white text-xs">{img.file}</p>
                        </div>
                    ))
                }
            </div>

        </div>


    );
}

export default RoomImages;