import { Students } from "@/app/home";
import axiosInstance from "./axiosConnect";

// Obtener todos los estudiantes
export const getStudents = async () => {
  try {
    const response = await axiosInstance.get("/students");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los estudiantes:", error);
    throw error;
  }
};

// Obtener un estudiante por ID
export const getStudentById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el estudiante con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo estudiante
export const createStudent = async (studentData: Record<string, Students>) => {
  try {
    const response = await axiosInstance.post("/students", studentData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el estudiante:", error);
    throw error;
  }
};

// Actualizar un estudiante por ID
export const updateStudent = async (
  id: string,
  studentData: Record<string, Students>
) => {
  try {
    const response = await axiosInstance.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el estudiante con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un estudiante por ID
export const deleteStudent = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el estudiante con ID ${id}:`, error);
    throw error;
  }
};
