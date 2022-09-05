import { SortDirection } from './filters.d';
import { ITag } from './tags.d';
export interface ITiktokUser {
    id: number
    userId: number
    username: string
    totalSubscribers: number
    totalFollowing: number
    totalViews: number
    description: string
    subscribersGrowth: number
    followingGrowth: number
    viewsGrowth: number
    tags: Array<ITag>
    isPrivate: boolean
    imgUrl: string
    lastPublication: Date
    totalLikes: number
    likesGrowth: number
    totalPosts: number
    postsGrowth: number
    lastPosts: Array<ITiktokPost>
    lastUpdate: Date
    isChecked: boolean
}

export interface ITiktokPost {
    id: number
    imgUrl: string
    description: string
    totalViews: number
    totalLikes: number
    postId: number
    totalComments: number
    status: number
    tags: Array<ITag>
    isChecked: boolean
    totalShare: number
    shareGrowth: number
    createTime: Date
    hashtags: Array<ITiktokHashtag>
    user: ITiktokUser
}

export interface ITiktokHashtag {
    id: number
    name: string
}

export interface ITiktokPostsFilters {
    tags: string | null
    subcultures: string | null
    keyword: string
    sortBy: SortBy
    sortDirection: SortDirection
    dateAt: Date | null
    dateTo: Date | null
    isChecked: boolean
    isDestructive: boolean
    commentsCountMin: number
    reactionsCountMin: number
    commentsCountMax: number
    userId: number
    reactionsCountMax: number
}

export interface ITiktokUsersFilters {
    tags?: string | null
    subcultures?: string | null
    keyword?: string
    sortBy?: SortBy
    sortDirection?: SortDirection
    postsCountMin?: number
    postsCountMax?: number
    subscribersCountMin?: number
    subscribersCountMax?: number
    userId?: number
    dateAt: Date | null
    dateTo: Date | null
    isChecked: boolean

}

export type SortBy = "name"