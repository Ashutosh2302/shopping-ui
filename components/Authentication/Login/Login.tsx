import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { LoginPayload } from "@/types/user";
import api from "@/utils/axios";
import InputBox from "@/component-library/InputBox/InputBox";
import Button from "@/component-library/Button/Button";
import ActionLink from "@/component-library/Link/Link";

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
            <InputBox lable="Username" onValueChange={handleUsernameChange} mandatory />
            <InputBox lable="Password" onValueChange={handlePasswordChange} mandatory textType="password" />
            <br />
            <Button text="Login" onClick={login} />
        </>
    }

    return <> {renderForm()} <ActionLink href="/signup" text="Signup" /></>
}


