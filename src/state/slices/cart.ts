import {
    createDraftSafeSelector,
    createEntityAdapter,
    createSlice,
    Draft,
    EntityState,
    PayloadAction
} from '@reduxjs/toolkit';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';
import {remove} from 'lodash-es';

export type CartItem = ProductDto;

export interface Cart {
    items: CartItem[];
}

const initialState = {
    items: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        set: (state: Draft<Cart>, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        addOne: (state: Draft<Cart>, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
        },
        removeOne: (state: Draft<Cart>, action: PayloadAction<CartItem>) => {
            remove(state.items, action.payload);
        }
    }
});
