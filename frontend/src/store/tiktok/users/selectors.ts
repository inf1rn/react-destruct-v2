import { ISelectors } from './../../store';
export const tiktokUsersSelectors = {
    filters: (state) => state.tiktokUsers.filters,
    currentFilters: (state) => state.tiktokUsers.currentFilters,
    pagination: (state) => state.tiktokUsers.pagination,
    selectedUsers: state => state.tiktokUsers.selectedUsers,
} as ISelectors