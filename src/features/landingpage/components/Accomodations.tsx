import { useState, useEffect, useMemo } from "react";
import Title from "@components/Title";
import type { Accomodation } from "@/types/accomodationType";
import { AccommodationService } from "@features/landingpage/services/AccommodationService";
import AccomodationCard from "@features/landingpage/components/AccomodationCard";
import DefaultLoader from "@components/loaders/DefaultLoader";

const AccommodationsPage = () => {
  const [accommodations, setAccommodations] = useState<Accomodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string>("ALL");

  // Fetch accommodations
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

  // Get unique accommodation types for filter buttons
  const accommodationTypes = useMemo(() => {
    const types = accommodations
      .map((a) => a.accommodation_type?.accommodation_type_name)
      .filter(Boolean) as string[];
    return ["ALL", ...Array.from(new Set(types))];
  }, [accommodations]);

  // Filtered accommodations based on selected type
  const filteredAccommodations = useMemo(() => {
    if (activeType === "ALL") return accommodations;
    return accommodations.filter(
      (a) => a.accommodation_type?.accommodation_type_name === activeType
    );
  }, [accommodations, activeType]);

  return (
    <section id="Accommodations" className="px-2 py-8">
      <div className="flex justify-center">
        <Title title="Accommodations" />
      </div>

      {/* Filter buttons */}
      {!loading && !error && accommodationTypes.length > 1 && (
        <div className="flex flex-wrap gap-2 my-6 justify-center">
          {accommodationTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition
                ${activeType === type ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"}
              `}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="flex justify-center py-10">
          <DefaultLoader />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      )}

      {/* Accommodations grid */}
      {!loading && !error && filteredAccommodations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {filteredAccommodations.map((accommodation) => (
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
              isAvailable={accommodation.is_already_check_in} // optional
            />
          ))}
        </div>
      )}

      {/* No accommodations found */}
      {!loading && !error && filteredAccommodations.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          <Title title="No Accommodations Found" />
          <p className="text-sm text-gray-500">
            We couldn't find any accommodations matching your selected type.
          </p>
        </div>
      )}
    </section>
  );
};

export default AccommodationsPage;