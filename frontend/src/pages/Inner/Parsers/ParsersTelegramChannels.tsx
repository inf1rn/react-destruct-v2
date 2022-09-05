import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { parsersAPI } from '../../../api/parsers'
import { ParsersFilters } from '../../../components/Inner/Parsers/ParsersFilters'
import { ParsersSettings } from '../../../components/Inner/Parsers/ParsersSettings'
import { useTypedDispatch } from '../../../hooks/common'
import { parsersLogsTelegramChannelsSelectors } from '../../../store/parsers/logs/telegram/channels/selectors'
import { clearFilters, setCurrentFilters, setFiltersDateAt, setFiltersDateTo, setFiltersKeyword, setPaginationPage } from '../../../store/parsers/logs/telegram/channels/reducer'
import { Pagination } from '../../../components/Inner/Pagination'
import { ParserLog } from '../../../components/Inner/Parsers/ParserLog'
import { IGetParserBody } from '../../../types/parsers'
import { ParsersTable } from '../../../components/Inner/Parsers/ParsersTable'

const parserData = {
  entity: "channel",
  social: "telegram"
} as IGetParserBody

export const ParsersTelegramChannels = () => {
  const [getExcel] = parsersAPI.useLazyGetParserLogsExcelQuery()

  const filters = useSelector(parsersLogsTelegramChannelsSelectors.filters)
  const currentFilters = useSelector(parsersLogsTelegramChannelsSelectors.currentFilters)
  const pagination = useSelector(parsersLogsTelegramChannelsSelectors.pagination)

  const { data: logsResponse } = parsersAPI.useGetParserLogsQuery({ ...pagination, ...currentFilters })
  const logs = logsResponse?.content || []
  const count = logsResponse?.totalElements || 0
  const { data: parser, refetch } = parsersAPI.useGetParserQuery(parserData)

  const [startParser, { isSuccess: isSuccessStartingParser }] = parsersAPI.useStartTelegramChannelsParserMutation()

  const startParserHandler = useCallback(() => {
    startParser()
  }, [])

  useEffect(() => {
    if (isSuccessStartingParser) {
      refetch()
    }
  }, [isSuccessStartingParser])

  const dispatch = useTypedDispatch()

  const onChangePage = useCallback((page: number) => {
    dispatch(setPaginationPage({ page }))
  }, [filters])

  const onChangeKeyword = useCallback((keyword: string) => {
    dispatch(setFiltersKeyword({ keyword }))
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
