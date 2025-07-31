import api from "@services/api";

const BASE = "rooms"


export const RoomService = {

    getAllRooms: async () => {
        const response = await api.get(`/${BASE}`);
        return response.data;

    },

    storeRoom: async (data: any) => {
        const response = await api.post(`/${BASE}`, data);
        return response.data;
    },

}