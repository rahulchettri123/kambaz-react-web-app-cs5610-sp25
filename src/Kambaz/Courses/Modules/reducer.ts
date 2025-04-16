import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
};
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, { payload: modules }) => {
      state.modules = modules;
    },
 
    addModule: (state, { payload: module }) => {
      state.modules = [...state.modules, module] as any;
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m: any) => m._id !== moduleId);
    },

    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
      
    },
    addLesson: (state, { payload }) => {
      const { moduleId, lesson } = payload;
      state.modules = state.modules.map((m: any) => {
        if (m._id === moduleId) {
          // Add the new lesson to the module
          const updatedLessons = m.lessons ? [...m.lessons, lesson] : [lesson];
          return { ...m, lessons: updatedLessons };
        }
        return m;
      }) as any;
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules, addLesson } =
  modulesSlice.actions;
export default modulesSlice.reducer;
