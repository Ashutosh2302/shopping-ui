import { CreateListItem } from "@/components/CreateListItem/CreateListItem";
import { useRouter } from "next/router";

const CreateListItemPage = () => {
    const { query } = useRouter();
    if (query.id)
        return <>
            <h1>Add list item</h1>
            <CreateListItem listId={query.id as string} />
        </>
}

export default CreateListItemPage