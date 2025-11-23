import { useEffect, useState, useCallback } from "react";
import api, { AxiosError } from "@services/api";
import Icon from "@components/Icon";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
interface User {
    id: number,
    name: string,
}

interface Images {
    id: number,
    image: string,
}




interface Response {
    id: number,
    feedback_id: number,
    response: string,
    created_at: string,
    updated_at: string,
}

interface Feedback {
    id: number,
    rate: string,
    comment: string,
    user: User,
    images: Images[],
    response: Response | null,
    created_at: string,
}


const Feedbacks = () => {

    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingStates, setLoadingStates] = useState<boolean[]>([]);

    const [responses, setResponses] = useState<string[]>([]);

    const handleChange = (index: number, value: string) => {
        setResponses((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };


    const handleSubmit = async (index: number, feedbackId: number) => {
        setLoadingStates((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });

        const payload = {
            feedback_id: feedbackId,
            response: responses[index],
        }

        try {
            await api.post("/feedbacks-response", payload);
            setResponses((prev) => {
                const updated = [...prev];
                updated[index] = "";
                return updated;
            });
            toast.success("Feedback submitted successfully");
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.")

        } finally {
            setLoadingStates((prev) => {
                const updated = [...prev];
                updated[index] = false;
                return updated;
            });
        }
    };

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const res = await api.get("/feedbacks");
            setFeedbacks(res.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data.message)
            }

        } finally {
            setLoading(false)
        }
    }, [])





    useEffect(() => {
        fetchData()
    }, [fetchData])

    if (loading) return "Loading..."

    return (<>


        <h1 className="text-xl md:text-2xl font-bold text-primary mb-3">All Feedbacks</h1>

        {
            feedbacks.length > 0 && (
                feedbacks.map((feedback, index) => (
                    <div key={index} className="shadow-sm rounded-2xl  p-5 flex-col space-y-3">
                        <div className="mb-3 flex items-center gap-3">
                            {/* <div className="aspect-square w-[3.75rem] bg-primary rounded-full flex justify-center items-center">
                                <Icon name="User" size={30} color="white" />
                            </div> */}
                            <div>
                                <p>{feedback.user?.name} • <span className="text-sm">{feedback.rate} </span></p>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-6 h-6`} // adjust size as needed
                                            fill={star <= Number(feedback.rate) ? 'yellow' : 'none'}
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        />
                                    ))}
                                </div>
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
                            feedback.response ? (
                                <div className="mt-5">
                                    <p className="text-sm">Your response:</p>
                                    <p className="text-sm text-gray-700">{feedback.response.response}</p>
                                </div>
                            ) : (
                                <div className="flex mt-5">
                                    <input
                                        type="text"
                                        value={responses[index] || ""}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        placeholder="Type your response here..."
                                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 
               focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleSubmit(index, feedback.id)}
                                        disabled={loadingStates[index]}
                                        className={`ml-3 px-4 py-2 rounded-lg text-white transition 
    ${loadingStates[index] ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"}`}
                                    >
                                        {loadingStates[index] ? "Submitting..." : "Submit"}
                                    </button>
                                </div>

                            )
                        }


                    </div>
                ))
            )
        }



    </>);
}

export default Feedbacks;