import {
  DeleteNoteService,
  GetNoteService,
  GetSpecificNoteService,
  UpdateFavoriteService,
  UpdateNoteService,
  UpdatePinService,
} from "@/service/notesService";
import { useAuthStore } from "@/state/authState";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { UpdateNoteType } from "@/model/notes.model";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";

export default function useNote() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const auth = useAuthStore((state) => state.auth);
  const router = useRouter();

  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: () => GetNoteService(auth.token),
  });

  const queryNote = (id: number) =>
    useQuery({
      queryKey: ["note", id],
      queryFn: () => GetSpecificNoteService(id, auth.token),
      enabled: !!id,
    });

  //utility function

  //delete note
  const onDelete = (id: number) => {
    // delete
    try {
      DeleteNoteService(id, auth.token);

      toast({
        title: "Note Deleted",
        description: "Note has been deleted",
      });

      // invalidate query
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      // navigate to notes page
      router.push("/notes");
    } catch (error) {
      console.error(error);
      toast({
        title: "Note Delete Failed",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  };

  //favorite note
  const onFavorite = (id: number, isFavorite: boolean) => {
    // toggle favorite
    try {
      UpdateFavoriteService(id, auth.token, !isFavorite);

      toast({
        title: "Note Updated",
        description: "Note has been updated",
      });

      // invalidate query
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Note Update Failed",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  };

  const onPin = (id: number, isPinned: boolean) => {
    // toggle pin
    try {
      UpdatePinService(id, auth.token, !isPinned);

      toast({
        title: "Note Updated",
        description: "Note has been updated",
      });

      // invalidate query
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Note Update Failed",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  };

  const updateNote = async (id: number, data: UpdateNoteType) => {
    try {
      //sanitize content
      const cleanContent = DOMPurify.sanitize(data.content);

      await UpdateNoteService(id, auth.token, {
        ...data,
        content: cleanContent,
      });

      toast({
        title: "Note Updated",
        description: "Note has been updated",
      });

      //invalidate cache
      queryClient.invalidateQueries({
        queryKey: ["note", id],
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Note Update Failed",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  };

  return { notes, queryNote, onDelete, onFavorite, onPin, updateNote };
}
