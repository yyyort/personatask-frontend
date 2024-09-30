"use client";
import React, { act } from "react";
import {
  closestCorners,
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { columnType, useTasksStore } from "@/state/tasksState";
import { GetTaskType } from "@/model/tasks.model";
import { TaskContainer } from "./task-container";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import UseTask from "@/hooks/use-task";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export default function DndTask() {
  const { UpdateTasksFromServer, RemoveTaskFromServer } = UseTask();
  const columns: columnType[] = useTasksStore((state) => state.columns);
  const changeTaskStatus = useTasksStore((state) => state.changeTaskStatus);
  const [activeTask, setActiveTask] = React.useState<GetTaskType | null>(null);
  const [activeColumn, setActiveColumn] = React.useState<columnType | null>(
    null
  );
  const [overId, setOverId] = React.useState<UniqueIdentifier | null>(null);

  const handleDragstart = (event: DragStartEvent) => {
    const { active } = event;

    if (!active) {
      return;
    }

    const columnActive = columns.find((column) =>
      column.tasks.some((task) => task.id === active.id)
    );

    if (!columnActive) {
      return;
    }

    const taskActive = columnActive.tasks.find((task) => task.id === active.id);

    if (!taskActive || !columnActive) {
      return;
    }

    setActiveTask(taskActive);
    setActiveColumn(columnActive);
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { collisions } = event;

    const overCollisionId = collisions![0].id;

    if (overCollisionId === undefined) {
      return;
    }

    if (!activeTask || !activeColumn) {
      return;
    }

    //moving over other column
    if (overCollisionId !== "trash") {
      changeTaskStatus(
        activeTask!.id,
        overCollisionId as "due" | "done" | "overdue"
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, collisions } = event;

    if (!active || !over) {
      return;
    }

    if (active.id === over!.id) {
      return;
    }

    if (!collisions || !activeTask || !activeColumn) {
      return;
    }

    const overCollisionId = collisions[0].id;

    if (overCollisionId === undefined) {
      return;
    }

    //moving over other column
    if (active.id !== over.id && activeTask.status !== activeColumn.id) {
      if (overCollisionId !== "trash") {
        changeTaskStatus(
          activeTask!.id,
          overCollisionId as "due" | "done" | "overdue"
        );
        UpdateTasksFromServer(
          activeTask!.id,
          overCollisionId as "due" | "done" | "overdue"
        );
      }
    }

    if (overCollisionId === "trash") {
      changeTaskStatus(activeTask!.id, activeColumn.id);
      setOverId(overCollisionId);
    }
  };

  const handleCancel = (event: DragCancelEvent) => {
    const { active, over, collisions } = event;

    if (!active || !over || !collisions) {
      return;
    }

    if (!activeTask || !activeColumn) {
      return;
    }

    if (active.id === over.id) {
      return;
    }
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragstart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4">
        {columns.map((column) => (
          <TaskColumn key={column.id} column={column} />
        ))}
        <DragToTrash />
      </div>
      <DragOverlay adjustScale={false} className="">
        {activeTask ? (
          <DraggleContainer
            task={activeTask}
            className={
              overId === "trash" ? "bg-red-100 border-red-300 border-2" : ""
            }
          />
        ) : null}
      </DragOverlay>

      <AlertDialog
        open={overId === "trash"}
        onOpenChange={() => setOverId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conformation</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Removing task{" "}
              <strong className="text-black">"{activeTask?.name}"</strong> from
              the server
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => RemoveTaskFromServer(activeTask!.id)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DndContext>
  );
}

export function TaskColumn({ column }: { column: columnType }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { accepts: ["task"] },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "w-full h-fit flex flex-col gap-4 items-start cursor-default p-4 rounded-md",
        isOver ? "bg-gradient-to-t from-gray-300 to-gray-100" : ""
      )}
    >
      <h1 className="text-2xl font-semibold">{column.title}</h1>
      {column.tasks.map((task) => (
        <DraggleContainer key={task.id} task={task} />
      ))}
    </div>
  );
}

export function DraggleContainer({
  task,
  className,
}: {
  task: GetTaskType;
  className?: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: { type: "task" },
  });

  return (
    <div
      className={cn(
        "flex gap-2 items-center justify-between w-full p-2 bg-white rounded-md shadow-md",
        isDragging ? "opacity-30" : "",
        className && `${className}`
      )}
      ref={setNodeRef}
      {...attributes}
    >
      <div className="w-full">
        <TaskContainer task={task} />
      </div>

      <GripVertical
        {...listeners}
        className="hover:scale-125 rounded-md p-1 cursor-move transition-all ease-in-out duration-200"
      />
    </div>
  );
}

export function DragToTrash() {
  const { setNodeRef, isOver } = useDroppable({
    id: "trash",
    data: {
      accepts: ["task"],
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "w-1/2 h-[20rem] bg-red-200 text-white rounded-md flex items-center justify-center mt-10",
        isOver ? "bg-red-300" : ""
      )}
    >
      <Trash2 size={50} />
    </div>
  );
}
