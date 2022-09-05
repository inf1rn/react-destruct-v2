import { ISelectors } from '../../../../store';
export const parsersLogsTelegramPostsSelectors = {
    filters: (state) => state.parsersLogsTelegramPosts.filters,
    pagination: (state) => state.parsersLogsTelegramPosts.pagination,
    currentFilters: (state) => state.parsersLogsTelegramPosts.currentFilters
} as ISelectors