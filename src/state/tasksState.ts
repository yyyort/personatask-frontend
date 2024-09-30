
import { GetTaskType } from '@/model/tasks.model';
import { create } from 'zustand';

type TaskState = {
    tasks: GetTaskType[];
    // eslint-disable-next-line no-unused-vars
    setTasks: (tasks: GetTaskType[]) => void;
    changeTaskStatus: (id: number, status: "due" | "done" | "overdue") => void;
};

export const useTasksStore = create<TaskState>((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ 
        tasks: tasks
     }),
    changeTaskStatus: (id, status: "due" | "done" | "overdue") => set((state) => ({
        tasks: state.tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    status: status
                };
            }
            return task;
        })
    }))
}));