import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { parsersAPI } from '../../../api/parsers'
import { Pagination } from '../../../components/Inner/Pagination'
import { ParserLog } from '../../../components/Inner/Parsers/ParserLog'
import { ParsersFilters } from '../../../components/Inner/Parsers/ParsersFilters'
import { ParsersSettings } from '../../../components/Inner/Parsers/ParsersSettings'
import { ParsersTable } from '../../../components/Inner/Parsers/ParsersTable'
import { useTypedDispatch } from '../../../hooks/common'
import { clearFilters, setCurrentFilters, setFiltersKeyword, setPaginationPage, setFiltersDateAt, setFiltersDateTo } from '../../../store/parsers/logs/vk/users/reducer'
import { parsersLogsVkUsersSelectors } from '../../../store/parsers/logs/vk/users/selectors'
import { IGetParserBody } from '../../../types/parsers'

const parserData = {
  entity: "user",
  social: "vk"
} as IGetParserBody

export const ParsersVkUsers = () => {
  const [startParser, {isSuccess: isSuccessStartingParser}] = parsersAPI.useStartVkUsersParserMutation()
  const [getExcel] = parsersAPI.useLazyGetParserLogsExcelQuery()

  const filters = useSelector(parsersLogsVkUsersSelectors.filters)
  const currentFilters = useSelector(parsersLogsVkUsersSelectors.currentFilters)
  const pagination = useSelector(parsersLogsVkUsersSelectors.pagination)

  const { data: logsResponse } = parsersAPI.useGetParserLogsQuery({ ...pagination, ...currentFilters })
  const logs = logsResponse?.content || []
  const count = logsResponse?.totalElements || 0
  
  const { data: parser, refetch } = parsersAPI.useGetParserQuery(parserData)

  const startParserHandler = useCallback(() => {
    startParser()
  }, [])

  const dispatch = useTypedDispatch()

  const onChangePage = useCallback((page: number) => {
    dispatch(setPaginationPage({ page }))
  }, [filters])

  const onChangeKeyword = useCallback((keyword: string) => {
    dispatch(setFiltersKeyword({ keyword }))
  }, [])

  useEffect(() => {
    if (isSuccessStartingParser) {
      refetch()
    }
  }, [isSuccessStartingParser])


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

  return (
    <>
      {parser && <ParsersSettings parser={parser} onStartParser={startParserHandler} />}
      {parser && <ParsersFilters
        parser={parser} onStartParser={startParserHandler}
        filters={filters} onDownloadExcel={downloadExcel} onChangeKeyword={onChangeKeyword} applyFilters={applyFilters}
        onChangeDateAt={onChangeDateAt} onChangeDateTo={onChangeDateTo}

      />
      }
      <div className="table-block">
        <ParsersTable logs={logs} />


        <Pagination perPage={pagination.perPage} page={pagination.page} count={count ?? 0} onChangePage={onChangePage} />
      </div>
    </>
  )
}
