import { ISelectors } from './../../../store';
export const telegramChannelDetailSelectors = {
    pagination: (state) => state.telegramChannelDetail.pagination,
}  as ISelectors