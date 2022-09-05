import { skipToken } from '@reduxjs/toolkit/dist/query'
import classNames from 'classnames'
import React, { useState } from 'react'
import { vkAPI } from '../../../api/vk'
import { selectPipes } from '../../../pipes/select/select'
import { IVkInfographicsGroupsFilters, IVkInfographicsPostsFilters, IVkInfographicsUsersFilters } from '../../../types/vk'
import { FilterRange } from '../../Common/Filters/FilterRange'
import { SelectComponent } from '../../Common/UI/SelectComponent'

interface IProps {
    filters: Partial<IVkInfographicsUsersFilters> & Partial<IVkInfographicsGroupsFilters> & Partial<IVkInfographicsPostsFilters>
    onChangeSubscribersCountMin?: (subscribersCountMin: number) => void
    onChangeSubscribersCountMax?: (subscribersCountMax: number) => void
    onChangeCountry?: (country: string | null) => void
    onChangeRegion?: (region: string | null) => void
    applyFilters: () => void
    clearFilters: () => void
}

export const VkInfographicsFilters: React.FC<IProps> = React.memo((props) => {
    const {
        filters, onChangeCountry, onChangeRegion,
        onChangeSubscribersCountMax, onChangeSubscribersCountMin, clearFilters, applyFilters
    } = props

    const [isActive, setIsActive] = useState<boolean>(true)

    const { data: countries } = vkAPI.useGetVkCountriesQuery()
    const { data: regions } = vkAPI.useGetVkRegionsQuery(countries?.find((country) => country.title === filters.country)?.id ?? skipToken)

    return (
        <>
            <div className="chart-block__mob-filter">
                <button className={classNames("filter-icon", "filter-icon_3", "js-slide-button", {
                    active: isActive
                })} onClick={() => setIsActive(!isActive)}></button>
            </div>
            {isActive && <div className="chart-block__bg chart-block__bg_filters">
                <div className="slide-mob">
                    <div className="js-slide-content">
                        <div className="chart-filters">
                            <div className="chart-filters__mob-cols">
                                {
                                    filters.country !== undefined && onChangeCountry &&
                                    <div className="chart-filters__mob-col">
                                        <div className="chart-filters__input-wrap input-wrap input-wrap_small-mob">
                                            <label className="top-label">Страна</label>
                                            <SelectComponent
                                                currentValue={filters.country}
                                                onChange={onChangeCountry}
                                                options={selectPipes.options(countries ?? [], "title", "title")}
                                                canBeNull={true}
                                            />
                                            {/* <select value={filters.country ?? ""} onChange={(e) => {
                                                onChangeCountry(e.target.value)
                                            }}>
                                                <option value="">Все</option>
                                                {countries?.map(country => <option
                                                    key={country.id} value={country.title}>
                                                    {country.title}
                                                </option>)}
                                            </select> */}
                                        </div>
                                    </div>
                                }
                                {
                                    filters.region !== undefined && onChangeRegion && filters.country !== null && <div className="chart-filters__mob-col">
                                        <div className="chart-filters__input-wrap chart-filters__input-wrap input-wrap input-wrap_small-mob">
                                            <label className="top-label">Регион</label>
                                            <SelectComponent
                                                currentValue={filters.region}
                                                onChange={onChangeRegion}
                                                options={selectPipes.options(regions ?? [], "title", "title")}
                                                canBeNull={true}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            {onChangeSubscribersCountMax && onChangeSubscribersCountMin && filters.subscribersCountMax !== undefined && filters.subscribersCountMin !== undefined &&

                                <FilterRange max={1000000} min={0} text="Количество подписчиков" onUpdateEndValue={onChangeSubscribersCountMax} onUpdateStartValue={onChangeSubscribersCountMin} endValue={filters.subscribersCountMax} startValue={filters.subscribersCountMin} />
                            }
                            {onChangeSubscribersCountMax && onChangeSubscribersCountMin && filters.membersCountMax !== undefined && filters.membersCountMin !== undefined &&

                                <FilterRange max={1000000} min={0} text="Количество подписчиков" onUpdateEndValue={onChangeSubscribersCountMax} onUpdateStartValue={onChangeSubscribersCountMin} endValue={filters.membersCountMax} startValue={filters.membersCountMin} />
                            }
                            <div className="chart-filters__bottom">
                                <button onClick={applyFilters} className="chart-filters__button button button_small" type="button">Построить график</button>
                                <button onClick={clearFilters} className="chart-filters__button button button_small button_grey" type="button">Очистить<span className="chart-filters__hide-tablet"> фильтры</span></button>
                            </div>
                        </div>
                    </div>
                    <button className="slide-mob__button slide-button js-slide-button" type="button"></button>
                </div>
            </div>
            }
        </>

    )
})
