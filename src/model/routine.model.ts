import { CreateTaskSchema, GetTaskSchema, TaskModelSchema } from "@/model/tasks.model";
import { z } from "zod";


export const RoutineModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    description: z.string().nullable().optional(),
    tasks: z.array(GetTaskSchema).optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateRoutineSchema = z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    tasks: z.array(CreateTaskSchema).optional().nullable(),
});
export const UpdateRoutineSchema = z.object({
    title: z.string().optional(),
    description: z.string().nullable().optional(),
});
export const GetRoutineSchema = RoutineModelSchema.omit({ createdAt: true, updatedAt: true });

export type RoutineModelType = z.infer<typeof RoutineModelSchema>;
export type CreateRoutineType = z.infer<typeof CreateRoutineSchema>;
export type UpdateRoutineType = z.infer<typeof UpdateRoutineSchema>;
export type GetRoutineType = z.infer<typeof GetRoutineSchema>;