"use client";
import { CreateTaskSchema, CreateTaskType } from "@/model/tasks.model";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTasksStore } from "@/state/tasksState";
import { useToast } from "@/hooks/use-toast";

export default function AddTaskForm() {
  const { toast } = useToast();
  const addTask = useTasksStore((state) => state.addTask);

  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "due",
    },
  });

  function onSubmit(data: CreateTaskType) {
    try {
      addTask(data);
      form.reset();
      toast({
        title: "Task Added",
        description: "Task has been added successfully",
      });
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Task Add Failed",
        description: (error as Error).message,
      });
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col items-start gap-3 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-4">
          {/* name field */}
          <FormField
            control={form.control}
            name="name"
            disabled={form.formState.isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="task name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* select status  */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="due" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="due">due</SelectItem>
                    <SelectItem value="done">done</SelectItem>
                    <SelectItem value="overdue">overdue</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          {/* time todo field */}
          <FormField
            control={form.control}
            name="timeTodo"
            disabled={form.formState.isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>time todo</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* deadline */}
          <FormField
            control={form.control}
            name="deadline"
            disabled={form.formState.isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>deadline</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* description */}
        <FormField
          control={form.control}
          name="description"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="task description"
                  {...field}
                  value={field.value || ""}
                  className="w-[25rem]"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* submit button */}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="ml-auto mt-2"
        >
          Add Task
        </Button>
      </form>
    </Form>
  );
}
