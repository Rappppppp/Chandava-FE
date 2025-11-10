import { useState, useEffect } from "react";
import Title from "@components/Title";
import type { Accomodation } from "@/types/accomodationType";
import { AccommodationService } from "@features/landingpage/services/AccommodationService";
import AccomodationCard from "@features/landingpage/components/AccomodationCard";

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState<Accomodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AccommodationService.get();
        if (Array.isArray(res.data)) {
          setAccommodations(res.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Failed to fetch accommodations:", err);
        setError("Unable to load accommodations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="Accommodations" className="px-2 py-8">
      <div className="flex justify-center">
        <Title title="Accommodations" />
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <p className="text-gray-500">Loading accommodations...</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          {/* <Title title="Error" color="text-red-500" /> */}
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && accommodations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {accommodations.map((accommodation) => (
            <AccomodationCard
              key={accommodation.id}
              roomId={accommodation.id}
              roomName={accommodation.room_name}
              accommodationTypeName={
                accommodation.accommodation_type?.accommodation_type_name ?? ""
              }
              maxGuests={accommodation.accommodation_type?.max_guests}
              dayNightTourPrice={accommodation.day_night_tour_price}
              roomInclusions={accommodation.room_inclusions}
              roomImage={
                accommodation.room_images.find((img) => img.is_main_image)?.file
              }
            />
          ))}
        </div>
      )}

      {!loading && !error && accommodations.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          <Title title="No Accommodations Found" />
          <p className="text-sm text-gray-500">
            We couldn't find any accommodations matching your search criteria.
          </p>
        </div>
      )}
    </section>
  );
};

export default Accommodations;
