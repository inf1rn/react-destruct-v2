import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { editorAPI } from '../../../api/editor'
import { Pagination } from '../../../components/Inner/Pagination'
import { User } from '../../../components/Inner/Users/User'
import { UsersFilters } from '../../../components/Inner/Users/UsersFilters'
import { useTypedDispatch } from '../../../hooks/common'
import { usersSelectors } from '../../../store/users/selectors'
import { setFiltersSortDirection, setFiltersCity, setFiltersDistrict, setFiltersKeyword, setRole, setFiltersSortBy, setFiltersStatus, setPaginationPage, setFiltersDateAt, setFiltersDateTo, toggleSelectedUser, clearSelectedUsers, setCurrentFilters, clearFilters } from '../../../store/users/reducer'
import { SortDirection } from '../../../types/filters'
import { IUser, SortBy } from '../../../types/users'
import { useNavigate } from 'react-router'
import { newUserPath } from '../../../constants/links'
import { useGetCurrentUser, useGetCurrentUserPermissions } from '../../../hooks/account'
import { accountPipes } from '../../../pipes/account/account'
import { Helmet } from 'react-helmet'
import { TableActions } from '../../../components/Common/UI/Table/TableActions'
import { UsersTable } from '../../../components/Inner/Users/UsersTable'

export const Users = () => {
    const [deleteUser] = editorAPI.useDeleteUserMutation()
    const [updateUser] = editorAPI.useUpdateUserMutation()
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const filters = useSelector(usersSelectors.filters)
    const currentFilters = useSelector(usersSelectors.currentFilters)
    const pagination = useSelector(usersSelectors.pagination)
    const selectedUsers = useSelector(usersSelectors.selectedUsers)

    const permissions = useGetCurrentUserPermissions()

    const { data: usersResponse } = editorAPI.useGetUsersQuery({ ...currentFilters, ...pagination })

    const count = usersResponse?.totalElements || 0
    const users = usersResponse?.content || []

    const clearFiltersHandler = useCallback(() => {
        dispatch(clearFilters())
    }, [])

    const [getExcel] = editorAPI.useLazyGetUsersExcelQuery()
    const [deleteUsers, { isSuccess: isSuccessDeleteUsers }] = editorAPI.useDeleteUsersMutation()
    const [isAllToggled, setIsAllToggled] = useState<boolean>(false)

    const downloadExcel = useCallback(() => {
        getExcel({ ...filters })
    }, [filters])

    const onChangePage = useCallback((page: number) => {
        dispatch(setPaginationPage({ page }))
    }, [])

    const deleteHandler = useCallback((id: number) => {
        deleteUser(id)
    }, [])

    const onChangeKeyword = useCallback((keyword: string) => {
        dispatch(setFiltersKeyword({ keyword }))
    }, [])

    const onChangeRole = useCallback((role: string | null) => {
        dispatch(setRole({ role }))
    }, [])

    const onChangeCity = useCallback((city: string) => {
        dispatch(setFiltersCity({ city }))
    }, [])

    const onChangeDistrict = useCallback((district: string | null) => {
        dispatch(setFiltersDistrict({ district }))
    }, [])

    const onChangeStatus = useCallback((status: string | null) => {
        dispatch(setFiltersStatus({ status }))
    }, [])

    const onChangeSortBy = useCallback((sortBy: SortBy) => {
        dispatch(setFiltersSortBy({ sortBy }))
    }, [])

    const onChangeSortDirection = useCallback((sortDirection: SortDirection) => {
        dispatch(setFiltersSortDirection({ sortDirection }))
    }, [])

    const onChangeDateAt = useCallback((dateAt: Date | null) => {
        dispatch(setFiltersDateAt({ dateAt }))
    }, [])

    const onChangeDateTo = useCallback((dateTo: Date | null) => {
        dispatch(setFiltersDateTo({ dateTo }))
    }, [])

    const onChangeUserRole = useCallback((user: IUser, roleId: number) => {
        let editableUser = { ...user, roleId } as Partial<IUser>

        delete editableUser.status
        delete editableUser.roles

        updateUser(editableUser)
    }, [])

    const onChangeUserStatus = useCallback((user: IUser, statusId: number) => {
        let editableUser = { ...user, statusId } as Partial<IUser>

        delete editableUser.status
        delete editableUser.roles

        updateUser(editableUser)
    }, [])

    const applyFilters = useCallback(() => {
        dispatch(setPaginationPage({ page: 1 }))

        dispatch(setCurrentFilters({ currentFilters: filters }))
    }, [filters])

    const toggleSelectedUserHandler = useCallback((id: number) => {
        dispatch(toggleSelectedUser({ id }))
    }, [])

    const setIsAllToggledHandler = () => {
        if (!users) {
            return
        }

        for (let user of users) {
            if (isAllToggled) {
                dispatch(toggleSelectedUser({ id: user.id, isSelected: false }))
            } else {
                dispatch(toggleSelectedUser({ id: user.id, isSelected: true }))
            }
        }

        setIsAllToggled(!isAllToggled)
    }

    const deleteUsersHandler = useCallback(() => {
        deleteUsers(selectedUsers)
    }, [selectedUsers])

    useEffect(() => {
        dispatch(clearSelectedUsers())
        setIsAllToggled(false)
    }, [isSuccessDeleteUsers])

    const tableActions = [{ text: "Удалить", class: "status-nav__link_red", callback: deleteUsersHandler }]


    return (
        <>
            <Helmet>
                <title>Пользователи</title>
            </Helmet>
            <div className="inner-page__top">
                <h1 className="inner-page__title inner-page__title_no-padding">Пользователи</h1>
            </div>

            <div className="inner-page__line">
                <button onClick={() => navigate(newUserPath)} className="inner-page__plus button button_small button_inline" type="button"><span className="button__plus">Создать пользователя</span></button>
            </div>
            <UsersFilters
                onChangeSortDirection={onChangeSortDirection}
                onChangeCity={onChangeCity}
                onChangeDistrict={onChangeDistrict}
                onChangeKeyword={onChangeKeyword}
                onChangeRole={onChangeRole}
                onChangeSortBy={onChangeSortBy}
                onChangeStatus={onChangeStatus}
                filters={filters} clearFilters={clearFiltersHandler}
                applyFilters={applyFilters}
                onDownloadExcel={downloadExcel}
                onChangeDateAt={onChangeDateAt}
                onChangeDateTo={onChangeDateTo}
            />
            <TableActions actions={tableActions} isActive={!!selectedUsers.length} />

            <div className="table-block">
                <UsersTable
                    currentUserPermissions={permissions} toggleSelectedUserHandler={toggleSelectedUserHandler}
                    selectedUsers={selectedUsers} setIsAllToggledHandler={setIsAllToggledHandler} users={users}
                    isAllToggled={isAllToggled} onDelete={deleteHandler} onChangeUserRole={onChangeUserRole}
                    onChangeUserStatus={onChangeUserStatus}
                />
                <Pagination onChangePage={onChangePage} page={pagination.page} count={count ?? 0} perPage={pagination.perPage} />
            </div>
        </>)
}
