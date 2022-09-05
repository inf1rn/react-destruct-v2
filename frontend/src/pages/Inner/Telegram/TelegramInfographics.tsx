import classNames from 'classnames'
import _ from 'lodash'
import React, { useState, useMemo } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Helmet } from 'react-helmet'
import { telegramAPI } from '../../../api/telegram'
import { getBarChartConfig, getLineChartConfig, getLineChartData } from '../../../utils/charts'
import { formatDate } from '../../../utils/date'
import { withPlus } from '../../../utils/numbers'

import statsIcon5 from "../../../assets/img/svg/stats-icon-5.svg"
import statsIcon2 from "../../../assets/img/svg/stats-icon-2.svg"

export const TelegramInfographics = () => {
  const { data: channelsResponse } = telegramAPI.useGetTelegramChannelsQuery({ page: 1, perPage: 1 })
  const { data: postsResponse } = telegramAPI.useGetTelegramPostsQuery({ page: 1, perPage: 1 })

  const totalChannels = channelsResponse?.totalElements || 0
  const totalPosts = postsResponse?.totalElements || 0

  const { data: postsCountBySubculturesActual } = telegramAPI.useGetTelegramPostsCountBySubculturesQuery(true)
  const { data: channelsCountBySubculturesActual } = telegramAPI.useGetTelegramChannelsCountBySubculturesQuery(true)
  const { data: postsCountBySubcultures } = telegramAPI.useGetTelegramPostsCountBySubculturesQuery(false)
  const { data: channelsCountBySubcultures } = telegramAPI.useGetTelegramChannelsCountBySubculturesQuery(false)

  const [currentStaticChart, setCurrentStaticChart] = useState<"channels" | "posts">("channels")

  const channelsGrowth = useMemo(() => {
    if (!(channelsCountBySubcultures && channelsCountBySubcultures?.[1])) {
      return
    }

    const lastElement = _.sum(Object.values(channelsCountBySubcultures[channelsCountBySubcultures.length - 1].hash))
    const penultimateElement = _.sum(Object.values(channelsCountBySubcultures[channelsCountBySubcultures.length - 2].hash))

    return lastElement - penultimateElement
  }, [channelsCountBySubcultures])


  const postsGrowth = useMemo(() => {
    if (!(postsCountBySubcultures && postsCountBySubcultures?.[1])) {
      return
    }

    const lastElement = _.sum(Object.values(postsCountBySubcultures[postsCountBySubcultures.length - 1].hash))
    const penultimateElement = _.sum(Object.values(postsCountBySubcultures[postsCountBySubcultures.length - 2].hash))

    return lastElement - penultimateElement

  }, [postsCountBySubcultures])

  const postsStaticChart = useMemo(() => postsCountBySubculturesActual?.[0] && getBarChartConfig(
    Object.entries(postsCountBySubculturesActual[0].hash).map((item) => item[0]),
    Object.entries(postsCountBySubculturesActual[0].hash).map((item) => item[1]),
    "Количество записей по субкультурам")
    , [postsCountBySubculturesActual])
  const channelsStaticChart = useMemo(() => channelsCountBySubculturesActual?.[0] && getBarChartConfig(
    Object.entries(channelsCountBySubculturesActual[0].hash).map((item) => item[0]),
    Object.entries(channelsCountBySubculturesActual[0].hash).map((item) => item[1]),
    "Количество каналов по субкультурам")
    , [channelsCountBySubculturesActual])

  const postsDynamicChart = useMemo(() => postsCountBySubcultures?.[0] &&
    getLineChartConfig(
      getLineChartData(postsCountBySubcultures).labels,
      getLineChartData(postsCountBySubcultures).datasets,
      ""), [postsCountBySubcultures])


  return (
    <>
      <Helmet>
        <title>Инфографика</title>
      </Helmet>
      <section className="chart-block">
        <div className="chart-block__top">
          <h2 className="chart-block__title">Общая динамика публикаций</h2>
        </div>
        <div className="chart-block__bg">
          <div className="chart-block__selects">
          </div>
          <div className="chart-1">
            {postsDynamicChart && <Line data={postsDynamicChart.data} options={postsDynamicChart.options} />}
          </div>
        </div>
      </section>

      <section className="chart-block">

        <div className="chart-block__filters">
          <div className="chart-block__filters-col">
            <h2 className="chart-block__title">Детальная информация по активности</h2>
          </div>
          <div className="chart-block__filters-col chart-block__filters-col_hide-mob">
            <div className="date-nav">
              <div className="date-nav__scroll js-filters-scroll">
                <ul className="date-nav__list">
                  <li className={classNames("date-nav__item", "js-filters-item", {
                    active: currentStaticChart === "channels"
                  })} >
                    <button onClick={() => setCurrentStaticChart("channels")} className="date-nav__button js-filters-button" type="button">Пользователи</button>
                  </li>
                  <li className={classNames("date-nav__item", "js-filters-item", {
                    active: currentStaticChart === "posts"
                  })} >
                    <button onClick={() => setCurrentStaticChart("posts")} className="date-nav__button js-filters-button" type="button">Записи</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-block__cols">
          <div className="chart-block__left">
            <div className="chart-block__bg">
              <div className="chart-4">
                {
                  currentStaticChart === "channels" &&
                  channelsStaticChart && <Bar data={channelsStaticChart.data} options={channelsStaticChart.options} />


                }
                {currentStaticChart === "posts" &&
                  postsStaticChart && <Bar data={postsStaticChart.data} options={postsStaticChart.options} />
                }

              </div>

            </div>

          </div>


          <div className="chart-block__mob-col">
            <div className="date-nav">
              <div className="date-nav__scroll js-filters-scroll">
                <ul className="date-nav__list">
                  <li className="date-nav__item js-filters-item active">
                    <button className="date-nav__button js-filters-button" type="button">Каналы</button>
                  </li>
                  <li className="date-nav__item js-filters-item">
                    <button className="date-nav__button js-filters-button" type="button">Записи</button>
                  </li>
                  <li className="date-nav__item js-filters-item">
                    <button className="date-nav__button js-filters-button" type="button">Пользователи</button>
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
                  <h3 className="stats__title">Каналы</h3>
                  <p className="stats__count">{totalChannels}</p>
                  <p className="stats__bottom">
                    <span className="stats__plus">{channelsGrowth && withPlus(channelsGrowth)}</span>
                    <span className="stats__text">с предыдущей проверки <span className="stats__hide-tablet">
                      {channelsCountBySubcultures?.[0] && formatDate(channelsCountBySubcultures[channelsCountBySubcultures.length - 1].date)}
                    </span></span>
                  </p>
                </div>
              </article>
              <article className="stats__col stats__col_100">
                <div className="stats__bg stats__bg_purple">
                  <div className="stats__icon-wrap">
                    <img className="stats__icon" src={statsIcon2} alt="" />
                  </div>
                  <h3 className="stats__title">Записи</h3>
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
    </>
  )
}
