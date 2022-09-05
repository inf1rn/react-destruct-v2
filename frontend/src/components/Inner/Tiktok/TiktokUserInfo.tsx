import React, { useState } from 'react'
import { ITiktokUser } from '../../../types/tiktok'
import { formatDate } from "../../../utils/date"
import statsIcon1 from "../../../assets/img/svg/stats-icon-1.svg"
import statsIcon2 from "../../../assets/img/svg/stats-icon-2.svg"
import statsIcon4 from "../../../assets/img/svg/stats-icon-4.svg"
import statsIcon5 from "../../../assets/img/svg/stats-icon-5.svg"
import { tagsPipes } from '../../../pipes/subculturesAndTags/tags'
import { subculturesPipes } from '../../../pipes/subculturesAndTags/subcultures'
import { withPlus } from '../../../utils/numbers'


interface IProps {
    user: ITiktokUser
}

export const TiktokUserInfo: React.FC<IProps> = React.memo(({ user }) => {
    return (
        <div className="tablet-block">
            <div className="tablet-block__bottom">

                <div className="chars-block">

                    <div className="chars-block__col">
                        <div className="chars-block__bg">
                            <div className="user-chars user-chars_no-bg">
                                <div className="user-chars__row">
                                    <div className="user-chars__cell">
                                        <p className="user-chars__title">Дата активности</p>
                                    </div>
                                    <div className="user-chars__cell">
                                        <p className="user-chars__text">{user && formatDate(user.lastPublication)}</p>
                                    </div>
                                </div>
                                <div className="user-chars__row">
                                    <div className="user-chars__cell">
                                        <p className="user-chars__title">Статус страницы</p>
                                    </div>
                                    <div className="user-chars__cell">
                                        <p className="user-chars__text">{user?.isPrivate ? "Закрытый" : "Открытый"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="chars-block__col">
                        <div className="chars-block__bg">
                            <div className="user-chars user-chars_no-bg">
                                <div className="user-chars__row">
                                    <div className="user-chars__cell">
                                        <p className="user-chars__title">Субкультуры</p>
                                    </div>
                                    <div className="user-chars__cell">
                                        <p className="user-chars__text">{user && tagsPipes.names(user.tags).join(", ")}</p>
                                    </div>
                                </div>
                                <div className="user-chars__row">
                                    <div className="user-chars__cell">
                                        <p className="user-chars__title">Теги</p>
                                    </div>
                                    <div className="user-chars__cell">
                                        <p className="user-chars__text">{user && subculturesPipes.names(user.tags).join(", ")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="tablet-block__top">

                <div className="stats stats_padding">
                    <article className="stats__col stats__col_25">
                        <div className="stats__bg">
                            <div className="stats__icon-wrap">
                                <img className="stats__icon" src={statsIcon1} alt="" />
                            </div>
                            <h3 className="stats__title">Подписчики</h3>
                            <p className="stats__count">{user?.totalSubscribers}</p>
                            <p className="stats__bottom">
                                <span className="stats__plus">{user && withPlus(user?.subscribersGrowth)}</span>
                                <span className="stats__text">с предыдущей проверки</span>
                            </p>
                        </div>
                    </article>
                    <article className="stats__col stats__col_25">
                        <div className="stats__bg stats__bg_orange">
                            <div className="stats__icon-wrap">
                                <img className="stats__icon" src={statsIcon5} alt="" />
                            </div>
                            <h3 className="stats__title">Подписки</h3>
                            <p className="stats__count">{user?.totalFollowing}</p>
                            <p className="stats__bottom">
                                <span className="stats__plus">{user && withPlus(user?.followingGrowth)}</span>
                                <span className="stats__text">с предыдущей проверки</span>
                            </p>
                        </div>
                    </article>
                    <article className="stats__col stats__col_25">
                        <div className="stats__bg stats__bg_purple">
                            <div className="stats__icon-wrap">
                                <img className="stats__icon" src={statsIcon2} alt="" />
                            </div>
                            <h3 className="stats__title">Публикации</h3>
                            <p className="stats__count">{user?.totalPosts}</p>
                            <p className="stats__bottom">
                                <span className="stats__plus">{user && withPlus(user?.postsGrowth)}</span>
                                <span className="stats__text">с предыдущей проверки</span>
                            </p>
                        </div>
                    </article>
                    <article className="stats__col stats__col_25">
                        <div className="stats__bg stats__bg_green">
                            <div className="stats__icon-wrap">
                                <img className="stats__icon" src={statsIcon4} alt="" />
                            </div>
                            <h3 className="stats__title">Реакции</h3>
                            <p className="stats__count">{user?.totalLikes}</p>
                            <p className="stats__bottom">
                                <span className="stats__plus">{user && withPlus(user?.likesGrowth)}</span>
                                <span className="stats__text">с предыдущей проверки</span>
                            </p>
                        </div>
                    </article>
                </div>

            </div>
        </div>
    )
})
