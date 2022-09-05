import React from 'react'
import { tiktokBaseUrl, tiktokPostsStorage } from '../../../constants/api'
import { ITiktokPost, ITiktokUser } from '../../../types/tiktok'
import { formatDate } from '../../../utils/date'

interface IProps {
    post: ITiktokPost
}

export const TiktokCardPost: React.FC<IProps> = React.memo(({ post }) => {
    return (
        <div className="tiktok__item">
            <div className="tiktok__bg">
                <span className="post-date">{formatDate(post.createTime)}</span>
                <a className="video" style={{ backgroundImage: `url(${tiktokPostsStorage + post.imgUrl})` }} href={tiktokBaseUrl + "/@" + post?.user?.id + "/video/" + post.postId}></a>
                <ul className="tiktok__tags">
                    {post.hashtags.map((hashtag) => <li key={hashtag.id} className="tiktok__tag">{hashtag.name}</li>)}
                </ul>
                <p className="tiktok__text">{post.description}</p>
                <div className="posts__bottom">
                    <div className="post-stats">
                        <div className="post-stats__col">
                            <span className="post-stats__icon post-stats__icon_4">{post.totalLikes}</span>
                        </div>
                        <div className="post-stats__col">
                            <span className="post-stats__icon post-stats__icon_5">{post.totalComments}</span>
                        </div>
                        <div className="post-stats__col">
                            <span className="post-stats__icon post-stats__icon_6">{post.totalShare}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
