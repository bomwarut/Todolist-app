import { configureStore } from "@reduxjs/toolkit";
import  taskReducer  from "./taskSlice";
import  themeReducer  from "./themeSlice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    theme: themeReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;