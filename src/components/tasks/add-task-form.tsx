"use client";
import { FormCreateTaskSchema, FormCreateTaskType } from "@/model/tasks.model";
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
import UseTask from "@/hooks/use-task";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

export default function AddTaskForm() {
  const { AddTaskToServer } = UseTask();

  const form = useForm<z.infer<typeof FormCreateTaskSchema>>({
    resolver: zodResolver(FormCreateTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "due",
    },
  });

  const onSubmit: SubmitHandler<FormCreateTaskType> = (formData) => {
    try {
      console.log("form data", formData);

      //parse time todo and dealine to data
      const timeTodo = formData.timeTodo
        ? new Date(formData.timeTodo).toTimeString()
        : null;
      const deadline = formData.deadline ? new Date(formData.deadline) : null;

      console.log(timeTodo);

      AddTaskToServer({
        ...formData,
        status: formData.status ?? "due",
        timeTodo: timeTodo ? new Date(timeTodo) : null,
        deadline,
      });
      form.reset();
    } catch (error) {
      console.error(error);
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

        <div className="flex gap-2 justify-center items-center">
          {/* time todo field */}
          <FormField
            control={form.control}
            name="timeTodo"
            disabled={form.formState.isSubmitting}
            rules={{
              
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>time todo</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    value={field.value ? field.value.toISOString().substring(11, 16) : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
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
          Add Task
        </Button>
      </form>
    </Form>
  );
}
