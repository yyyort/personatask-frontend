
import { z } from "zod";

export const UserModelSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const CreateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});

export const SignInUserSchema = UserModelSchema.pick({ email: true, password: true });

export const GetUserSchema = UserModelSchema.pick({ email: true, id: true });
export const UpdateUserSchema = z.object({
    id: z.string(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
})

export type UserModelType = z.infer<typeof UserModelSchema>;
export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type SignInUserType = z.infer<typeof SignInUserSchema>;
export type GetUserType = z.infer<typeof GetUserSchema>;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;