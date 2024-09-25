"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateNoteSchema } from "@/model/notes.model";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddNote() {
  const form = useForm<z.infer<typeof CreateNoteSchema>>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

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
                  <Input
                    {...field}
                    className="w-[40rem] outline-none focus-visible:ring-0"
                  />
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
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  className="h-[80vh] outline-none focus-visible:ring-0"
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
