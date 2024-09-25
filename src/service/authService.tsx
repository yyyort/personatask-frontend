import { CreateUserType, GetUserType, SignInUserType } from "@/model/users.model";

export const SignInApi = async (formData: SignInUserType) => {
    try {
        const res = await fetch('api/user/signin', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: formData.email, password: formData.password })
        })

        //check if status is 200 or ok

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new Error(errorMessage.message);
        }

        const parsedData: {
            token: string;
            user: GetUserType;
        } = await res.json();

        return parsedData;
    } catch (error: any) {
        console.error(error)
        throw error;
    }
}

export const SignUpApi = async (formData: CreateUserType) => {
    try {
        const data = await fetch('api/user/signup', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                email: formData.email, 
                password: formData.password, 
                confirmPassword: formData.confirmPassword
             })
        })

        //check if status is 200 or ok
        if (!data.ok) {
            const errorMessage = await data.json();
            throw new Error(errorMessage.message);
        }

        const parsedData: {
            token: string;
            user: GetUserType;
        } = await data.json();

        return parsedData;
    } catch (error: any) {
        console.error(error)
        throw error;
    }
}

export const SignOutApi = async () => {
    try {
        const data = await fetch('api/user/signout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        return data;
    } catch (error: any) {
        console.error(error)
        throw error;
    }
}
