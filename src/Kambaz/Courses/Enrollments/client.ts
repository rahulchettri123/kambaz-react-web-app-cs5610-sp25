import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const axiosWithCredentials = axios.create({ withCredentials: true });
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

// Get all enrollments
export const findAllEnrollments = async () => {
  const response = await axiosWithCredentials.get(ENROLLMENTS_API);
  return response.data;
};

// Get enrollments for a specific user
export const findEnrollmentsForUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/users/${userId}/enrollments`);
  return response.data;
};

// Get enrollments for a specific course
export const findEnrollmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses/${courseId}/enrollments`);
  return response.data;
};

// Check if user is enrolled in a course
export const findEnrollment = async (userId: string, courseId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}/enrollment`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

// Enroll user in a course
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}/enrollments`
  );
  return response.data;
};

// Unenroll user from a course by enrollment ID
export const unenrollUserFromCourse = async (enrollmentId: string) => {
  const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
  return response.data;
};

// Unenroll user from a course by user ID and course ID
export const unenrollUserFromCourseByIds = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}/enrollments`
  );
  return response.data;
}; 