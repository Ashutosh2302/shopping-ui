import { CreateShoppingListItemPayload } from "@/types/shopping";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import api from "@/utils/axios";
import InputBox from "@/component-library/InputBox/InputBox";
import Button from "@/component-library/Button/Button";

interface Props {
    listId: string
}

export const CreateListItem: React.FC<Props> = ({ listId }) => {
    const router = useRouter()
    const [{ name, price }, setListDetails] =
        useState<CreateShoppingListItemPayload>({
            name: '',
            price: 0
        });

    const updateFields = (updatedFields: Partial<CreateShoppingListItemPayload>) => {
        setListDetails(details => ({ ...details, ...updatedFields }));
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        updateFields({ name });
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const price = Number(e.target.value);
        updateFields({ price });
    };

    const handleCreate = async () => {
        if (!name) { toast.error("Name is required"); return }
        if (!price) { toast.error("Price is required"); return }
        try {
            await api
                .post(`/shopping/${listId}/item`, { name, price })
                .then(() => {
                    toast.success("List item created")
                    router.push(`/shoppinglists/${listId}`)
                });
        } catch (e) {
            toast.error("Failed to create list item")
            console.log(e);
        }
    }

    const renderForm = () => {
        return <>
            <h2>Create new shopping list item</h2>
            <InputBox lable="Name" onValueChange={handleNameChange} mandatory />
            <InputBox lable="Price (in pounds)" onValueChange={handlePriceChange} mandatory />
            <br />
            <Button text="Create Item" onClick={handleCreate} />
        </>
    }

    return <> {renderForm()} </>
}
