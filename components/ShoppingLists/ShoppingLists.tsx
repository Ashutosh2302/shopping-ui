import { useRouter } from "next/router";
import { useShoppingLists } from "./useShopping";
import ActionLink from "@/component-library/Link/Link";

export const ShoppingLists = () => {
    const router = useRouter();
    const { lists, error } = useShoppingLists()

    const createListLink = (text: string) => <ActionLink href="/createList" text={text} />

    const renderData = () => {
        if (error) return <>Failed to fetch shopping lists</>
        else if (!error && !lists) return <>Loading...</>
        else if (lists && lists.data && lists.data.length) {
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
        else if (lists && lists.totalCount == 0) return <div>
            <p>You don't have any lists 🥺</p>
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
