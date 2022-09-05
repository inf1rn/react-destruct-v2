export type ParserSocialsType = "vk" | "telegram" | "tiktok"
export type ParserEntitiesType = "user" | "post" | "channel" | "group"

export interface IParsersLogsFilters {
    keyword: string
    dateAt: Date | null
    dateTo: Date | null
    entity: string
    social: string
}

export interface IParserLog {
    date: Date
    entity: string
    social: string
    message: string
    id: number
}

export interface IParser {
    lastActive: Date
    isActive: Date
    social: string
    id: number
    entity: string
}

export interface IGetParserBody {
    entity: ParserEntitiesType
    social: ParserSocialsType
}