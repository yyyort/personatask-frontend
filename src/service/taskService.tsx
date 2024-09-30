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
    const res = await fetch(`/api/tasks`, {
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

export const GetAllTaskService = async (token: string) => {
  try {
    const res = await fetch(`/api/tasks`, {
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
  token: string
) => {
  try {
    const res = await fetch(`/api/tasks/${taskId}`, {
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
  token: string,
  id: number,
  status: "done" | "due" | "overdue"
) => {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: status }),
    });

    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message);
    }
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const UpdateTaskService = async (
  token: string,
  id: number,
  data: UpdateTaskType
) => {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
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
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const DeleteTaskService = async (
  token: string,
  id: number,
) => {
  try {
    const res= await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
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
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};