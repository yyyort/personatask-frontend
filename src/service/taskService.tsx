import {
  CreateTaskType,
  GetTaskType,
  UpdateTaskType,
} from "@/model/tasks.model";

export const CreateTaskService = async (
  data: CreateTaskType,
  userId: string,
  token: string
) => {
  try {
    const res = await fetch(`/api/tasks/${userId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message);
    }

    const parsedData: GetTaskType = await res.json();

    return parsedData;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const GetAllTaskService = async (userId: string, token: string) => {
  try {
    const res = await fetch(`/api/tasks/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message);
    }

    const parsedData: GetTaskType[] = await res.json();

    return parsedData;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const GetTaskService = async (
  taskId: string,
  userId: string,
  token: string
) => {
  try {
    const res = await fetch(`/api/tasks/${userId}/${taskId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message);
    }

    const parsedData: GetTaskType = await res.json();

    return parsedData;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const UpdateTaskStatusService = async (
  userId: string,
  token: string,
  id: number,
  status: "done" | "due" | "overdue"
) => {
  try {
    await fetch(`/api/tasks/${userId}/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: status }),
    });
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const UpdateTaskService = async (
  userId: string,
  token: string,
  id: number,
  data: UpdateTaskType
) => {
  try {
    await fetch(`/api/tasks/${userId}/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
