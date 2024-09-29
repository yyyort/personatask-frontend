"use client";

import { Tiptap } from "@/components/notes/tiptap";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  CreateNoteSchema,
  CreateNoteType,
  NoteModelType,
} from "@/model/notes.model";
import { CreateNoteService } from "@/service/notesService";
import { useAuthStore } from "@/state/authState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function AddNote() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const auth = useAuthStore((state) => state.auth);

  const form = useForm<z.infer<typeof CreateNoteSchema>>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<CreateNoteType> = async (formData) => {
    try {
      //sanitize content
      const cleanContent = DOMPurify.sanitize(formData.content);

      const res = await CreateNoteService(
        {
          title: formData.title,
          content: cleanContent,
        }
        , auth!.user, auth!.token);

      //if response is not ok
      if (!res.ok) {
        const errorMessage = await res.json();
        toast({
          variant: "destructive",
          title: "Note Add Failed",
          description: errorMessage.message,
        });
      }

      //if response is ok
      const parsedData: NoteModelType = await res.json();

      toast({
        title: "Note Added",
        description: "Note has been added successfully",
      });

      console.log(parsedData);

      //revalidate the query
      queryClient.invalidateQueries(
        {
          queryKey: ["notes"],
        }
      );

      router.replace(`/notes/${parsedData.id}`);
    } catch (error: unknown) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Note Add Failed",
        description: (error as Error).message,
      });
    }
  };

  return (
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
                    {...field}
                    className="w-[40rem] outline-none text-2xl border-slate-100"
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
                <Tiptap 
                  {...field} 
                  content={field.value} 
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
