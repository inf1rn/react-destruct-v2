import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { telegramAPI } from '../../../api/telegram'
import { TableActions } from '../../../components/Common/UI/Table/TableActions'
import { Pagination } from '../../../components/Inner/Pagination'
import { TelegramChannel } from '../../../components/Inner/Telegram/TelegramChannel'
import { TelegramFilters } from '../../../components/Inner/Telegram/TelegramFilters'
import { TelegramChannelsTable } from '../../../components/Inner/Telegram/TelegramTables/TelegramChannelsTable'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { useTypedDispatch } from '../../../hooks/common'
import { clearFilters, clearSelectedChannels, setCurrentFilters, setFiltersDateAt, setFiltersDateTo, setFiltersKeyword, setFiltersPostsCountMax, setFiltersPostsCountMin, setFiltersSortBy, setFiltersSortDirection, setFiltersSubcultures, setFiltersSubscribersCountMax, setFiltersSubscribersCountMin, setFiltersTags, setPaginationPage, toggleSelectedChannel } from '../../../store/telegram/channels/reducer'
import { telegramChannelsSelectors } from '../../../store/telegram/channels/selectors'
import { IPermissibleSortBy, SortDirection } from '../../../types/filters'
import { SortBy } from '../../../types/telegram'

const permissibleSortBy = [{ code: "channelName", text: "По названию" }] as Array<IPermissibleSortBy>

export const TelegramChannels = () => {
    const filters = useSelector(telegramChannelsSelectors.filters)
    const currentFilters = useSelector(telegramChannelsSelectors.currentFilters)
    const pagination = useSelector(telegramChannelsSelectors.pagination)
    const selectedChannels = useSelector(telegramChannelsSelectors.selectedChannels)

    const permissions = useGetCurrentUserPermissions()

    const { data: channelsResponse } = telegramAPI.useGetTelegramChannelsQuery({ ...pagination, ...currentFilters })
    const [getExcel] = telegramAPI.useLazyGetTelegramChannelsExcelQuery()
    const [deleteChannel] = telegramAPI.useDeleteTelegramChannelMutation()
    const [checkChannel] = telegramAPI.useCheckTelegramChannelMutation()
    const [deleteChannels, { isSuccess: isSuccessDeleteChannels }] = telegramAPI.useDeleteTelegramChannelsMutation()
    const [isAllToggled, setIsAllToggled] = useState<boolean>(false)

    const channels = channelsResponse?.content || []
    const count = channelsResponse?.totalElements || 0

    const dispatch = useTypedDispatch()

    const onChangePage = useCallback((page: number) => {
        dispatch(setPaginationPage({ page }))
    }, [filters])

    const onChangeKeyword = useCallback((keyword: string) => {
        dispatch(setFiltersKeyword({ keyword }))
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

    const onDeleteChannel = useCallback((id: number) => {
        deleteChannel(id)
    }, [])

    const onChangePostsCountMin = useCallback((postsCountMin: number) => {
        dispatch(setFiltersPostsCountMin({ postsCountMin }))
    }, [])

    const onChangePostsCountMax = useCallback((postsCountMax: number) => {
        dispatch(setFiltersPostsCountMax({ postsCountMax }))
    }, [])

    const onCheckChannel = useCallback((id: number) => {
        checkChannel(id)
    }, [])


    const onChangeSubcultures = useCallback((subcultures: string | null) => {
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

    const toggleSelectedChannelHandler = useCallback((id: number) => {
        dispatch(toggleSelectedChannel({ id }))
    }, [])

    const setIsAllToggledHandler = () => {
        if (!channels) {
            return
        }

        for (let channel of channels) {
            if (isAllToggled) {
                dispatch(toggleSelectedChannel({ id: channel.channelId, isSelected: false }))
            } else {
                dispatch(toggleSelectedChannel({ id: channel.channelId, isSelected: true }))
            }
        }

        setIsAllToggled(!isAllToggled)
    }

    const deleteChannelsHandler = useCallback(() => {
        deleteChannels(selectedChannels)
    }, [selectedChannels])

    useEffect(() => {
        dispatch(clearSelectedChannels())
        setIsAllToggled(false)
    }, [isSuccessDeleteChannels])

    const tableActions = [{ text: "Удалить", class: "status-nav__link_red", callback: deleteChannelsHandler }]


    return (
        <>
            <Helmet>
                <title>Каналы</title>
            </Helmet>
            <TelegramFilters
                onChangeSortBy={onChangeSortBy} onChangeSortDirection={onChangeSortDirection}
                filters={filters} onChangeKeyword={onChangeKeyword} onDownloadExcel={downloadExcel}
                onChangePostsCountMax={onChangePostsCountMax} onChangePostsCountMin={onChangePostsCountMin}
                onChangeSubscribersCountMax={onChangeSubscribersCountMax} onChangeSubscribersCountMin={onChangeSubscribersCountMin}
                onChangeSubcultures={onChangeSubcultures} onChangeTags={onChangeTags} applyFilters={applyFilters}
                clearFilters={clearFiltersHandler} onChangeDateAt={onChangeDateAt} onChangeDateTo={onChangeDateTo}
                permissibleSortBy={permissibleSortBy}
            />
            <TableActions actions={tableActions} isActive={!!selectedChannels.length} />

            <div className="table-block">
                <TelegramChannelsTable
                    currentUserPermissions={permissions} toggleSelectedChannelHandler={toggleSelectedChannelHandler}
                    selectedChannels={selectedChannels} setIsAllToggledHandler={setIsAllToggledHandler} channels={channels}
                    isAllToggled={isAllToggled} onDelete={onDeleteChannel} onCheck={onCheckChannel}
                />
                <Pagination onChangePage={onChangePage} page={pagination.page} count={count ?? 0} perPage={pagination.perPage} />
            </div>
        </>
    )
}
