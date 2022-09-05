import { ISelectors } from '../../../../store';
export const parsersLogsVkGroupsSelectors = {
    filters: (state) => state.parsersLogsVkGroups.filters,
    pagination: (state) => state.parsersLogsVkGroups.pagination,
    currentFilters: (state) => state.parsersLogsVkGroups.currentFilters
} as ISelectors