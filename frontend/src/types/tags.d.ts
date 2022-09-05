import { ISubculture } from './subcultures.d';
export interface ITag {
    id: number
    subculture: ISubculture
    name: string
}

export interface IUpdateTagBody {
    id: number
    name?: string
    subcultureId?: number
}

export interface ITagFullInfo {
    tag: ITag
    vkPostsCount: number
    tgPostsCount: number
    tikTokPostsCount: number
}