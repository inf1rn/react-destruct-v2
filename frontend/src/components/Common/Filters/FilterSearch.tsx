import { Formik } from 'formik'
import React from 'react'

interface IProps {
  onSubmit: () => void
  keyword: string
  onChangeKeyword: (keyword: string) => void
}

export const FilterSearch: React.FC<IProps> = React.memo(({ onSubmit, keyword, onChangeKeyword }) => {
  return (

    <>
      <div className="search-filter__left">
        <div className="search">
          <label className="search__icon" htmlFor="search-input-2"></label>
          <input value={keyword} onChange={(e) => {
            onChangeKeyword(e.target.value)
          }} className="search__input js-input-value" id="search-input-2" type="text" placeholder="ID, ссылка, название" />
          <button className="search__remove js-input-clear" type="button"></button>
        </div>
      </div>
      <div className="search-filter__right">
        <button onClick={onSubmit} className="search-block__button button">Поиск</button>
      </div>
    </>
  )
})
