import { CreateUserType, GetUserType, SignInUserType } from "@/model/users.model";

export const SignInApi = async (formData: SignInUserType) => {
    try {
        const data = await fetch('api/user/signin', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: formData.email, password: formData.password })
        })

        //check if status is 200 or
        if (!data.ok) {
            const errorMessage = await data.json();
            throw new Error(errorMessage.message);
        }

        const responseData: { id: string; email: string; } = await data.json();
        
        
       

        return responseData;
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

        return data.json()
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

        return data.json()
    } catch (error: any) {
        console.error(error)
        throw error;
    }
}
