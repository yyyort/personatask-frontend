import { CreateNoteType, NoteModelType, UpdateNoteType } from "@/model/notes.model";
import { GetUserType } from "@/model/users.model";

export const GetNoteService = async (user: GetUserType, token: string) => {
  if (!user) {
    throw new Error("User not found");
  }

  try {
    const response = await fetch(`/api/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message);
    }

    const jsonData: NoteModelType[] = await response.json();

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetSpecificNoteService = async (
  id: string,
  user: GetUserType,
  token: string
) => {
  if (!user) {
    throw new Error("User not found");
  }

  try {
    const response = await fetch(`/api/notes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message);
    }

    const parsedData: NoteModelType = await response.json();

    return parsedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const CreateNoteService = async (
  data: CreateNoteType,
  user: GetUserType,
  token: string
) => {
  if (!user) {
    throw new Error("User not found");
  }

  try {
    const response = await fetch(`/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const UpdateNoteService = async (
  id: string,
  token: string,
  data: UpdateNoteType,
) => {

  if (token === "") {
    throw new Error("Token not found");
  }

  try {
    const response = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    //check if status is 200 or ok
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message);
    }

  } catch (error) {
    console.error(error);
    throw error;
  }
};