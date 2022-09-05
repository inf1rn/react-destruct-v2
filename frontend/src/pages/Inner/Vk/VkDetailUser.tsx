import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { vkAPI } from '../../../api/vk'
import { vkUsersPath } from '../../../constants/links'
import { VkCardPost } from '../../../components/Inner/Vk/VkCardPost'
import { Pagination } from '../../../components/Inner/Pagination'
import { useTypedDispatch } from '../../../hooks/common'
import { useSelector } from 'react-redux'
import { vkUserDetailSelectors } from '../../../store/vk/users/detail/selectors'
import { setPaginationPage } from '../../../store/vk/users/detail/reducer'
import { Helmet } from 'react-helmet'
import { VkUserInfo } from '../../../components/Inner/Vk/VkUserInfo'

import postIcon1 from "../../../assets/img/svg/post-icon-1.svg"
import postIconMob1 from "../../../assets/img/svg/post-icon-mob-1.svg"
import postIcon2 from "../../../assets/img/svg/post-icon-2.svg"
import postIconMob2 from "../../../assets/img/svg/post-icon-mob-2.svg"
import postIcon3 from "../../../assets/img/svg/post-icon-3.svg"
import postIconMob3 from "../../../assets/img/svg/post-icon-mob-3.svg"


export const VkDetailUser = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useTypedDispatch()

  const pagination = useSelector(vkUserDetailSelectors.pagination)

  const { data: user, isSuccess, isError } = vkAPI.useGetVkUserByIdQuery((id && +id) ? +id : skipToken)
  const { data: postsResponse } = vkAPI.useGetVkPostsQuery((id && +id) ? { entity: "user", entityId: +id, ...pagination } : skipToken)
  const { data: postsAllResponse } = vkAPI.useGetVkPostsQuery((id && +id) ? { entity: "user", entityId: +id } : skipToken)

  const posts = postsResponse?.content || []
  const postsCount = postsResponse?.totalElements || 0
  const postsAll = postsAllResponse?.content || []

  const likesCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalLikes, 0), [postsAll])
  const commentsCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalComments, 0), [postsAll])
  const viewsCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalViews, 0), [postsAll])


  const onChangePage = useCallback((page: number) => {
    dispatch(setPaginationPage({ page }))
  }, [])


  useEffect(() => {
    if ((isSuccess || isError) && !user) {
      navigate(vkUsersPath)
    }

    return () => {
      dispatch(setPaginationPage({ page: 1 }))
    }
  }, [isSuccess, isError])

  return (
    <>
      {user && <Helmet>
        <title>{user?.firstName} {user?.lastName}</title>
      </Helmet>
      }
      <div className="search-user">
        <div className="search-user__cols">
          <div className="search-user__col">
            <Link to={vkUsersPath} className="search-user__back back-button"></Link>
          </div>
          <div className="search-user__col">
            <img className="search-user__photo" src={user?.imgUrl} alt="" />
          </div>
          <div className="search-user__col">
            <h3 className="search-user__title">{user?.lastName} {user?.firstName} {user?.thirdName}</h3>
            <a className="search-user__id" href={user?.url}>ID {user?.id}</a>
          </div>
        </div>
      </div>

      {user && <VkUserInfo user={user} />}

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
                <span className="short-stats__count">{likesCount}</span>
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
          {posts?.map((post) => <VkCardPost post={post} key={post.id} />)}
        </div>

        <Pagination page={pagination.page} perPage={pagination.perPage} onChangePage={onChangePage} count={postsCount} />

      </section>
    </>
  )
}
