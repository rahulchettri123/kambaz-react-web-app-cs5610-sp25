import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
// Create axios instance with baseURL to ensure absolute URL resolution
const axiosWithCredentials = axios.create({ 
  baseURL: '',  // Empty string to ensure URLs are treated as absolute
  withCredentials: true 
});
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string) => {
  const response = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}`
  );
  return response.data;
};


export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredentials.put(
    `${MODULES_API}/${module._id}`,
    module
  );
  return data;
 };
 
 // Get a module by ID
export const findModuleById = async (moduleId: string) => {
  const { data } = await axiosWithCredentials.get(`${MODULES_API}/${moduleId}`);
  return data;
};

// Add a lesson to a module
export const addLessonToModule = async (moduleId: string, lesson: any) => {
  const { data } = await axiosWithCredentials.post(
    `${MODULES_API}/${moduleId}/lessons`,
    lesson
  );
  return data;
};
  