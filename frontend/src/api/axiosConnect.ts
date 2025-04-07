import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 10000, // Tiempo de espera opcional
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response, // Devolver la respuesta si no hay errores
  (error) => {
    if (error.response) {
      // Manejo de errores del backend
      console.error(
        "Error del servidor:",
        error.response.data.message || error.response.statusText
      );
    } else if (error.request) {
      // Manejo de errores de red
      console.error("Error de red: No se recibió respuesta del servidor.");
    } else {
      // Otros errores
      console.error("Error:", error.message);
    }
    return Promise.reject(error); // Rechazar la promesa para manejar el error en el llamado
  }
);

export default axiosInstance;
