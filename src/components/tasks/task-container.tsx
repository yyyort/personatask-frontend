"use client";
import { GetTaskType } from "@/model/tasks.model";
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
import { useToast } from "@/hooks/use-toast";
import { UpdateTaskStatusService } from "@/service/taskService";
import { useAuthStore } from "@/state/authState";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export function TaskContainer({ task }: { task: GetTaskType }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const auth = useAuthStore((state) => state.auth);

  const updateStatus = (status: "done" | "due" | "overdue") => {
    try {
      UpdateTaskStatusService(auth.user.id, auth.token, task.id, status);
      toast({
        title: "Task Updated",
        description: "Task has been updated successfully",
      });
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
    <>
      <div className="flex flex-row items-center gap-2 bg-slate-100 px-2 py-1 rounded-md h-12 overflow-hidden hover:bg-slate-200">
        <div className="flex items-center">
          <Checkbox
            className="hover:bg-slate-800"
            checked={task.status === "done"}
            onCheckedChange={(checked) => {
              if (checked) {
                updateStatus("done");
              } else {
                if (task.status === "done") {
                  updateStatus("due");
                } else {
                  updateStatus("overdue");
                }
              }
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm font-semibold overflow-hidden">{task.name}</p>
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
