"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UpdateNoteSchema, UpdateNoteType } from "@/model/notes.model";
import {
  GetSpecificNoteService,
  UpdateNoteService,
} from "@/service/notesService";
import { useAuthStore } from "@/state/authState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function Note({
  params: { noteId },
}: {
  params: { noteId: string };
}) {
  const auth = useAuthStore((state) => state.auth);
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return GetSpecificNoteService(noteId, auth!.user, auth!.token);
    },
    queryKey: ["note", noteId],
    enabled: !!noteId, // only fetch when noteId is available
    staleTime: Infinity,
    retry: 3,
  });

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

  const onSubmit: SubmitHandler<UpdateNoteType> = async (formData) => {
    try {
      console.log("formData", formData);

      await UpdateNoteService(noteId, auth.token, formData);
    } catch (error) {
      console.error(error);
      toast({
        title: "Note Update Failed",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          className="flex flex-col gap-5 my-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex justify-between">
            {/* title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="w-[40rem] outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* submit */}
            <Button variant={"outline"} type="submit">
              <p>save</p>
            </Button>
          </div>

          {/* content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-[80vh] outline-none focus-visible:ring-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
