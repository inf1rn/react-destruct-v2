export const baseURL = process.env.REACT_APP_API

const storage = process.env.REACT_APP_STORAGE
export const accountStorage = storage + "/account/"
export const telegramChannelsStorage = storage + "/telegram/channels/"
export const telegramPostsStorage = storage + "/telegram/posts/"

export const tiktokPostsStorage = storage + "/tiktok/posts/"
export const tiktokUsersStorage = storage + "/tiktok/users/"

export const tiktokBaseUrl = "https://tiktok.com"

export enum UserStatusesEnum {
    accepted = "accepted",
    waiting = "waiting",
    declined = "declined"
}

export enum UserRolesEnum {
    user = "user",
    editor = "editor",
    admin = "admin"
}