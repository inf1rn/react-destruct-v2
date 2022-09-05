import React, { useState } from 'react'
import { ITelegramChannel } from '../../../types/telegram'

import statsIcon1 from "../../../assets/img/svg/stats-icon-1.svg"
import statsIcon2 from "../../../assets/img/svg/stats-icon-2.svg"
import statsIcon3 from "../../../assets/img/svg/stats-icon-3.svg"
import statsIcon4 from "../../../assets/img/svg/stats-icon-4.svg"
import { subculturesPipes } from '../../../pipes/subculturesAndTags/subcultures'
import { tagsPipes } from '../../../pipes/subculturesAndTags/tags'
import { formatDate } from '../../../utils/date'
import { withPlus } from '../../../utils/numbers'

interface IProps {
    channel: ITelegramChannel
}

export const TelegramChannelInfo: React.FC<IProps> = React.memo(({ channel }) => {
    const [isFullDescription, setIsFullDescription] = useState<boolean>(false)

    return (

        <>
            <div className="stats">
                <article className="stats__col stats__col_25">
                    <div className="stats__bg">
                        <div className="stats__icon-wrap">
                            <img className="stats__icon" src={statsIcon1} alt="" />
                        </div>
                        <h3 className="stats__title">Подписчики</h3>
                        <p className="stats__count">{channel?.totalSubscribers}</p>
                        <p className="stats__bottom">
                            <span className="stats__plus">{channel && withPlus(channel?.subscribersGrowth)}</span>
                            <span className="stats__text">с предыдущей проверки <span className="stats__hide">{channel && formatDate(channel?.lastUpdate)}</span></span>
                        </p>
                    </div>
                </article>
                <article className="stats__col stats__col_25">
                    <div className="stats__bg stats__bg_purple">
                        <div className="stats__icon-wrap">
                            <img className="stats__icon" src={statsIcon2} alt="" />
                        </div>
                        <h3 className="stats__title">Публикации</h3>
                        <p className="stats__count">{channel?.totalPosts}</p>
                        <p className="stats__bottom">
                            <span className="stats__plus">{channel && withPlus(channel.postsGrowth)}</span>
                            <span className="stats__text">с предыдущей проверки <span className="stats__hide">{channel && formatDate(channel?.lastUpdate)}</span></span>
                        </p>
                    </div>
                </article>
                <article className="stats__col stats__col_25">
                    <div className="stats__bg stats__bg_orange">
                        <div className="stats__icon-wrap">
                            <img className="stats__icon" src={statsIcon3} alt="" />
                        </div>
                        <h3 className="stats__title">Просмотры публикаций</h3>
                        <p className="stats__count">{channel?.totalViews}</p>
                        <p className="stats__bottom">
                            <span className="stats__plus">{channel && withPlus(channel.viewsGrowth)}</span>
                            <span className="stats__text">с предыдущей проверки <span className="stats__hide">{channel && formatDate(channel?.lastUpdate)}</span></span>
                        </p>
                    </div>
                </article>
                <article className="stats__col stats__col_25">
                    <div className="stats__bg stats__bg_green">
                        <div className="stats__icon-wrap">
                            <img className="stats__icon" src={statsIcon4} alt="" />
                        </div>
                        <h3 className="stats__title">Реакции</h3>
                        <p className="stats__count">{channel?.totalReactions}</p>
                        <p className="stats__bottom">
                            <span className="stats__plus">{channel && withPlus(channel.reactionsGrowth)}</span>
                            <span className="stats__text">с предыдущей проверки <span className="stats__hide">{channel && formatDate(channel?.lastUpdate)}</span></span>
                        </p>
                    </div>
                </article>
            </div>

            <div className="stats-block">

                <div className="stats-block__col">
                    <div className="stats-block__bg">
                        <article className="user-desc">
                            <h3 className="user-desc__title">Описание</h3>
                            <div className="user-desc__content">
                                <p className="user-desc__text">{isFullDescription || channel.description.length < 30 ? channel?.description : channel?.description.slice(0, 30)}</p>
                                {channel.description.length < 30 && isFullDescription && <a onClick={() => setIsFullDescription(true)} className="user-desc__more" href="#">Читать далее</a>}
                            </div>
                        </article>
                    </div>
                </div>

                <div className="stats-block__col">
                    <div className="stats-block__bg">
                        <div className="user-chars user-chars_small">
                            <div className="user-chars__row">
                                <div className="user-chars__cell">
                                    <p className="user-chars__title">Субкультуры</p>
                                </div>
                                <div className="user-chars__cell">
                                    <p className="user-chars__text">{channel && subculturesPipes.names(channel.tags).join(", ")}</p>
                                </div>
                            </div>
                            <div className="user-chars__row">
                                <div className="user-chars__cell">
                                    <p className="user-chars__title">Теги</p>
                                </div>
                                <div className="user-chars__cell">
                                    <p className="user-chars__text">{channel && tagsPipes.names(channel.tags).join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
})
