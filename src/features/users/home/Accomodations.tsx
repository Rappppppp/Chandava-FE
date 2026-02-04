import Title from "@components/Title";
import { useState, useEffect, useMemo } from "react";
import type { Accomodation } from "@/types/accomodationType";
import { AccommodationService } from "@features/landingpage/services/AccommodationService";
import AccommodationCard from "@features/landingpage/components/AccomodationCard";
import DefaultLoader from "@components/loaders/DefaultLoader";

const Accomodations = () => {
    const [accommodations, setAccommodations] = useState<Accomodation[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeType, setActiveType] = useState<string>("ALL");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await AccommodationService.get();
                setAccommodations(res.data);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ✅ unique accommodation types
    const accommodationTypes = useMemo(() => {
        const types = accommodations
            .map(a => a.accommodation_type?.accommodation_type_name)
            .filter(Boolean) as string[];

        return ["ALL", ...Array.from(new Set(types))];
    }, [accommodations]);

    // ✅ filtered list
    const filteredAccommodations = useMemo(() => {
        if (activeType === "ALL") return accommodations;

        return accommodations.filter(
            a => a.accommodation_type?.accommodation_type_name === activeType
        );
    }, [accommodations, activeType]);

    return (
        <div className="px-[0.1875rem]" id="Accommodations">
            <Title title="Accomodations that you can book" />

            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap gap-2 mb-6">
                {accommodationTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => setActiveType(type)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition
                            ${activeType === type
                                ? "bg-black text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                    <DefaultLoader />
                ) : (
                    filteredAccommodations.map((accommodation) => (
                        <AccommodationCard
                            key={accommodation.id}
                            roomId={accommodation.id}
                            roomName={accommodation.room_name}
                            accommodationTypeName={
                                accommodation.accommodation_type?.accommodation_type_name ?? ""
                            }
                            isAvailable={accommodation.is_already_check_in}
                            dayNightTourPrice={accommodation.day_night_tour_price}
                            roomInclusions={accommodation.room_inclusions}
                            roomImage={
                                accommodation.room_images.find(img => img.is_main_image)?.file
                            }
                            maxGuests={accommodation.accommodation_type.max_guests}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Accomodations;