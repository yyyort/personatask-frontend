"use client";
import { Button } from "@/components/ui/button";
import { NoteModelType } from "@/model/notes.model";
import { GetNoteService } from "@/service/notesService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/state/authState";

export default function Notes() {
  const queryClient = useQueryClient();
  const auth = useAuthStore((state) => state.auth);

  const { data: notes } = useQuery({
    queryFn: () => GetNoteService(auth.user, auth.token),
    queryKey: ["notes"],
    enabled: !!auth,
    staleTime: Infinity,
  });

  return (
    <div className="w-full max-h-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold p-2 py-5">Notes</h1>
        <Link href="/notes/add">
          <Button variant={"ghost"} className="flex text-lg">
            <Plus size={24} />
            <p>Add Note</p>
          </Button>
        </Link>
      </div>
      <div className="columns-4 gap-4">
        {notes?.map((note: NoteModelType) => (
          <NoteContainer key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export function NoteContainer({ note }: { note: NoteModelType }) {
  const router = useRouter();

  return (
    <>
      <div
        className="flex flex-col bg-slate-50 my-4 p-4 gap-2 overflow-hidden rounded-md
       hover:shadow-lg transition-shadow duration-100 ease-in-out
        cursor-pointer
       "
        onClick={() => router.push(`/notes/${note.id}`)}
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{note.title}</p>
          <Button variant={"ghost"} className="m-0 p-0 hover:bg-slate-200">
            <EllipsisVertical size={24} />
          </Button>
        </div>
        <p className="">
          {
            // truncate the content
            note.content!.length > 700
              ? note.content!.slice(0, 500) + " ..."
              : note.content
          }
        </p>
      </div>
    </>
  );
}
