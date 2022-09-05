import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { tiktokAPI } from '../../../api/titkok'
import { tiktokUsersPath } from '../../../constants/links'
import { tiktokUsersStorage } from '../../../constants/api'
import { TiktokCardPost } from '../../../components/Inner/Tiktok/TiktokCardPost'
import { setPaginationPage } from '../../../store/tiktok/users/detail/reducer'
import { useSelector } from 'react-redux'
import { useTypedDispatch } from '../../../hooks/common'
import { tiktokUserDetailSelectors } from '../../../store/tiktok/users/detail/selectors'
import { Helmet } from 'react-helmet'
import { TiktokUserInfo } from '../../../components/Inner/Tiktok/TiktokUserInfo'

import postIcon1 from "../../../assets/img/svg/post-icon-1.svg"
import postIconMob1 from "../../../assets/img/svg/post-icon-mob-1.svg"
import postIcon2 from "../../../assets/img/svg/post-icon-2.svg"
import postIconMob2 from "../../../assets/img/svg/post-icon-mob-2.svg"
import postIcon4 from "../../../assets/img/svg/post-icon-4.svg"
import postIconMob4 from "../../../assets/img/svg/post-icon-mob-4.svg"

export const TiktokDetailUser = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useTypedDispatch()

  const pagination = useSelector(tiktokUserDetailSelectors.pagination)

  const { data: user, isSuccess, isError } = tiktokAPI.useGetTiktokUserByIdQuery(id ? +id : skipToken)
  const { data: postsResponse } = tiktokAPI.useGetTiktokPostsQuery((id && +id) ? { userId: +id, ...pagination } : skipToken)
  const { data: postsAllResponse } = tiktokAPI.useGetTiktokPostsQuery((id && +id) ? { userId: +id } : skipToken)

  const posts = postsResponse?.content || []
  const postsAll = postsAllResponse?.content || []

  const postsCount = postsResponse?.totalElements || 0

  const likesCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalLikes, 0), [postsAll])
  const commentsCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalComments, 0), [postsAll])
  const shareCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalShare, 0), [postsAll])

  useEffect(() => {
    if ((isSuccess || isError) && !user) {
      navigate(tiktokUsersPath)
    }

    return () => {
      dispatch(setPaginationPage({ page: 1 }))
    }
  }, [isSuccess, isError])

  return (
    <>
      <Helmet>
        <title>{user?.username}</title>
      </Helmet>
      <div className="search-user">
        <div className="search-user__cols">
          <div className="search-user__col">
            <Link to={tiktokUsersPath} className="search-user__back back-button"></Link>
          </div>
          <div className="search-user__col">
            <img className="search-user__photo" src={tiktokUsersStorage + user?.imgUrl} alt="" />
          </div>
          <div className="search-user__col">
            <h3 className="search-user__title">{user?.username}</h3>
            <a className="search-user__id" href={`https://www.tiktok.com/@${user?.id}`} target="_blank">{user?.id}</a>
          </div>
        </div>
      </div>

      {user && <TiktokUserInfo user={user} />}

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
                <img className="short-stats__icon short-stats__icon_desktop" src={postIcon4} alt="" />
                <img className="short-stats__icon short-stats__icon_mob" src={postIconMob4} alt="" />
              </div>
              <p className="short-stats__content">
                <span className="short-stats__count">{shareCount}</span>
                <span className="short-stats__text">поделились</span>
              </p>
            </div>
          </div>
        </div>
        <div className="tiktok">
          {user && posts?.map(post => (

            <TiktokCardPost post={post} key={post.id} />
          ))
          }
        </div>


      </section>
    </>
  )
}
