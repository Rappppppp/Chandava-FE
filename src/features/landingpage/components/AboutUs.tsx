import Title from "@components/Title";
import RestAWhile from "@assets/images/rest-a-while.jpg"
import Tulay from "@assets/images/tulay.jpg"



const AboutUs = () => {
    return (<>
        <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            <div className="w-full md:w-1/2 ">
                <div className="w-full relative mb-5">
                    <img src={RestAWhile} alt="Rest a while" className="w-full md:h-[24rem] lg:h-[26.5625rem] object-cover rounded-4xl" />
                </div>
                <div>
                    <Title title="Why choose us?" />
                    <ol className="list-decimal list-inside text-sm md:text-base">
                        <li>ALL CONCRETE ROAD ACCESS, NO BOAT TRANSFERS NEEDED</li>
                        <li>VERY AFFORDABLE RATES</li>
                        <li>ACCESSIBLE TO ALL KINDS OF VEHICLE</li>
                        <li>GATED AND SECURED CAMPGROUND AND CAMPING AREA</li>
                        <li>WITH SARI-SARI STORE, CANTEEN, AND CARINDERIA</li>
                        <li>CLEAN COMFORT ROOMS</li>
                        <li>HIGHLY TRAINED AND HELPFUL CAMPGROUND CREWS</li>
                        <li>QUIET TIME FROM 10 PM to 6 AM</li>
                        <li>FAMILY AND PET-FRIENDLY CAMPGROUND (Senior Citizens and Kids will enjoy)</li>
                    </ol>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-col">
                <div className="mb-4 ">
                    <Title title="Why choose us?" />
                    <p className="text-sm md:text-base">We are a HIGHLY-maintained campground surrounded by approximately 80% lake water in Cavinti, Laguna, where you will have a wonderful and peaceful experience while you get closer to nature. The campground is gated to ensure your safety at all times.</p>
                </div>
                <div className="w-full relative mb-5">
                    <img src={Tulay} alt="Rest a while" className="w-full h-[24rem] lg:h-[37.1875rem] object-cover rounded-4xl" />
                </div>
            </div>
        </div>

    </>);
}

export default AboutUs;