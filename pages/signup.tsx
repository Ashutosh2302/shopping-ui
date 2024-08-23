
import { Signup } from "@/components/Signup/Signup"
import { useRouter } from "next/router"
import { useEffect } from "react"

const SignupPage = () => {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (token) router.push("/login")
    }, [])
    return <Signup />
}
export default SignupPage