import React, { useState } from 'react'
import { FiltersType } from '../../../types/filters'
import { ISubculturesAndTagsFilters } from '../../../types/subculturesAndTags'
import { FilterSearch } from '../../Common/Filters/FilterSearch'
import { FiltersNavBtn } from '../../Common/Filters/FiltersNavBtn'

interface IProps extends React.PropsWithChildren {
    filters: ISubculturesAndTagsFilters
    onChangeKeyword: (keyword: string) => void
    onDownloadExcel: () => void
    applyFilters: () => void
}

export const SubculturesAndTagsFilters: React.FC<IProps> = React.memo(({ filters, applyFilters, onChangeKeyword, onDownloadExcel, children }) => {
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
                        <FiltersNavBtn isActive={activeFilters.includes("new")} onClick={() => updateActiveFilters("new")} className="filter-icon_5 filters__mob-button" />
                    </div>
                    <div className="filters__col filters__col_search">
                        {
                            typeof filters.keyword === "string" && <div className="search-filter search-filter_hide-mob">
                                <FilterSearch keyword={filters.keyword} onChangeKeyword={onChangeKeyword} onSubmit={applyFilters} />
                            </div>
                        }
                        <FiltersNavBtn isActive={activeFilters.includes("search")} onClick={() => updateActiveFilters("search")} className="filter-icon_1 filters__mob-button" />
                    </div>
                    <div className="filters__col filters__col_export">
                        <button onClick={onDownloadExcel} className="export-button" type="button">
                            <span className="export-button__text">Экспорт</span>
                        </button>
                    </div>
                </div>
            </div>

            {!!activeFilters.length &&
                <div className="js-filter-container">
                    <div className="filters__bg">
                        {typeof filters.keyword === "string" && activeFilters.includes("search")
                            &&
                            <div className="filter js-filter-content">
                                <div className="search-filter search-filter__mob">
                                    <FilterSearch keyword={filters.keyword} onChangeKeyword={onChangeKeyword} onSubmit={applyFilters} />
                                </div>
                            </div>
                        }
                        {
                            activeFilters.includes("new")
                            &&
                            <div className="filter js-filter-content">
                                {children}
                            </div >
                        }

                        <button onClick={() => setActiveFilters([])} className="filters__mob-button slide-button js-filter-close" type="button"></button>
                    </div>
                </div>
            }

        </div>
    )
})
