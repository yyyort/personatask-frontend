import { NoteModelType } from "@/model/notes.model";
import DOMPurify from "dompurify";
import { Pin, Sparkle } from "lucide-react";
import { useRouter } from "next/navigation";
import { PopoverMenuNote } from "./note-popover-menu";

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
          <div
            dangerouslySetInnerHTML={
              // render the content as html
              { __html: DOMPurify.sanitize(note.content!) }
            }
            className="h-100 overflow-hidden"
          />
        </div>
      </>
    );
  }