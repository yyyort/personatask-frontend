import { NoteModelType } from "@/model/notes.model";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EllipsisVertical, PinIcon, Sparkle, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import useNote from "@/hooks/use-note";

export function PopoverMenuNote({ note }: { note: NoteModelType }) {
    const {
        onDelete,
        onFavorite,
        onPin,
        } = useNote();
  
    const isFavorite: boolean = String(note.favorite) === "true";
    const isPinned: boolean = String(note.pinned) === "true";
  
    
  
    return (
      <>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} className="m-0 p-0 hover:bg-slate-200">
              <EllipsisVertical size={24} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 w-fit">
            <Button
              variant={"outline"}
              className="flex gap-2 items-center justify-start hover:shadow-md"
              onClick={() => onFavorite(note.id, isFavorite)}
            >
              <Sparkle />
              {isFavorite ? "Unfavorite" : "Favorite"}
            </Button>
            <Button
              variant={"outline"}
              className="flex gap-2 justify-start hover:shadow-md"
              onClick={() => onPin(note.id, isPinned)}
            >
              <PinIcon />
              {isPinned ? "Unpin" : "Pin"}
            </Button>
  
            {/* delete */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"default"}
                    type="button"
                    className="flex gap-2 items-center justify-start"
                  >
                    <Trash2 />
                    Delete
                  </Button>
                </AlertDialogTrigger>
  
                <AlertDialogContent>
                  <AlertDialogTitle>
                    Are you sure you want to delete this note?
                  </AlertDialogTitle>
                  
                  <AlertDialogDescription>
                    Permanently delete this note. This action cannot be undone.
                  </AlertDialogDescription>
  
                  <AlertDialogFooter>
                    <AlertDialogCancel>cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(note.id)}
                    >yes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </PopoverContent>
        </Popover>
      </>
    );
  }
  