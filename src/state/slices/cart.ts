import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';

export interface Cart {
    items: ProductDto[];
}

const initialState: Cart = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addOne: (state, action: PayloadAction<ProductDto>) => {
            state.items.push(action.payload);
        },
        remove: (state, action: PayloadAction<ProductDto>) => {
            const index = state.items.indexOf(action.payload);
            if (index > -1) {
                state.items.slice(index, 1);
            }
        },
        removeById: (state, action: PayloadAction<number>) => {
            const found = state.items.filter(e => e.id === action.payload);
            found.forEach(item => {
                const index = state.items.indexOf(item);
                if (index > -1) {
                    state.items.slice(index, 1);
                }
            });
        }
    }
});
