
import { GetTaskType } from '@/model/tasks.model';
import { create } from 'zustand';

type TaskState = {
    tasks: GetTaskType[];
    // eslint-disable-next-line no-unused-vars
    setTasks: (tasks: GetTaskType[]) => void;
};

export const useTasksStore = create<TaskState>((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ 
        tasks: tasks
     }),
}));