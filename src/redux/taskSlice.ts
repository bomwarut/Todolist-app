import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  title: string;
  description: string;
  progress: number;
};

export type Category = {
  label: string;
  count: number;
  task: Task[];
};

interface TaskState {
  categories: Category[];
  selectedCategory: string;
}

const initialState: TaskState = {
  categories: [
    {
      label: "First category",
      count: 0,
      task: [],
    },
  ],
  selectedCategory: "First category",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<string>) {
      const name = action.payload;
      if (state.categories.some((c) => c.label === name)) return;
      state.categories.push({ label: name, count: 0, task: [] });
    },
    updateCategory(
      state,
      action: PayloadAction<string>
    ) {
      const category = state.categories.find((c) => c.label === state.selectedCategory);
      if (category) {
        category.label = action.payload;
      }
    },
    deleteCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter((c) => c.label !== action.payload);
      if (state.selectedCategory === action.payload) {
        state.selectedCategory = state.categories[0]?.label ?? "";
      }
    },
    selectCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      const category = state.categories.find((c) => c.label === state.selectedCategory);
      if (category) {
        category.task.push(action.payload);
        category.count++;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      const category = state.categories.find((c) => c.label === state.selectedCategory);
      if (category) {
        category.task.splice(action.payload, 1);
        category.count = Math.max(0, category.count - 1);
      }
    },
    updateTask(
      state,
      action: PayloadAction<{ index: number; task: Task }>
    ) {
      const category = state.categories.find((c) => c.label === state.selectedCategory);
      if (category) {
        category.task[action.payload.index] = action.payload.task;
      }
    },
  },
});

export const {
  addCategory,
  updateCategory,
  deleteCategory,
  selectCategory,
  addTask,
  deleteTask,
  updateTask,
} = taskSlice.actions;

export default taskSlice.reducer;