import { cloneDeep } from 'lodash';
import { SortDirection } from './../../../types/filters.d';
import { ITiktokPostsFilters, SortBy } from './../../../types/tiktok.d';
import { IPagination } from '../../../types/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const baseFilters = {
    tags: null as string | null,
    subcultures: null as string | null,
    keyword: "",
    sortBy: "id" as SortBy,
    sortDirection: "ASC" as SortDirection,
    dateAt: null,
    dateTo: null,
    isChecked: false,
    isDestructive: true,
    reactionsCountMin: 0,
    reactionsCountMax: 150000,
    commentsCountMin: 0,
    commentsCountMax: 150000,
} as ITiktokPostsFilters

const initialState = {
    filters: cloneDeep(baseFilters),
    currentFilters: cloneDeep(baseFilters),
    pagination: {
        page: 1,
        perPage: 20
    } as IPagination,
    selectedPosts: [] as Array<number>
}

export const tiktokPostsSlice = createSlice({
    name: "tiktokPosts",
    initialState,
    reducers: {
        setFiltersTags(state, action: PayloadAction<{ tags: string | null }>) {
            state.filters.tags = action.payload.tags
        },
        setFiltersSubcultures(state, action: PayloadAction<{ subcultures: string | null }>) {
            state.filters.subcultures = action.payload.subcultures
        },
        setFiltersKeyword(state, action: PayloadAction<{ keyword: string }>) {
            state.filters.keyword = action.payload.keyword
        },
        setFiltersSortBy(state, action: PayloadAction<{ sortBy: SortBy }>) {
            state.filters.sortBy = action.payload.sortBy
        },
        setFiltersSortDirection(state, action: PayloadAction<{ sortDirection: SortDirection }>) {
            state.filters.sortDirection = action.payload.sortDirection
        },
        setFiltersDateAt(state, action: PayloadAction<{ dateAt: Date | null }>) {
            state.filters.dateAt = action.payload.dateAt
        },
        setFiltersDateTo(state, action: PayloadAction<{ dateTo: Date | null }>) {
            state.filters.dateTo = action.payload.dateTo
        },
        setFiltersIsChecked(state, action: PayloadAction<{ isChecked: boolean }>) {
            state.currentFilters.isChecked = action.payload.isChecked
            state.filters.isChecked = action.payload.isChecked
        },
        setFiltersCommentsCountMin(state, action: PayloadAction<{ commentsCountMin: number }>) {
            state.filters.commentsCountMin = action.payload.commentsCountMin
        },
        setFiltersCommentsCountMax(state, action: PayloadAction<{ commentsCountMax: number }>) {
            state.filters.commentsCountMax = action.payload.commentsCountMax
        },
        setFiltersReactionsCountMin(state, action: PayloadAction<{ reactionsCountMin: number }>) {
            state.filters.reactionsCountMin = action.payload.reactionsCountMin
        },
        setFiltersReactionsCountMax(state, action: PayloadAction<{ reactionsCountMax: number }>) {
            state.filters.reactionsCountMax = action.payload.reactionsCountMax
        },
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: ITiktokPostsFilters }>) {
            state.currentFilters = { ...action.payload.currentFilters }
        },
        clearFilters(state) {
            state.filters = cloneDeep(baseFilters)
        },
        setPaginationPage(state, action: PayloadAction<{ page: number }>) {
            state.pagination.page = action.payload.page
        },
        setPaginationPerPage(state, action: PayloadAction<{ perPage: number }>) {
            state.pagination.perPage = action.payload.perPage
        },
        toggleSelectedPost(state, action: PayloadAction<{ id: number, isSelected?: boolean }>) {
            const id = action.payload.id
            const isSelected = action.payload.isSelected

            if (isSelected !== true && state.selectedPosts.includes(id)) {
                state.selectedPosts.splice(state.selectedPosts.indexOf(id), 1)
            } else if (!state.selectedPosts.includes(id)) {
                state.selectedPosts.push(id)
            }
        },
        clearSelectedPosts(state) {
            state.selectedPosts = []
        }
    }
})

export const {
    setFiltersTags, setCurrentFilters, setFiltersSubcultures, clearFilters, setPaginationPage, setPaginationPerPage,
    setFiltersKeyword, setFiltersSortBy, setFiltersSortDirection, setFiltersDateAt, setFiltersDateTo, clearSelectedPosts,
    setFiltersCommentsCountMax, setFiltersCommentsCountMin, setFiltersReactionsCountMax, setFiltersReactionsCountMin,
    toggleSelectedPost, setFiltersIsChecked } = tiktokPostsSlice.actions 