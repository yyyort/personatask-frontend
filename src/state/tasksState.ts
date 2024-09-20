import Tasks from '@/app/(components)/tasks/page';
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
            deadline: new Date('2024-09-17T20:19').toLocaleString(),
        },
        {
            id: 2,
            userId: "1",
            name: "Task 2",
            description: "Description 2",
            status: "done",
            deadline: new Date('2024-09-17T20:19').toLocaleString(),
        },
        {
            id: 3,
            userId: "1",
            name: "Task 3",
            description: "Description 3",
            status: "overdue",
            deadline: new Date('2024-09-17T20:19').toLocaleString(),
        },
        {
            id: 4,
            userId: "1",
            name: "Finish code the personatask",
            description: "Description 4",
            status: "due",
            deadline: new Date('2024-09-17T20:19').toLocaleString(),
        }
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
                if (task.id === id) {
                    return {
                        ...task,
                        ...data,
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