import api from "@services/api";

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/login", { email, password });

    // Save token in localStorage
    const token = response.data.access_token;
    if (token) {
      localStorage.setItem("token", token);
      // Attach token to future requests automatically
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return response.data;
  },

  me: async () => {
    // Ensure token is attached in case page reload cleared default headers
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const response = await api.get("/me");
    return response.data;
  },

  logout: async () => {
    // Attach token just in case
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const response = await api.post("/logout");

    // Remove token after logout
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];

    return response.data;
  },
};
