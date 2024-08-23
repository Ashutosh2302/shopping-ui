import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { LoginPayload } from "@/types/user";
import api from "@/utils/axios";
import { Signup } from "../Signup/Signup";
import Link from "next/link";


export const Login: React.FC = () => {
    const router = useRouter()
    const [{ username, password }, setLoginDetails] =
        useState<LoginPayload>({
            username: "",
            password: ""
        });

    const updateFields = (updatedFields: Partial<LoginPayload>) => {
        setLoginDetails(details => ({ ...details, ...updatedFields }));
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
        updateFields({ username });
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        updateFields({ password });
    };

    const login = async () => {
        if (!username) { toast.error("Username is required"); return }
        if (!password) { toast.error("Password is required"); return }
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

    const renderForm = () => {
        return <>
            <h2>Login</h2>
            <label>Username*</label>
            <div><input type="text" onChange={handleUsernameChange} /></div>
            <label>Password*</label>
            <div><input type="password" onChange={handlePasswordChange} /></div>
            <br />
            <button onClick={login}>Login</button>
        </>
    }

    return <> {renderForm()} <Link href="/signup">Signup</Link></>
}


