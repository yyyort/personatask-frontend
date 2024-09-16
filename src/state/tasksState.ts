import { CreateTaskType, GetTaskType, UpdateTaskType } from '@/model/tasks.model';
import { create } from 'zustand';

type TaskState = {
    tasks: GetTaskType[];
    addTask: (data: CreateTaskType) => void;
    updateTask: (data: UpdateTaskType, id: number) => void;
    deleteTask: (id: number) => void;
};

export const useTasksStore = create<TaskState>((set) => ({
    tasks: [
        //mock data
        {
            id: 1,
            userId: "1",
            name: "Task 1",
            description: "Description 1",
            status: "due",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            userId: "1",
            name: "Task 2",
            description: "Description 2",
            status: "done",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    addTask: (data) => {
        //make api call
        
        //add client side
        set((state) => ({
            tasks: [
                ...state.tasks,
                {
                    id: state.tasks.length + 1,
                    userId: "1",
                    ...data,
                    status: "due",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]
        }))
    },
    updateTask: (data, id) => {
        
        //update client side
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (id === task.id) {
                    return {
                        ...task,
                        ...data,
                        updatedAt: new Date(),
                    };
                }
                return task;
            }),
        }));
    },
    deleteTask: (id) => {

        //delete client side
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        }));
    },
}));