import classNames from 'classnames'
import React, { useState } from 'react'
import { accountAPI } from '../../../api/account'
import { locationAPI } from '../../../api/location'
import { selectPipes } from '../../../pipes/select/select'
import { FiltersType, IPermissibleSortBy, SortDirection } from '../../../types/filters'
import { IUsersFilters, SortBy } from '../../../types/users'
import { FilterDate } from '../../Common/Filters/FilterDate'
import { FilterRangeSpan } from '../../Common/Filters/FilterRangeSpan'
import { FilterSearch } from '../../Common/Filters/FilterSearch'
import { FiltersNavBtn } from '../../Common/Filters/FiltersNavBtn'
import { FilterSort } from '../../Common/Filters/FilterSort'
import { SelectComponent } from '../../Common/UI/SelectComponent'

interface IProps {
    onChangeKeyword: (keyword: string) => void
    onChangeDistrict: (districtId: string | null) => void
    onChangeCity: (city: string) => void
    onChangeRole: (role: string | null) => void
    onChangeStatus: (status: string | null) => void
    onChangeSortBy: (sortBy: SortBy) => void
    onChangeSortDirection: (ASC: SortDirection) => void
    filters: IUsersFilters
    onChangeDateAt: (date: Date | null) => void
    onChangeDateTo: (date: Date | null) => void
    applyFilters: () => void
    onDownloadExcel: () => void
    clearFilters: () => void
}

const permissibleSortBy = [{ code: "name", text: "По названию" }] as Array<IPermissibleSortBy>


export const UsersFilters: React.FC<IProps> = React.memo((props) => {
    const { data: regions } = locationAPI.useGetAllQuery()
    const { data: statuses } = accountAPI.useGetStatusesQuery()
    const { data: roles } = accountAPI.useGetRolesQuery()

    const {
        filters, onDownloadExcel, onChangeKeyword, onChangeDistrict, onChangeCity, onChangeRole, onChangeDateTo,
        onChangeDateAt, onChangeStatus, onChangeSortBy, onChangeSortDirection, applyFilters, clearFilters } = props
    const [activeFilters, setActiveFilters] = useState<Array<FiltersType>>([])

    const updateActiveFilters = (filter: FiltersType) => {
        if (!activeFilters.includes(filter)) {
            setActiveFilters([...activeFilters, filter])
        }
    }

    return (
        <div className="filters js-filter opened">

            <div className="filters__cols-wrap">
                <div className="filters__cols">
                    <div className="filters__col filters__col_search">
                        <div className="search-filter search-filter_hide-mob">
                            <FilterSearch keyword={filters.keyword} onChangeKeyword={onChangeKeyword} onSubmit={applyFilters} />

                        </div>
                        <FiltersNavBtn isActive={activeFilters.includes("search")} onClick={() => updateActiveFilters("search")} className="filter-icon_1 filters__mob-button">

                        </FiltersNavBtn>
                    </div>
                    <div className="filters__col filters__col_main">
                        <div className="filters__inner-cols">
                            <div className="filters__inner-col">
                                <FiltersNavBtn isActive={activeFilters.includes("date")} onClick={() => updateActiveFilters("date")} className="filter-icon_2">
                                    {filters.dateAt !== undefined && filters.dateTo !== undefined && <FilterRangeSpan dateAt={filters.dateAt} dateTo={filters.dateTo} className="filter-icon__text" />}
                                    <span className="filter-icon__count">1</span>
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

            {!!activeFilters.length &&
                <div className="js-filter-container">
                    <div className="filters__bg">
                        {
                            activeFilters.includes("search") &&
                            <div className="filter js-filter-content" data-id="search">
                                <div className="search-filter search-filter__mob">
                                    <FilterSearch onSubmit={applyFilters} onChangeKeyword={onChangeKeyword} keyword={filters.keyword} />
                                </div>
                            </div>
                        }

                        {
                            activeFilters.includes("date") &&
                            <FilterDate dateAt={filters.dateAt} dateTo={filters.dateTo} onChangeDateAt={onChangeDateAt} onChangeDateTo={onChangeDateTo} />
                        }

                        {
                            activeFilters.includes("main") && <div className="filter js-filter-content">
                                <div className="main-filters">
                                    <div className="main-filters__cols">
                                        <div className="main-filters__col">
                                            <div className="main-filters__input-wrap main-filters__input-wrap input-wrap input-wrap_small-mob">
                                                <label className="top-label">Регион</label>
                                                <SelectComponent
                                                    currentValue={filters.district}
                                                    onChange={onChangeDistrict}
                                                    options={selectPipes.options(regions ?? [], "regionName", "id")}
                                                    canBeNull={true}
                                                />
                                                {/* <select value={filters.district} onChange={e => onChangeDistrict(e.target.value)}>
                                                    <option value="">Все</option>
                                                    {regions?.map(region => <option value={region.id} key={region.id}>{region.regionName}</option>)}
                                                </select> */}
                                            </div>
                                        </div>
                                        <div className="main-filters__col">
                                            <div className="main-filters__input-wrap main-filters__input-wrap input-wrap input-wrap_small-mob">
                                                <label className="top-label">Город</label>
                                                <div className="select select_small">
                                                    <input className="text-input h-100" value={filters.city} onChange={e => onChangeCity(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-filters__col">
                                            <div className="main-filters__input-wrap input-wrap input-wrap_small-mob">
                                                <label className="top-label">Статус</label>
                                                <div className="select select_small">
                                                    <SelectComponent
                                                        currentValue={filters.status}
                                                        onChange={onChangeStatus}
                                                        options={selectPipes.options(statuses ?? [], "rusName", "id")}
                                                        canBeNull={true}
                                                    />
                                                    {/* <select onChange={e => onChangeStatus(e.target.value)} value={filters.statusId} className="js-formstyler">
                                                        <option value="">Все</option>
                                                        {statuses?.map(status => <option value={status.id} key={status.id}>{status.rusName}</option>)}
                                                    </select> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-filters__col">
                                            <div className="main-filters__input-wrap input-wrap input-wrap_small-mob">
                                                <label className="top-label">Роль</label>
                                                <div className="select select_small">
                                                    <SelectComponent
                                                        currentValue={filters.role}
                                                        onChange={onChangeRole}
                                                        options={selectPipes.options(roles ?? [], "rusName", "id")}
                                                        canBeNull={true}
                                                    />
                                                    {/* <select onChange={e => onChangeRole(e.target.value)} value={filters.role} className="js-formstyler">
                                                        <option value="">Все</option>
                                                        {roles?.map(role => <option key={role.id} value={role.id}>{role.rusName}</option>)}
                                                    </select> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-filters__col main-filters__col_empty"></div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            activeFilters.includes("sort") &&
                            <FilterSort permissibleSortBy={permissibleSortBy} sortBy={filters.sortBy} sortDirection={filters.sortDirection} onChangeSortBy={onChangeSortBy} onChangeSortDirection={onChangeSortDirection} />
                        }
                        <div className="main-filters__bottom main-filters__bottom_padding">
                            <button className="main-filters__button button button_small" onClick={applyFilters} type="button">Применить фильтры</button>
                            <button className="main-filters__button button button_small button_grey" onClick={clearFilters} type="button">Очистить</button>
                        </div>
                        <button onClick={() => setActiveFilters([])} className="filters__close-button close-filter js-filter-close" type="button"></button>

                        <button onClick={() => setActiveFilters([])} className="filters__mob-button slide-button js-filter-close" type="button"></button>
                    </div>
                </div>
            }

        </div>
    )
})
