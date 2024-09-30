import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useAuthStore } from "@/state/authState";
import { GetAllTaskService } from "@/service/taskService";
import { useEffect } from "react";
import { useTasksStore } from "@/state/tasksState";

export default function UseTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const auth = useAuthStore((state) => state.auth);
  const setTasks = useTasksStore((state) => state.setTasks);

  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => GetAllTaskService(auth.token),
    enabled: !!auth.token,
    retry: 4,
    staleTime: Infinity
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return { data };
}
