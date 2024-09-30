"use client";
import React from "react";
import {
  closestCenter,
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  useDroppable,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { useTasksStore } from "@/state/tasksState";
import { GetTaskType } from "@/model/tasks.model";
import { TaskContainer } from "./task-container";
import { GripVertical, Trash2 } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import UseTask from "@/hooks/use-task";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
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

export type columnType = {
  id: string;
  title: string;
  tasks: GetTaskType[];
};

export default function DndTask() {
  UseTask();
  const tasks = useTasksStore((state) => state.tasks);
  const setTasks = useTasksStore((state) => state.setTasks);
  const changeTaskStatus = useTasksStore((state) => state.changeTaskStatus);
  const [acitveId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = React.useState<UniqueIdentifier | null>(null);
  const [trashTaskId, setTrashTaskId] = React.useState<UniqueIdentifier | null>(
    null
  );

  const columns: columnType[] = [
    {
      id: "due",
      title: "Due",
      tasks: tasks.filter((task) => task.status === "due"),
    },
    {
      id: "done",
      title: "Done",
      tasks: tasks.filter((task) => task.status === "done"),
    },
    {
      id: "overdue",
      title: "Overdue",
      tasks: tasks.filter((task) => task.status === "overdue"),
    },
  ];

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const onDragMove = (event: DragMoveEvent) => {
    const { active, over, collisions } = event;
    const activeColumn = columns.find((column: columnType) =>
      column.tasks.find((task) => task.id === active.id)
    );
    const overColumn = columns.find((column: columnType) =>
      column.tasks.find((task) => task.id === over?.id)
    );
    const activeTask = tasks.find((task) => task.id === active.id);

    const columnIdFromCollisions = collisions![0].id;

    if (!columnIdFromCollisions) {
      return;
    }

    if (active.id !== over?.id) {
      if (activeColumn?.id !== overColumn?.id) {
        //change status if dragging over different column that has a task
        if (overColumn && overColumn.tasks.length > 0) {
          if (activeTask && overColumn) {
            if (overColumn === undefined) {
              return;
            } else {
              changeTaskStatus(
                activeTask.id,
                overColumn.id as "due" | "done" | "overdue"
              );
            }
          }
        } else {
          //change status if dragging over a column that has no task
          if (activeTask && columnIdFromCollisions) {
            if (
              columnIdFromCollisions === undefined ||
              typeof columnIdFromCollisions !== "string"
            ) {
              return;
            } else {
              setOverId(columnIdFromCollisions);
              if (columnIdFromCollisions !== "trash") {
                changeTaskStatus(
                  activeTask.id,
                  columnIdFromCollisions as "due" | "done" | "overdue"
                );
              }
            }
          }
        }
      }
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over, collisions } = event;
    const activeColumn = columns.find((column: columnType) =>
      column.tasks.find((task) => task.id === active.id)
    );
    const overColumn = columns.find((column: columnType) =>
      column.tasks.find((task) => task.id === over?.id)
    );

    //dragging over a column that has a task
    if (active.id !== over?.id) {
      if (activeColumn?.id === overColumn?.id) {
        const activeTaskIndex = tasks.findIndex(
          (task) => task.id === active.id
        );

        const overTaskIndex = tasks.findIndex((task) => task.id === over?.id);

        if (!overTaskIndex || !activeTaskIndex) {
          return;
        } else {
          const newTasks = arrayMove(tasks, activeTaskIndex, overTaskIndex);

          setTasks(newTasks);
        }
      }

      const columnIdFromCollisions = collisions![0].id;

      if (columnIdFromCollisions === "trash") {
        setTrashTaskId(active.id);
      }
    }
  };

  const onDragCancel = (event: DragCancelEvent) => {
    const { collisions } = event;

    const columnIdFromCollisions = collisions![0].id;

    if (!columnIdFromCollisions) {
      return;
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div className="flex gap-4">
        <SortableContext items={columns.map((column) => column.id)}>
          {columns.map((column) => (
            <TaskColumn key={column.id} column={column} />
          ))}
        </SortableContext>
        <DragToTrash />
      </div>
      {createPortal(
        <DragOverlay>
          {acitveId ? (
            <DraggleContainer
              task={tasks.find((task) => task.id === acitveId) as GetTaskType}
              className={
                overId === "trash" ? "bg-red-100 border-red-300 border-2" : ""
              }
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
      <AlertDialog
        open={trashTaskId !== null}
        onOpenChange={() => setTrashTaskId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conformation?</AlertDialogTitle>
            <AlertDialogDescription>
              Removing {tasks.find((task) => task.id === trashTaskId)?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DndContext>
  );
}

export function TaskColumn({ column }: { column: columnType }) {
  const { attributes, setNodeRef, transform, transition } = useSortable({
    id: column.id,
    disabled: true,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      className={cn("w-full flex flex-col gap-4 items-start cursor-default")}
    >
      <h1>{column.title}</h1>
      <SortableContext items={column.tasks.map((task) => task.id)}>
        {column.tasks.map((task) => (
          <DraggleContainer key={task.id} task={task} />
        ))}
      </SortableContext>
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "task" } });

  return (
    <div
      className={cn(
        "flex gap-2 items-center justify-between w-full p-2 bg-white rounded-md shadow-md",
        isDragging ? "opacity-30" : "",
        className && `${className}`
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <div className="w-full">
        <TaskContainer task={task} />
      </div>

      <GripVertical {...listeners} />
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
        "w-1/2 h-[20rem] bg-red-200 text-white rounded-md flex items-center justify-center",
        isOver ? "bg-red-300" : ""
      )}
    >
      <Trash2 size={50} />
    </div>
  );
}
