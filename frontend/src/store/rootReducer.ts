import { vkPostsInfographicsSlice } from './vk/posts/infographics/reducer';
import { vkUsersInfographicsSlice } from './vk/users/infographics/reducer';
import { vkGroupsInfographicsSlice } from './vk/groups/infographics/reducer';
import { vkSearchSlice } from './vk/users/search/reducer';
import { parsersLogsVkUsersSlice } from './parsers/logs/vk/users/reducer';
import { parsersLogsVkGroupsSlice } from './parsers/logs/vk/groups/reducer';
import { parsersLogsTiktokPostsSlice } from './parsers/logs/tiktok/posts/reducer';
import { parsersLogsTiktokUsersSlice } from './parsers/logs/tiktok/users/reducer';
import { parsersLogsTelegramPostsSlice } from './parsers/logs/telegram/posts/reducer';
import { parsersLogsTelegramChannelsSlice } from './parsers/logs/telegram/channels/reducer';
import { vkCompareSlice } from './vk/groups/compare/reducer';
import { newUserSlice } from './users/new/reducer';
import { telegramChannelDetailSlice } from './telegram/channels/detail/reducer';
import { tiktokUserDetailSlice } from './tiktok/users/detail/reducer';
import { vkUserDetailSlice } from './vk/users/detail/reducer';
import { vkGroupDetailSlice } from './vk/groups/detail/reducer';
import { tagsSlice } from './subculturesAndTags/tags/reducer';
import { subculturesSlice } from './subculturesAndTags/subcultures/reducer';
import { vkGroupsSlice } from './vk/groups/reducer';
import { vkUsersSlice } from './vk/users/reducer';
import { tiktokUsersSlice } from './tiktok/users/reducer';
import { tiktokPostsSlice } from './tiktok/posts/reducer';
import { telegramChannelsSlice } from './telegram/channels/reducer';
import { telegramPostsSlice } from './telegram/posts/reducer';
import { usersSlice } from './users/reducer';
import { appReducer, appSlice } from './app/app';
import { accountReducer, accountSlice } from './account/account';
import { baseAPI } from '../api/base';
import { registrationReducer, registrationSlice } from './auth/registration/registration';
import { loginReducer, loginSlice } from './auth/login/reducer';
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
    [loginSlice.name]: loginReducer,
    [registrationSlice.name]: registrationReducer,
    [accountSlice.name]: accountReducer,
    [appSlice.name]: appReducer,
    [usersSlice.name]: usersSlice.reducer,
    [newUserSlice.name]: newUserSlice.reducer,
    [telegramPostsSlice.name]: telegramPostsSlice.reducer,
    [telegramChannelsSlice.name]: telegramChannelsSlice.reducer,
    [telegramChannelDetailSlice.name]: telegramChannelDetailSlice.reducer,
    [tiktokPostsSlice.name]: tiktokPostsSlice.reducer,
    [tiktokUsersSlice.name]: tiktokUsersSlice.reducer,
    [tiktokUserDetailSlice.name]: tiktokUserDetailSlice.reducer,
    [vkUsersSlice.name]: vkUsersSlice.reducer,
    [vkGroupsSlice.name]: vkGroupsSlice.reducer,
    [vkGroupDetailSlice.name]: vkGroupDetailSlice.reducer,
    [vkCompareSlice.name]: vkCompareSlice.reducer,
    [vkSearchSlice.name]: vkSearchSlice.reducer,
    [vkUserDetailSlice.name]: vkUserDetailSlice.reducer,
    [vkGroupsInfographicsSlice.name]: vkGroupsInfographicsSlice.reducer,
    [vkUsersInfographicsSlice.name]: vkUsersInfographicsSlice.reducer,
    [vkPostsInfographicsSlice.name]: vkPostsInfographicsSlice.reducer,
    [subculturesSlice.name]: subculturesSlice.reducer,
    [tagsSlice.name]: tagsSlice.reducer,
    [parsersLogsTelegramChannelsSlice.name]: parsersLogsTelegramChannelsSlice.reducer,
    [parsersLogsTelegramPostsSlice.name]: parsersLogsTelegramPostsSlice.reducer,
    [parsersLogsTiktokUsersSlice.name]: parsersLogsTiktokUsersSlice.reducer,
    [parsersLogsTiktokPostsSlice.name]: parsersLogsTiktokPostsSlice.reducer,
    [parsersLogsVkGroupsSlice.name]: parsersLogsVkGroupsSlice.reducer,
    [parsersLogsVkUsersSlice.name]: parsersLogsVkUsersSlice.reducer,

    [baseAPI.reducerPath]: baseAPI.reducer,
})