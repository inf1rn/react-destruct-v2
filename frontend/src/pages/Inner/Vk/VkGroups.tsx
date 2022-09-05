import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { vkAPI } from '../../../api/vk'
import { TableActions } from '../../../components/Common/UI/Table/TableActions'
import { Pagination } from '../../../components/Inner/Pagination'
import { VkFilters } from '../../../components/Inner/Vk/VkFilters'
import { VkGroup } from '../../../components/Inner/Vk/VkGroup'
import { VkGroupsTable } from '../../../components/Inner/Vk/VkTables/VkGroupsTable'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { useTypedDispatch } from '../../../hooks/common'
import { clearFilters, clearSelectedGroups, setCurrentFilters, setFiltersCity, setFiltersCountry, setFiltersDateAt, setFiltersDateTo, setFiltersDistrict, setFiltersKeyword, setFiltersSortBy, setFiltersSortDirection, setFiltersSubcultures, setFiltersSubscribersCountMax, setFiltersSubscribersCountMin, setFiltersTags, setPaginationPage, toggleSelectedGroup } from '../../../store/vk/groups/reducer'
import { vkGroupsSelectors } from '../../../store/vk/groups/selectors'
import { IPermissibleSortBy, SortDirection } from '../../../types/filters'
import { SortBy } from '../../../types/vk'

const permissibleSortBy = [{ code: "name", text: "По названию" }] as Array<IPermissibleSortBy>

export const VkGroups = () => {
    const filters = useSelector(vkGroupsSelectors.filters)
    const selectedGroups = useSelector(vkGroupsSelectors.selectedGroups)
    const pagination = useSelector(vkGroupsSelectors.pagination)
    const currentFilters = useSelector(vkGroupsSelectors.currentFilters)
    const permissions = useGetCurrentUserPermissions()

    const { data: groupsResponse } = vkAPI.useGetVkGroupsQuery({ ...currentFilters, ...pagination })
    const [getExcel] = vkAPI.useLazyGetVkGroupsExcelQuery()
    const [deleteGroup] = vkAPI.useDeleteVkGroupMutation()
    const [checkGroup] = vkAPI.useCheckVkGroupMutation()
    const [deleteGroups, { isSuccess: isSuccessDeleteGroups }] = vkAPI.useDeleteVkGroupsMutation()
    const [isAllToggled, setIsAllToggled] = useState<boolean>(false)

    const groups = groupsResponse?.content || []
    const count = groupsResponse?.totalElements || 0

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

    const onChangeSubscribersCountMin = useCallback((membersCountMin: number) => {
        dispatch(setFiltersSubscribersCountMin({ membersCountMin }))
    }, [])

    const onChangeSubscribersCountMax = useCallback((membersCountMax: number) => {
        dispatch(setFiltersSubscribersCountMax({ membersCountMax }))
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

    const onDeleteGroup = useCallback((id: number) => {
        deleteGroup(id)
    }, [])

    const onChangeTags = useCallback((tags: null | string) => {
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

    const clearFiltersHandler = useCallback(() => {
        dispatch(clearFilters())
    }, [])

    const downloadExcel = useCallback(() => {
        getExcel({ ...filters })
    }, [filters])

    const toggleSelectedGroupHandler = useCallback((id: number) => {
        dispatch(toggleSelectedGroup({ id }))
    }, [])

    const onCheckGroup = useCallback((id: number) => {
        checkGroup(id)
    }, [])



    const setIsAllToggledHandler = () => {
        if (!groups) {
            return
        }

        for (let user of groups) {
            if (isAllToggled) {
                dispatch(toggleSelectedGroup({ id: user.id, isSelected: false }))
            } else {
                dispatch(toggleSelectedGroup({ id: user.id, isSelected: true }))
            }
        }

        setIsAllToggled(!isAllToggled)
    }

    const deleteGroupsHandler = useCallback(() => {
        deleteGroups(selectedGroups)
    }, [selectedGroups])

    useEffect(() => {
        dispatch(clearSelectedGroups())
        setIsAllToggled(false)
    }, [isSuccessDeleteGroups])

    const tableActions = [{ text: "Удалить", class: "status-nav__link_red", callback: deleteGroupsHandler }]


    return (
        <>
            <Helmet>
                <title>Группы</title>
            </Helmet>
            <VkFilters
                onChangeSubscribersCountMax={onChangeSubscribersCountMax} onChangeSubscribersCountMin={onChangeSubscribersCountMin}
                onChangeKeyword={onChangeKeyword} onChangeSortBy={onChangeSortBy} onChangeSortDirection={onChangeSortDirection}
                filters={filters} onChangeCity={onChangeCity} onChangeCountry={onChangeCountry} clearFilters={clearFiltersHandler}
                onChangeRegion={onChangeRegion} onChangeSubcultures={onChangeSubcultures} onChangeTags={onChangeTags}
                applyFilters={applyFilters} onDownloadExcel={downloadExcel} onChangeDateAt={onChangeDateAt}
                onChangeDateTo={onChangeDateTo} permissibleSortBy={permissibleSortBy}
            />
            <TableActions actions={tableActions} isActive={!!selectedGroups.length} />
            <div className="table-block">
                <VkGroupsTable
                    currentUserPermissions={permissions} toggleSelectedGroupHandler={toggleSelectedGroupHandler}
                    selectedGroups={selectedGroups} setIsAllToggledHandler={setIsAllToggledHandler} groups={groups}
                    isAllToggled={isAllToggled} onDelete={onDeleteGroup} onCheck={onCheckGroup}
                />
                <Pagination onChangePage={onChangePage} page={pagination.page} count={count ?? 0} perPage={pagination.perPage} />
            </div>
        </>
    )
}
