import { ISelectors } from './../../store';

export const vkGroupsSelectors = {
    filters: (state) => state.vkGroups.filters,
    pagination: (state) => state.vkGroups.pagination,
    selectedGroups: state => state.vkGroups.selectedGroups,
    currentFilters: (state) => state.vkGroups.currentFilters
} as ISelectors