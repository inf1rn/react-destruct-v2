import React from 'react'
import { IVkUser } from '../../../types/vk'
import statsIcon1 from "../../../assets/img/svg/stats-icon-1.svg"
import statsIcon2 from "../../../assets/img/svg/stats-icon-2.svg"
import statsIcon3 from "../../../assets/img/svg/stats-icon-3.svg"
import { subculturesPipes } from '../../../pipes/subculturesAndTags/subcultures'
import { tagsPipes } from '../../../pipes/subculturesAndTags/tags'
import { withPlus } from '../../../utils/numbers'
import { formatDate } from '../../../utils/date'

interface IProps {
    user: IVkUser
}

export const VkUserInfo: React.FC<IProps> = React.memo(({ user }) => {
    return (
        <div className="user-block">

            <div className="user-block__left">
                <div className="user-block__bg">
                    <div className="user-chars">
                        <div className="user-chars__row">
                            <div className="user-chars__cell">
                                <p className="user-chars__title">Пол</p>
                            </div>
                            <div className="user-chars__cell">
                                <p className="user-chars__text">{user?.sex ? "муж" : "жен"}</p>
                            </div>
                        </div>
                        <div className="user-chars__row">
                            <div className="user-chars__cell">
                                <p className="user-chars__title">Возраст</p>
                            </div>
                            <div className="user-chars__cell">
                                <p className="user-chars__text">{user?.age} лет</p>
                            </div>
                        </div>
                        <div className="user-chars__row">
                            <div className="user-chars__cell">
                                <p className="user-chars__title">Страна</p>
                            </div>
                            <div className="user-chars__cell">
                                <p className="user-chars__text">{user?.countryName}</p>
                            </div>
                        </div>
                        <div className="user-chars__row">
                            <div className="user-chars__cell">
                                <p className="user-chars__title">Город</p>
                            </div>
                            <div className="user-chars__cell">
                                <p className="user-chars__text">{user?.cityName}</p>
                            </div>
                        </div>
                        <div className="user-chars__row">
                            <div className="user-chars__cell">
                                <p className="user-chars__title">Дата активности</p>
                            </div>
                            <div className="user-chars__cell">
                                <p className="user-chars__text">{user && formatDate(user.lastActive)}</p>
                            </div>
                        </div>
                        <div className="user-chars__row">
                            <div className="user-chars__cell">
                                <p className="user-chars__title">Статус страницы</p>
                            </div>
                            <div className="user-chars__cell">
                                <p className="user-chars__text">{user && user.closed ? "закрытый" : "открытый"}</p>
                            </div>
                        </div>
                        <div className="user-chars__row">
                            <div className="user-chars__cell">
                                <p className="user-chars__title">Деструктивные сообщества</p>
                            </div>
                            <div className="user-chars__cell">
                                <p className="user-chars__text">{user?.groups.map(group => group.id).join(", ")}</p>
                            </div>
                        </div>
                        <div className="user-chars__row">
                            <div className="user-chars__cell">
                                <p className="user-chars__title">Субкультуры</p>
                            </div>
                            <div className="user-chars__cell">
                                <p className="user-chars__text">{user && subculturesPipes.names(user.tags).join(", ")}</p>
                            </div>
                        </div>
                        <div className="user-chars__row">
                            <div className="user-chars__cell">
                                <p className="user-chars__title">Теги</p>
                            </div>
                            <div className="user-chars__cell">
                                <p className="user-chars__text">{user && tagsPipes.names(user.tags).join(", ")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="user-block__right">
                <div className="stats">
                    <article className="stats__col stats__col_100">
                        <div className="stats__bg">
                            <div className="stats__icon-wrap">
                                <img className="stats__icon" src={statsIcon1} alt="" />
                            </div>
                            <h3 className="stats__title">Подписчики</h3>
                            <p className="stats__count">{user?.totalSubscribers}</p>
                            <p className="stats__bottom">
                                <span className="stats__plus">{user && withPlus(user?.subscribersGrowth)}</span>
                                <span className="stats__text">с предыдущей проверки <span className="stats__hide-tablet">{user && formatDate(user.lastUpdate)}</span></span>
                            </p>
                        </div>
                    </article>
                    <article className="stats__col stats__col_100">
                        <div className="stats__bg stats__bg_purple">
                            <div className="stats__icon-wrap">
                                <img className="stats__icon" src={statsIcon2} alt="" />
                            </div>
                            <h3 className="stats__title">Публикации</h3>
                            <p className="stats__count">{user?.totalPosts}</p>
                            <p className="stats__bottom">
                                <span className="stats__plus">{user && withPlus(user?.postsGrowth)}</span>
                                <span className="stats__text">с предыдущей проверки <span className="stats__hide-tablet">{user && formatDate(user.lastUpdate)}</span></span>
                            </p>
                        </div>
                    </article>
                    <article className="stats__col stats__col_100">
                        <div className="stats__bg stats__bg_orange">
                            <div className="stats__icon-wrap">
                                <img className="stats__icon" src={statsIcon3} alt="" />
                            </div>
                            <h3 className="stats__title">Просмотры публикаций</h3>
                            <p className="stats__count">{user?.totalViews}</p>
                            <p className="stats__bottom">
                                <span className="stats__plus">{user && withPlus(user?.viewsGrowth)}</span>
                                <span className="stats__text">с предыдущей проверки <span className="stats__hide-tablet">{user && formatDate(user.lastUpdate)}</span></span>
                            </p>
                        </div>
                    </article>
                </div>
            </div>

        </div>
    )
})
