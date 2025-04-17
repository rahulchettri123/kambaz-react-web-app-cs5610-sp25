import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

// Debug function to help diagnose authentication issues
export const checkAuthStatus = async () => {
  try {
    console.log("Checking auth status with server:", REMOTE_SERVER);
    const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/auth-status`);
    console.log("Auth status response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Auth status check failed:", error);
    return { authenticated: false, error: error.message };
  }
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};
export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};
export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};
export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};
export const findUsersByPartialName
  = async (name: string) => {
    const response = await
      axiosWithCredentials.get(`${USERS_API}?name=${name}`);
    return response.data;
};
export const findUserById
  = async (id: string) => {
    const response = await 
      axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};
export const deleteUser
  = async (userId: string) => {
    const response = await
      axiosWithCredentials.delete( `${USERS_API}/${userId}` );
    return response.data;
};
export const createUser =
  async (user: any) => {
    const response = await
      axiosWithCredentials.post(`${USERS_API}`, user);
    return response.data;

};
export const findCoursesForUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
  return response.data;
};

// src/Kambaz/Account/client.ts - Update these functions
// src/Kambaz/Account/client.ts
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  try {
    const response = await axiosWithCredentials.post(
      `${USERS_API}/${userId}/courses/${courseId}/enrollments`
    );
    console.log("Enrollment successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error enrolling:", error);
    throw error;
  }
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  try {
    const response = await axiosWithCredentials.delete(
      `${USERS_API}/${userId}/courses/${courseId}/enrollments`
    );
    console.log("Unenrollment successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error unenrolling:", error);
    throw error;
  }
};

