import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { tiktokAPI } from '../../../api/titkok'
import { TableActions } from '../../../components/Common/UI/Table/TableActions'
import { Pagination } from '../../../components/Inner/Pagination'
import { TiktokFilters } from '../../../components/Inner/Tiktok/TiktokFilters'
import { TiktokUsersTable } from '../../../components/Inner/Tiktok/TiktokTables/TiktokUsersTable'
import { TiktokUser } from '../../../components/Inner/Tiktok/TiktokUser'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { useTypedDispatch } from '../../../hooks/common'
import { clearFilters, clearSelectedUsers, setCurrentFilters, setFiltersDateAt, setFiltersDateTo, setFiltersKeyword, setFiltersPostsCountMax, setFiltersPostsCountMin, setFiltersSortBy, setFiltersSortDirection, setFiltersSubcultures, setFiltersSubscribersCountMax, setFiltersSubscribersCountMin, setFiltersTags, setPaginationPage, toggleSelectedUser } from '../../../store/tiktok/users/reducer'
import { tiktokUsersSelectors } from '../../../store/tiktok/users/selectors'
import { IPermissibleSortBy, SortDirection } from '../../../types/filters'
import { SortBy } from '../../../types/tiktok'

const permissibleSortBy = [{ code: "username", text: "По названию" }] as Array<IPermissibleSortBy>

export const TiktokUsers = () => {
    const filters = useSelector(tiktokUsersSelectors.filters)
    const currentFilters = useSelector(tiktokUsersSelectors.currentFilters)
    const pagination = useSelector(tiktokUsersSelectors.pagination)
    const selectedUsers = useSelector(tiktokUsersSelectors.selectedUsers)

    const permissions = useGetCurrentUserPermissions()

    const { data: usersResponse } = tiktokAPI.useGetTiktokUsersQuery({ ...currentFilters, ...pagination })
    const [getExcel] = tiktokAPI.useLazyGetTiktokUsersExcelQuery()
    const [deleteUser] = tiktokAPI.useDeleteTiktokUserMutation()
    const [checkUser] = tiktokAPI.useCheckTiktokUserMutation()
    const [deleteUsers, { isSuccess: isSuccessDeleteUsers }] = tiktokAPI.useDeleteTiktokUsersMutation()
    const [isAllToggled, setIsAllToggled] = useState<boolean>(false)

    const users = usersResponse?.content || []
    const count = usersResponse?.totalElements || 0

    const dispatch = useTypedDispatch()

    const onChangePage = useCallback((page: number) => {
        dispatch(setPaginationPage({ page }))
    }, [pagination])

    const onChangeKeyword = useCallback((keyword: string) => {
        dispatch(setFiltersKeyword({ keyword }))
    }, [])


    const onChangeSortDirection = useCallback((sortDirection: SortDirection) => {
        dispatch(setFiltersSortDirection({ sortDirection }))
    }, [])

    const onChangeSortBy = useCallback((sortBy: SortBy) => {
        dispatch(setFiltersSortBy({ sortBy }))
    }, [])

    const onChangeSubscribersCountMin = useCallback((subscribersCountMin: number) => {
        dispatch(setFiltersSubscribersCountMin({ subscribersCountMin }))
    }, [])

    const onChangeSubscribersCountMax = useCallback((subscribersCountMax: number) => {
        dispatch(setFiltersSubscribersCountMax({ subscribersCountMax }))
    }, [])

    const onChangePostsCountMin = useCallback((postsCountMin: number) => {
        dispatch(setFiltersPostsCountMin({ postsCountMin }))
    }, [])

    const onChangePostsCountMax = useCallback((postsCountMax: number) => {
        dispatch(setFiltersPostsCountMax({ postsCountMax }))
    }, [])

    const onChangeSubculture = useCallback((subcultures: string | null) => {
        dispatch(setFiltersSubcultures({ subcultures }))
        onChangeTags(null)
    }, [])

    const onChangeDateAt = useCallback((dateAt: Date | null) => {
        dispatch(setFiltersDateAt({ dateAt }))
    }, [])

    const onChangeDateTo = useCallback((dateTo: Date | null) => {
        dispatch(setFiltersDateTo({ dateTo }))
    }, [])

    const onChangeTags = useCallback((tags: string | null) => {
        dispatch(setFiltersTags({ tags }))
    }, [])

    const onDeleteUser = useCallback((id: number) => {
        deleteUser(id)
    }, [])

    const applyFilters = useCallback(() => {
        dispatch(setPaginationPage({ page: 1 }))
        dispatch(setCurrentFilters({ currentFilters: { ...filters } }))
    }, [filters])

    const clearFiltersHandler = useCallback(() => {
        dispatch(clearFilters())
    }, [])

    const downloadExcel = useCallback(() => {
        getExcel({ ...filters })
    }, [filters])

    const toggleSelectedUserHandler = useCallback((id: number) => {
        dispatch(toggleSelectedUser({ id }))
    }, [])

    const onCheckUser = useCallback((id: number) => {
        checkUser(id)
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
            <TiktokFilters
                onChangeSortBy={onChangeSortBy} onChangeSortDirection={onChangeSortDirection} filters={filters}
                onChangeKeyword={onChangeKeyword} onChangePostsCountMax={onChangePostsCountMax}
                onChangePostsCountMin={onChangePostsCountMin} onChangeSubscribersCountMax={onChangeSubscribersCountMax}
                onChangeSubscribersCountMin={onChangeSubscribersCountMin} onChangeSubcultures={onChangeSubculture}
                onChangeTags={onChangeTags} applyFilters={applyFilters} clearFilters={clearFiltersHandler}
                onDownloadExcel={downloadExcel} onChangeDateAt={onChangeDateAt} onChangeDateTo={onChangeDateTo}
                permissibleSortBy={permissibleSortBy}
            />
            <TableActions actions={tableActions} isActive={!!selectedUsers.length} />
            <div className="table-block">
                <TiktokUsersTable
                    currentUserPermissions={permissions} toggleSelectedUserHandler={toggleSelectedUserHandler}
                    selectedUsers={selectedUsers} setIsAllToggledHandler={setIsAllToggledHandler} users={users}
                    isAllToggled={isAllToggled} onDelete={onDeleteUser} onCheck={onCheckUser}
                />
                <Pagination onChangePage={onChangePage} page={pagination.page} count={count ?? 0} perPage={pagination.perPage} />
            </div>
        </>
    )
}
