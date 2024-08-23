import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { LoginPayload, SignupPayload } from "@/types/user";
import api from "@/utils/axios";


export const Signup: React.FC = () => {
    const router = useRouter()
    const [{ email, username, password }, setLoginDetails] =
        useState<SignupPayload>({
            email: "",
            username: "",
            password: ""
        });

    const updateFields = (updatedFields: Partial<SignupPayload>) => {
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

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        updateFields({ email });
    };

    const handleSignup = async () => {
        if (!username) { toast.error("Username is required"); return }
        if (!password) { toast.error("Password is required"); return }
        if (!email) { toast.error("Password is required"); return }
        try {
            await api
                .post(`/signup`, { email, username, password })
                .then((r) => {
                    console.log("reee", r)
                    toast.success("Signup success, please login")
                    router.push(`/login`)
                });
        } catch (e) {
            toast.error("Failed to Signup")
            console.log(e);
        }
    }


    const renderForm = () => {
        return <>
            <h2>Login</h2>
            <label>Email*</label>
            <div><input type="text" onChange={handleEmailChange} /></div>
            <label>Username*</label>
            <div><input type="text" onChange={handleUsernameChange} /></div>
            <label>Password*</label>
            <div><input type="password" onChange={handlePasswordChange} /></div>

            <br />
            <button onClick={handleSignup}>Signup</button>
        </>
    }

    return <> {renderForm()} </>
}


