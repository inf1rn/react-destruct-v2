import { IVkUsersFilters } from '../../../../types/vk';
import { cloneDeep } from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const baseFilters = {
    userUrl: ""
}

type FiltersType = typeof baseFilters

const initialState = {
    filters: cloneDeep(baseFilters) as FiltersType,
    currentFilters: cloneDeep(baseFilters) as FiltersType,
    selectedGroups: [] as Array<number>
}

export const vkSearchSlice = createSlice({
    name: "vkSearch",
    initialState,
    reducers: {
        setFiltersUserUrl(state, action: PayloadAction<{ userUrl: string }>) {
            state.filters.userUrl = action.payload.userUrl
        },
        setCurrentFilters(state, action: PayloadAction<{ currentFilters: FiltersType }>) {
            state.currentFilters = cloneDeep(action.payload.currentFilters)
        },
        toggleSelectedGroup(state, action: PayloadAction<{ id: number, isSelected?: boolean }>) {
            const id = action.payload.id
            const isSelected = action.payload.isSelected

            if (isSelected !== true && state.selectedGroups.includes(id)) {
                state.selectedGroups.splice(state.selectedGroups.indexOf(id), 1)
            } else if (!state.selectedGroups.includes(id)) {
                state.selectedGroups.push(id)
            }
        },
        clearSelectedGroups(state) {
            state.selectedGroups = []
        }
    }
})

export const {
    toggleSelectedGroup, clearSelectedGroups, setFiltersUserUrl, setCurrentFilters
} = vkSearchSlice.actions 