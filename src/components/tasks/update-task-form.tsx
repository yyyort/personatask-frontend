"use client";
import {
  GetTaskType,
  UpdateTaskSchema,
  UpdateTaskType,
} from "@/model/tasks.model";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import { UpdateTaskService } from "@/service/taskService";
import { useAuthStore } from "@/state/authState";
import { useQueryClient } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

export default function UpdateTaskForm({ task }: { task: GetTaskType }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const auth = useAuthStore((state) => state.auth);

  const form = useForm<z.infer<typeof UpdateTaskSchema>>({
    resolver: zodResolver(UpdateTaskSchema),
    defaultValues: {
      name: task.name,
      description: task.description,
      status: task.status,
      timeTodo: task.timeTodo!.toString(),
      deadline: task.deadline,
    },
  });

  const onSubmit: SubmitHandler<UpdateTaskType> = async (formData) => {
    try {
      await UpdateTaskService(
        auth.token,
        task.id,
        formData
      );

      // show toast
      toast({
        title: "Task Updated",
        description: "Task has been updated successfully",
      });

      //invalidate query
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

    } catch (error: unknown) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Task Update Failed",
        description: (error as Error).message,
      });
    }
  };

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
                  defaultValue={field.value ?? task.status}
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

        <div className="flex gap-2 justify-center items-center">
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
                    type="time"
                    {...field}
                    value={field.value ?? ""}
                    />
                </FormControl>
              </FormItem>
            )}
          />

          {/* deadline field */}
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="pt-2">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
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
          Update Task
        </Button>
      </form>
    </Form>
  );
}
