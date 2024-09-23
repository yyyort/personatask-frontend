
import AddTask from "@/components/tasks/add-task";
import { TasksList } from "@/components/tasks/tasks-list";

import React from "react";

export default function Tasks() {

  return (
    <div className="flex flex-col">
      <div className="flex justify-end ppl">
        <AddTask />
      </div>

      <TasksList />
    </div>
  );
}
