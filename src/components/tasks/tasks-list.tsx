"use client";
import { GetTaskType } from "@/model/tasks.model";
import { useTasksStore } from "@/state/tasksState";
import { Checkbox } from "../ui/checkbox";

export function TasksList() {
  const tasks = useTasksStore((state) => state.tasks);

  return (
    <div className="flex gap-10">
      {/* due task */}
      <div className="flex flex-col">
        <h1 className="font-semibold text-lg">due tasks</h1>
        {tasks
          .filter((tasks) => tasks.status === "due")
          .map((tasks) => (
            <div key={tasks.id}>
              <TaskContainer task={tasks} />
            </div>
          ))}
      </div>

      <div className="flex flex-col">
        <h1 className="font-semibold text-lg">done tasks</h1>
        {tasks
          .filter((tasks) => tasks.status === "done")
          .map((tasks) => (
            <div key={tasks.id}>
              <TaskContainer task={tasks} />
            </div>
          ))}
      </div>
      {/* done task */}
    </div>
  );
}

function TaskContainer({ task }: { task: GetTaskType }) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={task.status === "done"} />
      <h1 className="text-base">{task.name}</h1>
    </div>
  );
}
