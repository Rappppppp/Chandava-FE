import Paragraph from "@components/Paragraph";

const RoomPricing = ({isAuthPage = false} : {isAuthPage: boolean}) => {
    return (
        <div className="w-full md:1/2">
            <div className="flex justify-between mb-3">
                <div className="tracking-tight">
                    <h1 className="text-xl md:text-2xl font-bold text-primary">Room 206</h1>
                    <Paragraph>Conrete Cottage <span className="font-bold text-gray-500">(4 pax capacity)</span></Paragraph>
                </div>
                <div>
                    <Paragraph>Rating • 4.3 (163)</Paragraph>
                </div>
            </div>

            <Paragraph className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptatibus, quis, doloremque, quos, temporibus, dolores, voluptas, aspernatur, repellendus</Paragraph>

            <div className="flex gap-4 mb-3">
                <h1 className="text-xl md:text-2xl font-bold text-primary">
                    P1,234.00<span className="text-sm text-gray-500">\Day or night tour</span>
                </h1>

                <h1 className="text-xl md:text-2xl font-bold text-primary">
                    P2,234.00<span className="text-sm text-gray-500">\Overnight (22 hours)</span>
                </h1>
            </div>

            <p className="italic mb-5">Note: additional 300 per head</p>


            <h1 className="text-xl md:text-2xl font-bold text-primary">Inclusions</h1>
            <ol className="list-disc list-inside text-sm md:text-base">
                <li>Entrance</li>
                <li>Parking</li>
                <li>Use of Kayak for 2</li>


            </ol>

            { isAuthPage && <button className="mt-5 w-full cursor-pointer py-3 rounded-lg bg-primary text-white font-bold">Book Now</button> }
            




        </div>
    );
}

export default RoomPricing;