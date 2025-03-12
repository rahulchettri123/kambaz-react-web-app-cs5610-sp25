import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../Database';

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

// Load initial state from localStorage or use database default
const loadInitialState = (): EnrollmentsState => {
  const savedEnrollments = localStorage.getItem('enrollments');
  if (savedEnrollments) {
    return { enrollments: JSON.parse(savedEnrollments) };
  }
  return { enrollments: db.enrollments };
};

const initialState: EnrollmentsState = loadInitialState();

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    addEnrollment: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments.push(action.payload);
      // Save to localStorage
      localStorage.setItem('enrollments', JSON.stringify(state.enrollments));
    },
    removeEnrollment: (state, action: PayloadAction<string>) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) => enrollment._id !== action.payload
      );
      // Save to localStorage
      localStorage.setItem('enrollments', JSON.stringify(state.enrollments));
    },
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
      // Save to localStorage
      localStorage.setItem('enrollments', JSON.stringify(state.enrollments));
    },
  },
});

export const { addEnrollment, removeEnrollment, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;