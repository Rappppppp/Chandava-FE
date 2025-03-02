import { lazy } from "react";
import Title from "@components/Title";
import Paragraph from "@components/Paragraph";
const FeedbackCard = lazy(() => import("@features/landingpage/components/FeedbackCard"));
import StaticDB  from "@config/static_db/StaticDB";

const Feedback = () => {
    const { customersFeedback } = StaticDB;
    return (
        <div className="flex flex-col md:flex-row gap-3 md:gap-5">

            <div className="w-full md:w-1/2 lg:w-1/3 ">
                <Title title={customersFeedback.title} />
                <Paragraph className="mb-3">{customersFeedback.description}</Paragraph>
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