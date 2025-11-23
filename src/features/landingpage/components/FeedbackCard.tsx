import { Star } from "lucide-react";
interface FeedbackCardProps {
    name: string;
    date: string;
    message: string;
    rate: number;
}

const FeedbackCard = ({ name, date, message, rate }: FeedbackCardProps) => {
    return (
        <div className="shadow-md rounded-2xl max-w-[16rem] md:max-w-96 p-5 flex-col flex-shrink-0 snap-start border border-gray-100">
            <div className="mb-3 flex items-center gap-3">
                <div>

                    <p>{name}</p>
                    <p className="text-xs text-gray-500">
                        {date}
                    </p>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-6 h-6`} // adjust size as needed
                                fill={star <= Number(rate) ? 'yellow' : 'none'}
                                strokeWidth={1.5}
                                stroke="currentColor"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-700">
                {message}
            </p>
        </div>
    );
};

export default FeedbackCard;
