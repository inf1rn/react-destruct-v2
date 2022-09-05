import classNames from 'classnames'
import React, { useState, useMemo, useCallback } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { vkAPI } from '../../../api/vk'
import { VkInfographicsFilters } from '../../../components/Inner/Vk/VkInfographicsFilters'
import {
  setFiltersCountry as setFiltersGroupsCountry, setFiltersDistrict as setFiltersGroupsDistrict,
  setFiltersSubscribersCountMax as setFiltersGroupsSubscribersCountMax,
  setFiltersSubscribersCountMin as setFiltersGroupsSubscribersCountMin,
  clearFilters as clearGroupsFilters, setCurrentFilters as setCurrentGroupsFilters
}
  from '../../../store/vk/groups/infographics/reducer'

import {
  setFiltersCountry as setFiltersUsersCountry, setFiltersDistrict as setFiltersUsersDistrict,
  setFiltersSubscribersCountMax as setFiltersUsersSubscribersCountMax,
  setFiltersSubscribersCountMin as setFiltersUsersSubscribersCountMin,
  clearFilters as clearUsersFilters, setCurrentFilters as setCurrentUsersFilters
}
  from '../../../store/vk/users/infographics/reducer'
import { vkInfographicsGroupsSelectors } from '../../../store/vk/groups/infographics/selectors'
import { vkInfographicsUsersSelectors } from '../../../store/vk/users/infographics/selectors'
import { getDoughnutChartConfig, getLineChartConfig, getLineChartData } from '../../../utils/charts'
import _ from 'lodash'
import { withPlus } from '../../../utils/numbers'
import { formatDate } from '../../../utils/date'

import statsIcon1 from "../../../assets/img/svg/stats-icon-1.svg"
import statsIcon2 from "../../../assets/img/svg/stats-icon-2.svg"
import statsIcon5 from "../../../assets/img/svg/stats-icon-5.svg"
import { VkInfographicsWithFilters } from '../../../components/Inner/Vk/VkInfographicsWithFilters'

export const VkInfographics = () => {
  const { data: postsResponse } = vkAPI.useGetVkPostsQuery({ page: 1, perPage: 1 })
  const { data: usersResponse } = vkAPI.useGetVkUsersQuery({ page: 1, perPage: 1 })
  const { data: groupsResponse } = vkAPI.useGetVkGroupsQuery({ page: 1, perPage: 1 })


  const totalPosts = postsResponse?.totalElements || 0
  const totalUsers = usersResponse?.totalElements || 0
  const totalGroups = groupsResponse?.totalElements || 0

  const groupsFilters = useSelector(vkInfographicsGroupsSelectors.filters)
  const groupsCurrentFilters = useSelector(vkInfographicsGroupsSelectors.currentFilters)
  const usersFilters = useSelector(vkInfographicsUsersSelectors.filters)
  const usersCurrentFilters = useSelector(vkInfographicsUsersSelectors.currentFilters)

  const [currentDynamicChart, setCurrentDynamicChart] = useState<"groups" | "posts" | "users">("groups")
  const [currentDynamicWithFiltersChart, setCurrentDynamicWithFiltersChart] = useState<"groups" | "posts" | "users">("groups")

  const { data: groupsCountBySubculturesActual } = vkAPI.useGetVkGroupsCountBySubculturesQuery({ actual: true })
  const { data: usersCountBySubculturesActual } = vkAPI.useGetVkUsersCountBySubculturesQuery({ actual: true })

  const { data: groupsCountBySubcultures } = vkAPI.useGetVkGroupsCountBySubculturesQuery({ actual: false })
  const { data: usersCountBySubcultures } = vkAPI.useGetVkUsersCountBySubculturesQuery({ actual: false })
  const { data: postsCountBySubcultures } = vkAPI.useGetVkPostsCountBySubculturesQuery({ actual: false })

  const { data: groupsCountBySubculturesWithFilters } = vkAPI.useGetVkGroupsCountBySubculturesQuery(groupsCurrentFilters)
  const { data: usersCountBySubculturesWithFilters } = vkAPI.useGetVkUsersCountBySubculturesQuery(usersCurrentFilters)
  const { data: postsCountBySubculturesWithFilters } = vkAPI.useGetVkPostsCountBySubculturesQuery({ actual: false })

  const dispatch = useDispatch()

  const groupsGrowth = useMemo(() => {
    if (!(groupsCountBySubcultures && groupsCountBySubcultures?.[1])) {
      return
    }

    const lastElement = _.sum(Object.values(groupsCountBySubcultures[groupsCountBySubcultures.length - 1].hash))
    const penultimateElement = _.sum(Object.values(groupsCountBySubcultures[groupsCountBySubcultures.length - 2].hash))

    return lastElement - penultimateElement
  }, [groupsCountBySubcultures])

  const usersGrowth = useMemo(() => {
    if (!(usersCountBySubcultures && usersCountBySubcultures?.[1])) {
      return
    }

    const lastElement = _.sum(Object.values(usersCountBySubcultures[usersCountBySubcultures.length - 1].hash))
    const penultimateElement = _.sum(Object.values(usersCountBySubcultures[usersCountBySubcultures.length - 2].hash))

    return lastElement - penultimateElement
  }, [usersCountBySubcultures])


  const postsGrowth = useMemo(() => {
    if (!(postsCountBySubcultures && postsCountBySubcultures?.[1])) {
      return
    }

    const lastElement = _.sum(Object.values(postsCountBySubcultures[postsCountBySubcultures.length - 1].hash))
    const penultimateElement = _.sum(Object.values(postsCountBySubcultures[postsCountBySubcultures.length - 2].hash))

    return lastElement - penultimateElement

  }, [postsCountBySubcultures])


  const groupsStaticChart = useMemo(() => groupsCountBySubculturesActual?.[0] && getDoughnutChartConfig(
    Object.entries(groupsCountBySubculturesActual[0].hash).map((item) => item[0]),
    Object.entries(groupsCountBySubculturesActual[0].hash).map((item) => item[1]),
    "Количество групп по субкультурам")
    , [groupsCountBySubculturesActual])

  const usersStaticChart = useMemo(() => usersCountBySubculturesActual?.[0] && getDoughnutChartConfig(
    Object.entries(usersCountBySubculturesActual[0].hash).map((item) => item[0]),
    Object.entries(usersCountBySubculturesActual[0].hash).map((item) => item[1]),
    "Количество пользователей по субкультурам")
    , [usersCountBySubculturesActual])

  const groupsDynamicChart = useMemo(() => groupsCountBySubcultures?.[0] &&
    getLineChartConfig(
      getLineChartData(groupsCountBySubcultures).labels,
      getLineChartData(groupsCountBySubcultures).datasets,
      ""), [groupsCountBySubcultures])

  const usersDynamicChart = useMemo(() => usersCountBySubcultures?.[0] &&
    getLineChartConfig(
      getLineChartData(usersCountBySubcultures).labels,
      getLineChartData(usersCountBySubcultures).datasets,
      ""), [usersCountBySubcultures])

  const postsDynamicChart = useMemo(() => postsCountBySubcultures?.[0] &&
    getLineChartConfig(
      getLineChartData(postsCountBySubcultures).labels,
      getLineChartData(postsCountBySubcultures).datasets,
      ""), [postsCountBySubcultures])

  const groupsDynamicWithFiltersChart = useMemo(() => groupsCountBySubculturesWithFilters?.[0] &&
    getLineChartConfig(
      getLineChartData(groupsCountBySubculturesWithFilters).labels,
      getLineChartData(groupsCountBySubculturesWithFilters).datasets,
      ""), [groupsCountBySubculturesWithFilters])

  const usersDynamicWithFiltersChart = useMemo(() => usersCountBySubculturesWithFilters?.[0] &&
    getLineChartConfig(
      getLineChartData(usersCountBySubculturesWithFilters).labels,
      getLineChartData(usersCountBySubculturesWithFilters).datasets,
      ""), [usersCountBySubculturesWithFilters])

  const postsDynamicWithFiltersChart = useMemo(() => postsCountBySubculturesWithFilters?.[0] &&
    getLineChartConfig(
      getLineChartData(postsCountBySubculturesWithFilters).labels,
      getLineChartData(postsCountBySubculturesWithFilters).datasets,
      ""), [postsCountBySubculturesWithFilters])

  const onChangeFiltersGroupsRegion = useCallback((region: string | null) => {
    dispatch(setFiltersGroupsDistrict({ region }))
  }, [])

  const onChangeFiltersGroupsCountry = useCallback((country: string | null) => {
    dispatch(setFiltersGroupsCountry({ country }))
    onChangeFiltersGroupsRegion(null)
  }, [])

  const onChangeFiltersGroupsSubscribersCountMin = useCallback((subscribersCountMin: number) => {
    dispatch(setFiltersGroupsSubscribersCountMin({ membersCountMin: subscribersCountMin }))
  }, [])

  const onChangeFiltersGroupsSubscribersCountMax = useCallback((subscribersCountMax: number) => {
    dispatch(setFiltersGroupsSubscribersCountMax({ membersCountMax: subscribersCountMax }))
  }, [])

  const applyGroupsFilters = useCallback(() => {
    dispatch(setCurrentGroupsFilters({ currentFilters: groupsFilters }))
  }, [groupsFilters])

  const clearGroupsFiltersHandler = useCallback(() => {
    dispatch(clearGroupsFilters())
  }, [])

  const onChangeFiltersUsersRegion = useCallback((region: string | null) => {
    dispatch(setFiltersUsersDistrict({ region }))
  }, [])

  const onChangeFiltersUsersCountry = useCallback((country: string | null) => {
    dispatch(setFiltersUsersCountry({ country }))
    onChangeFiltersUsersRegion(null)
  }, [])

  const onChangeFiltersUsersSubscribersCountMin = useCallback((subscribersCountMin: number) => {
    dispatch(setFiltersUsersSubscribersCountMin({ subscribersCountMin }))
  }, [])

  const onChangeFiltersUsersSubscribersCountMax = useCallback((subscribersCountMax: number) => {
    dispatch(setFiltersUsersSubscribersCountMax({ subscribersCountMax }))
  }, [])

  const applyUsersFilters = useCallback(() => {
    dispatch(setCurrentUsersFilters({ currentFilters: usersFilters }))
  }, [usersFilters])

  const clearUsersFiltersHandler = useCallback(() => {
    dispatch(clearUsersFilters())
  }, [])


  return (
    <>
      <Helmet>
        <title>Инфографика</title>
      </Helmet>
      <section className="chart-block">

        <div className="chart-block__filters">
          <div className="chart-block__filters-col">
            <h2 className="chart-block__title">Общая динамика</h2>
          </div>
          <div className="chart-block__filters-col chart-block__filters-col_hide-mob">
            <div className="date-nav">
              <div className="date-nav__scroll js-filters-scroll">
                <ul className="date-nav__list">
                  <li className={classNames("date-nav__item", "js-filters-item", {
                    active: currentDynamicChart === "groups"
                  })} >
                    <button onClick={() => setCurrentDynamicChart("groups")} className="date-nav__button js-filters-button" type="button">Сообщество</button>
                  </li>
                  <li className={classNames("date-nav__item", "js-filters-item", {
                    active: currentDynamicChart === "users"
                  })} >
                    <button onClick={() => setCurrentDynamicChart("users")} className="date-nav__button js-filters-button" type="button">Пользователи</button>
                  </li>
                  <li className={classNames("date-nav__item", "js-filters-item", {
                    active: currentDynamicChart === "posts"
                  })} >
                    <button onClick={() => setCurrentDynamicChart("posts")} className="date-nav__button js-filters-button" type="button">Записи</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-block__cols">

          <div className="chart-block__left">
            <div className="chart-block__bg">
              <div className="chart-1">
                {groupsDynamicChart && currentDynamicChart === "groups" && <Line data={groupsDynamicChart.data} options={groupsDynamicChart.options} />}
                {usersDynamicChart && currentDynamicChart === "users" && <Line data={usersDynamicChart.data} options={usersDynamicChart.options} />}
                {postsDynamicChart && currentDynamicChart === "posts" && <Line data={postsDynamicChart.data} options={postsDynamicChart.options} />}
              </div>
            </div>
          </div>

          <div className="chart-block__mob-col">
            <div className="date-nav">
              <div className="date-nav__scroll js-filters-scroll">
                <ul className="date-nav__list">
                  <li className={classNames("date-nav__item", "js-filters-item", {
                    active: currentDynamicChart === "groups"
                  })} >
                    <button onClick={() => setCurrentDynamicChart("groups")} className="date-nav__button js-filters-button" type="button">Пользователи</button>
                  </li>
                  <li className={classNames("date-nav__item", "js-filters-item", {
                    active: currentDynamicChart === "posts"
                  })} >
                    <button onClick={() => setCurrentDynamicChart("posts")} className="date-nav__button js-filters-button" type="button">Записи</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="chart-block__right">
            <div className="stats">
              <article className="stats__col stats__col_100">
                <div className="stats__bg stats__bg_orange">
                  <div className="stats__icon-wrap">
                    <img className="stats__icon" src={statsIcon5} alt="" />
                  </div>
                  <h3 className="stats__title">Сообщества</h3>
                  <p className="stats__count">{totalGroups}</p>
                  <p className="stats__bottom">
                    <span className="stats__plus">{groupsGrowth && withPlus(groupsGrowth)}</span>
                    <span className="stats__text">с предыдущей проверки <span className="stats__hide-tablet">
                      {groupsCountBySubcultures?.[0] && formatDate(groupsCountBySubcultures[groupsCountBySubcultures.length - 1].date)}
                    </span></span>
                  </p>
                </div>
              </article>
              <article className="stats__col stats__col_100">
                <div className="stats__bg">
                  <div className="stats__icon-wrap">
                    <img className="stats__icon" src={statsIcon1} alt="" />
                  </div>
                  <h3 className="stats__title">Активных пользователей</h3>
                  <p className="stats__count">{totalUsers}</p>
                  <p className="stats__bottom">
                    <span className="stats__plus">{usersGrowth && withPlus(usersGrowth)}</span>
                    <span className="stats__text">с предыдущей проверки <span className="stats__hide-tablet">
                      {usersCountBySubcultures?.[0] && formatDate(usersCountBySubcultures[usersCountBySubcultures.length - 1].date)}
                    </span></span>
                  </p>
                </div>
              </article>
              <article className="stats__col stats__col_100">
                <div className="stats__bg stats__bg_purple">
                  <div className="stats__icon-wrap">
                    <img className="stats__icon" src={statsIcon2} alt="" />
                  </div>
                  <h3 className="stats__title">Публикации</h3>
                  <p className="stats__count">{totalPosts}</p>
                  <p className="stats__bottom">
                    <span className="stats__plus">{postsGrowth && withPlus(postsGrowth)}</span>
                    <span className="stats__text">с предыдущей проверки <span className="stats__hide-tablet">
                      {postsCountBySubcultures?.[0] && formatDate(postsCountBySubcultures[postsCountBySubcultures.length - 1].date)}
                    </span></span>
                  </p>
                </div>
              </article>
            </div>
          </div>

        </div>
      </section>

      <section className="chart-block">

        <div className="chart-block__filters chart-block__filters_padding">
          <div className="chart-block__filters-col">
            <h2 className="chart-block__title">Детальная информация по&nbsp;активности</h2>
          </div>
          <div className="chart-block__filters-col chart-block__filters-col_hide-mob">
            <div className="date-nav">
              <div className="date-nav__scroll js-filters-scroll">
                <ul className="date-nav__list">
                  <li className={classNames("date-nav__item", "js-filters-item", {
                    active: currentDynamicWithFiltersChart === "groups"
                  })} >
                    <button onClick={() => setCurrentDynamicWithFiltersChart("groups")} className="date-nav__button js-filters-button" type="button">Сообщество</button>
                  </li>
                  <li className={classNames("date-nav__item", "js-filters-item", {
                    active: currentDynamicWithFiltersChart === "users"
                  })} >
                    <button onClick={() => setCurrentDynamicWithFiltersChart("users")} className="date-nav__button js-filters-button" type="button">Пользователи</button>
                  </li>
                  <li className={classNames("date-nav__item", "js-filters-item", {
                    active: currentDynamicWithFiltersChart === "posts"
                  })} >
                    <button onClick={() => setCurrentDynamicWithFiltersChart("posts")} className="date-nav__button js-filters-button" type="button">Записи</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-block__cols">

          {currentDynamicWithFiltersChart === "groups" && <VkInfographicsWithFilters
            filters={groupsFilters} applyFilters={applyGroupsFilters} onChangeFiltersCountry={onChangeFiltersGroupsCountry}
            onChangeFiltersRegion={onChangeFiltersGroupsRegion} onChangeFiltersSubscribersCountMax={onChangeFiltersGroupsSubscribersCountMax}
            onChangeFiltersSubscribersCountMin={onChangeFiltersGroupsSubscribersCountMin} infographicsData={groupsDynamicWithFiltersChart}
            clearFilters={clearGroupsFiltersHandler}
          />}
          {currentDynamicWithFiltersChart === "users" && <VkInfographicsWithFilters
            filters={usersFilters} applyFilters={applyUsersFilters} onChangeFiltersCountry={onChangeFiltersUsersCountry}
            onChangeFiltersRegion={onChangeFiltersUsersRegion} onChangeFiltersSubscribersCountMax={onChangeFiltersUsersSubscribersCountMax}
            onChangeFiltersSubscribersCountMin={onChangeFiltersUsersSubscribersCountMin} infographicsData={usersDynamicWithFiltersChart}
            clearFilters={clearUsersFiltersHandler}
          />}
          {currentDynamicWithFiltersChart === "posts" && <VkInfographicsWithFilters infographicsData={postsDynamicWithFiltersChart} />}

        </div>

      </section>

      <div className="chart-block">
        <div className="chart-block__cols chart-block__cols_end">
          <section className="chart-block__col">
            <div className="chart-block__bg">
              <h3 className="chart-block__subtitle">Деструктивные сообщества</h3>
              <div className="circle-chart circle-chart_destruct">
                <div className="circle-chart__left">
                  <div className="circle-chart__canvas-wrap">
                    <div className="circle-chart__canvas chart-2">
                      {groupsStaticChart && <Doughnut options={groupsStaticChart.options} data={groupsStaticChart.data} />}
                    </div>
                    <p className="circle-chart__text-wrap">
                      <span className="circle-chart__count">{totalGroups}</span>
                      <span className="circle-chart__text">деструктивных сообществ</span>
                    </p>
                  </div>
                </div>
                <div className="circle-chart__right">
                  <ul className="chart-labels chart-labels_full">
                    {
                      groupsCountBySubculturesActual?.[0] && Object.entries(groupsCountBySubculturesActual[0].hash).map((values, index) => {
                        return (
                          <li className="chart-labels__item" key={index}>
                            <span className="chart-labels__bg"></span>
                            <span className="chart-labels__text">{values[0]}</span>
                            <span className="chart-labels__count">{values[1]}</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="chart-block__col">
            <div className="chart-block__bg">
              <h3 className="chart-block__subtitle">Пользователи деструктивных сообществ</h3>
              <div className="circle-chart circle-chart_destruct">
                <div className="circle-chart__left">
                  <div className="circle-chart__canvas-wrap">
                    <div className="circle-chart__canvas chart-2">
                      {usersStaticChart && <Doughnut options={usersStaticChart.options} data={usersStaticChart.data} />}
                    </div>
                    <p className="circle-chart__text-wrap">
                      <span className="circle-chart__count">{totalUsers}</span>
                      <span className="circle-chart__text">пользователей в&nbsp;деструктивых сообществах</span>
                    </p>
                  </div>
                </div>
                <div className="circle-chart__right">
                  <ul className="chart-labels chart-labels_full">
                    {
                      usersCountBySubculturesActual?.[0] && Object.entries(usersCountBySubculturesActual[0].hash).map((values, index) => {
                        return (
                          <li className="chart-labels__item" key={index}>
                            <span className="chart-labels__bg"></span>
                            <span className="chart-labels__text">{values[0]}</span>
                            <span className="chart-labels__count">{values[1]}</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
