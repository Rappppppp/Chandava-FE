
import { useParams, useLocation } from "react-router-dom";
import RoomImages from "@features/roomdetails/components/RoomImages";
import RoomPricing from "@features/roomdetails/components/RoomPricing";
import Title from "@components/Title";
import Icon from "@components/Icon";


const RoomDetails = () => {
    const { roomId } = useParams();
    console.log(roomId);
    const location = useLocation();
    const isUsersPage = location.pathname.split("/")[1] === "users";
    console.log(isUsersPage);

    



    return (
        <>

            <div className="flex flex-col md:flex-row gap-5">
                <RoomImages />
                <RoomPricing isAuthPage={isUsersPage} />

           

            </div>

            <div className="flex flex-col items-center justify-center gap-2 mt-10 mb-5">
                <Title title="Customer Feedbacks" />

                <div className="flex items-center justify-center flex-col">
                    <p className="text-lg font-bold text-gray-500">Overall Rating</p>
                    <h1 className="text-[5rem]/20 font-bold text-secondary">4.3</h1>
                    <p >Base on 163 feedbacks</p>
                </div>

            </div>

            <div className="shadow-sm rounded-2xl  p-5 flex-col mb-3">
                <div className="mb-3 flex items-center gap-3">
                    <div className="aspect-square w-[3.75rem] bg-primary rounded-full flex justify-center items-center">
                        <Icon name="User" size={30} color="white" />
                    </div>
                    <div>
                        <p>Customers name here</p>
                        <p className="text-xs text-gray-500">
                            March 1, 2025
                        </p>
                    </div>
                </div>
                <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis, illo corporis ab natus
                    reiciendis assumenda! Optio iusto iste, aliquam obcaecati placeat voluptas veniam ea odio ut
                    earum! Perferendis, minima exercitationem?
                </p>
            </div>

            <div className="shadow-sm rounded-2xl  p-5 flex-col mb-3">
                <div className="mb-3 flex items-center gap-3">
                    <div className="aspect-square w-[3.75rem] bg-primary rounded-full flex justify-center items-center">
                        <Icon name="User" size={30} color="white" />
                    </div>
                    <div>
                        <p>Customers name here</p>
                        <p className="text-xs text-gray-500">
                            March 1, 2025
                        </p>
                    </div>
                </div>
                <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis, illo corporis ab natus
                    reiciendis assumenda! Optio iusto iste, aliquam obcaecati placeat voluptas veniam ea odio ut
                    earum! Perferendis, minima exercitationem?
                </p>
            </div>

        </>
    );
}

export default RoomDetails;