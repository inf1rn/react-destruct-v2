import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { useState, useMemo } from 'react'
import { subculturesAndTagsAPI } from '../../../api/subculturesAndTags'
import { FiltersType, IPermissibleSortBy, SortDirection } from '../../../types/filters'
import { ITelegramChannelsFilters, ITelegramPostsFilters, SortBy } from '../../../types/telegram'
import { FilterDate } from '../../Common/Filters/FilterDate'
import { FilterRange } from '../../Common/Filters/FilterRange'
import { FilterRangeSpan } from '../../Common/Filters/FilterRangeSpan'
import { FilterSearch } from '../../Common/Filters/FilterSearch'
import { FiltersNavBtn } from '../../Common/Filters/FiltersNavBtn'
import { FilterSort } from '../../Common/Filters/FilterSort'
import { Multiselect } from '../../Common/UI/Multiselect'

interface IProps {
    filters: Partial<ITelegramChannelsFilters> & Partial<ITelegramPostsFilters>
    onChangeKeyword: (keyword: string) => void
    onChangeSortBy: (sortBy: SortBy) => void
    onChangeSortDirection: (sortDirection: SortDirection) => void
    onChangeSubscribersCountMin?: (subscribersCountMin: number) => void
    onChangeSubscribersCountMax?: (subscribersCountMax: number) => void
    onChangePostsCountMin?: (postsCountMin: number) => void
    onChangePostsCountMax?: (postsCountMax: number) => void
    onChangeCommentsCountMin?: (commentsCountMin: number) => void
    onChangeCommentsCountMax?: (commentsCountMax: number) => void
    onChangeReactionsCountMin?: (reactionsCountMin: number) => void
    onChangeReactionsCountMax?: (reactionsCountMax: number) => void
    onChangeSubcultures: (subcultures: string | null) => void
    onChangeTags: (tags: string | null) => void
    onChangeDateAt: (date: Date | null) => void
    onChangeDateTo: (date: Date | null) => void
    clearFilters: () => void
    applyFilters: () => void
    onDownloadExcel: () => void
    permissibleSortBy: Array<IPermissibleSortBy>
}

export const TelegramFilters: React.FC<IProps> = React.memo((props) => {
    const {
        filters, onChangePostsCountMax, onChangePostsCountMin,
        onChangeSubscribersCountMax, onChangeSubscribersCountMin, onChangeKeyword,
        onChangeSortBy, onChangeSortDirection, permissibleSortBy,
        onChangeSubcultures, onChangeTags, applyFilters, clearFilters, onDownloadExcel,
        onChangeDateAt, onChangeDateTo, onChangeCommentsCountMax, onChangeCommentsCountMin, onChangeReactionsCountMax,
        onChangeReactionsCountMin
    } = props
    const [activeFilters, setActiveFilters] = useState<Array<FiltersType>>([])

    const { data: subcultures } = subculturesAndTagsAPI.useGetAllSubculturesQuery()
    const { data: tags } = subculturesAndTagsAPI.useGetTagsBySubcultureQuery((filters?.subcultures && filters.subcultures) ?? skipToken)

    const tagsSelectValues = useMemo(() => {
        return tags?.filter(tag => filters.tags?.split(",").includes(String(tag.id))).map(tag => ({
            label: tag.name ?? null,
            value: String(tag.id) ?? null
        }))
    }, [tags, filters.tags])

    const subculturesSelectValues = useMemo(() => {
        return subcultures?.filter(subculture => filters.subcultures?.split(",").includes(String(subculture.id))).map(subculture => ({
            label: subculture.name ?? null,
            value: String(subculture.id) ?? null
        }))
    }, [subcultures, filters.subcultures])

    const updateActiveFilters = (filter: FiltersType) => {
        if (!activeFilters.includes(filter)) {
            setActiveFilters([...activeFilters, filter])
        }
    }
    return (
        <div className="filters js-filter">

            <div className="filters__cols-wrap">
                <div className="filters__cols">
                    {typeof filters.keyword === "string" && <div className="filters__col filters__col_search">
                        <div className="search-filter search-filter_hide-mob">
                            <FilterSearch keyword={filters.keyword} onChangeKeyword={onChangeKeyword} onSubmit={applyFilters} />
                        </div>
                        <FiltersNavBtn isActive={activeFilters.includes("search")} onClick={() => updateActiveFilters("search")} className="filter-icon_1 filters__mob-button">

                        </FiltersNavBtn>
                    </div>}
                    <div className="filters__col filters__col_main">
                        <div className="filters__inner-cols">
                            <div className="filters__inner-col">
                                <FiltersNavBtn isActive={activeFilters.includes("date")} onClick={() => updateActiveFilters("date")} className="filter-icon_2">
                                    {filters.dateAt !== undefined && filters.dateTo !== undefined && <FilterRangeSpan className="filter-icon__text" dateAt={filters.dateAt} dateTo={filters.dateTo} />}
                                </FiltersNavBtn>
                            </div>
                            <div className="filters__inner-col">
                                <FiltersNavBtn isActive={activeFilters.includes("main")} onClick={() => updateActiveFilters("main")} className="filter-icon_3">
                                    <span className="filter-icon__text">Фильтры</span>
                                </FiltersNavBtn>
                            </div>
                            <div className="filters__inner-col">
                                <FiltersNavBtn isActive={activeFilters.includes("sort")} onClick={() => updateActiveFilters("sort")} className="filter-icon_4">
                                    <span className="filter-icon__text">Сортировка</span>
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
            </div>

            {!!activeFilters.length && <div className="js-filter-container">
                <div className="filters__bg">
                    {
                        activeFilters.includes("search") && typeof filters.keyword === "string" &&
                        <div className="filter js-filter-content" data-id="search">
                            <div className="search-filter search-filter__mob">
                                <FilterSearch keyword={filters.keyword} onChangeKeyword={onChangeKeyword} onSubmit={applyFilters} />
                            </div>
                        </div>
                    }
                    {
                        activeFilters.includes("date") && filters.dateAt !== undefined && filters.dateTo !== undefined &&
                        <FilterDate dateAt={filters.dateAt} dateTo={filters.dateTo} onChangeDateAt={onChangeDateAt} onChangeDateTo={onChangeDateTo} />
                    }
                    {
                        activeFilters.includes("main") && <div className="filter js-filter-content" data-id="filters">
                            <div className="main-filters">
                                <div className="main-filters__cols main-filters__cols_telegram">
                                    {onChangeSubscribersCountMax && onChangeSubscribersCountMin && typeof filters.subscribersCountMax === "number" &&
                                        typeof filters.subscribersCountMin === "number" &&

                                        <div className="main-filters__col main-filters__col_tablet-last">
                                            <FilterRange onUpdateEndValue={onChangeSubscribersCountMax} onUpdateStartValue={onChangeSubscribersCountMin} min={0} max={300000} startValue={filters.subscribersCountMin} endValue={filters.subscribersCountMax} text="Количество подписчиков" />
                                        </div>
                                    }

                                    {onChangePostsCountMax && onChangePostsCountMin && typeof filters.postsCountMax === "number" &&
                                        typeof filters.postsCountMin === "number" &&
                                        <div className="main-filters__col main-filters__col_tablet-last">
                                            <FilterRange onUpdateEndValue={onChangePostsCountMax} onUpdateStartValue={onChangePostsCountMin} min={0} max={300000} startValue={filters.postsCountMin} endValue={filters.postsCountMax} text="Количество публикаций" />
                                        </div>
                                    }

                                    {onChangeReactionsCountMax && onChangeReactionsCountMin && typeof filters.reactionsCountMax === "number" &&
                                        typeof filters.reactionsCountMin === "number" &&
                                        <div className="main-filters__col main-filters__col_tablet-last">
                                            <FilterRange onUpdateEndValue={onChangeReactionsCountMax} onUpdateStartValue={onChangeReactionsCountMin} min={0} max={10000000} startValue={filters.reactionsCountMin} endValue={filters.reactionsCountMax} text="Количество реакций" />
                                        </div>
                                    }


                                    {onChangeCommentsCountMax && onChangeCommentsCountMin && typeof filters.commentsCountMax === "number" &&
                                        typeof filters.commentsCountMin === "number" &&
                                        <div className="main-filters__col main-filters__col_tablet-last">
                                            <FilterRange onUpdateEndValue={onChangeCommentsCountMax} onUpdateStartValue={onChangeCommentsCountMin} min={0} max={10000000} startValue={filters.commentsCountMin} endValue={filters.commentsCountMax} text="Количество комментариев" />
                                        </div>
                                    }

                                    <div className="main-filters__col">
                                        <div className="main-filters__input-wrap main-filters__input-wrap input-wrap input-wrap_small-mob">
                                            <label className="top-label">Субкультуры</label>
                                            <div className="select select_small">
                                                {subcultures && subculturesSelectValues &&
                                                    <Multiselect currentValue={subculturesSelectValues} options={subcultures.map(subculture => ({
                                                        value: String(subculture.id),
                                                        label: subculture.name
                                                    }))} onChange={onChangeSubcultures} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="main-filters__col">
                                        <div className="main-filters__input-wrap input-wrap input-wrap_small-mob">
                                            {tagsSelectValues && tags && filters.subcultures && <>
                                                <label className="top-label">Теги</label>
                                                <div className="select select_small">
                                                    <Multiselect currentValue={tagsSelectValues} options={tags.map(tag => ({
                                                        value: String(tag.id),
                                                        label: tag.name
                                                    }))} onChange={onChangeTags} />
                                                </div>
                                            </>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    }
                    {
                        activeFilters.includes("sort") && filters.sortBy && filters.sortDirection &&
                        <FilterSort
                            permissibleSortBy={permissibleSortBy}
                            onChangeSortBy={onChangeSortBy}
                            onChangeSortDirection={onChangeSortDirection}
                            sortBy={filters.sortBy}
                            sortDirection={filters.sortDirection}
                        />
                    }
                    <div className="main-filters__bottom">
                        <button onClick={applyFilters} className="main-filters__button button button_small" type="button">Применить фильтры</button>
                        <button onClick={clearFilters} className="main-filters__button button button_small button_grey" type="button">Очистить</button>
                    </div>
                    <button onClick={() => setActiveFilters([])} className="filters__close-button close-filter js-filter-close" type="button"></button>

                    <button onClick={() => setActiveFilters([])} className="filters__mob-button slide-button js-filter-close" type="button"></button>
                </div>
            </div>
            }

        </div>)
})
