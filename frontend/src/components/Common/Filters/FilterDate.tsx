import classNames from 'classnames'
import React from 'react'
import { formatDate, roundDate } from '../../../utils/date'
import { FilterRangeSpan } from './FilterRangeSpan'

interface IProps {
  dateAt: Date | null
  dateTo: Date | null
  onChangeDateAt: (date: Date | null) => void
  onChangeDateTo: (date: Date | null) => void
}

const today = new Date()
const todayMilliseconds = roundDate(today).getTime()

const weekAgo = new Date(today)
weekAgo.setDate(weekAgo.getDate() - 7)
const weekAgoMilliseconds = roundDate(weekAgo).getTime()

const monthAgo = new Date(today)
monthAgo.setDate(monthAgo.getDate() - 31)
const monthAgoMilliseconds = roundDate(monthAgo).getTime()

const yearAgo = new Date(today)
yearAgo.setDate(yearAgo.getDate() - 365)
const yearAgoMilliseconds = roundDate(yearAgo).getTime()


export const FilterDate: React.FC<IProps> = ({ dateAt, dateTo, onChangeDateAt, onChangeDateTo }) => {

  const dateAtMilliseconds = dateAt && roundDate(dateAt).getTime()
  const dateToMilliseconds = dateTo && roundDate(dateTo).getTime()

  const isActiveLastWeek = React.useMemo(() => {
    return dateToMilliseconds &&
      dateToMilliseconds === todayMilliseconds &&
      dateAtMilliseconds === weekAgoMilliseconds
  }, [dateAtMilliseconds, dateToMilliseconds])

  const isActiveLastMonth = React.useMemo(() => {
    return dateToMilliseconds &&
      dateToMilliseconds === todayMilliseconds &&
      dateAtMilliseconds === monthAgoMilliseconds
  }, [dateAtMilliseconds, dateToMilliseconds])

  const isActiveLastYear = React.useMemo(() => {
    return dateToMilliseconds &&
      dateToMilliseconds === todayMilliseconds &&
      dateAtMilliseconds === yearAgoMilliseconds
  }, [dateAtMilliseconds, dateToMilliseconds])

  return (
    <div className="filter js-filter-content" data-id="date">
      <div className="date-nav date-nav_filter">
        <ul className="date-nav__list">
          <li className="date-nav__item js-filters-item active">
            <input type="date" value={(dateAt && formatDate(dateAt, "iso")) ?? undefined} onChange={(e) => onChangeDateAt(new Date(e.target.value))} />
            <input type="date" value={(dateTo && formatDate(dateTo, "iso")) ?? undefined} onChange={(e) => onChangeDateTo(new Date(e.target.value))} />

            {
              <button className="date-nav__button js-filters-button" type="button">
                <FilterRangeSpan className="date-nav__calendar" dateAt={dateAt} dateTo={dateTo} />
              </button>
            }
          </li>
          <li className={classNames("date-nav__item", "js-filters-item", {
            active: isActiveLastWeek
          })}>
            <button onClick={() => {
              onChangeDateTo(today)
              onChangeDateAt(weekAgo)
            }} className="date-nav__button js-filters-button" type="button">Неделя</button>
          </li>
          <li className={classNames("date-nav__item", "js-filters-item", {
            active: isActiveLastMonth
          })}>
            <button onClick={() => {
              onChangeDateTo(today)
              onChangeDateAt(monthAgo)
            }} className="date-nav__button js-filters-button" type="button">Месяц</button>
          </li>
          <li className={classNames("date-nav__item", "js-filters-item", {
            active: isActiveLastYear
          })}>
            <button onClick={() => {
              onChangeDateTo(today)
              onChangeDateAt(yearAgo)
            }} className="date-nav__button js-filters-button" type="button">Год</button>
          </li>
          <li className={classNames("date-nav__item", "js-filters-item", {
            active: !(dateTo || dateAt)
          })}>
            <button onClick={() => {
              onChangeDateAt(null)
              onChangeDateTo(null)
            }} className="date-nav__button js-filters-button" type="button">За все время</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
