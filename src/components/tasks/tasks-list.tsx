"use client";
import { GetTaskType } from "@/model/tasks.model";
import { useTasksStore } from "@/state/tasksState";
import { Checkbox } from "../ui/checkbox";
import { TaskContainer } from "./task-container";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import UpdateTaskForm from "./update-task-form";

export function TasksList() {
  const tasks = useTasksStore((state) => state.tasks);

  return (
    <div className="flex gap-10">
      {/* due task */}
      <div className="flex flex-col gap-2 items-center border-x-2 p-2 w-[18rem]">
        <h1 className="font-semibold text-lg self-start mx-8">due tasks</h1>
        {tasks
          .filter((tasks) => tasks.status === "due")
          .map((tasks) => (
            <div key={tasks.id}>
              <TaskContainer task={tasks} />
            </div>
          ))}
      </div>

      {/* done task */}
      <div className="flex flex-col gap-2 items-center border-x-2 p-2 w-[18rem]">
        <h1 className="font-semibold text-lg">done tasks</h1>
        {tasks
          .filter((tasks) => tasks.status === "done")
          .map((tasks) => (
            <div key={tasks.id}>
              <TaskContainer task={tasks} />
            </div>
          ))}
      </div>

      {/* overdue task */}
      <div className="flex flex-col gap-2 items-center border-x-2 p-2 w-[18rem]">
        <h1 className="font-semibold text-lg">overdue tasks</h1>
        {tasks
          .filter((tasks) => tasks.status === "overdue")
          .map((tasks) => (
            <div key={tasks.id}>
              <TaskContainer task={tasks} />
            </div>
          ))}
      </div>
    </div>
  );
}
