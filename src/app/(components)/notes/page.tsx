"use client";
import { Button } from "@/components/ui/button";
import { NoteModelType } from "@/model/notes.model";
import { GetNoteService } from "@/service/notesService";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical, Pin, PinIcon, Plus, Sparkle, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/state/authState";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Notes() {
  const auth = useAuthStore((state) => state.auth);

  const { data } = useQuery({
    queryFn: () => GetNoteService(auth.user, auth.token),
    queryKey: ["notes"],
    enabled: !!auth.token, // only fetch when auth is available
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
        {data?.map((note: NoteModelType) => (
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

          <div className="flex items-center gap-2">
            {
              // if note is pinned, show pin icon
              String(note.pinned) === "true" && (
                <Pin size={24} className="text-blue-500 cursor-pointer" />
              )
            }

            {
              // if note is favorite, show sparkle icon
              String(note.favorite) === "true" && (
                <Sparkle size={24} className="text-yellow-500" />
              )
            }

            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PopoverMenuNote note={note} />
            </div>
          </div>
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

function PopoverMenuNote({ note }: { note: NoteModelType }) {
  const onFavorite = () => {};
  const onPin = () => {};
  const onDelete = () => {};

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} className="m-0 p-0 hover:bg-slate-200">
            <EllipsisVertical size={24} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 w-fit">
          <Button variant={"outline"} className="flex gap-2 items-center justify-start hover:shadow-md" onClick={onFavorite}>
            <Sparkle/>
            {
              String(note.favorite) === "true" ? "Unfavorite" : "Favorite"
            }
          </Button>
          <Button variant={"outline"} className="flex gap-2 justify-start hover:shadow-md" onClick={onPin}>
            <PinIcon/>
            {
              String(note.pinned) === "true" ? "Unpin" : "Pin"
            }
          </Button>
          <Button variant={"outline"} className="flex gap-2 justify-start hover:shadow-md" onClick={onDelete}>
            <Trash2/>
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
