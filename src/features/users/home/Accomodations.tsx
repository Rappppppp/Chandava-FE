
import Title from "@components/Title";
import AccomodationCard from "@features/users/components/AccomodationCard";
import { useState, useEffect } from "react";
import type { Accomodation } from "@/types/accomodationType";
import { AccommodationService } from "@features/landingpage/services/AccommodationService";

const Accomodations = () => {
    const [accommodations, setAccommodations] = useState<Accomodation[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await AccommodationService.get();

                setAccommodations(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        };

        fetchData();
    }, []);


    return (
        <div className="px-[0.1875rem]" id="Accommodations">
            <div className=" ">
                <Title title="Accomodations that you can book" />
            </div>

            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
                {
                    loading ? "Loading..." : (
                        accommodations.map((accommodation, index) => (
                            <AccomodationCard
                                key={index}
                                roomId={accommodation.id}
                                roomName={accommodation.room_name}
                                accommodationTypeName={accommodation.accommodation_type.accommodation_type_name}
                                dayNightTourPrice={accommodation.day_night_tour_price}
                                roomInclusions={accommodation.room_inclusions}
                                roomImage={accommodation.room_images.find(img => img.is_main_image)?.file}
                            />
                        ))
                    )
                }


            </div>
        </div>
    );
}

export default Accomodations;