"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRoutinesStore } from "@/state/routinesStore";
import { Trash2, X } from "lucide-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRoutineSchema, CreateRoutineType } from "@/model/routine.model";
import { Form, FormControl, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { CreateTaskType } from "@/model/tasks.model";
import { useToast } from "@/hooks/use-toast";
import { CreateRoutineService } from "@/service/routineService";
import { useAuthStore } from "@/state/authState";
import { useQueryClient } from "@tanstack/react-query";

export default function AddRoutine() {
  const setAddRoutine = useRoutinesStore((state) => state.setAddRoutine);
  const auth = useAuthStore((state) => state.auth);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(CreateRoutineSchema),
    defaultValues: {
      title: "",
      tasks: [
        {
          name: "",
          timeTodo: "",
          status: "due",
        },
      ] as CreateTaskType[],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  const onSubmit: SubmitHandler<CreateRoutineType> = async (formData) => {
    try {
      //create routine
      const res = await CreateRoutineService(auth, formData);
    
      toast({
        title: "Routine Added",
        description: `Routine ${res.title} has been added`,
      })

      //invalidate query
      queryClient.invalidateQueries({
        queryKey: ["routines"]
      });

      setAddRoutine(false);
    } catch (error: unknown) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-[40rem] rounded-sm shadow-md p-5">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">Add Routine</h1>
            <Button
              variant={"ghost"}
              onClick={() => {
                setAddRoutine(false);
              }}
            >
              <X />
            </Button>
          </div>

          <div className="flex flex-col gap-4 py-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Routine Name"
                    className="p-2 border border-slate-200 rounded-md text-lg"
                  />
                </FormControl>
              )}
            />
            <div className="flex flex-col gap-4">
              {fields.map((fields, index) => (
                <div key={fields.id} className="flex gap-4 items-center">
                  <FormField
                    control={form.control}
                    name={`tasks.${index}.name`}
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Task Name"
                          className="p-2 border border-slate-200 rounded-md text-base min-w-[20rem]"
                        />
                      </FormControl>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`tasks.${index}.timeTodo`}
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          type="time"
                          className="p-2 border border-slate-200 rounded-md text-base"
                        />
                      </FormControl>
                    )}
                  />

                  <Button
                    variant={"ghost"}
                    onClick={() => remove(index)}
                    type="button"
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="default"
                className="w-[5rem]"
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    timeTodo: "",
                    status: "due",
                  })
                }
              >
                Add Task
              </Button>

              <Button
                variant="default"
                className="w-[5rem]"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting" : "Submit"}
              </Button>

              {/* if theres error */}
              {form.formState.errors.root && (
                <div className="text-red-500 text-sm my-2">
                  {form.formState.errors.root.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
