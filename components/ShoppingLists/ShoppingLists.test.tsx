import { render } from '@testing-library/react';
import { IShoppingList } from '@/types/shopping';
import * as router from 'next/router';

jest.mock('../../utils/axios');

import * as useShopping from './useShopping';
import { ShoppingLists } from './ShoppingLists';
jest.mock('./useShopping');

const lists: { totalCount: number, data: IShoppingList[] } = {
    totalCount: 2,
    data: [
        {
            id: "mockListid1",
            name: "mockListName1",
            createdAt: 123,
            updatedAt: 456,
        }, {
            id: "mockListid2",
            name: "mockListName2",
            createdAt: 345,
            updatedAt: 567,
        }
    ]
}

const getWrapper = (data: { totalCount: number, data: IShoppingList[] } | undefined, error: boolean = false) => {
    jest
        .spyOn(router, 'useRouter')
        .mockReturnValue({ push: jest.fn(), reload: jest.fn(), query: {}, pathname: '' } as any);
    jest
        .spyOn(useShopping, 'useShoppingLists')
        .mockReturnValue({ lists: data, error });
    return render(<ShoppingLists />);
};

test('It renders without crashing', () => {
    const wrapper = getWrapper(lists);
    expect(wrapper).toBeDefined();
});

test('Check if correct lists is present', () => {
    const { queryByText } = getWrapper(lists);
    expect(queryByText("mockListName1")).toBeInTheDocument()
    expect(queryByText("mockListName2")).toBeInTheDocument()
});


test('Should be able to handle loading state', () => {
    const { queryByText } = getWrapper(undefined, false);
    expect(queryByText("Loading...")).toBeInTheDocument()
});

test('Should be able to handle error state', () => {
    const { queryByText } = getWrapper(lists, true);
    expect(queryByText("Failed to fetch shopping lists")).toBeInTheDocument()
});

test('Should display correct message if no lists are present', () => {
    const { queryByText } = getWrapper({
        totalCount: 0, data: []
    });
    expect(queryByText("You don't have any lists 🥺")).toBeInTheDocument()
});
