import { useMemo } from "react";
import { ShoppingListItem } from "../ShoppingListItem/ShoppingListItem";
import { useShoppingList } from "../useShopping";
import ActionLink from "@/component-library/Link/Link";

interface Props {
    listId: string
}

export const ShoppingList: React.FC<Props> = ({ listId }) => {
    const { list, error } = useShoppingList(listId)

    const totalShopValue = useMemo(() => {
        if (list?.items) {
            return list.items.reduce((accumulator, current) => accumulator + current.price, 0);
        }
        return 0
    }, [list?.items])

    const addItemButton = <ActionLink href={`/shoppinglists/${listId}/createListItem`} text="Add new item" />

    const renderData = () => {
        if (error) return <>Failed to fetch shopping list items</>
        else if (!error && !list) return <>Loading...</>
        else if (list && list.items && list.items.length) {
            return <>
                <h3>List Items</h3>
                <h4>Total shopping list value: <span style={{ "color": "green", "fontSize": "1.5rem" }}>£{totalShopValue}</span> </h4>
                {
                    list.items.map((i) =>
                        <div key={i.id} style={{ "display": "flex", "textAlign": "center", "alignItems": "center", "marginLeft": "1.5rem" }}>
                            <ShoppingListItem listId={listId} item={i} />
                        </div>
                    )
                }
            </>

        }
        else if (list && list.totalCount == 0) return <p>No items in this list</p>
    }

    return <>
        <ActionLink href={`/shoppinglists`} text="Back" />
        <h1>Shopping List</h1>
        {addItemButton}
        {renderData()}
    </>
}
