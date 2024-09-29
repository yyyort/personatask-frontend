"use client";

import { Tiptap } from "@/components/notes/tiptap";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useNote from "@/hooks/use-note";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { UpdateNoteSchema, UpdateNoteType } from "@/model/notes.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pin, Sparkle } from "lucide-react";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function Note({
  params: { noteId },
}: {
  params: { noteId: number };
}) {
  const {
    onFavorite,
    onPin,
    onDelete,
    queryNote,
    updateNote
  } = useNote();

  const { data, isLoading } = queryNote(Number(noteId));

  const form = useForm<z.infer<typeof UpdateNoteSchema>>({
    resolver: zodResolver(UpdateNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Update form values when data is loaded
  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        content: data.content,
      });
    }
  }, [data, form]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  const onSubmit: SubmitHandler<UpdateNoteType> = (formData) => {
    updateNote(Number(noteId), formData);
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          className="flex flex-col gap-5 pt-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex gap-4 items-end">
            {/* title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-500">Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="w-[40rem] outline-none text-2xl border-slate-100 h-fit p-3"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* favorite */}
            <Button
              variant={"ghost"}
              className={cn(
                "text-lg",
                data?.favorite
                  ? "text-yellow-500 hover:text-yellow-600"
                  : "hover:text-yellow-500"
              )}
              onClick={() => onFavorite(noteId, data?.favorite ?? false)}
            >
              <Sparkle />
            </Button>

            {/* pin */}
            <Button
              variant={"ghost"}
              className={cn(
                "text-lg",
                data?.pinned
                  ? "text-blue-500 hover:text-blue-600"
                  : "hover:text-blue-500"
              )}
              onClick={() => onPin(noteId, data?.pinned ?? false)}
            >
              <Pin />
            </Button>
          </div>

          {/* content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-500">Content</FormLabel>
                <FormControl>
                  <Tiptap
                    {...field}
                    content={data?.content ?? field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* util button, delete, save, ... */}
          <div className="flex gap-3 ml-auto">
            {/* submit */}
            <Button variant={"outline"} type="submit" className="text-lg">
              {form.formState.isDirty ? "unsaved" : "save"}
            </Button>

            {/* delete */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={"default"}
                  type="button"
                  className="text-lg"
                >
                  delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogTitle>
                  Are you sure you want to delete this note?
                </AlertDialogTitle>
                
                <AlertDialogDescription>
                  Permanently delete this note. This action cannot be undone.
                </AlertDialogDescription>

                <AlertDialogFooter>
                  <AlertDialogCancel>cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={()=>onDelete(noteId)}
                  >yes</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </div>
  );
}
