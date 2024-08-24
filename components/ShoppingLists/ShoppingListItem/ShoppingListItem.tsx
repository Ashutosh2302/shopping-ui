import { IShoppingListItem } from "@/types/shopping";
import { useRouter } from "next/router";
import { handlePurchased, handleRemove } from "../useShopping";

interface Props {
    listId: string
    item: IShoppingListItem
}

export const ShoppingListItem: React.FC<Props> = ({ listId, item }) => {
    const router = useRouter()
    const { id, name: itemName, picked, price } = item

    const renderItem = () => {
        return <div style={{ "display": "flex", "flexDirection": "row", "fontSize": "1.25rem", "gap": "3rem", "margin": "0.5rem 0" }}>
            <div style={{ "textDecoration": picked ? "line-through" : "none", "fontWeight": "bold", "color": picked ? "green" : "red", "flex": 1, "minWidth": "5rem", "textAlign": "start" }}>{itemName}</div>
            <div style={{ "minWidth": "2rem", }}>£{price}</div>
            <div style={{ "display": "flex", "gap": "1rem" }}>
                <button onClick={() => handleRemove(listId, id, router)}>remove</button>
                {picked ? <div style={{ "color": "green" }}>✔</div> : <button onClick={() => handlePurchased(listId, id, router)}>mark purchased</button>}
            </div>
        </div>
    }

    return <> {renderItem()} </>
}
