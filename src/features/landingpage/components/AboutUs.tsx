import Title from "@components/Title";
import Paragraph from "@components/Paragraph";
import StaticDB  from "@config/static_db/StaticDB";





const AboutUs = () => {
    const { aboutUs } = StaticDB;

    
    return (<>
        <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-10">
            <div className="w-full md:w-1/2 ">
                <div className="w-full relative mb-5">
                    <img src={aboutUs[0].image} alt="Rest a while" className="w-full md:h-[24rem] lg:h-[26.5625rem] object-cover rounded-4xl" />
                </div>
                <div>
                    <Title title={aboutUs[0].title} />
                    <ol className="list-decimal list-inside text-sm md:text-base">
                        {aboutUs[0]?.points?.map((point, index) => (
                            <li key={index}>{point}</li>
                        )) || <li>No points available</li>}
                    </ol>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-col">
                <div className="mb-4 ">
                    <Title title={aboutUs[1].title} />
                    <Paragraph className="md:mb-3">{aboutUs[1]?.description || "No descriptions available"}</Paragraph>
                </div>
                <div className="w-full relative mb-5 md:mb-0">
                    <img src={aboutUs[1].image} alt="Rest a while" className="w-full h-[24rem] lg:h-[37.1875rem] object-cover rounded-4xl" />
                </div>
            </div>
        </div>

   

    </>);
}

export default AboutUs;