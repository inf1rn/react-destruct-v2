import { skipToken } from '@reduxjs/toolkit/dist/query'
import { Formik } from 'formik'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { vkAPI } from '../../../api/vk'
import { TableActions } from '../../../components/Common/UI/Table/TableActions'
import { VkCardPost } from '../../../components/Inner/Vk/VkCardPost'
import { VkGroupsTable } from '../../../components/Inner/Vk/VkTables/VkGroupsTable'
import { VkUserInfo } from '../../../components/Inner/Vk/VkUserInfo'
import { vkUsersPath } from '../../../constants/links'
import { useGetCurrentUserPermissions } from '../../../hooks/account'
import { clearSelectedGroups, setCurrentFilters, setFiltersUserUrl, toggleSelectedGroup } from '../../../store/vk/users/search/reducer'
import { vkSearchSelectors } from '../../../store/vk/users/search/selectors'

import postIcon1 from "../../../assets/img/svg/post-icon-1.svg"
import postIconMob1 from "../../../assets/img/svg/post-icon-mob-1.svg"
import postIcon2 from "../../../assets/img/svg/post-icon-2.svg"
import postIconMob2 from "../../../assets/img/svg/post-icon-mob-2.svg"
import postIcon3 from "../../../assets/img/svg/post-icon-3.svg"
import postIconMob3 from "../../../assets/img/svg/post-icon-mob-3.svg"

export const VkSearch = () => {
    const currentFilters = useSelector(vkSearchSelectors.currentFilters)
    const filters = useSelector(vkSearchSelectors.filters)

    const { data: groupsResponse } = vkAPI.useGetVkGroupsQuery(currentFilters.userUrl.length ? { userUrl: currentFilters.userUrl } : skipToken)
    const { data: userResponse } = vkAPI.useGetVkUsersQuery(currentFilters.userUrl.length ? { userUrl: currentFilters.userUrl } : skipToken)
    const groups = groupsResponse?.content || []
    const groupsCount = groupsResponse?.totalElements || 0

    const navigate = useNavigate()

    const user = userResponse?.content?.[0]

    const { data: postsAllResponse } = vkAPI.useGetVkPostsQuery((user?.id) ? { entity: "user", entityId: user.id } : skipToken)
    const { data: postsResponse } = vkAPI.useGetVkPostsQuery((user?.id) ? { entity: "user", entityId: user.id } : skipToken)

    const posts = postsResponse?.content || []
    const postsCount = postsResponse?.totalElements || 0
    const postsAll = postsAllResponse?.content || []

    const likesCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalLikes, 0), [user])
    const commentsCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalComments, 0), [user])
    const viewsCount = useMemo(() => postsAll.reduce((total, currentPost) => total + currentPost.totalViews, 0), [user])


    const permissions = useGetCurrentUserPermissions()
    const selectedGroups = useSelector(vkSearchSelectors.selectedGroups)

    const dispatch = useDispatch()

    const [deleteUser, { isSuccess: isSuccessDeleteUser }] = vkAPI.useDeleteVkUserMutation()

    useEffect(() => {
        if (filters.userUrl) {
            dispatch(setCurrentFilters({ currentFilters: filters }))
        }

    }, [filters.userUrl])

    const onDeleteUser = () => {
        if (!user) {
            return
        }

        deleteUser(user.id)
    }

    useEffect(() => {
        if (isSuccessDeleteUser) {
            navigate(vkUsersPath)
        }
    }, [isSuccessDeleteUser])

    const [deleteUsers, { isSuccess: isSuccessDeleteUsers }] = vkAPI.useDeleteVkUsersMutation()
    const [deleteGroup] = vkAPI.useDeleteVkGroupMutation()
    const [checkGroup] = vkAPI.useCheckVkGroupMutation()

    const [isAllToggled, setIsAllToggled] = useState<boolean>(false)

    const toggleSelectedGroupHandler = useCallback((id: number) => {
        dispatch(toggleSelectedGroup({ id }))
    }, [])

    const setIsAllToggledHandler = () => {
        if (!user?.groups) {
            return
        }

        for (let group of user?.groups) {
            if (isAllToggled) {
                dispatch(toggleSelectedGroup({ id: group.id, isSelected: false }))
            } else {
                dispatch(toggleSelectedGroup({ id: group.id, isSelected: true }))
            }
        }

        setIsAllToggled(!isAllToggled)
    }

    const deleteUsersHandler = useCallback(() => {
        deleteUsers(selectedGroups)
    }, [selectedGroups])

    const onDeleteGroup = useCallback((id: number) => {
        deleteGroup(id)
    }, [])

    const onCheckGroup = useCallback((id: number) => {
        checkGroup(id)
    }, [])


    useEffect(() => {
        dispatch(clearSelectedGroups())
        setIsAllToggled(false)
    }, [isSuccessDeleteUsers])

    const tableActions = [{ text: "Удалить", class: "status-nav__link_red", callback: deleteUsersHandler }]


    return (
        <div className="search-block">
            <Helmet>
                <title>Поиск деструктивных подписок</title>
            </Helmet>
            {!user ?
                <>
                    <h2 className="search-block__title">Для поиска деструктивных подписок по пользователям введите ID, ник или ссылку на профиль&nbsp;пользователя</h2>
                    <div className="search-block__cols">
                        <Formik initialValues={{
                            url: ""
                        }} onSubmit={(values) => {
                            dispatch(setFiltersUserUrl({ userUrl: values.url }))
                        }}>
                            {
                                ({ submitForm, values, handleChange }) =>
                                (
                                    <>
                                        <div className="search-block__left">
                                            <div className="search search_full">
                                                <label className="search__icon" htmlFor="search-input"></label>
                                                <input value={values.url} onChange={handleChange} name="url" className="search__input js-input-value" id="search-input" type="text" placeholder="ID, ник или ссылка на пользователя" />
                                                <button className="search__remove js-input-clear" type="button"></button>
                                            </div>
                                        </div>
                                        <div className="search-block__right">
                                            <button onClick={submitForm} className="search-block__button button">Поиск</button>
                                        </div>
                                    </>
                                )
                            }
                        </Formik>
                    </div>
                </>
                :
                <>
                    <div className="search-top">
                        <p className="search-top__text">По пользователю «{currentFilters.url}» найдено <a href="#">{user.groups.length}</a> деструктивных сообществ</p>
                    </div>

                    <div className="search-user">
                        <div className="search-user__admin-cols">
                            <div className="search-user__admin-col">
                                <div className="search-user__cols">
                                    <div className="search-user__col">
                                        <Link className="search-user__back back-button" to={vkUsersPath}></Link>
                                    </div>
                                    <div className="search-user__col">
                                        <img className="search-user__photo" src={user.imgUrl} alt="" />
                                    </div>
                                    <div className="search-user__col">
                                        <h3 className="search-user__title">{user.lastName} {user.firstName} {user.thirdName}</h3>
                                        <a className="search-user__id" href="#">ID {user.id}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="search-user__admin-col">
                                <button onClick={onDeleteUser} className="search-user__button button button_orange" type="button">
                                    <span className="button__trash">Удалить</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {user && <VkUserInfo user={user} />}

                    <section className="info-block">

                        <div className="info-block__top">
                            <h3 className="info-block__title">Деструктивные подписки:</h3>
                        </div>

                        <TableActions actions={tableActions} isActive={!!selectedGroups.length} />


                        <VkGroupsTable
                            currentUserPermissions={permissions} toggleSelectedGroupHandler={toggleSelectedGroupHandler}
                            selectedGroups={selectedGroups} setIsAllToggledHandler={setIsAllToggledHandler} groups={groups}
                            isAllToggled={isAllToggled} onDelete={onDeleteGroup} onCheck={onCheckGroup}
                        />
                    </section>

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
                            {posts?.map(post => <VkCardPost post={post} key={post.id} />)}
                        </div>
                    </section >
                </>
            }

        </div>
    )
}
