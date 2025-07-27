import api from "@services/api";

export const AuthService = {
    login: async (email: string, password: string) => {
        const response = await api.post("/login", { email, password });
        return response.data;
    },

    me: async () => {
        const response = await api.get("/me");
        return response.data;
    },

    logout: async () => {
        const response = await api.post("/logout");
        return response.data;
    },
}