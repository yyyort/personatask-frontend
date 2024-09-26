"use client";

import AddRoutine from "@/components/routine/add-routine";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GetTaskType } from "@/model/tasks.model";
import { GetRoutineType } from "@/model/routine.model";
import { GetAllRoutineService } from "@/service/routineService";
import { useAuthStore } from "@/state/authState";
import { useRoutinesStore } from "@/state/routinesStore";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React from "react";

export default function Routines() {
  const auth = useAuthStore((state) => state.auth);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["routines"],
    queryFn: () => GetAllRoutineService(auth),
    staleTime: Infinity,
    enabled: !!auth,
  });
  const addRoutine = useRoutinesStore((state) => state.addRoutine);
  const setAddRoutine = useRoutinesStore((state) => state.setAddRoutine);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-semibold p-2 py-5">Routines</h1>
        <Button
          variant={"ghost"}
          className="flex"
          onClick={() => setAddRoutine(!addRoutine)}
        >
          <Plus />
          <p className="text-base">Add Routine</p>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {addRoutine && <AddRoutine />}

        {data!.map((routine) => {
          return <RoutineContainer key={routine.id} {...routine} />;
        })}
      </div>
    </div>
  );
}

export function RoutineContainer(routine: GetRoutineType) {
  return (
      <div className="w-[35rem] h-fit rounded-sm shadow-md p-5">
        <h1 className="text-lg font-semibold">{routine.title}</h1>
        <div className="flex flex-col gap-4 py-5">
          {routine.tasks?.map((task) => (
            <RoutineTask key={task.id} {...task} />
          ))}
        </div>
      </div>
  );
}

function RoutineTask(task: GetTaskType) {
  return (
    <>
      <div className="flex flex-row items-center  gap-2 bg-slate-100 px-4 py-1 rounded-md h-12 overflow-hidden hover:bg-slate-200">
        <Checkbox checked={task.status === "done"} />
        <div className="flex justify-between w-full">
          <p className="text-base overflow-hidden">{task.name}</p>
          <p>
            {task.timeTodo
              ? `Time to do: ${task.timeTodo}`
              : new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </>
  );
}
