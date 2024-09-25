"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateNoteSchema } from "@/model/notes.model";
import { GetUserType } from "@/model/users.model";
import { RefreshTokenApi } from "@/service/authService";
import { GetSpecificNoteService } from "@/service/notesService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Note({
  params: { noteId },
}: {
  params: { noteId: string };
}) {
  const queryClient = useQueryClient();

  const { data: note, isLoading } = useQuery({
    queryFn: async () => {
      const data:
        | {
            token: string;
            user: GetUserType;
          }
        | undefined = await queryClient.ensureQueryData({
        queryKey: ["refreshToken"],
        queryFn: () => RefreshTokenApi(),
      });

      console.log(data);

      return GetSpecificNoteService(noteId, data!.user, data!.token);
    },
    queryKey: ["note", noteId],
    enabled: !!noteId, // only fetch when noteId is available
    staleTime: Infinity,
    retry: 3,
  });

  const form = useForm<z.infer<typeof CreateNoteSchema>>({
    resolver: zodResolver(CreateNoteSchema),
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="">
      <Form {...form}>
        <form className="flex flex-col gap-5 my-10">
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
                      defaultValue={note?.title}
                      className="w-[40rem] outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* submit */}
            <Button variant={"outline"}>
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
                    defaultValue={
                      note?.content
                    }
                    value={field.value}

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
