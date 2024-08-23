import { IShoppingList } from "@/types/shopping";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/axios";
import Link from "next/link";


export const ShoppingLists = () => {
    const router = useRouter();
    const [lists, setLists] = useState<{ totalCount: number, data: IShoppingList[] }>()
    const [error, setError] = useState(false)

    const data = async () => {
        try {
            await api
                .get("/shopping")
                .then((response) => {
                    setLists(response.data);
                });
        } catch (e) {
            setError(true)
            console.log(e);
        }
    };

    useEffect(() => {
        data();
    }, []);

    const createListLink = (text: string) => <Link href="/createList"> {text}</Link>

    const renderData = () => {
        if (error) return <>Failed to fetch shopping lists</>
        else if (!lists) return <>Loading...</>
        else if (lists.data) {
            return <>
                {createListLink("Create new list")}
                <div>
                    {lists.data.map((l) =>
                        <button key={l.id} onClick={() => { router.push(`/shoppinglists/${l.id}`) }} style={{ "all": "unset", "cursor": "pointer", "border": "1px solid black", "padding": "0 1rem", "margin": "2.5rem 1.5rem 0 1rem" }}>
                            <h2>{l.name}</h2>
                        </button>
                    )}
                </div>

            </>
        }
        else return <div>
            <p>You don't have any lists 🥺 </p>
            <p>Get cracking with your first shopping list {createListLink("Here")}!!!</p>
        </div>
    }

    return <>
        <div>
            <button onClick={() => { localStorage.removeItem("access_token"); router.push("/login") }}>Logout</button>
        </div>
        <h1>Your shopping lists</h1>
        <h3>Make the most out of it</h3>

        {renderData()} </>
}


