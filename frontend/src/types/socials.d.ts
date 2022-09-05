export type SocialTypes = "telegram" | "tiktok" | "vk"

export interface ISocialCounts {
    [key in string]: {
        [key in SocialTypes]: number
    }
}