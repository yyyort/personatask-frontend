"use client";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import SidebarLinks from "./sidebar-links";
import { ModeToggle } from "../ui/mode-toggle";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Logout from "./logout";
import { useAuthStore } from "@/state/authState";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const auth = useAuthStore((state) => state.auth);

  return (
    <div
      className={cn(
        "h-screen bg-slate-200 flex flex-col justify-between items-center py-5 ease-in-out duration-500",
        expanded ? "w-[8rem]" : "w-[5rem]"
      )}
    >
      <div className="flex-flex-col py-5">
        {/* user info */}
        <div className="flex flex-col gap-2 place-items-center">
          <div className="flex">
            <User />
            <p className={cn("", expanded ? "" : "hidden")}>name</p>
          </div>

          <div className="relative flex items-center pt-5">
            <ModeToggle />

            {/* expanded */}
            <div className={
              cn("absolute top-5 -right-10 ease-in-out duration-500",
                expanded ? "-right-16" : "-right-10"
              )
            }>
              <button
                className="bg-slate-200 text-black p-2 rounded-md"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ChevronRight /> : <ChevronLeft />}
              </button>
            </div>
          </div>
        </div>

        {/* links */}
        <div className="flex flex-col py-20 gap-2">
          <SidebarLinks isExpanded={expanded} />
        </div>
      </div>

      {/* logout */}
      <Logout isExpanded={expanded} />
    </div>
  );
}
