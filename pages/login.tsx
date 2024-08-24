import { Login } from "@/components/Authentication/Login/Login"
import { useRouter } from "next/router"
import { useEffect } from "react"

const LoginPage = () => {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (token) router.push("/shoppinglists")
    }, [])
    return <Login />
}
export default LoginPage