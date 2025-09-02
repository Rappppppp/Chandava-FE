import api from "@services/api";

export const AccommodationService = {
    get: async () => {
        const response = await api.get("/public-rooms?is_deleted[eq]=0");
        return response.data;
    },
}