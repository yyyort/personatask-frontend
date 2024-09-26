"use client";
import { GetTaskType } from "@/model/tasks.model";
import { TaskContainer } from "./task-container";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllTaskService } from "@/service/taskService";
import { RefreshTokenApi } from "@/service/authService";

export function TasksList() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await queryClient.ensureQueryData({
        queryKey: ["refreshToken"],
        queryFn: RefreshTokenApi,
      });
      return await GetAllTaskService(data.user.id, data.token);
    },
    staleTime: Infinity
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const tasks = data ?? [];

  return (
    <div className="grid grid-cols-3">
      <Tasks tasks={tasks.filter((task) => task.status === "due")} />
      <Tasks tasks={tasks.filter((task) => task.status === "done")} />
      <Tasks tasks={tasks.filter((task) => task.status === "overdue")} />
    </div>
  );
}

function Tasks({ tasks }: { tasks: GetTaskType[] }) {
  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <h1 className="font-semibold font-sans text-2xl">overdue tasks</h1>
      {tasks.map((tasks) => (
        <div key={tasks.id}>
          <TaskContainer task={tasks} />
        </div>
      ))}
    </div>
  );
}
