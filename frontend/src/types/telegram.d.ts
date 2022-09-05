import { SortDirection } from './filters.d';
import { ITag } from "./tags"

export interface ITelegramChannel {
    channelId: number
    channelName: string
    description: string
    imgUrl: string
    link: string
    totalSubscribers: number
    totalPosts: number
    totalReactions: number
    lastPostDate: Date
    totalViews: number
    subscribersGrowth: number
    reactionsGrowth: number
    postsGrowth: number
    viewsGrowth: number
    tags: Array<ITag>
    isChecked: boolean
    lastUpdate: Date
}

export interface ITelegramPost {
    id: number
    channelName: string
    postContent: string
    postViews: number
    totalReactions: number
    totalComments: number
    postId: number
    tags: Array<ITag>
    createTime: number
    totalSubscribers: number
    subscribersGrowth: number
    postViewsGrowth: numbe
    isChecked: boolean
    photos: Array<string>
}

export interface ITelegramPostsFilters {
    tags?: string | null
    subcultures?: string | null
    keyword?: string
    sortBy?: SortBy
    sortDirection?: SortDirection
    channelId?: number
    dateAt: Date | null
    dateTo: Date | null
    isChecked: boolean
    commentsCountMin: number
    reactionsCountMin: number
    commentsCountMax: number
    reactionsCountMax: number
}


export interface ITelegramChannelsFilters {
    tags: string | null
    subcultures: string | null
    keyword: string
    sortBy: SortBy
    sortDirection: SortDirection
    postsCountMin: number
    postsCountMax: number
    subscribersCountMin: number
    subscribersCountMax: number
    dateAt: Date | null
    dateTo: Date | null
    isChecked: boolean
}

export type SortBy = "name"