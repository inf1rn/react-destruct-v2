import { IUser } from './../../types/users.d';

export const accountPipes = {
    permissions: (user: IUser) => user.roles.map(role => role.permissions).flat().map(permission => permission.name)
}