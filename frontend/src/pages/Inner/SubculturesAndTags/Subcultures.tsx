import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { subculturesAndTagsAPI } from '../../../api/subculturesAndTags'
import { Pagination } from '../../../components/Inner/Pagination'
import { NewSubculture } from '../../../components/Inner/SubculturesAndTags/NewSubculture'
import { NewSubcultureSuccess } from '../../../components/Inner/SubculturesAndTags/NewSubcultureSuccess'
import { Subculture } from '../../../components/Inner/SubculturesAndTags/Subculture'
import { SubculturesAndTagsFilters } from '../../../components/Inner/SubculturesAndTags/SubculturesAndTagsFilters'
import { SubculturesTable } from '../../../components/Inner/SubculturesAndTags/SubculturesAndTagsTables/SubculturesTable'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { useTypedDispatch } from '../../../hooks/common'
import { setCurrentFilters, setFiltersKeyword, setPaginationPage } from '../../../store/subculturesAndTags/subcultures/reducer'
import { subculturesSelectors } from '../../../store/subculturesAndTags/subcultures/selectors'
import { ISubculture, IUpdateSubcultureBody } from '../../../types/subcultures'

export const Subcultures = React.memo(() => {
    const filters = useSelector(subculturesSelectors.filters)
    const currentFilters = useSelector(subculturesSelectors.currentFilters)
    const pagination = useSelector(subculturesSelectors.pagination)
    const dispatch = useTypedDispatch()
    const [isActiveNewSubculture, setIsActiveNewSubculture] = useState<boolean>(false)
    const [isActiveNewSubcultureSuccess, setIsActiveNewSubcultureSuccess] = useState<boolean>(false)

    const { data: subculturesFullInfoResponse } = subculturesAndTagsAPI.useGetSubculturesQuery({ ...currentFilters, ...pagination })

    const subculturesFullInfo = subculturesFullInfoResponse?.content || []
    const count = subculturesFullInfoResponse?.totalElements || 0
    
    const [getExcel] = subculturesAndTagsAPI.useLazyGetSubculturesExcelQuery()
    const [createSubculture, { data: newSubculture }] = subculturesAndTagsAPI.useCreateSubcultureMutation()
    const [deleteSubculture] = subculturesAndTagsAPI.useDeleteSubcultureMutation()
    const [updateSubculture] = subculturesAndTagsAPI.useUpdateSubcultureMutation()
    const permissions = useGetCurrentUserPermissions()

    const onChangePage = useCallback((page: number) => {
        dispatch(setPaginationPage({ page }))
    }, [])

    const onCloseNewSubculture = useCallback(() => {
        setIsActiveNewSubculture(false)
    }, [])

    const onCreateSubculture = useCallback((subcultureData: Partial<ISubculture>) => {
        createSubculture(subcultureData)
        setIsActiveNewSubculture(false)
        setIsActiveNewSubcultureSuccess(true)
    }, [])

    const onCloseNewSubcultureSuccess = useCallback(() => {
        setIsActiveNewSubcultureSuccess(false)
    }, [])

    const onDelete = useCallback((id: number) => {
        deleteSubculture(id)
    }, [])

    const onChange = useCallback((dto: IUpdateSubcultureBody) => {
        updateSubculture(dto)
    }, [])

    const onChangeKeyword = useCallback((keyword: string) => {
        dispatch(setFiltersKeyword({ keyword }))
    }, [])

    const applyFilters = useCallback(() => {
        dispatch(setPaginationPage({ page: 1 }))
        dispatch(setCurrentFilters({ currentFilters: { ...filters } }))
    }, [filters])

    const downloadExcel = useCallback(() => {
        getExcel({ ...filters })
    }, [filters])

    const NewSubcultureComponent: React.FC<{ mobile?: boolean }> = ({ mobile = false }) =>
        <NewSubculture mobile={mobile} onClose={onCloseNewSubculture} onSubmit={onCreateSubculture} />

    return (
        <>
            <Helmet>
                <title>Субкультуры</title>
            </Helmet>
            {

                !(isActiveNewSubculture || isActiveNewSubcultureSuccess) && <div className="inner-page__line inner-page__line_hide-mob">
                    <button onClick={() => setIsActiveNewSubculture(true)} className="inner-page__plus button button_small button_inline" type="button"><span className="button__plus">Добавить субкультуру</span></button>
                </div>
            }
            {isActiveNewSubculture &&
                <div className="inner-page__line inner-page__line_hide-mob">
                    <NewSubcultureComponent />
                </div>
            }
            {isActiveNewSubcultureSuccess && newSubculture && <NewSubcultureSuccess onClose={onCloseNewSubcultureSuccess} subculture={newSubculture} />}
            <SubculturesAndTagsFilters
                onDownloadExcel={downloadExcel} filters={filters} applyFilters={applyFilters} onChangeKeyword={onChangeKeyword}>
                <NewSubcultureComponent mobile={true} />
            </SubculturesAndTagsFilters>

            <div className="table-block">
                <SubculturesTable
                    onChange={onChange} onDelete={onDelete} currentUserPermissions={permissions}
                    subculturesFullInfo={subculturesFullInfo}
                />

                <Pagination page={pagination.page} perPage={pagination.perPage} onChangePage={onChangePage} count={count ?? 0} />
            </div>
        </>
    )
})
