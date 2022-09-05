import { useMemo } from 'react'
import { tiktokAPI } from '../../api/titkok'
import { vkAPI } from '../../api/vk'
import { telegramAPI } from '../../api/telegram'
import { ICommonSocialInfographics, IInfographicsData } from '../../types/infographics'
import _ from 'lodash'
import { getBarChartConfig, getDoughnutChartConfig, getLineChartConfig, getLineChartData } from '../../utils/charts'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

export const Statistics = () => {
  const { data: tiktokPostsCountBySubculturesActual } = tiktokAPI.useGetTiktokPostsCountBySubculturesQuery(true)
  const { data: tiktokUsersCountBySubculturesActual } = tiktokAPI.useGetTiktokUsersCountBySubculturesQuery(true)
  const { data: tiktokPostsCountBySubcultures } = tiktokAPI.useGetTiktokPostsCountBySubculturesQuery(false)
  const { data: tiktokUsersCountBySubcultures } = tiktokAPI.useGetTiktokUsersCountBySubculturesQuery(false)

  const { data: telegramPostsCountBySubculturesActual } = telegramAPI.useGetTelegramPostsCountBySubculturesQuery(true)
  const { data: telegramChannelsCountBySubculturesActual } = telegramAPI.useGetTelegramChannelsCountBySubculturesQuery(true)
  const { data: telegramPostsCountBySubcultures } = telegramAPI.useGetTelegramPostsCountBySubculturesQuery(false)
  const { data: telegramChannelsCountBySubcultures } = telegramAPI.useGetTelegramChannelsCountBySubculturesQuery(false)


  const { data: vkPostsCountBySubculturesActual } = vkAPI.useGetVkPostsCountBySubculturesQuery({ actual: true })
  const { data: vkUsersCountBySubculturesActual } = vkAPI.useGetVkUsersCountBySubculturesQuery({ actual: true })
  const { data: vkGroupsCountBySubculturesActual } = vkAPI.useGetVkGroupsCountBySubculturesQuery({ actual: true })
  const { data: vkPostsCountBySubcultures } = vkAPI.useGetVkPostsCountBySubculturesQuery({ actual: false })
  const { data: vkUsersCountBySubcultures } = vkAPI.useGetVkUsersCountBySubculturesQuery({ actual: false })
  const { data: vkGroupsCountBySubcultures } = vkAPI.useGetVkGroupsCountBySubculturesQuery({ actual: false })

  const commonCountBySubcultures = useMemo(() => {
    if (!(
      tiktokPostsCountBySubcultures && tiktokUsersCountBySubcultures &&
      telegramPostsCountBySubcultures && telegramChannelsCountBySubcultures &&
      vkPostsCountBySubcultures && vkUsersCountBySubcultures && vkGroupsCountBySubcultures)) {
      return
    }

    const infographicsCommonData = [
      ...tiktokPostsCountBySubcultures,
      ...tiktokPostsCountBySubcultures,
      ...telegramChannelsCountBySubcultures,
      ...telegramPostsCountBySubcultures,
      ...vkPostsCountBySubcultures,
      ...vkUsersCountBySubcultures,
      ...vkGroupsCountBySubcultures] as Array<IInfographicsData>

    return _.orderBy(infographicsCommonData, (infographicsData) => infographicsData.date)
  }, [
    tiktokPostsCountBySubcultures, tiktokUsersCountBySubcultures,
    telegramPostsCountBySubcultures, telegramChannelsCountBySubcultures,
    vkPostsCountBySubcultures, vkUsersCountBySubcultures, vkGroupsCountBySubcultures
  ]
  )

  const commonCountBySubculturesActual = useMemo(() => {
    if (!(tiktokPostsCountBySubculturesActual?.[0] &&
      tiktokUsersCountBySubculturesActual?.[0] &&
      telegramPostsCountBySubculturesActual?.[0] &&
      telegramChannelsCountBySubculturesActual?.[0] &&
      vkPostsCountBySubculturesActual?.[0] &&
      vkUsersCountBySubculturesActual?.[0] &&
      vkGroupsCountBySubculturesActual?.[0])) {
      return
    }
    const socialInfographicsCommonData = [
      {
        social: "TikTok",
        data: [
          tiktokUsersCountBySubculturesActual[0],
          tiktokPostsCountBySubculturesActual[0]
        ]
      },
      {
        social: "Telegram",
        data: [
          telegramChannelsCountBySubculturesActual[0],
          telegramPostsCountBySubculturesActual[0]
        ]
      },
      {
        social: "ВКонтакте",
        data: [
          vkPostsCountBySubculturesActual[0],
          vkUsersCountBySubculturesActual[0],
          vkGroupsCountBySubculturesActual[0]
        ]
      }] as Array<ICommonSocialInfographics>

    console.log(socialInfographicsCommonData.map(socialInfographicsData => {
      // массив данных для статической инфографики, упорядоченный по соц сетям

      return socialInfographicsData.data.reduce((prev, curr) => {
        const middle = {} as { [key in string]: number }

        for (let subculture of Object.keys(curr.hash)) {
          const subcultureWithSocial = socialInfographicsData.social + " " + subculture

          if (Object.hasOwn(prev, subcultureWithSocial)) {
            middle[subcultureWithSocial] = curr.hash[subculture] + prev[subcultureWithSocial]
          } else {
            middle[subcultureWithSocial] = curr.hash[subculture]
          }
        }
        return middle
      }, {} as { [key in string]: number })
    }).reduce((prev, curr) => ({ ...prev, ...curr }), {}))

    return socialInfographicsCommonData.map(socialInfographicsData => {
      // массив данных для статической инфографики, упорядоченный по соц сетям

      return socialInfographicsData.data.reduce((prev, curr) => {
        const middle = {} as { [key in string]: number }

        for (let subculture of Object.keys(curr.hash)) {
          const subcultureWithSocial = socialInfographicsData.social + " " + subculture

          if (Object.hasOwn(prev, subcultureWithSocial)) {
            middle[subcultureWithSocial] = curr.hash[subculture] + prev[subcultureWithSocial]
          } else {
            middle[subcultureWithSocial] = curr.hash[subculture]
          }
        }
        return middle
      }, {} as { [key in string]: number })
    }).reduce((prev, curr) => ({ ...prev, ...curr }), {})
  }, [
    tiktokPostsCountBySubculturesActual,
    tiktokUsersCountBySubculturesActual,
    telegramPostsCountBySubculturesActual,
    telegramChannelsCountBySubculturesActual,
    vkPostsCountBySubculturesActual,
    vkUsersCountBySubculturesActual,
    vkGroupsCountBySubculturesActual
  ]
  )

  const commonPostsCountBySubculturesActual = useMemo(() => {
    if (!(tiktokPostsCountBySubculturesActual?.[0] &&
      telegramPostsCountBySubculturesActual?.[0] &&
      vkPostsCountBySubculturesActual?.[0]
    )) {
      return
    }

    const socialInfographicsCommonData = [
      {
        social: "TikTok",
        data: [
          tiktokPostsCountBySubculturesActual[0],
        ]
      },
      {
        social: "Telegram",
        data: [
          telegramPostsCountBySubculturesActual[0]
        ]
      },
      {
        social: "ВКонтакте",
        data: [
          vkPostsCountBySubculturesActual[0],
        ]
      }] as Array<ICommonSocialInfographics>
    return socialInfographicsCommonData.reduce((prev, curr) => {
      const middle = { ...prev }

      middle[curr.social] = curr.data.reduce((prev, curr) => prev + _.sum(Object.values(curr.hash)), 0)

      return middle
    }, {} as { [key in string]: number })
  }, [
    tiktokPostsCountBySubculturesActual,
    telegramPostsCountBySubculturesActual,
    vkPostsCountBySubculturesActual
  ])

  const commonUsersCountBySubculturesActual = useMemo(() => {
    if (!(tiktokUsersCountBySubculturesActual?.[0] &&
      telegramChannelsCountBySubculturesActual?.[0] &&
      vkUsersCountBySubculturesActual?.[0] &&
      vkGroupsCountBySubculturesActual?.[0]
    )) {
      return
    }

    const socialInfographicsCommonData = [
      {
        social: "TikTok",
        data: [
          tiktokUsersCountBySubculturesActual[0],
        ]
      },
      {
        social: "Telegram",
        data: [
          telegramChannelsCountBySubculturesActual[0]
        ]
      },
      {
        social: "ВКонтакте",
        data: [
          vkUsersCountBySubculturesActual[0],
          vkGroupsCountBySubculturesActual[0],
        ]
      }] as Array<ICommonSocialInfographics>
    return socialInfographicsCommonData.reduce((prev, curr) => {
      const middle = { ...prev }

      middle[curr.social] = curr.data.reduce((prev, curr) => prev + _.sum(Object.values(curr.hash)), 0)

      return middle
    }, {} as { [key in string]: number })
  }, [
    tiktokPostsCountBySubculturesActual,
    telegramPostsCountBySubculturesActual,
    vkPostsCountBySubculturesActual
  ])

  const commonDynamicChart = useMemo(() => commonCountBySubcultures &&
    getLineChartConfig(
      getLineChartData(commonCountBySubcultures).labels,
      getLineChartData(commonCountBySubcultures).datasets,
      ""), [commonCountBySubcultures])

  const commonStaticBarChart = useMemo(() => commonCountBySubculturesActual && getBarChartConfig(
    Object.entries(commonCountBySubculturesActual).map((item) => item[0]),
    Object.entries(commonCountBySubculturesActual).map((item) => item[1]),
    "")
    , [commonCountBySubculturesActual])

  const commonStaticPostsDoughnutChart = useMemo(() => commonPostsCountBySubculturesActual && getDoughnutChartConfig(
    Object.entries(commonPostsCountBySubculturesActual).map((item) => item[0]),
    Object.entries(commonPostsCountBySubculturesActual).map((item) => item[1]),
    "")
    , [commonPostsCountBySubculturesActual])

  const commonStaticUsersDoughnutChart = useMemo(() => commonUsersCountBySubculturesActual && getDoughnutChartConfig(
    Object.entries(commonUsersCountBySubculturesActual).map((item) => item[0]),
    Object.entries(commonUsersCountBySubculturesActual).map((item) => item[1]),
    "")
    , [commonUsersCountBySubculturesActual])


  return (
    <>
      <section className="chart-block">
        <div className="chart-block__top">
          <h1 className="chart-block__title">Статистика по социальным сетям</h1>
        </div>
        <div className="chart-block__bg">
          <div className="chart-1">

            {commonDynamicChart && <Line data={commonDynamicChart.data} options={commonDynamicChart.options} />}
          </div>
        </div>
      </section>

      <section className="chart-block">
        <div className="chart-block__top">
          <h2 className="chart-block__title">Детальная информация по&nbsp;активности </h2>
        </div>
        <div className="chart-block__bg">
          <div className="chart-block__selects">
            <div className="chart-block__select">
            </div>
          </div>
          <div className="chart-mob">
            <div className="chart-mob__scroll">
              <div className="chart-3">
                {commonStaticBarChart && <Bar data={commonStaticBarChart?.data} options={commonStaticBarChart?.options} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="chart-block">
        <div className="chart-block__cols chart-block__cols_end">
          <section className="chart-block__col">
            <div className="chart-block__bg">
              <h3 className="chart-block__subtitle">Сообщества/каналы/пользователи</h3>
              {commonStaticUsersDoughnutChart && commonUsersCountBySubculturesActual && <div className="circle-chart">
                <div className="circle-chart__left">
                  <div className="circle-chart__canvas-wrap">
                    <div className="circle-chart__canvas chart-2">

                      <Doughnut options={commonStaticUsersDoughnutChart.options} data={commonStaticUsersDoughnutChart.data} />               </div>
                    <p className="circle-chart__text-wrap">
                      <span className="circle-chart__count">{_.sum(Object.values(commonUsersCountBySubculturesActual))}</span>
                      <span className="circle-chart__text">сообществ/каналов/пользователей</span>
                    </p>
                  </div>
                </div>
                <div className="circle-chart__right">
                  <ul className="chart-labels chart-labels_full">
                    {Object.keys(commonUsersCountBySubculturesActual).map((social) => (<li key={social} className="chart-labels__item">
                      <span className="chart-labels__bg"></span>
                      <span className="chart-labels__text">{social}</span>
                      <span className="chart-labels__count">{commonUsersCountBySubculturesActual[social]}</span>
                    </li>
                    ))}
                  </ul>
                </div>
              </div>}
            </div>
          </section>
          <section className="chart-block__col">
            <div className="chart-block__bg">
              <h3 className="chart-block__subtitle">Публикации/записи</h3>
              {commonStaticPostsDoughnutChart && commonPostsCountBySubculturesActual && <div className="circle-chart">
                <div className="circle-chart__left">
                  <div className="circle-chart__canvas-wrap">
                    <div className="circle-chart__canvas chart-2">

                      <Doughnut options={commonStaticPostsDoughnutChart.options} data={commonStaticPostsDoughnutChart.data} />
                    </div>
                    <p className="circle-chart__text-wrap">
                      <span className="circle-chart__count">{_.sum(Object.values(commonPostsCountBySubculturesActual))}</span>
                      <span className="circle-chart__text">публикаций/записей</span>
                    </p>
                  </div>
                </div>
                <div className="circle-chart__right">
                  <ul className="chart-labels chart-labels_full">
                    {Object.keys(commonPostsCountBySubculturesActual).map((social) => (<li key={social} className="chart-labels__item">
                      <span className="chart-labels__bg"></span>
                      <span className="chart-labels__text">{social}</span>
                      <span className="chart-labels__count">{commonPostsCountBySubculturesActual[social]}</span>
                    </li>
                    ))}
                  </ul>
                </div>
              </div>}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
