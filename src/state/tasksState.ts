/* eslint-disable no-unused-vars */

import { GetTaskType } from "@/model/tasks.model";
import { create } from "zustand";

export type columnType = {
  id: "due" | "done" | "overdue";
  title: string;
  tasks: GetTaskType[];
};

type TaskState = {
  columns: columnType[];
  setColumns: (columns: columnType[]) => void;
  changeTaskStatus: (
    id: number,
    toColumnId: "due" | "done" | "overdue"
  ) => void;
  sortTasks: (
    currentColumnId: "due" | "done" | "overdue",
    tasks: GetTaskType[]
  ) => void;
};

export const useTasksStore = create<TaskState>((set) => ({
  columns: [
    {
      id: "due",
      title: "Due",
      tasks: [],
    },
    {
      id: "done",
      title: "Done",
      tasks: [],
    },
    {
      id: "overdue",
      title: "Overdue",
      tasks: [],
    },
  ],
  setColumns: (columns: columnType[]) => set({ columns }),
  changeTaskStatus(id, toColumnId) {

    //client side state management
    set((state) => {
      const newColumns = state.columns.map((column) => {

        const taskIndex = column.tasks.findIndex((task) => task.id === id);

        if (taskIndex !== -1) {
          const [task] = column.tasks.splice(taskIndex, 1);

          const newColumn = state.columns.find(
            (column) => column.id === toColumnId
          );

          //change status of the task
          task.status = toColumnId;

          if (newColumn) {
            newColumn.tasks.push(task);
          }
        }
        return column;
      });
      
      return {
        columns: newColumns,
      };
    });
  },
  sortTasks: (currentColumnId, tasks) => {
    set((state) => {
      //setting a new task from the current column
      const newColumn = state.columns.map((column) => {
        if (currentColumnId === column.id) {
          column.tasks = tasks;
        }
        return column;
      });

      return {
        columns: newColumn,
      };
    });
  },
}));
