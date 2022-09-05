import { ISubculturesAndTagsFilters } from './../../../types/subculturesAndTags.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export const subculturesSlice = createSlice({
    name: "subcultures",
    initialState: {
        pagination: {
            perPage: 20,
            page: 1
        },
        filters: {
            keyword: ""
        } as ISubculturesAndTagsFilters,
        currentFilters: {
            keyword: ""
        } as ISubculturesAndTagsFilters
    },
    reducers: {
        setFiltersKeyword(state, action: PayloadAction<{ keyword: string }>) {
            state.filters.keyword = action.payload.keyword
        },
        setPaginationPage(state, action: PayloadAction<{ page: number }>) {
            state.pagination.page = action.payload.page
        },
        setPaginationPerPage(state, action: PayloadAction<{ perPage: number }>) {
            state.pagination.perPage = action.payload.perPage
        }, 
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: ISubculturesAndTagsFilters }>) {
            state.currentFilters = action.payload.currentFilters
        },
    }
})

export const { setFiltersKeyword, setPaginationPage, setPaginationPerPage, setCurrentFilters } = subculturesSlice.actions