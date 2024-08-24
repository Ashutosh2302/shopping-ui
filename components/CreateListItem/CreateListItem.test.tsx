import { fireEvent, getByPlaceholderText, queryByText, render } from '@testing-library/react';
import { IShoppingList, IShoppingListItem, IShoppingListWithItems } from '@/types/shopping';
import * as router from 'next/router';
import api from '@/utils/axios';

jest.mock('../../utils/axios');

import { CreateListItem } from './CreateListItem';

const getWrapper = (error: boolean = false) => {
    jest
        .spyOn(router, 'useRouter')
        .mockReturnValue({ push: jest.fn(), reload: jest.fn(), query: {}, pathname: '' } as any);
    return render(<CreateListItem listId="mockListId" />);
};

test('It renders without crashing', () => {
    const wrapper = getWrapper();
    expect(wrapper).toBeDefined();
});


test('Should be able to add an item to the list', () => {
    const mockPost = (api.post as jest.Mock).mockResolvedValueOnce({});
    const { getByText, getByPlaceholderText } = getWrapper();
    const nameInput = getByPlaceholderText('Name');
    fireEvent.change(nameInput, {
        target: { value: 'mockTestItem' },
    });
    const priceInput = getByPlaceholderText('Price (in pounds)');
    fireEvent.change(priceInput, {
        target: { value: 100 },
    });

    fireEvent.click(getByText("Create Item"))
    expect(mockPost).toHaveBeenCalledWith(`/shopping/mockListId/item`, { "name": "mockTestItem", "price": 100 });
});

