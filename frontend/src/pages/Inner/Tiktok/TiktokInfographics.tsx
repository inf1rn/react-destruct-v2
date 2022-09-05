import classNames from 'classnames'
import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Helmet } from 'react-helmet'
import { tiktokAPI } from '../../../api/titkok'
import { getBarChartConfig, getLineChartConfig, getLineChartData } from '../../../utils/charts'
import { formatDate } from '../../../utils/date'
import { withPlus } from '../../../utils/numbers'

import statsIcon1 from "../../../assets/img/svg/stats-icon-1.svg"
import statsIcon5 from "../../../assets/img/svg/stats-icon-5.svg"

export const TiktokInfographics = () => {
    const { data: postsResponse } = tiktokAPI.useGetTiktokPostsQuery({ page: 1, perPage: 1, isDestructive: true })
    const { data: usersResponse } = tiktokAPI.useGetTiktokUsersQuery({ page: 1, perPage: 1 })

    const totalPosts = postsResponse?.totalElements || 0
    const totalUsers = usersResponse?.totalElements || 0

    const { data: postsCountBySubculturesActual } = tiktokAPI.useGetTiktokPostsCountBySubculturesQuery(true)
    const { data: usersCountBySubculturesActual } = tiktokAPI.useGetTiktokUsersCountBySubculturesQuery(true)

    const { data: postsCountBySubcultures } = tiktokAPI.useGetTiktokPostsCountBySubculturesQuery(false)
    const { data: usersCountBySubcultures } = tiktokAPI.useGetTiktokUsersCountBySubculturesQuery(false)

    const [currentStaticChart, setCurrentStaticChart] = useState<"users" | "posts">("users")

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

    const postsStaticChart = useMemo(() => postsCountBySubculturesActual && getBarChartConfig(
        Object.entries(postsCountBySubculturesActual[0].hash).map((item) => item[0]),
        Object.entries(postsCountBySubculturesActual[0].hash).map((item) => item[1]),
        "Количество записей по субкультурам")
        , [postsCountBySubculturesActual])

    const usersStaticChart = useMemo(() => usersCountBySubculturesActual && getBarChartConfig(
        Object.entries(usersCountBySubculturesActual[0].hash).map((item) => item[0]),
        Object.entries(usersCountBySubculturesActual[0].hash).map((item) => item[1]),
        "Количество пользователей по субкультурам")
        , [usersCountBySubculturesActual])


    const postsDynamicChart = useMemo(() => postsCountBySubcultures &&
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
                    <div className="chart-1">
                        {postsDynamicChart && <Line options={postsDynamicChart.options} data={postsDynamicChart.data} />}
                    </div>
                </div>
            </section>

            <section className="chart-block">

                <div className="chart-block__filters">
                    <div className="chart-block__filters-col">
                        <h2 className="chart-block__title">Детальная информация по&nbsp;активности</h2>
                    </div>
                    <div className="chart-block__filters-col chart-block__filters-col_hide-mob">
                        <div className="date-nav">
                            <div className="date-nav__scroll js-filters-scroll">
                                <ul className="date-nav__list">
                                    <li className={classNames("date-nav__item", "js-filters-item", {
                                        active: currentStaticChart === "users"
                                    })} >
                                        <button onClick={() => setCurrentStaticChart("users")} className="date-nav__button js-filters-button" type="button">Пользователи</button>
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
                            {
                                currentStaticChart === "users" &&
                                <div className="chart-4">
                                    {usersStaticChart && <Bar data={usersStaticChart.data} options={usersStaticChart.options} />}
                                </div>

                            }
                            {currentStaticChart === "posts" &&
                                <div className="chart-4">
                                    {postsStaticChart && <Bar data={postsStaticChart.data} options={postsStaticChart.options} />}
                                </div>
                            }

                        </div>
                    </div>

                    <div className="chart-block__mob-col">
                        <div className="date-nav">
                            <div className="date-nav__scroll js-filters-scroll">
                                <ul className="date-nav__list">
                                    <li className={classNames("date-nav__item", "js-filters-item", {
                                        active: currentStaticChart === "users"
                                    })} >
                                        <button onClick={() => setCurrentStaticChart("users")} className="date-nav__button js-filters-button" type="button">Пользователи</button>
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

                    <div className="chart-block__right">
                        <div className="stats">
                            <article className="stats__col stats__col_100">
                                <div className="stats__bg">
                                    <div className="stats__icon-wrap">
                                        <img className="stats__icon" src={statsIcon1} alt="" />
                                    </div>
                                    <h3 className="stats__title">Пользователи</h3>
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
                                <div className="stats__bg stats__bg_orange">
                                    <div className="stats__icon-wrap">
                                        <img className="stats__icon" src={statsIcon5} alt="" />
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
        </>
    )
}
