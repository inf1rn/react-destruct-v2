import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { useState, useMemo } from 'react'
import { subculturesAndTagsAPI } from '../../../api/subculturesAndTags'
import { vkAPI } from '../../../api/vk'
import { selectPipes } from '../../../pipes/select/select'
import { FiltersType, IPermissibleSortBy, SortDirection } from '../../../types/filters'
import { IVkGroupsFilters, IVkUsersFilters, SortBy } from '../../../types/vk'
import { FilterDate } from '../../Common/Filters/FilterDate'
import { FilterRange } from '../../Common/Filters/FilterRange'
import { FilterRangeSpan } from '../../Common/Filters/FilterRangeSpan'
import { FilterSearch } from '../../Common/Filters/FilterSearch'
import { FiltersNavBtn } from '../../Common/Filters/FiltersNavBtn'
import { FilterSort } from '../../Common/Filters/FilterSort'
import { Multiselect } from '../../Common/UI/Multiselect'
import { SelectComponent } from '../../Common/UI/SelectComponent'

interface IProps {
    filters: Partial<IVkUsersFilters> & Partial<IVkGroupsFilters>
    onChangeKeyword: (keyword: string) => void
    onChangeSortBy: (sortBy: SortBy) => void
    onChangeSortDirection: (sortDirection: SortDirection) => void
    onChangeSubscribersCountMin?: (subscribersCountMin: number) => void
    onChangeSubscribersCountMax?: (subscribersCountMax: number) => void
    onChangeCountry: (country: string | null) => void
    onChangeRegion: (region: string | null) => void
    onChangeCity: (city: string | null) => void
    onChangeSubcultures: (subcultures: string | null) => void
    onChangeTags: (tags: string | null) => void
    onChangeDateAt: (date: Date | null) => void
    onChangeDateTo: (date: Date | null) => void
    applyFilters: () => void
    clearFilters: () => void
    onDownloadExcel: () => void
    permissibleSortBy: Array<IPermissibleSortBy>
}

export const VkFilters: React.FC<IProps> = React.memo((props) => {
    const {
        filters, onChangeKeyword,
        onChangeSortBy, onChangeSortDirection, onChangeSubscribersCountMax,
        onChangeSubscribersCountMin, onChangeCity, onChangeCountry,
        onChangeRegion, onChangeSubcultures, onChangeTags, applyFilters,
        clearFilters, onDownloadExcel, onChangeDateAt, onChangeDateTo, permissibleSortBy
    } = props

    const { data: countries } = vkAPI.useGetVkCountriesQuery()
    const { data: regions } = vkAPI.useGetVkRegionsQuery(countries?.find((country) => country.title === filters.country)?.id ?? skipToken)
    const { data: cities } = vkAPI.useGetVkCitiesQuery(countries?.find((country) => country.title === filters.country)?.id ?? skipToken)

    const { data: subcultures } = subculturesAndTagsAPI.useGetAllSubculturesQuery()
    const { data: tags } = subculturesAndTagsAPI.useGetTagsBySubcultureQuery(filters?.subcultures ?? skipToken)

    const [activeFilters, setActiveFilters] = useState<Array<FiltersType>>([])

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
                    {
                        typeof filters.keyword === "string" && <div className="filters__col filters__col_search">
                            <div className="search-filter search-filter_hide-mob">
                                <FilterSearch keyword={filters.keyword} onChangeKeyword={onChangeKeyword} onSubmit={applyFilters} />

                            </div>
                            <FiltersNavBtn isActive={activeFilters.includes("search")} onClick={() => updateActiveFilters("search")} className="filter-icon_1 filters__mob-button">

                            </FiltersNavBtn>
                        </div>
                    }
                    <div className="filters__col filters__col_main">
                        <div className="filters__inner-cols">
                            <div className="filters__inner-col">
                                <FiltersNavBtn isActive={activeFilters.includes("date")} onClick={() => updateActiveFilters("date")} className="filter-icon_2">
                                    {filters.dateAt !== undefined && filters.dateTo !== undefined && <FilterRangeSpan dateAt={filters.dateAt} dateTo={filters.dateTo} className="filter-icon__text" />}
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

            {
                !!activeFilters.length && <div className="js-filter-container">
                    <div className="filters__bg">
                        {
                            activeFilters.includes("search") && typeof filters.keyword === "string" &&
                            <div className="filter js-filter-content" data-id="search">
                                <div className="search-filter search-filter__mob">
                                    <FilterSearch keyword={filters.keyword} onSubmit={applyFilters} onChangeKeyword={onChangeKeyword} />
                                </div>
                            </div>
                        }
                        {
                            activeFilters.includes("date") && filters.dateAt !== undefined && filters.dateTo !== undefined &&
                            <FilterDate dateAt={filters.dateAt} dateTo={filters.dateTo} onChangeDateAt={onChangeDateAt} onChangeDateTo={onChangeDateTo} />
                        }
                        {activeFilters.includes("main") &&
                            <div className="filter js-filter-content" data-id="filters">
                                <div className="main-filters">
                                    <div className="main-filters__cols">
                                        {filters.country !== undefined && <div className="main-filters__col">
                                            <div className="main-filters__input-wrap input-wrap input-wrap_small-mob">
                                                <label className="top-label">Страна</label>
                                                <SelectComponent
                                                    currentValue={filters.country}
                                                    onChange={onChangeCountry}
                                                    options={selectPipes.options(countries ?? [], "title", "title")}
                                                    canBeNull={true}

                                                />
                                                {/* <select onChange={(e) => onChangeCountry(e.target.value)} value={filters.country}>
                                                    <option value="">Все</option>
                                                    {countries?.map((country) => <option
                                                        key={country.id} value={country.title}>
                                                        {country.title}
                                                    </option>)}
                                                </select> */}
                                                {/* <SelectComponent /> */}
                                            </div>
                                        </div>}
                                        {filters.region !== undefined && regions && filters.country !== null && < div className="main-filters__col">
                                            <div className="main-filters__input-wrap main-filters__input-wrap input-wrap input-wrap_small-mob">
                                                <label className="top-label">Регион</label>
                                                <SelectComponent
                                                    currentValue={filters.region}
                                                    onChange={onChangeRegion}
                                                    options={selectPipes.options(regions ?? [], "title", "title")}
                                                    canBeNull={true}

                                                />
                                                {/* <select disabled={!regions} onChange={(e) => onChangeRegion(e.target.value)} value={filters.region}>
                                                    <option value="">Все</option>
                                                    {regions?.map((region) => <option
                                                        key={region.id} value={region.title}>
                                                        {region.title}
                                                    </option>)}
                                                </select> */}

                                            </div>
                                        </div>}
                                        {filters.city !== undefined && cities && filters.country !== null && < div className="main-filters__col">
                                            <div className="main-filters__input-wrap main-filters__input-wrap input-wrap input-wrap_small-mob">
                                                <label className="top-label">Город</label>
                                                <SelectComponent
                                                    currentValue={filters.city}
                                                    onChange={onChangeCity}
                                                    options={selectPipes.options(cities ?? [], "title", "title")}
                                                    canBeNull={true}
                                                />                                                {/* <select disabled={!cities} onChange={(e) => onChangeCity(e.target.value)} value={filters.city}>
                                                    <option value="">Все</option>
                                                    {cities?.map((city) => <option key={city.id} value={city.title}>{city.title}</option>)}
                                                </select> */}

                                            </div>
                                        </div>}
                                        {onChangeSubscribersCountMin && onChangeSubscribersCountMax &&
                                            typeof filters.membersCountMax === "number" &&
                                            typeof filters.membersCountMin === "number" &&
                                            <div className="main-filters__col main-filters__col_tablet-last">

                                                <FilterRange onUpdateEndValue={onChangeSubscribersCountMax} onUpdateStartValue={onChangeSubscribersCountMin} min={0} max={10000000} startValue={filters.membersCountMin} endValue={filters.membersCountMax} text="Количество подписчиков" />
                                            </div>}
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

                        {activeFilters.includes("sort") && filters.sortBy && filters.sortDirection &&
                            <FilterSort permissibleSortBy={permissibleSortBy} sortBy={filters.sortBy} onChangeSortBy={onChangeSortBy} sortDirection={filters.sortDirection} onChangeSortDirection={onChangeSortDirection} />
                        }
                        <div className="main-filters__bottom">
                            <button onClick={applyFilters} className="main-filters__button button button_small" type="button">Применить фильтры</button>
                            <button onClick={clearFilters} className="main-filters__button button button_small button_grey" type="button">Очистить</button>
                        </div>


                        <button onClick={() => setActiveFilters([])} className="filters__close-button close-filter js-filter-close" type="button"></button>

                        <button onClick={() => setActiveFilters([])} className="filters__mob-button slide-button js-filter-close" type="button"></button>
                    </div>
                </div >
            }

        </div >)
})
