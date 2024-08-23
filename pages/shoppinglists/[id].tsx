import { ShoppingList } from "@/components/ShoppingLists/ShoppingList";

import { useRouter } from "next/router";

const ShoppingListPage = () => {
    const { query } = useRouter();
    if (query.id)
        return <>

            <ShoppingList listId={query.id as string} />
        </>

}
export default ShoppingListPage