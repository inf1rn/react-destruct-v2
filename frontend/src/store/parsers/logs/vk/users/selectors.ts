import { ISelectors } from '../../../../store';
export const parsersLogsVkUsersSelectors = {
    filters: (state) => state.parsersLogsVkUsers.filters,
    pagination: (state) => state.parsersLogsVkUsers.pagination,
    currentFilters: (state) => state.parsersLogsVkUsers.currentFilters
} as ISelectors