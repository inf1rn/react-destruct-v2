export interface ISubculture {
    id: number
    name: string
    description: string
}

export interface IUpdateSubcultureBody {
    id: number
    name?: string
    description?: string
}

export interface ISubcultureFullInfo {
    subculture: ISubculture
    tagsCount: number
    vkPostsCount: number
    tgPostsCount: number
    tikTokPostsCount: number

}