import React, { useState } from 'react'
import { IVkGroup } from '../../../types/vk'
import statsIcon1 from "../../../assets/img/svg/stats-icon-1.svg"
import statsIcon2 from "../../../assets/img/svg/stats-icon-2.svg"
import statsIcon3 from "../../../assets/img/svg/stats-icon-3.svg"
import { tagsPipes } from '../../../pipes/subculturesAndTags/tags'
import { subculturesPipes } from '../../../pipes/subculturesAndTags/subcultures'
import { withPlus } from '../../../utils/numbers'
import { formatDate } from '../../../utils/date'

interface IProps {
    group: IVkGroup
}

export const VkGroupInfo: React.FC<IProps> = React.memo(({ group }) => {
    const [isFullDescription, setIsFullDescription] = useState<boolean>(false)

    return (
        <>
            <div className="stats">
                <article className="stats__col">
                    <div className="stats__bg">
                        <div className="stats__icon-wrap">
                            <img className="stats__icon" src={statsIcon1} alt="" />
                        </div>
                        <h3 className="stats__title">Подписчики</h3>
                        <p className="stats__count">{group?.membersCount}</p>
                        <p className="stats__bottom">
                            <span className="stats__plus">{group && withPlus(group?.membersGrowth)}</span>
                            <span className="stats__text">с предыдущей проверки <span className="stats__hide-tablet">{group && formatDate(group.lastUpdate)}</span></span>
                        </p>
                    </div>
                </article>
                <article className="stats__col">
                    <div className="stats__bg stats__bg_purple">
                        <div className="stats__icon-wrap">
                            <img className="stats__icon" src={statsIcon2} alt="" />
                        </div>
                        <h3 className="stats__title">Публикации</h3>
                        <p className="stats__count">{group?.totalPosts}</p>
                        <p className="stats__bottom">
                            <span className="stats__plus">{group && withPlus(group?.postsGrowth)}</span>
                            <span className="stats__text">с предыдущей проверки <span className="stats__hide-tablet">{group && formatDate(group.lastUpdate)}</span></span>
                        </p>
                    </div>
                </article>
                <article className="stats__col">
                    <div className="stats__bg stats__bg_orange">
                        <div className="stats__icon-wrap">
                            <img className="stats__icon" src={statsIcon3} alt="" />
                        </div>
                        <h3 className="stats__title">Просмотры публикаций</h3>
                        <p className="stats__count">{group?.totalViews}</p>
                        <p className="stats__bottom">
                            <span className="stats__plus">{group && withPlus(group?.viewsGrowth)}</span>
                            <span className="stats__text">с предыдущей проверки <span className="stats__hide-tablet">{group && formatDate(group.lastUpdate)}</span></span>
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
                                <p className="user-desc__text">{isFullDescription || group.description.length < 30 ? group?.description : group?.description.slice(0, 30)}</p>
                                {group.description.length < 30 && isFullDescription && <a onClick={() => setIsFullDescription(true)} className="user-desc__more" href="#">Читать далее</a>}
                            </div>
                        </article>
                    </div>
                </div>

                <div className="stats-block__col">
                    <div className="stats-block__bg">
                        <div className="user-chars user-chars_small">
                            <div className="user-chars__row">
                                <div className="user-chars__cell">
                                    <p className="user-chars__title">Админы</p>
                                </div>
                                <div className="user-chars__cell">
                                    <p className="user-chars__text">{group?.contacts}</p>
                                </div>
                            </div>
                            <div className="user-chars__row">
                                <div className="user-chars__cell">
                                    <p className="user-chars__title">Субкультуры</p>
                                </div>
                                <div className="user-chars__cell">
                                    <p className="user-chars__text">{group && subculturesPipes.names(group.tags).join(", ")}</p>
                                </div>
                            </div>
                            <div className="user-chars__row">
                                <div className="user-chars__cell">
                                    <p className="user-chars__title">Теги</p>
                                </div>
                                <div className="user-chars__cell">
                                    <p className="user-chars__text">{group && tagsPipes.names(group.tags).join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})
