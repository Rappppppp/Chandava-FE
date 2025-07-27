import api from "@services/api";


const BASE = "inclusions"

export const InclusionService = {
    getAllInclusions: async () => {
        const response = await api.get(`/${BASE}`);
        return response.data;

    },

    getInclusionById: async (id: number) => {
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