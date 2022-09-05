import { IPagination } from './../../../../types/pagination.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    pagination: {
        page: 1,
        perPage: 5
    } as IPagination
}

export const vkUserDetailSlice = createSlice({
    name: "vkUserDetail",
    initialState,
    reducers: {
        setPaginationPage(state, action: PayloadAction<{ page: number }>) {
            state.pagination.page = action.payload.page
        },
        setPaginationPerPage(state, action: PayloadAction<{ perPage: number }>) {
            state.pagination.perPage = action.payload.perPage
        },
    },

})

export const { setPaginationPage, setPaginationPerPage } = vkUserDetailSlice.actions