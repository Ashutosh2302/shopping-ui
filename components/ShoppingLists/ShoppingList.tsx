import { IShoppingListWithItems } from "@/types/shopping";
import { useEffect, useMemo, useState } from "react";
import { ShoppingListItem } from "./ShoppingListItem";
import { useRouter } from "next/router";
import api from "@/utils/axios";
import { lstatSync } from "fs";

interface Props {
    listId: string
}

export const ShoppingList: React.FC<Props> = ({ listId }) => {
    const router = useRouter()
    const [listWithItems, setListWithItems] = useState<IShoppingListWithItems>()
    const [error, setError] = useState(false)

    const data = async () => {
        try {
            await api
                .get(`/shopping/${listId}`)
                .then((response) => {
                    setListWithItems(response.data);
                });
        } catch (e) {
            setError(true)
            console.log(e);
        }
    };

    useEffect(() => {
        data();
    }, []);

    const totalShopValue = useMemo(() => {
        if (listWithItems?.items) {
            return listWithItems.items.reduce((accumulator, current) => accumulator + current.price, 0);
        }
        return 0
    }, [listWithItems?.items])

    const addItemButton = <button onClick={() => { router.push(`/shoppinglists/${listId}/createListItem`) }}>Add new item</button>

    const renderData = () => {
        if (error) return <>Failed to fetch shopping list items</>
        else if (!listWithItems) return <>Loading...</>
        else if (listWithItems.items) {
            return <>
                <h3>List Items</h3>
                <h4>Total shopping list value: <span style={{ "color": "green", "fontSize": "1.5rem" }}>£{totalShopValue}</span> </h4>

                {
                    listWithItems.items.map((i) =>
                        <div key={i.id} style={{ "display": "flex", "textAlign": "center", "alignItems": "center", "marginLeft": "1.5rem" }}>
                            <ShoppingListItem listId={listId} item={i} />
                        </div>
                    )
                }
            </>

        }
        else return <p>No items in this list</p>
    }

    return <>
        <button onClick={() => { router.push("/shoppinglists") }}>Back</button>
        <h1>Shopping List</h1>
        {addItemButton}
        {renderData()}
    </>
}


