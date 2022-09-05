import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { subculturesAndTagsAPI } from '../../../api/subculturesAndTags'
import { Pagination } from '../../../components/Inner/Pagination'
import { NewTag } from '../../../components/Inner/SubculturesAndTags/NewTag'
import { NewTagSuccess } from '../../../components/Inner/SubculturesAndTags/NewTagSuccess'
import { SubculturesAndTagsFilters } from '../../../components/Inner/SubculturesAndTags/SubculturesAndTagsFilters'
import { TagsTable } from '../../../components/Inner/SubculturesAndTags/SubculturesAndTagsTables/TagsTable'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { useTypedDispatch } from '../../../hooks/common'
import { setCurrentFilters, setFiltersKeyword, setPaginationPage } from '../../../store/subculturesAndTags/tags/reducer'
import { tagsSelectors } from '../../../store/subculturesAndTags/tags/selectors'
import { ITag, IUpdateTagBody } from '../../../types/tags'

export const Tags = () => {
    const filters = useSelector(tagsSelectors.filters)
    const currentFilters = useSelector(tagsSelectors.currentFilters)
    const pagination = useSelector(tagsSelectors.pagination)

    const dispatch = useTypedDispatch()

    const [isActiveNewTag, setIsActiveNewTag] = useState<boolean>(false)
    const [isActiveNewTagSuccess, setIsActiveNewTagSuccess] = useState<boolean>(false)


    const { data: tagsFullInfoResponse } = subculturesAndTagsAPI.useGetTagsQuery({ ...currentFilters, ...pagination })

    const tagsFullInfo = tagsFullInfoResponse?.content || []
    const count = tagsFullInfoResponse?.totalElements || 0

    const [getExcel] = subculturesAndTagsAPI.useLazyGetTagsExcelQuery()
    const [createTag, { data: newTag }] = subculturesAndTagsAPI.useCreateTagMutation()
    const [deleteTag] = subculturesAndTagsAPI.useDeleteTagMutation()
    const [updateTag] = subculturesAndTagsAPI.useUpdateTagMutation()


    const permissions = useGetCurrentUserPermissions()

    const onChangePage = useCallback((page: number) => {
        dispatch(setPaginationPage({ page }))
    }, [])

    const onCloseNewTag = useCallback(() => {
        setIsActiveNewTag(false)
    }, [])

    const onCloseNewTagSuccess = useCallback(() => {
        setIsActiveNewTagSuccess(false)
    }, [])

    const onCreateTag = useCallback((tagData: Partial<ITag>) => {
        createTag(tagData)
        setIsActiveNewTag(false)
        setIsActiveNewTagSuccess(true)
    }, [])

    const onDelete = useCallback((id: number) => {
        deleteTag(id)
    }, [])

    const onChange = useCallback((dto: IUpdateTagBody) => {
        updateTag(dto)
    }, [])

    const onChangeKeyword = useCallback((keyword: string) => {
        dispatch(setFiltersKeyword({ keyword }))
    }, [])

    const downloadExcel = useCallback(() => {
        getExcel({ ...filters })
    }, [filters])

    const applyFilters = useCallback(() => {
        dispatch(setPaginationPage({ page: 1 }))
        dispatch(setCurrentFilters({ currentFilters: { ...filters } }))
    }, [filters])

    const NewTagComponent: React.FC<{ mobile?: boolean }> = ({ mobile = false }) =>
        <NewTag mobile={mobile} onClose={onCloseNewTag} onSubmit={onCreateTag} />


    return (
        <>
            <Helmet>
                <title>Теги</title>
            </Helmet>
            {

                !(isActiveNewTag || isActiveNewTagSuccess) && <div className="inner-page__line inner-page__line_hide-mob">
                    <button onClick={() => setIsActiveNewTag(true)} className="inner-page__plus button button_small button_inline" type="button"><span className="button__plus">Добавить тег</span></button>
                </div>
            }

            {isActiveNewTag &&
                <div className="inner-page__line inner-page__line_hide-mob">
                    <NewTagComponent />
                </div>
            }
            {isActiveNewTagSuccess && newTag && <NewTagSuccess onClose={onCloseNewTagSuccess} tag={newTag} />}
            <SubculturesAndTagsFilters
                onDownloadExcel={downloadExcel} applyFilters={applyFilters} filters={filters} onChangeKeyword={onChangeKeyword}>
                <NewTagComponent mobile={true} />
            </SubculturesAndTagsFilters>

            <div className="table-block">

                <TagsTable
                    onChange={onChange} onDelete={onDelete} currentUserPermissions={permissions}
                    tagsFullInfo={tagsFullInfo}
                />
                <Pagination count={count ?? 0} perPage={pagination.perPage} page={pagination.page} onChangePage={onChangePage} />
            </div>
        </>
    )
}
