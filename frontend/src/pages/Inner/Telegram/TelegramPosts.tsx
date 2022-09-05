import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { telegramAPI } from '../../../api/telegram'
import { TableActions } from '../../../components/Common/UI/Table/TableActions'
import { Pagination } from '../../../components/Inner/Pagination'
import { TelegramFilters } from '../../../components/Inner/Telegram/TelegramFilters'
import { TelegramPost } from '../../../components/Inner/Telegram/TelegramPost'
import { TelegramPostsTable } from '../../../components/Inner/Telegram/TelegramTables/TelegramPostsTable'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { useTypedDispatch } from '../../../hooks/common'
import { setFiltersKeyword, setFiltersSortBy, setFiltersSortDirection, setFiltersTag, setPaginationPage, setFiltersSubcultures, clearFilters, setCurrentFilters, setFiltersDateAt, setFiltersDateTo, toggleSelectedPost, clearSelectedPosts, setFiltersReactionsCountMin, setFiltersReactionsCountMax, setFiltersCommentsCountMin, setFiltersCommentsCountMax } from '../../../store/telegram/posts/reducer'
import { telegramPostsSelectors } from '../../../store/telegram/posts/selectors'
import { IPermissibleSortBy, SortDirection } from '../../../types/filters'
import { SortBy } from '../../../types/telegram'

const permissibleSortBy = [] as Array<IPermissibleSortBy>

export const TelegramPosts = () => {
    const filters = useSelector(telegramPostsSelectors.filters)
    const currentFilters = useSelector(telegramPostsSelectors.currentFilters)
    const pagination = useSelector(telegramPostsSelectors.pagination)
    const selectedPosts = useSelector(telegramPostsSelectors.selectedPosts)

    const permissions = useGetCurrentUserPermissions()

    const { data: postsResponse } = telegramAPI.useGetTelegramPostsQuery({ ...currentFilters, ...pagination })
    const [getExcel] = telegramAPI.useLazyGetTelegramPostsExcelQuery()
    const [deletePost] = telegramAPI.useDeleteTelegramPostMutation()
    const [checkPost] = telegramAPI.useCheckTelegramPostMutation()
    const [deletePosts, { isSuccess: isSuccessDeletePosts }] = telegramAPI.useDeleteTelegramPostsMutation()
    const [isAllToggled, setIsAllToggled] = useState<boolean>(false)

    const posts = postsResponse?.content || []
    const count = postsResponse?.totalElements || 0

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

    const onChangeSubcultures = useCallback((subcultures: null | string) => {
        dispatch(setFiltersSubcultures({ subcultures }))
    }, [])

    const onChangeTags = useCallback((tags: null | string) => {
        dispatch(setFiltersTag({ tags }))
    }, [])

    const onChangeDateAt = useCallback((dateAt: Date | null) => {
        dispatch(setFiltersDateAt({ dateAt }))
    }, [])

    const onChangeDateTo = useCallback((dateTo: Date | null) => {
        dispatch(setFiltersDateTo({ dateTo }))
    }, [])

    const onChangeReactionsCountMin = useCallback((reactionsCountMin: number) => {
        dispatch(setFiltersReactionsCountMin({ reactionsCountMin }))
    }, [])

    const onChangeReactionsCountMax = useCallback((reactionsCountMax: number) => {
        dispatch(setFiltersReactionsCountMax({ reactionsCountMax }))
    }, [])

    const onChangeCommentsCountMin = useCallback((commentsCountMin: number) => {
        dispatch(setFiltersCommentsCountMin({ commentsCountMin }))
    }, [])

    const onChangeCommentsCountMax = useCallback((commentsCountMax: number) => {
        dispatch(setFiltersCommentsCountMax({ commentsCountMax }))
    }, [])

    const applyFilters = useCallback(() => {
        dispatch(setPaginationPage({ page: 1 }))
        dispatch(setCurrentFilters({ currentFilters: { ...filters } }))
    }, [filters])

    const clearFiltersHandler = useCallback(() => {
        dispatch(clearFilters())
    }, [])

    const onDeletePost = useCallback((id: number) => {
        deletePost(id)
    }, [])

    const onCheckPost = useCallback((id: number) => {
        checkPost(id)
    }, [])


    const downloadExcel = useCallback(() => {
        getExcel({ ...filters })
    }, [filters])

    const toggleSelectedPostHandler = useCallback((id: number) => {
        dispatch(toggleSelectedPost({ id }))
    }, [])

    const setIsAllToggledHandler = () => {
        if (!posts) {
            return
        }

        for (let post of posts) {
            if (isAllToggled) {
                dispatch(toggleSelectedPost({ id: post.id, isSelected: false }))
            } else {
                dispatch(toggleSelectedPost({ id: post.id, isSelected: true }))
            }
        }

        setIsAllToggled(!isAllToggled)
    }

    const deletePostsHandler = useCallback(() => {
        deletePosts(selectedPosts)
    }, [selectedPosts])

    useEffect(() => {
        dispatch(clearSelectedPosts())
        setIsAllToggled(false)
    }, [isSuccessDeletePosts])

    const tableActions = [{ text: "Удалить", class: "status-nav__link_red", callback: deletePostsHandler }]


    return (
        <>
            <Helmet>
                <title>Записи</title>
            </Helmet>
            <TelegramFilters
                onChangeSortBy={onChangeSortBy} onChangeSortDirection={onChangeSortDirection} filters={filters}
                onChangeKeyword={onChangeKeyword} onChangeSubcultures={onChangeSubcultures} onDownloadExcel={downloadExcel}
                onChangeTags={onChangeTags} applyFilters={applyFilters} clearFilters={clearFiltersHandler}
                onChangeDateAt={onChangeDateAt} onChangeDateTo={onChangeDateTo} permissibleSortBy={permissibleSortBy}
                onChangeCommentsCountMax={onChangeCommentsCountMax} onChangeCommentsCountMin={onChangeCommentsCountMin}
                onChangeReactionsCountMax={onChangeReactionsCountMax} onChangeReactionsCountMin={onChangeReactionsCountMin}
            />
            <TableActions actions={tableActions} isActive={!!selectedPosts.length} />
            <div className="table-block">
                <TelegramPostsTable
                    currentUserPermissions={permissions} toggleSelectedPostHandler={toggleSelectedPostHandler}
                    selectedPosts={selectedPosts} setIsAllToggledHandler={setIsAllToggledHandler} posts={posts}
                    isAllToggled={isAllToggled} onDelete={onDeletePost} onCheck={onCheckPost}
                />

                <Pagination onChangePage={onChangePage} page={pagination.page} count={count ?? 0} perPage={pagination.perPage} />
            </div>
        </>
    )
}
