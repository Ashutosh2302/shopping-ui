import { CreateShoppingListPayload } from "@/types/shopping";
import api from "@/utils/axios";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";


export const CreateList: React.FC = () => {
    const router = useRouter()
    const [{ name }, setListDetails] =
        useState<CreateShoppingListPayload>({
            name: '',
        });


    const updateFields = (updatedFields: Partial<CreateShoppingListPayload>) => {
        setListDetails(details => ({ ...details, ...updatedFields }));
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        updateFields({ name });
    };

    const handleCreate = async () => {
        if (!name) { toast.error("Name is required"); return }
        try {
            await api
                .post("/shopping", { name })
                .then(() => {
                    toast.success("Shopping list created")
                    router.push("/shoppinglists")
                });
        } catch (e) {
            toast.error("Failed to create list")
            console.log(e);
        }

    }

    const renderForm = () => {
        return <>
            <h2>Create new shopping list</h2>
            <label>Name*</label>
            <div><input type="text" onChange={handleNameChange} /></div>
            <br />
            <button onClick={handleCreate}>Create List</button>
        </>

    }
    return <> {renderForm()} </>
}


