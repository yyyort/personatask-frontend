import { Button } from "@/components/ui/button";
import { GetNoteType } from "@/model/notes.model";
import { EllipsisVertical, Eye, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Notes() {
  const notes = await fetch("http://localhost:3000/api/notes", {
    cache: "no-cache",
  }).then((res) => res.json());

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
        {notes.map((note: GetNoteType) => (
          <NoteContainer key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export function NoteContainer({ note }: { note: GetNoteType }) {
  return (
    <>
      <div
        className="flex flex-col bg-slate-50 my-4 p-4 gap-2 overflow-hidden rounded-md
       hover:shadow-lg transition-shadow duration-100 ease-in-out
       "
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
