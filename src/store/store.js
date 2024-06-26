import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import sidebarReducer from './reducers/sidebarReducer';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        sidebar: sidebarReducer,
    },
});
