import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { tiktokAPI } from '../../../api/titkok'
import { TableActions } from '../../../components/Common/UI/Table/TableActions'
import { Pagination } from '../../../components/Inner/Pagination'
import { TiktokFilters } from '../../../components/Inner/Tiktok/TiktokFilters'
import { TiktokPost } from '../../../components/Inner/Tiktok/TiktokPost'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { useTypedDispatch } from '../../../hooks/common'
import { clearFilters, clearSelectedPosts, setCurrentFilters, setFiltersCommentsCountMax, setFiltersCommentsCountMin, setFiltersDateAt, setFiltersDateTo, setFiltersKeyword, setFiltersReactionsCountMax, setFiltersReactionsCountMin, setFiltersSortBy, setFiltersSortDirection, setFiltersSubcultures, setFiltersTags, setPaginationPage } from '../../../store/tiktok/posts/reducer'
import { tiktokPostsSelectors } from '../../../store/tiktok/posts/selectors'
import { toggleSelectedPost } from '../../../store/tiktok/posts/reducer'
import { IPermissibleSortBy, SortDirection } from '../../../types/filters'
import { SortBy } from '../../../types/tiktok'
import { TiktokPostsTable } from '../../../components/Inner/Tiktok/TiktokTables/TiktokPostsTable'

const permissibleSortBy = [] as Array<IPermissibleSortBy>

export const TiktokPosts = () => {
    const filters = useSelector(tiktokPostsSelectors.filters)
    const currentFilters = useSelector(tiktokPostsSelectors.currentFilters)
    const pagination = useSelector(tiktokPostsSelectors.pagination)
    const selectedPosts = useSelector(tiktokPostsSelectors.selectedPosts)

    const permissions = useGetCurrentUserPermissions()

    const { data: postsResponse } = tiktokAPI.useGetTiktokPostsQuery({ ...currentFilters, ...pagination })
    const [getExcel] = tiktokAPI.useLazyGetTiktokPostsExcelQuery()
    const [deletePost] = tiktokAPI.useDeleteTiktokPostMutation()
    const [checkPost] = tiktokAPI.useCheckTiktokPostMutation()
    const [deletePosts, { isSuccess: isSuccessDeletePosts }] = tiktokAPI.useDeleteTiktokPostsMutation()
    const [isAllToggled, setIsAllToggled] = useState<boolean>(false)

    const dispatch = useTypedDispatch()

    const posts = postsResponse?.content || []
    const count = postsResponse?.totalElements || 0

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
        onChangeTags(null)
    }, [])

    const onCheckPost = useCallback((id: number) => {
        checkPost(id)
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

    const onDeletePost = useCallback((id: number) => {
        deletePost(id)
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

    const toggleSelectedPostHandler = useCallback((id: number) => {
        dispatch(toggleSelectedPost({ id }))
    }, [])

    const setIsAllToggledHandler = () => {
        if (!posts) {
            return
        }

        for (let user of posts) {
            if (isAllToggled) {
                dispatch(toggleSelectedPost({ id: user.id, isSelected: false }))
            } else {
                dispatch(toggleSelectedPost({ id: user.id, isSelected: true }))
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
            <TiktokFilters
                onChangeSortBy={onChangeSortBy} onChangeSortDirection={onChangeSortDirection} filters={filters}
                onChangeKeyword={onChangeKeyword} onChangeSubcultures={onChangeSubcultures} onDownloadExcel={downloadExcel}
                onChangeTags={onChangeTags} applyFilters={applyFilters} clearFilters={clearFiltersHandler}
                onChangeDateAt={onChangeDateAt} onChangeDateTo={onChangeDateTo} 
                onChangeCommentsCountMax={onChangeCommentsCountMax} onChangeCommentsCountMin={onChangeCommentsCountMin}
                onChangeReactionsCountMax={onChangeReactionsCountMax} onChangeReactionsCountMin={onChangeReactionsCountMin}
                permissibleSortBy={permissibleSortBy}
            />
            <TableActions actions={tableActions} isActive={!!selectedPosts.length} />
            <div className="table-block">
                <TiktokPostsTable
                    currentUserPermissions={permissions} toggleSelectedPostHandler={toggleSelectedPostHandler}
                    selectedPosts={selectedPosts} setIsAllToggledHandler={setIsAllToggledHandler} posts={posts}
                    isAllToggled={isAllToggled} onDelete={onDeletePost} onCheck={onCheckPost}
                />
                <Pagination onChangePage={onChangePage} page={pagination.page} count={count ?? 0} perPage={pagination.perPage} />

            </div>
        </>)
}
