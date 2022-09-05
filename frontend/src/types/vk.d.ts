import { SortDirection } from './filters.d';
import { ITag } from './tags';
export interface IVkUser {
    id: number
    firstName: string
    lastName: string
    thirdName: string
    sex: number
    age: number
    cityName: string
    imgUrl: string
    regionName: string
    countryName: string
    groups: Array<IVkGroup>
    viewsGrowth: number
    subscribersGrowth: number
    postsGrowth: number
    url: string
    tags: Array<ITag>
    closed: boolean
    lastActive: Date
    lastUpdate: Date
    totalPosts: number
    totalSubscribers: number
    totalViews: number
    isChecked: boolean

}

export interface IVkPost {
    id: number
    body: string
    totalComments: number
    totalLikes: number
    photos: Array<string>
    totalViews: number
    createTime: Date
}

export interface IVkAdmin {
    id: number
    firstName: string
    lastName: string
    thirdName: string
    imgUrl: string
    cityName: string
    regionName: string
    countryName: string
    membersCount: number
    groupsCount: number
    subcultureNames: Array<string>
    id: number
    groups: Array<number>
    isChecked: boolean
}

export interface IVkGroup {
    id: number
    cityName: string
    img: string
    description: string
    name: string
    url: string
    tags: Array<ITag>
    regionName: string
    countryName: string
    membersCount: number
    contacts: string
    totalLikes: number
    totalViews: number
    viewsGrowth: number
    membersGrowth: number
    postsGrowth: number
    totalComments: number
    lastActive: Date
    lastUpdate: Date
    totalPosts: number
    isChecked: boolean

}

export interface ISocCount {
    subculturesStatistics: { [key: string]: number }
    date: String
}

export interface IVkInfographicsUsersFilters {
    subscribersCountMin: number
    subscribersCountMax: number
    country: string | null
    region: string | null
    actual: boolean
}

export interface IVkInfographicsPostsFilters {
    actual: boolean
}

export interface IVkInfographicsGroupsFilters {
    membersCountMin: number
    membersCountMax: number
    country: string | null
    region: string | null
    actual: boolean
}

export interface IVkUsersFilters {
    tags?: string | null
    subcultures?: string | null
    keyword?: string
    city?: string | null
    country?: string | null
    region?: string | null
    sortBy?: SortBy
    sortDirection?: SortDirection
    groupUrl?: string
    dateAt?: Date | null
    dateTo?: Date | null
    isChecked?: boolean
    userUrl?: string
}

export interface IVkGroupsFilters {
    tags?: string | null
    subcultures?: string | null
    membersCountMin?: number
    membersCountMax?: number
    keyword?: string
    city?: string | null
    country?: string | null
    region?: string | null
    sortBy?: SortBy
    sortDirection?: SortDirection
    dateAt?: Date | null
    dateTo?: Date | null
    isChecked?: boolean
    userUrl?: string
}

export interface IVkCountry {
    id: number
    title: string
}

export interface IVkRegion {
    id: number
    title: string
}

export interface IVkCity {
    id: number
    title: string
}

export interface IVkPostsFilters {
    entityId: number
    entity: string
}

export type SortBy = "name"