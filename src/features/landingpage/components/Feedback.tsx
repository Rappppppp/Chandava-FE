import { lazy } from "react";
import Title from "@components/Title";
const FeedbackCard = lazy(() => import("@features/landingpage/components/FeedbackCard"));


const Feedback = () => {
    return (
        <div className="flex flex-col md:flex-row gap-3 md:gap-5">

            <div className="w-full md:w-1/2 lg:w-1/3 ">
                <Title title="Customers Feedback" />
                <h1 className="text-2xl font-bold text-primary mb-3"></h1>
                <p className="text-sm md:text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
            </div>

            <div className="w-full md:w-1/2 lg:w-2/3 flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 scrollbar-show">

                <FeedbackCard />

                <FeedbackCard />
                <FeedbackCard />
                <FeedbackCard />
            </div>
        </div>
    );
}

export default Feedback;