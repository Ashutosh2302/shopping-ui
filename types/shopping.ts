export interface IShoppingList {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number;
}

export interface IShoppingListWithItems {
    totalCount: number
    totalPicker: number
    items: IShoppingListItem[]
}

export interface IShoppingListItem {
    id: string;
    name: string;
    picked: boolean,
    price: number,
    createdAt: number;
}

export interface CreateShoppingListPayload {
    name: string;
}

export interface CreateShoppingListItemPayload {
    name: string;
    price: number;
}
