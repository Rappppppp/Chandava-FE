import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import RoomImages from "@features/roomdetails/components/RoomImages";
import RoomPricing from "@features/roomdetails/components/RoomPricing";
import Title from "@components/Title";
import Icon from "@components/Icon";
import { Accomodation } from "@/types/accomodationType";
import api from "@services/api";
import { useAuth } from "@contexts/AuthContext";


const RoomDetails = () => {
    const { roomId } = useParams();
    const { user } = useAuth();
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accommodation, setAccommodation] = useState<Accomodation | null>(null);

    const location = useLocation();
    const isUsersPage = location.pathname.split("/")[1] === "users";



    useEffect(() => {
        const fetchData = async () => {
            try {
                setNotFound(false);
                setLoading(true);
                const response = await api.get(`/public-rooms?id=${roomId}`);
                if (response.data.data.length <= 0) {
                    setNotFound(true);
                }
                setAccommodation(response.data.data[0]);

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [roomId]);

    if (loading) return <div>Loading...</div>;
    if (notFound) return <div>Looks like this room does not exist</div>;
    if (!accommodation) return <div>Loading...</div>;

    return (
        <>

            <div className="flex flex-col md:flex-row gap-5">
                <RoomImages accommodation={accommodation} />
                <RoomPricing accommodation={accommodation} isAuthPage={isUsersPage} />



            </div>

            <div className="flex flex-col items-center justify-center gap-2 mt-10 mb-5">
                <Title title="Customer Feedbacks" />

                <div className="flex items-center justify-center flex-col">
                    <p className="text-lg font-bold text-gray-500">Overall Rating</p>

                    {accommodation.avg_rating ? (<>
                        <h1 className="text-[5rem]/20 font-bold text-secondary">{accommodation.avg_rating}</h1>
                        <p >Base on {accommodation.feedbacks.length} feedbacks</p>
                    </>) : "No feedbacks yet"}
                </div>

            </div>

            {
                accommodation.feedbacks.length > 0 && (
                    accommodation.feedbacks.map((feedback, index) => (
                        <div key={index} className="shadow-sm rounded-2xl  p-5 flex-col mb-3">
                            <div className="mb-3 flex items-center gap-3">
                                <div className="aspect-square w-[3.75rem] bg-primary rounded-full flex justify-center items-center">
                                    <Icon name="User" size={30} color="white" />
                                </div>
                                <div>
                                    <p>{String(user?.id) === String(feedback.user_id) ? "You" : feedback.user?.name} • <span className="text-sm">{feedback.rate} </span></p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(feedback.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700">
                                {feedback.comment}
                            </p>

                            {
                                (feedback.images && feedback.images.length > 0) && (
                                    <div className="flex gap-3 mt-3">

                                        {
                                            feedback.images.map((img, index) => (
                                                <div key={index} className="w-[6.25rem] aspect-square bg-primary rounded-xl flex  overflow-hidden justify-center items-center relative">
                                                    <img src={`${import.meta.env.VITE_BE_BASE_URL}/storage/uploads/images/${img.image}`} alt="" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }

                            {
                                feedback.response && (
                                    <div className="mt-5">
                                        <p className="text-sm">Admin response:</p>
                                        <p className="text-sm text-gray-700">{feedback.response.response}</p>
                                    </div>
                                )
                            }

                        </div>
                    ))
                )
            }





        </>
    );
}

export default RoomDetails;