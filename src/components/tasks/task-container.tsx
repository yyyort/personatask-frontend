"use client";
import { GetTaskType } from "@/model/tasks.model";
import { useTasksStore } from "@/state/tasksState";
import { Checkbox } from "../ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateTaskForm from "./update-task-form";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";

export function TaskContainer({ task }: { task: GetTaskType }) {
  const updateTask = useTasksStore((state) => state.updateTask);

  return (
    <>
      <div className="flex flex-row items-center gap-2 bg-slate-100 px-2 py-1 rounded-md h-12 overflow-hidden hover:bg-slate-200">
        <div className="flex items-center">
          <Checkbox
            className="hover:bg-slate-800"
            checked={task.status === "done"}
            onCheckedChange={(checked) => {
              updateTask({ status: checked ? "done" : "due" }, task.id);
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm font-semibold overflow-hidden">
              {task.name}
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Eye size={20} />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update task</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <UpdateTaskForm task={task} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
