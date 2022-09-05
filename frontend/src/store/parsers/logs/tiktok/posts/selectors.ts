import { ISelectors } from '../../../../store';
export const parsersLogsTiktokPostsSelectors = {
    filters: (state) => state.parsersLogsTiktokPosts.filters,
    pagination: (state) => state.parsersLogsTiktokPosts.pagination,
    currentFilters: (state) => state.parsersLogsTiktokPosts.currentFilters
} as ISelectors