import React from 'react'
import { IPermissibleSortBy, SortDirection } from '../../../types/filters'
import { SortBy as SortByVk } from '../../../types/vk'
import { SortBy as SortByTelegram } from '../../../types/telegram'
import { SortBy as SortByUsers } from '../../../types/users'
import { SortBy as SortByTiktok } from '../../../types/tiktok'
import classNames from 'classnames'

type SortBy = SortByVk | SortByTelegram | SortByUsers | SortByTiktok

interface IProps {
  onChangeSortBy: (sortBy: SortBy) => void
  onChangeSortDirection: (sortDirection: SortDirection) => void
  sortBy: string
  sortDirection: SortDirection  
  permissibleSortBy: Array<IPermissibleSortBy>
}

export const FilterSort: React.FC<IProps> = React.memo(({ sortBy, sortDirection, onChangeSortBy, onChangeSortDirection, permissibleSortBy }) => {
  return (
    <div className="filter js-filter-content" data-id="sort">
      <div className="filter__select">
        <div className="select select_small">
          <select value={sortBy} onChange={(e) => onChangeSortBy(e.target.value as SortBy)} className="js-formstyler">
            {permissibleSortBy.map((sortByItem) => <option key={sortByItem.code} value={sortByItem.code} > {sortByItem.text} </option>)}
          </select>
        </div>
      </div>
      <div className="date-nav date-nav_filter date-nav_hide-mob">
        <ul className="date-nav__list">
          {
            permissibleSortBy.map(sortByItem => (
              <li key={sortByItem.code} className={classNames("date-nav__item", "js-filters-item", {
                active: sortBy === sortByItem.code
              })}>
                <button onClick={() => onChangeSortBy(sortByItem.code)} className="date-nav__button js-filters-button" type="button">{sortByItem.text}</button>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="filter__select">

      </div>
      <div className="radio-filter">
        <div className="radio-filter__button radio">
          <label className="radio__label">
            <input onClick={() => onChangeSortDirection("ASC")} className="radio__input" type="radio" name="radio-sort" checked={sortDirection === "ASC"} />
            <span className="radio__icon"></span>
            <span className="radio__text">По возрастанию</span>
          </label>
        </div>
        <div className="radio-filter__button radio">
          <label className="radio__label">
            <input onClick={() => onChangeSortDirection("DESC")} className="radio__input" type="radio" name="radio-sort" checked={sortDirection === "DESC"} />
            <span className="radio__icon"></span>
            <span className="radio__text">По убыванию</span>
          </label>
        </div>
      </div>
    </div>)
})
