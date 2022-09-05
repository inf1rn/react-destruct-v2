import { RootStateType, ISelectors } from './../../store';
export const subculturesSelectors = {
    pagination: (state) => state.subcultures.pagination,
    filters: (state) => state.subcultures.filters,
    currentFilters: state => state.subcultures.currentFilters
} as ISelectors