import { IShoppingListItem } from "@/types/shopping";
import api from "@/utils/axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

interface Props {
    listId: string
    item: IShoppingListItem
}

export const ShoppingListItem: React.FC<Props> = ({ listId, item }) => {
    const router = useRouter()
    const { id, name: itemName, picked, price } = item

    const handlePurchased = async () => {
        try {
            await api
                .patch(`/shopping/${listId}/pickup/${id}`)
                .then(() => {
                    toast.success("Marked purchased")
                    router.reload()
                });
        } catch (e) {
            toast.error("Failed to mark purchased")
            console.log(e);
        }
    }

    const handleRemove = async () => {
        try {
            await api
                .delete(`/shopping/${listId}/remove/${id}`)
                .then(() => {
                    toast.success("Removed item from list")
                    router.reload()
                });
        } catch (e) {
            toast.error("Failed to remove item")
            console.log(e);
        }
    }

    const renderItem = () => {
        return <div style={{ "display": "flex", "flexDirection": "row", "fontSize": "1.25rem", "gap": "3rem", "margin": "0.5rem 0" }}>
            <div style={{ "textDecoration": picked ? "line-through" : "none", "fontWeight": "bold", "color": picked ? "green" : "red", "flex": 1, "minWidth": "5rem", "textAlign": "start" }}>{itemName}</div>
            <div style={{ "minWidth": "2rem", }}>£{price}</div>

            <div style={{ "display": "flex", "gap": "1rem" }}>
                <button onClick={() => handleRemove()}>remove</button>
                {picked ? <div style={{ "color": "green" }}>✔</div> : <button onClick={handlePurchased}>mark purchased</button>}
            </div>
        </div>
    }

    return <> {renderItem()} </>
}


