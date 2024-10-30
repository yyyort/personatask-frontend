import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useAuthStore } from "@/state/authState";
import {
  CreateTaskService,
  DeleteTaskService,
  GetAllTaskService,
  UpdateTaskStatusService,
} from "@/service/taskService";
import { useEffect } from "react";
import { columnType, useTasksStore } from "@/state/tasksState";
import { CreateTaskType } from "@/model/tasks.model";

export default function UseTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const auth = useAuthStore((state) => state.auth);
  const setColumns = useTasksStore((state) => state.setColumns);

  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => GetAllTaskService(auth.token),
    enabled: !!auth.token,
    retry: 4,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      const columns: columnType[] = [
        {
          id: "due" as "due" | "done" | "overdue",
          title: "Due",
          tasks: data.filter((task) => task.status === "due"),
        },
        {
          id: "done" as "due" | "done" | "overdue",
          title: "Done",
          tasks: data.filter((task) => task.status === "done"),
        },
        {
          id: "overdue" as "due" | "done" | "overdue",
          title: "Overdue",
          tasks: data.filter((task) => task.status === "overdue"),
        },
      ];

      setColumns(columns);
    }
  }, [data, setColumns]);

  const AddTaskToServer = async (data: CreateTaskType) => {
    try {
      await CreateTaskService(data, auth.token);

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      toast({
        title: "Task added",
        description: "Task added",
        variant: "default",
      });

    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to add task",
        description: "Failed to add task",
        variant: "destructive",
      });
    }
  };

  const UpdateTasksFromServer = async (
    id: number,
    status: "done" | "due" | "overdue"
  ) => {
    try {
      UpdateTaskStatusService(auth.token, id, status);

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      toast({
        title: "Tasks updated",
        description: "Tasks updated",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update tasks",
        description: "Failed to update tasks",
        variant: "destructive",
      });
    }
  };

  const RemoveTaskFromServer = async (id: number) => {
    try {
      await DeleteTaskService(auth.token, id);

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      toast({
        title: "Task removed",
        description: "Task removed",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to remove task",
        description: "Failed to remove task",
        variant: "destructive",
      });
    }
  };

  return { data, AddTaskToServer, UpdateTasksFromServer, RemoveTaskFromServer };
}
