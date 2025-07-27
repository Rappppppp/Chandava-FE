import { useState, useEffect, useCallback, useRef } from "react";
import { AccommodationService } from "@features/admin/accommodations/services/AccommodationService";
import { InclusionService } from "@features/admin/accommodations/services/InclusionService";
import type { RoomType, Inclusion } from "@features/admin/accommodations/types/types";

export const useAccommodationData = () => {
    const isAlreadyFetched = useRef(false);
    const [fetchRoomLoading, setFetchRoomLoading] = useState(false);
    const [fetchInclusionLoading, setFetchInclusionLoading] = useState(false);
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
    const [inclusions, setInclusions] = useState<Inclusion[]>([]);

    const fetchAllRoomTypes = useCallback(async () => {
        try {
            setFetchRoomLoading(true);
            const response = await AccommodationService.getAllRoomTypes();
            setRoomTypes(response?.data || []);
        } catch (error) {
            console.error("Failed to fetch room types:", error);
        } finally {
            setFetchRoomLoading(false);
        }
    }, []);

    const fetchAllInclusions = useCallback(async () => {
        try {
            setFetchInclusionLoading(true);
            const response = await InclusionService.getAllInclusions();
            setInclusions(response?.data || []);
        } catch (error) {
            console.error("Failed to fetch inclusions:", error);
        } finally {
            setFetchInclusionLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isAlreadyFetched.current) {
            isAlreadyFetched.current = true;
            fetchAllRoomTypes();
            fetchAllInclusions();
        }
    }, [fetchAllRoomTypes, fetchAllInclusions]);

    return {
        roomTypes,
        inclusions,
        fetchRoomLoading,
        fetchInclusionLoading,
        fetchAllRoomTypes,
        fetchAllInclusions,
    };
};

export default useAccommodationData;
