import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const endpoint = "https://sherifsorour.pythonanywhere.com/api/products"
// const endpoint = "https://fakestoreapi.com/products"

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(endpoint);
        return response.data; 
    } catch (error) {
        // Handle errors and return the error message to be stored in state.error
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Request failed with status:', error.response.status);
            return rejectWithValue(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request made but no response received:', error.request);
            return rejectWithValue('Network error');
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error setting up the request:', error.message);
            return rejectWithValue('Request failed');
        }
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
                console.log("fulfilled data : ", action.payload)
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
                console.log("error data : ", state.error)
            });
    },
});

export default productsSlice.reducer;
