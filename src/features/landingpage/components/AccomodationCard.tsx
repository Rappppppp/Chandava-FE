
import SampleRoom from "@assets/images/sample-room.jpg";
import Icon from "@components/Icon";
const AccomodationCard = () => {
    return (

        <div className=" shadow-md rounded-4xl overflow-hidden">
            <div className="bg-black relative rounded-4xl">
                <img src={SampleRoom} alt="Room name" className="w-full aspect-video  object-cover rounded-4xl opacity-65" />
            </div>
            <div className="p-[1rem]">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-primary">Room 206</h1>
                        <p className="text-sm md:text-base text-gray-500">Concrete Cottage</p>
                    </div>

                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-secondary">P 1,200</h1>
                        <p className="inline-flex gap-2 items-center text-gray-500 text-sm md:text-base"><span><Icon name="Star" size={15} color="#d6741e " /></span> 4.3(167)</p>
                    </div>

                </div>
                <p className="text-gray-500 text-sm md:text-base mt-3"><span>• Free WiFi</span> <span>• Entrance</span>  <span>• Use of Kayaks for 2</span></p>
            </div>
        </div>


    );
}

export default AccomodationCard;