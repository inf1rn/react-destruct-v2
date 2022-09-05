import { UserStatusesEnum } from './../constants/api';
export interface IUser {
    city: string
    district: number | null
    email: string
    firstName: string
    lastName: string
    patronymic: string
    workplace: string
    position: string
    imgUrl: string
    lastVisit: Date
    roles: Array<IUserRole>
    status: IUserStatus
    statusId: number
    roleId: number
    id: number
}

export interface IUserRole {
    name: string
    rusName: string
    id: number
    permissions: Array<IRolePermission>
    requiredPermissionsToSet: Array<IRolePermission>
}

export interface IRolePermission {
    name: string
    id: number
}

export interface IUserStatus {
    id: number
    name: UserStatusesEnum
    rusName: string
}

export interface IUsersFilters {
    status: string | null
    district: string | null
    role: string | null
    keyword: string
    city: string
    sortBy: SortBy
    sortDirection: SortDirection
    dateAt: Date | null
    dateTo: Date | null
}

export type SortBy = "name"