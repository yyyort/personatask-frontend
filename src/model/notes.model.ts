import { z } from "zod";


export const NoteModelSchema = z.object({
    id: z.number(),
    userId: z.string(),
    title: z.string(),
    content: z.string().optional().default(""),
    pinned: z.boolean().default(false),
    favorite: z.boolean().nullable().optional(),
    group : z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const CreateNoteSchema = NoteModelSchema.pick({ title: true, content: true });
export const UpdateNoteSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export const ArrayNoteModelSchema = z.array(NoteModelSchema);


export type NoteModelType = z.infer<typeof NoteModelSchema>;
export type CreateNoteType = z.infer<typeof CreateNoteSchema>;
export type UpdateNoteType = z.infer<typeof UpdateNoteSchema>;

export const GroupNoteSchema = z.object({
    id: z.string(),
    notes: z.array(NoteModelSchema),
})
export const UpdateGroupNoteSchema = z.object({
    id: z.string().optional().nullable(),
    notes: z.array(NoteModelSchema).optional().nullable(),
})
export type GroupNoteType = z.infer<typeof GroupNoteSchema>;
export type UpdateGroupNoteType = z.infer<typeof UpdateGroupNoteSchema>;
export const ArrayGroupNoteSchema = z.array(GroupNoteSchema);

