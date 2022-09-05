export type SortDirection = "ASC" | "DESC"
export type FiltersType = "main" | "sort" | "date" | "search" | "new" | "settings" | "status" | null
export interface IPermissibleSortBy {
    text: string
    code: SortBy
}