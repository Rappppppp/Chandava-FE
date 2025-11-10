import StaticDB from "@config/static_db/StaticDB";
import Title from "@components/Title";

const WhatCanWeOffer = () => {
    const { whatCanWeOffer } = StaticDB;

    // Use one shared background image — you can pick the first or a new dedicated one
    const backgroundImage = whatCanWeOffer[0]?.image || "/path/to/default.jpg";

    return (
        <div id="what-can-we-offer" className="relative overflow-hidden py-16 rounded-3xl">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-primary/60"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-white">
                <Title title="What can we offer?" color="white" />

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    {whatCanWeOffer.map((offer, index) => (
                        <li
                            key={index}
                            className="border border-primary/70 text-md font-semibold bg-primary/30 px-6 py-3 rounded-xl backdrop-blur-sm hover:bg-primary/50 transition"
                        >
                            {offer.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WhatCanWeOffer;
