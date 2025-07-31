import api from "@services/api";

export const AccommodationService = {
    get: async () => {
        const response = await api.get("/public-rooms");
        return response.data;
    },
}