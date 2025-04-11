import { Students } from "@/app/home";
import axiosInstance from "./axiosConnect";

const handleError = (error: unknown) => {
  window.location.href = "/error";
  throw error;
};

// Obtener todos los estudiantes
export const getStudents = async () => {
  try {
    const response = await axiosInstance.get("/students");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Obtener un estudiante por ID
export const getStudentById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Crear un nuevo estudiante
export const createStudent = async (studentData: Students) => {
  try {
    const response = await axiosInstance.post("/students", studentData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Actualizar un estudiante por ID
export const updateStudent = async (id: number, studentData: Students) => {
  try {
    const response = await axiosInstance.patch(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el estudiante con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un estudiante por ID
export const deleteStudent = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el estudiante con ID ${id}:`, error);
    throw error;
  }
};

// iniciar sesion con cedula y contraseña
export const loginApi = async (cedula: string, password: string) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      cedula,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
// registrar un nuevo usuario
export const registerApi = async (userData: any) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};
