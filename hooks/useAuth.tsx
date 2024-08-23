
export const useAuth = (): boolean => {
    if (typeof window !== "undefined") {
        const token = window.localStorage.getItem("access_token")
        return !!token
    }
    return false

};