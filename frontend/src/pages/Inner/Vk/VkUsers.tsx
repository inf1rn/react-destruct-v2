import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { vkAPI } from '../../../api/vk'
import { TableActions } from '../../../components/Common/UI/Table/TableActions'
import { Pagination } from '../../../components/Inner/Pagination'
import { VkFilters } from '../../../components/Inner/Vk/VkFilters'
import { VkUsersTable } from '../../../components/Inner/Vk/VkTables/VkUsersTable'
import { deleteVkUserPermission } from '../../../constants/permissions'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { useTypedDispatch } from '../../../hooks/common'
import { clearFilters, clearSelectedUsers, setCurrentFilters, setFiltersCity, setFiltersDistrict, setFiltersCountry, setFiltersDateAt, setFiltersDateTo, setFiltersKeyword, setFiltersSortBy, setFiltersSortDirection, setFiltersSubcultures, setFiltersTags, setPaginationPage, toggleSelectedUser } from '../../../store/vk/users/reducer'
import { vkUsersSelectors } from '../../../store/vk/users/selectors'
import { IPermissibleSortBy, SortDirection } from '../../../types/filters'
import { SortBy } from '../../../types/vk'

const permissibleSortBy = [{ code: "firstName", text: "По названию" }] as Array<IPermissibleSortBy>

export const VkUsers = () => {
    const filters = useSelector(vkUsersSelectors.filters)
    const currentFilters = useSelector(vkUsersSelectors.currentFilters)
    const selectedUsers = useSelector(vkUsersSelectors.selectedUsers)
    const pagination = useSelector(vkUsersSelectors.pagination)
    const permissions = useGetCurrentUserPermissions()

    const { data: usersResponse } = vkAPI.useGetVkUsersQuery({ ...currentFilters, ...pagination })

    const users = usersResponse?.content || []
    const count = usersResponse?.totalElements || 0

    const [getCsv] = vkAPI.useLazyGetVkUsersCsvQuery()
    const [deleteUser] = vkAPI.useDeleteVkUserMutation()
    const [checkUser] = vkAPI.useCheckVkUserMutation()
    const [deleteUsers, { isSuccess: isSuccessDeleteUsers }] = vkAPI.useDeleteVkUsersMutation()
    const [isAllToggled, setIsAllToggled] = useState<boolean>(false)

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

    const onChangeCountry = useCallback((country: string | null) => {
        dispatch(setFiltersCountry({ country }))
        onChangeRegion(null)
        onChangeCity(null)
    }, [])

    const onChangeRegion = useCallback((region: string | null) => {
        dispatch(setFiltersDistrict({ region }))
    }, [])

    const onChangeCity = useCallback((city: string | null) => {
        dispatch(setFiltersCity({ city }))
    }, [])

    const onChangeSubcultures = useCallback((subcultures: string | null) => {
        dispatch(setFiltersSubcultures({ subcultures }))
        onChangeTags(null)
    }, [])

    const onChangeTags = useCallback((tags: string | null) => {
        dispatch(setFiltersTags({ tags }))
    }, [])

    const onChangeDateAt = useCallback((dateAt: Date | null) => {
        dispatch(setFiltersDateAt({ dateAt }))
    }, [])

    const onChangeDateTo = useCallback((dateTo: Date | null) => {
        dispatch(setFiltersDateTo({ dateTo }))
    }, [])

    const applyFilters = useCallback(() => {
        dispatch(setPaginationPage({ page: 1 }))
        dispatch(setCurrentFilters({ currentFilters: { ...filters } }))
    }, [filters])

    const onDeleteUser = useCallback((id: number) => {
        deleteUser(id)
    }, [])

    const onCheckUser = useCallback((id: number) => {
        checkUser(id)
    }, [])

    const clearFiltersHandler = useCallback(() => {
        dispatch(clearFilters())
    }, [])

    const downloadCsv = useCallback(() => {
        getCsv({ ...filters })
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

    const tableActions = [{ text: "Удалить", class: "status-nav__link_red", callback: deleteUsersHandler, requiredPermission: deleteVkUserPermission }]

    return (
        <>
            <Helmet>
                <title>Пользователи</title>
            </Helmet>

            <VkFilters
                onChangeSortBy={onChangeSortBy} onChangeSortDirection={onChangeSortDirection} filters={filters}
                onChangeKeyword={onChangeKeyword} onChangeCity={onChangeCity} applyFilters={applyFilters}
                onChangeCountry={onChangeCountry} onChangeSubcultures={onChangeSubcultures} onChangeRegion={onChangeRegion}
                onChangeTags={onChangeTags} clearFilters={clearFiltersHandler} onDownloadExcel={downloadCsv}
                onChangeDateAt={onChangeDateAt} onChangeDateTo={onChangeDateTo} permissibleSortBy={permissibleSortBy}
            />
            <TableActions actions={tableActions} isActive={!!selectedUsers.length} />
            <div className="table-block">
                <VkUsersTable
                    currentUserPermissions={permissions} toggleSelectedUserHandler={toggleSelectedUserHandler}
                    selectedUsers={selectedUsers} setIsAllToggledHandler={setIsAllToggledHandler} users={users}
                    isAllToggled={isAllToggled} onDelete={onDeleteUser} onCheck={onCheckUser}
                />

                <Pagination onChangePage={onChangePage} page={pagination.page} count={count ?? 0} perPage={pagination.perPage} />
            </div>
        </>
    )
}
