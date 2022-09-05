import { cloneDeep } from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVkInfographicsGroupsFilters } from '../../../../types/vk';

const baseFilters = {
    membersCountMin: 0,
    membersCountMax: 10000000,
    country: null,
    region: null,
    actual: false
} as IVkInfographicsGroupsFilters

const initialState = {
    filters: cloneDeep(baseFilters),
    currentFilters: cloneDeep(baseFilters)

}

export const vkGroupsInfographicsSlice = createSlice({
    name: "vkGroupsInfographicsSlice",
    reducers: {
        setFiltersCountry(state, action: PayloadAction<{ country: string | null }>) {
            state.filters.country = action.payload.country
        },
        setFiltersDistrict(state, action: PayloadAction<{ region: string | null }>) {
            state.filters.region = action.payload.region
        },
        setFiltersSubscribersCountMin(state, action: PayloadAction<{ membersCountMin: number }>) {
            state.filters.membersCountMin = action.payload.membersCountMin
        },
        setFiltersSubscribersCountMax(state, action: PayloadAction<{ membersCountMax: number }>) {
            state.filters.membersCountMax = action.payload.membersCountMax
        },
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: IVkInfographicsGroupsFilters }>) {
            state.currentFilters = { ...action.payload.currentFilters }
        },
        clearFilters(state) {
            state.filters = cloneDeep(baseFilters)
        },
    },
    initialState
})

export const {
    setCurrentFilters, clearFilters, setFiltersCountry, setFiltersDistrict, setFiltersSubscribersCountMax,
    setFiltersSubscribersCountMin
} = vkGroupsInfographicsSlice.actions