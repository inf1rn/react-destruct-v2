import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { telegramAPI } from '../../../api/telegram'
import { telegramChannelsStorage } from '../../../constants/api'
import { telegramChannelsPath } from '../../../constants/links'

import { TelegramCardPost } from '../../../components/Inner/Telegram/TelegramCardPost'
import { useTypedDispatch } from '../../../hooks/common'
import { useSelector } from 'react-redux'
import { telegramChannelDetailSelectors } from '../../../store/telegram/channels/detail/selectors'
import { Pagination } from '../../../components/Inner/Pagination'
import { setPaginationPage } from '../../../store/telegram/channels/detail/reducer'
import { Helmet } from 'react-helmet'
import { TelegramChannelInfo } from '../../../components/Inner/Telegram/TelegramChannelInfo'

import postIcon1 from "../../../assets/img/svg/post-icon-1.svg"
import postIconMob1 from "../../../assets/img/svg/post-icon-mob-1.svg"
import postIcon2 from "../../../assets/img/svg/post-icon-2.svg"
import postIconMob2 from "../../../assets/img/svg/post-icon-mob-2.svg"
import postIcon3 from "../../../assets/img/svg/post-icon-3.svg"
import postIconMob3 from "../../../assets/img/svg/post-icon-mob-3.svg"

export const TelegramDetailChannel = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const dispatch = useTypedDispatch()
  const pagination = useSelector(telegramChannelDetailSelectors.pagination)

  const { data: channel, isSuccess, isError } = telegramAPI.useGetTelegramChannelByIdQuery(id ? +id : skipToken)
  const { data: postsResponse } = telegramAPI.useGetTelegramPostsQuery((id && +id) ? { channelId: +id, ...pagination } : skipToken)
  const { data: postsAllResponse } = telegramAPI.useGetTelegramPostsQuery((id && +id) ? { channelId: +id } : skipToken)

  const posts = postsResponse?.content || []
  const postsAll = postsAllResponse?.content || []
  const postsCount = postsAllResponse?.totalElements || 0

  const reactionsCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalReactions, 0), [postsAll])
  const commentsCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalComments, 0), [postsAll])
  const viewsCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.postViews, 0), [postsAll])

  const onChangePage = useCallback((page: number) => {
    dispatch(setPaginationPage({ page }))
  }, [])

  useEffect(() => {
    if ((isSuccess || isError) && !channel) {
      navigate(telegramChannelsPath)
    }

    return () => {
      dispatch(setPaginationPage({ page: 1 }))
    }
  }, [isSuccess, isError])

  return (
    <>
      <Helmet>
        <title>{channel?.channelName}</title>
      </Helmet>
      <div className="search-user">
        <div className="search-user__cols">
          <div className="search-user__col">
            <Link to={telegramChannelsPath} className="search-user__back back-button"></Link>
          </div>
          <div className="search-user__col">
            <img className="search-user__photo" src={telegramChannelsStorage + channel?.imgUrl} alt="" />
          </div>
          <div className="search-user__col">
            <h3 className="search-user__title">{channel?.channelName}</h3>
            <a className="search-user__id" href={`https://t.me/${channel?.channelId}`}>ID {channel?.channelId}</a>
          </div>
        </div>
      </div>

      {channel && <TelegramChannelInfo channel={channel} />}

      <section className="info-block">

        <div className="info-block__top">
          <h3 className="info-block__title">{postsCount} последних публикаций:</h3>
        </div>

        <div className="short-stats">
          <div className="short-stats__col">
            <div className="short-stats__bg">
              <div className="short-stats__icon-wrap">
                <img className="short-stats__icon short-stats__icon_desktop" src={postIcon1} alt="" />
                <img className="short-stats__icon short-stats__icon_mob" src={postIconMob1} alt="" />
              </div>
              <p className="short-stats__content">
                <span className="short-stats__count">{reactionsCount}</span>
                <span className="short-stats__text">лайков</span>
              </p>
            </div>
          </div>
          <div className="short-stats__col">
            <div className="short-stats__bg short-stats__bg_orange">
              <div className="short-stats__icon-wrap">
                <img className="short-stats__icon short-stats__icon_desktop" src={postIcon2} alt="" />
                <img className="short-stats__icon short-stats__icon_mob" src={postIconMob2} alt="" />
              </div>
              <p className="short-stats__content">
                <span className="short-stats__count">{commentsCount}</span>
                <span className="short-stats__text">комментариев</span>
              </p>
            </div>
          </div>
          <div className="short-stats__col">
            <div className="short-stats__bg short-stats__bg_blue">
              <div className="short-stats__icon-wrap">
                <img className="short-stats__icon short-stats__icon_desktop" src={postIcon3} alt="" />
                <img className="short-stats__icon short-stats__icon_mob" src={postIconMob3} alt="" />
              </div>
              <p className="short-stats__content">
                <span className="short-stats__count">{viewsCount}</span>
                <span className="short-stats__text">просмотров</span>
              </p>
            </div>
          </div>
        </div>

        <div className="posts">
          {posts?.map((post) => <TelegramCardPost post={post} key={post.id} />)}
        </div>

        <Pagination page={pagination.page} perPage={pagination.perPage} onChangePage={onChangePage} count={postsCount} />


      </section>
    </>
  )
}
