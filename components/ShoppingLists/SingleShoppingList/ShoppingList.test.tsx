import { fireEvent, getByPlaceholderText, render } from '@testing-library/react';
import { IShoppingList, IShoppingListItem, IShoppingListWithItems } from '@/types/shopping';
import * as router from 'next/router';
import api from '@/utils/axios';
import { ShoppingList } from './ShoppingList';
jest.mock('../../../utils/axios');

import * as useShopping from '../useShopping';
jest.mock('../useShopping');

const list: IShoppingListWithItems = {
    totalCount: 2,
    totalPicked: 1,
    items: [{
        id: "mockItemId",
        name: "mockItemName",
        picked: false,
        price: 20,
        createdAt: 1245,
    }, {
        id: "mockItemId1",
        name: "mockItemName1",
        picked: true,
        price: 30,
        createdAt: 1445,
    }]
}

const getWrapper = (data: IShoppingListWithItems | undefined, error: boolean = false) => {
    jest
        .spyOn(router, 'useRouter')
        .mockReturnValue({ push: jest.fn(), reload: jest.fn(), query: {}, pathname: '' } as any);
    jest
        .spyOn(useShopping, 'useShoppingList')
        .mockReturnValue({ list: data, error });
    return render(<ShoppingList listId="mockListId" />);
};

test('It renders without crashing', () => {
    const wrapper = getWrapper(list);
    expect(wrapper).toBeDefined();
});

test('Check if correct data is present', () => {
    const { queryByText } = getWrapper(list);
    expect(queryByText("Shopping List")).toBeInTheDocument()
    expect(queryByText("Total shopping list value:")).toBeInTheDocument()
    expect(queryByText("£50")).toBeInTheDocument()
});



test('Should be able to handle loading state', () => {
    const { queryByText } = getWrapper(undefined, false);
    expect(queryByText("Loading...")).toBeInTheDocument()
});

test('Should be able to handle error state', () => {
    const { queryByText } = getWrapper(list, true);
    expect(queryByText("Failed to fetch shopping list items")).toBeInTheDocument()
});

test('Should display correct message if no list items are present', () => {
    const { queryByText } = getWrapper({
        totalCount: 0, totalPicked: 0, items: []
    });
    expect(queryByText("No items in this list")).toBeInTheDocument()
});