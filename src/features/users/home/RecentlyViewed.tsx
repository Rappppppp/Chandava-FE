
import AccomodationCard from "@features/users/components/AccomodationCard";
import Title from "@components/Title";

const RecentlyViewed = () => {
    return (<>
        <div className="px-[0.1875rem]" id="Accommodations">
            <div className="">
                <Title title="Rooms You Recently Viewed" />
            </div>

            <div className="w-full flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 scrollbar-show">
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
                <AccomodationCard />
  
            </div>

        </div>

    </>);
}

export default RecentlyViewed;