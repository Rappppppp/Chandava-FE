import { lazy } from "react";
import { useEffect, useState } from "react";
import Title from "@components/Title";
import Paragraph from "@components/Paragraph";
const FeedbackCard = lazy(() => import("@features/landingpage/components/FeedbackCard"));
import StaticDB from "@config/static_db/StaticDB";
import api from "@services/api";

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get("/homepage/feedbacks");
                // console.log(response.data);
                setFeedbacks(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const { customersFeedback } = StaticDB;
    return (
        <div className="flex flex-col md:flex-row gap-3 md:gap-5" id="Feedback">

            <div className="w-full md:w-1/2 lg:w-1/3 ">
                <Title title={customersFeedback.title} />
                <Paragraph className="mb-3">{customersFeedback.description}</Paragraph>
            </div>

            {loading ? <FeedbackSkeleton /> : (
                <div className="w-full md:w-1/2 lg:w-2/3 flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 scrollbar-show">
                    {
                        feedbacks.map((feedback, index) => (
                            <FeedbackCard
                                key={index}
                                name={feedback.user.name}
                                date={new Date(feedback.created_at).toLocaleDateString()}
                                message={feedback.comment}
                                rate={feedback.rate}
                            />
                        ))
                    }

                </div>
            )}

        </div>
    );
}

export default Feedback;


const FeedbackSkeleton = () => {
    return (
        <div className="w-full md:w-1/2 lg:w-2/3 flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 scrollbar-show">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="w-64 min-w-[16rem] h-40 rounded-xl bg-slate-200 animate-pulse snap-start flex-shrink-0"
                >
                    <div className="p-4 flex flex-col gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                        {/* Text lines */}
                        <div className="w-3/4 h-3 rounded bg-slate-300"></div>
                        <div className="w-1/2 h-3 rounded bg-slate-300"></div>
                        <div className="w-full h-3 rounded bg-slate-300"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
