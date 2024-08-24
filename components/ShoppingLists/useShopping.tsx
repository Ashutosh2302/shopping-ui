import { useState, useEffect } from "react";
import { IShoppingList, IShoppingListWithItems } from "@/types/shopping";
import api from "@/utils/axios";
import toast from "react-hot-toast";
import { NextRouter, useRouter } from "next/router";

interface getShoppingListsReturnType {
    lists: { totalCount: number, data: IShoppingList[] } | undefined;
    error: boolean;
}

export const useShoppingLists = (): getShoppingListsReturnType => {
    const [lists, setLists] = useState<{ totalCount: number, data: IShoppingList[] }>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/shopping");
                setLists(response.data);
            } catch (e) {
                setError(true);
                console.error("Error fetching shopping lists:", e);
            }
        };

        fetchData();
    }, []);

    return { lists, error };
};

interface getShoppingListReturnType {
    list: IShoppingListWithItems | undefined
    error: boolean;
}


export const useShoppingList = (listId: string): getShoppingListReturnType => {
    const [list, setList] = useState<IShoppingListWithItems>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/shopping/${listId}`)
                setList(response.data);
            } catch (e) {
                setError(true);
                console.error("Error fetching shopping lists:", e);
            }
        };

        fetchData();
    }, []);

    return { list, error };
};

export const handlePurchased = async (listId: string, itemId: string, router: NextRouter) => {
    try {
        await api
            .patch(`/shopping/${listId}/pickup/${itemId}`)
            .then(() => {
                toast.success("Marked purchased")
                router.reload()
            });
    } catch (e) {
        toast.error("Failed to mark purchased")
        console.log(e);
    }
}

export const handleRemove = async (listId: string, itemId: string, router: NextRouter) => {
    try {
        await api
            .delete(`/shopping/${listId}/remove/${itemId}`)
            .then(() => {
                toast.success("Removed item from list")
                router.reload()
            });
    } catch (e) {
        toast.error("Failed to remove item")
        console.log(e);
    }
}
