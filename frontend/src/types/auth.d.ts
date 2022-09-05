export interface IRegistrationBody {
    firstName: string
    lastName: string
    password: string
    patronymic: string
    city: string
    district: number | null
    position: string
    workplace: string
    email: string
    roleId?: number
}