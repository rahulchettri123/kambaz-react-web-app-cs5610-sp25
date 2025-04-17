import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const USERS_API = `${REMOTE_SERVER}/api/users`;

// Get all users enrolled in a course
export const findUsersForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

// Enroll a user in a course
export const enrollUserInCourse = async (courseId: string, userId: string) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/users/${userId}`
  );
  return response.data;
};

// Remove a user from a course
export const removeUserFromCourse = async (courseId: string, userId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/users/${userId}`
  );
  return response.data;
};

// Update a user's role or information within a course
export const updateUserInCourse = async (courseId: string, userId: string, updates: any) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/users/${userId}`,
    updates
  );
  return response.data;
};

// Find all users (for faculty/admin to add to course)
export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

// Find users by role (for filtering)
export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

// Find users by name (for search functionality)
export const findUsersByName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

// Create a new user and enroll in course (faculty feature)
export const createUserAndEnroll = async (courseId: string, user: any) => {
  // First create the user
  const response = await axiosWithCredentials.post(USERS_API, user);
  const newUser = response.data;
  
  // Then enroll them in the course
  await enrollUserInCourse(courseId, newUser._id);
  
  return newUser;
}; 