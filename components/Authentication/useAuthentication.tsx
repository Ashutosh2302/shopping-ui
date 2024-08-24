import api from "@/utils/axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

interface AuthAPI {
    signup: (email: string, username: string, password: string) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
}

export const useAuthentication = (): AuthAPI => {
    const router = useRouter()
    const signup = async (email: string, username: string, password: string) => {
        try {
            await api
                .post(`/signup`, { email, username, password })
                .then(() => {
                    toast.success("Signup success, please login")
                    router.push(`/login`)
                });
        } catch (e) {
            toast.error("Failed to Signup")
            console.log(e);
        }
    }

    const login = async (username: string, password: string) => {
        try {
            await api
                .post(`/login`, { username, password })
                .then((response) => {
                    localStorage.setItem('access_token', response.data.accessToken);
                    toast.success("Login succes")
                    router.push(`/shoppinglists`)
                });
        } catch (e) {
            toast.error("Failed to login")
            console.log(e);
        }
    }

    return { login, signup }
};