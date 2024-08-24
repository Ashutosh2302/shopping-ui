import { fireEvent, render } from '@testing-library/react';
import { ShoppingListItem } from './ShoppingListItem';
import { IShoppingListItem } from '@/types/shopping';
import * as router from 'next/router';
import api from '@/utils/axios';
jest.mock('../../../utils/axios');
const item: IShoppingListItem = {
    id: "mockId",
    name: "mockItemName",
    picked: false,
    price: 24,
    createdAt: 2343
}

const getWrapper = () => {
    jest
        .spyOn(router, 'useRouter')
        .mockReturnValue({ push: jest.fn(), reload: jest.fn(), query: {}, pathname: '' } as any);

    return render(<ShoppingListItem listId="mockListId" item={item} />);
};

test('It renders without crashing', () => {
    const wrapper = getWrapper();
    expect(wrapper).toBeDefined();
});

test('Check if correct item in document', () => {
    const { queryByText } = getWrapper();
    expect(queryByText("mockItemName")).toBeInTheDocument()
    expect(queryByText("£24")).toBeInTheDocument()
});

test('Should be able to mark an item as purchased', () => {
    const mockPatch = (api.patch as jest.Mock).mockResolvedValueOnce({});
    const { getByText } = getWrapper();
    fireEvent.click(getByText('mark purchased'));
    expect(mockPatch).toHaveBeenCalledWith(`/shopping/mockListId/pickup/mockId`);
});

test('Should be able to remove an item from list', () => {
    const mockDelete = (api.delete as jest.Mock).mockResolvedValueOnce({});
    const { getByText } = getWrapper();
    fireEvent.click(getByText('remove'));
    expect(mockDelete).toHaveBeenCalledWith(`/shopping/mockListId/remove/mockId`);
});