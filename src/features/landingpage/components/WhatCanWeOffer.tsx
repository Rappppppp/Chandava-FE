import StaticDB from "@config/static_db/StaticDB";
import Title from "@components/Title";



const WhatCanWeOffer = () => {
    const { whatCanWeOffer } = StaticDB;
    return (<div>

        <div className="flex items-center justify-center ">
            <Title title="What can we offer?" />
        </div>

        <div className="flex flex-wrap gap-5 items-center justify-center">
            {whatCanWeOffer.map((offer, index) => (
                <div
                    key={index}
                    className="relative flex justify-center items-center p-10 rounded-2xl overflow-hidden w-[20rem] md:h-[10rem]"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                            backgroundImage: `url(${offer.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-primary/50 rounded-2xl"></div>

                    {/* Title */}
                    <p className="text-xl md:text-2xl font-bold text-white relative text-center">{offer.title}</p>
                </div>
            ))}
        </div>




    </div>);
}

export default WhatCanWeOffer;