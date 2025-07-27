import api from "@services/api";

const BASE = "accommodation-types"


export const AccommodationService = {
    getAllRoomTypes: async () => {
        const response = await api.get(`/${BASE}`);
        return response.data;

    },

    getRoomTypeById: async (id: number) => {
        const response = await api.get(`/${BASE}/${id}`);
        return response.data;
    },

    store: async (data: any) => {
        const response = await api.post(`/${BASE}`, data);
        return response.data;
    },

    patch: async (id: number, data: any) => {
        const response = await api.patch(`/${BASE}/${id}`, data);
        return response.data;
    },

    put: async (id: number, data: any) => {
        const response = await api.put(`/${BASE}/${id}`, data);
        return response.data;
    },
}