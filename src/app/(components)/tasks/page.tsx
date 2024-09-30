
import AddTask from "@/components/tasks/add-task";
import DndTask from "@/components/tasks/dnd-tasks";

import React from "react";

export default function Tasks() {

  return (
    <div className="flex flex-col">
      <div className="flex justify-end ppl">
        <AddTask />
      </div>

      {/* <TasksList /> */}
      <DndTask />
    </div>
  );
}
