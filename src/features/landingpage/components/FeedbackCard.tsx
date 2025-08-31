import Icon from "@components/Icon";
interface FeedbackCardProps {
    name: string;
    date: string;
    message: string;
}

const FeedbackCard = ({ name, date, message }: FeedbackCardProps) => {
    return (
        <div className="shadow-md rounded-2xl max-w-[16rem] md:max-w-96 p-5 flex-col flex-shrink-0 snap-start border border-gray-100">
            <div className="mb-3 flex items-center gap-3">
                <div className="aspect-square w-[3.75rem] bg-primary rounded-full flex justify-center items-center">
                    <Icon name="User" size={30} color="white" />
                </div>
                <div>
                    <p>{name}</p>
                    <p className="text-xs text-gray-500">
                        {date}
                    </p>
                </div>
            </div>
            <p className="text-sm text-gray-700">
                {message}
            </p>
        </div>
    );
};

export default FeedbackCard;
