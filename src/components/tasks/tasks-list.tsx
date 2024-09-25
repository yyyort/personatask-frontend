"use client";
import { GetTaskType } from "@/model/tasks.model";
import { useTasksStore } from "@/state/tasksState";
import { TaskContainer } from "./task-container";

export function TasksList() {
  const tasks = useTasksStore((state) => state.tasks);

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
    <>
      <div className="flex flex-col gap-2 p-2 w-full">
        <h1 className="font-semibold font-sans text-2xl">overdue tasks</h1>
        {tasks.map((tasks) => (
          <div key={tasks.id}>
            <TaskContainer task={tasks} />
          </div>
        ))}
      </div>
    </>
  );
}
