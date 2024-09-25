"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  CreateNoteSchema,
  CreateNoteType,
  NoteModelType,
} from "@/model/notes.model";
import { GetUserType } from "@/model/users.model";
import { CreateNoteService } from "@/service/notesService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function AddNote() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const data:
    | {
        token: string;
        user: GetUserType;
      }
    | undefined = queryClient.getQueryData(["refreshToken"]);

  const form = useForm<z.infer<typeof CreateNoteSchema>>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<CreateNoteType> = async (formData) => {
    try {
      const res = await CreateNoteService(formData, data!.user, data!.token);

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

      //wait for 1 second before redirecting

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
                  value={field.value ?? ""}
                  className="h-[80vh] outline-none focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
