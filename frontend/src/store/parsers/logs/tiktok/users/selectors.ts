import { ISelectors } from '../../../../store';
export const parsersLogsTiktokUsersSelectors = {
    filters: (state) => state.parsersLogsTiktokUsers.filters,
    pagination: (state) => state.parsersLogsTiktokUsers.pagination,
    currentFilters: (state) => state.parsersLogsTiktokUsers.currentFilters
} as ISelectors