import { AuthType } from "@/model/users.model";
import { CreateRoutineType, GetRoutineType } from "../model/routine.model";

export const GetAllRoutineService = async (auth: AuthType) => {
    try {
        const res = await fetch(`/api/routines`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch routines");
        }

        const parseData: GetRoutineType[] = await res.json();

        return parseData;
    } catch (error: unknown) {
        console.error(error);
        throw new Error;
    }
};

export const CreateRoutineService = async (auth: AuthType, routine: CreateRoutineType) => {
    try {
        const res = await fetch(`/api/routines`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify(routine),
        });

        if (!res.ok) {
            throw new Error("Failed to create routine");
        }

        const parseData: GetRoutineType = await res.json();

        return parseData;
    } catch (error: unknown) {
        console.error(error);
        throw new Error;
    }
}