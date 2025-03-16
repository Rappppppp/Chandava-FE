import Title from "@components/Title";
import AccomodationCard from "@features/users/components/AccomodationCard";
const Accomodations = () => {
    return (
        <div className="px-[0.1875rem]" id="Accommodations">
            <div className=" ">
                <Title title="Accomodations that you can book" />
            </div>

            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />


            </div>
        </div>
    );
}

export default Accomodations;