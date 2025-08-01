import api from "./api";

interface CreateConvoPayload {
    user_id: number | string;
    receiver_id: number | string;
    title: string;
}

interface PostMessagePayload {

    user_id: string | number;
    body: string;
}

export const MessageService = {
    createConvo: async (payload: CreateConvoPayload) => {
        const res = await api.post("/conversations/store", payload)
        return res.data
    },

    getAllConvos: async (userId: string | number) => {
        const res = await api.get(`/conversations/${userId}`)
        return res.data
    },

    getMessages: async (convoId: string | number) => {
        const res = await api.get(`/conversations/${convoId}/messages`)
        return res.data
    },

    postMessage: async (convoId: string | number, payload: PostMessagePayload) => {
        const res = await api.post(`/conversations/${convoId}/messages`, payload)
        return res.data
    },
}