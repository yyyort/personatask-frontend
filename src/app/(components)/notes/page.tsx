"use client";
import { Button } from "@/components/ui/button";
import { NoteModelType } from "@/model/notes.model";
import {
  Plus,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { NoteContainer } from "@/components/notes/note-container";
import useNote from "@/hooks/use-note";

export default function Notes() {
  const {
    notes
  } = useNote();


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



