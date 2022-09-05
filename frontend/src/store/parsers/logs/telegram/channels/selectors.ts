import { ISelectors } from '../../../../store';
export const parsersLogsTelegramChannelsSelectors = {
    filters: (state) => state.parsersLogsTelegramChannels.filters,
    pagination: (state) => state.parsersLogsTelegramChannels.pagination,
    currentFilters: (state) => state.parsersLogsTelegramChannels.currentFilters
} as ISelectors