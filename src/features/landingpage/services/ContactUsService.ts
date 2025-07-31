import api from "@services/api";



export const ContactUsService = {
    store: async (data: any) => {
        const response = await api.post("/contact-us", data);
        return response.data;
    },
}