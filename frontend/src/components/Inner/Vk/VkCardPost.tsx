import React, { useEffect, useState } from 'react'
import { IVkPost } from '../../../types/vk'
import { formatDate } from '../../../utils/date'

interface IProps {
    post: IVkPost
}

export const VkCardPost: React.FC<IProps> = React.memo(({ post }) => {
    const [isFullDescription, setIsFullDescription] = useState<boolean>(false)
    const [photosLength, setPhotosLength] = useState<number>(3)

    return (
        <div className="posts__item">
            <div className="posts__bg">
                <span className="post-date">{formatDate(post.createTime)}</span>
                <div className="posts__content">
                    <p className="posts__text">{isFullDescription || post.body.length < 30 ? post?.body : post?.body.slice(0, 30)}</p>
                    {post.body.length < 30 && isFullDescription && <a onClick={() => setIsFullDescription(true)} className="posts__more" href="#">Читать далее</a>}
                </div>
                {!!post.photos.length && <div className="post-gal">
                    <div className="post-gal__list">
                        {
                            post.photos.slice(0, photosLength).map((photo, index) => (
                                <div key={index} className="post-gal__item">
                                    <a className="post-gal__link" href="#">
                                        <img className="post-gal__image" src={photo} alt="" />
                                    </a>
                                </div>
                            ))
                        }
                        {
                            post.photos.length > 3 && photosLength == 3 && <div onClick={(e) => {
                                setPhotosLength(post.photos.length)
                                e.preventDefault()
                            }} className="post-gal__item">
                                <a className="post-gal__link" href="#">
                                    <img className="post-gal__image" src="img/post-image-3.jpg" alt="" />
                                    <div className="post-gal__more">
                                        <span className="post-gal__count">+{post.photos.length - 3}</span>
                                    </div>
                                </a>
                            </div>
                        }
                    </div>
                </div>
                }
                <div className="posts__bottom">
                    <div className="post-stats">
                        <div className="post-stats__col">
                            <span className="post-stats__icon post-stats__icon_1">{post.totalLikes}</span>
                        </div>
                        <div className="post-stats__col">
                            <span className="post-stats__icon post-stats__icon_2">{post.totalComments}</span>
                        </div>
                        <div className="post-stats__col">
                            <span className="post-stats__icon post-stats__icon_3">{post.totalViews}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
