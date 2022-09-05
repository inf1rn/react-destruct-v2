import React, { useState } from 'react'
import { FiltersType } from '../../../types/filters'
import { IParser, IParsersLogsFilters } from '../../../types/parsers'
import { FilterDate } from '../../Common/Filters/FilterDate'
import { FilterRangeSpan } from '../../Common/Filters/FilterRangeSpan'
import { FilterSearch } from '../../Common/Filters/FilterSearch'
import { FiltersNavBtn } from '../../Common/Filters/FiltersNavBtn'
import { ParserPeriodicity } from './ParserPeriodicity'
import { ParserStatus } from './ParserStatus'

interface IProps {
    parser: IParser
    filters: IParsersLogsFilters
    onChangeKeyword: (keyword: string) => void
    onChangeDateAt: (date: Date | null) => void
    onChangeDateTo: (date: Date | null) => void
    applyFilters: () => void
    onDownloadExcel: () => void
    onStartParser: () => void
}

export const ParsersFilters: React.FC<IProps> = React.memo((props) => {
    const {
        filters, onChangeKeyword, applyFilters, onDownloadExcel, onChangeDateAt, onChangeDateTo,
        onStartParser, parser
    } = props

    const [activeFilters, setActiveFilters] = useState<Array<FiltersType>>([])

    const updateActiveFilters = (filter: FiltersType) => {
        if (!activeFilters.includes(filter)) {
            setActiveFilters([...activeFilters, filter])
        }
    }

    return (
        <div className="filters js-filter">

            <div className="filters__cols-wrap">
                <div className="filters__cols">
                    <div className="filters__col filters__col_mob">
                        <FiltersNavBtn isActive={activeFilters.includes("status")} onClick={() => updateActiveFilters("status")} className="filter-icon_6 filters__mob-button">

                        </FiltersNavBtn>
                    </div>
                    {/* <div className="filters__col filters__col_mob">
                        <FiltersNavBtn isActive={activeFilters.includes("settings")} onClick={() => updateActiveFilters("settings")} className="filter-icon_7 filters__mob-button">

                        </FiltersNavBtn>
                    </div> */}
                    {typeof filters.keyword === "string" &&
                        <div className="filters__col filters__col_search">
                            <div className="search-filter search-filter_hide-mob">
                                <FilterSearch keyword={filters.keyword} onChangeKeyword={onChangeKeyword} onSubmit={applyFilters} />
                            </div>
                            <FiltersNavBtn isActive={activeFilters.includes("search")} onClick={() => updateActiveFilters("search")} className="filter-icon_1 filters__mob-button">

                            </FiltersNavBtn>
                        </div>
                    }

                    <div className="filters__col filters__col_main filters__col_mob-reset">
                        <div className="filters__inner-cols">
                            <div className="filters__inner-col">
                                <FiltersNavBtn className="filter-icon_2" isActive={activeFilters.includes("date")} onClick={() => updateActiveFilters("date")}>
                                    {filters.dateAt !== undefined && filters.dateTo !== undefined && <FilterRangeSpan className="filter-icon__text" dateAt={filters.dateAt} dateTo={filters.dateTo} />}
                                    {/* <span className="filter-icon__count">1</span> */}
                                </FiltersNavBtn>
                            </div>
                        </div>
                    </div>
                    <div className="filters__col filters__col_export">
                        <button onClick={onDownloadExcel} className="export-button" type="button">
                            <span className="export-button__text">Экспорт</span>
                        </button>
                    </div>
                </div>


                {!!activeFilters.length &&
                    <div className="js-filter-container">
                        <div className="filters__bg">

                            {
                                activeFilters.includes("status") &&
                                <div className="filter js-filter-content" data-id="parser-1">

                                    <div className="parsers">
                                        <ParserStatus parser={parser} onStartParser={onStartParser} />
                                    </div>

                                </div>
                            }
                            {
                                activeFilters.includes("settings") &&
                                // <div className="filter js-filter-content" data-id="parser-2">

                                //     <div className="parsers">
                                        <ParserPeriodicity />
                                    // </div>

                                // </div>
                            }
                            {typeof filters.keyword === "string" && activeFilters.includes("search") &&
                                <div className="filter js-filter-content" data-id="search">
                                    <div className="search-filter search-filter__mob">
                                        <FilterSearch keyword={filters.keyword} onChangeKeyword={onChangeKeyword} onSubmit={applyFilters} />

                                    </div>
                                </div>
                            }
                            {
                                activeFilters.includes("date") && filters.dateAt !== undefined && filters.dateTo !== undefined &&
                                < FilterDate dateAt={filters.dateAt} dateTo={filters.dateTo} onChangeDateAt={onChangeDateAt} onChangeDateTo={onChangeDateTo} />
                            }


                            <button onClick={() => setActiveFilters([])} className="filters__close-button close-filter js-filter-close" type="button"></button>

                            <button onClick={() => setActiveFilters([])} className="filters__mob-button slide-button js-filter-close" type="button"></button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
})
