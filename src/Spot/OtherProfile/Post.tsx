import React from 'react';
import PostData from '../Interfaces/PostData';

interface PostProps {
    post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <div className="card sp-card">
            <img src={post.imageUrl} className="card-img-top" alt="Post" />
            <div className="card-body">
                <button className="heart-button">
                    <i className="fas fa-heart"></i> {post.likes.length}
                </button>
                <div className="d-flex align-items-center">
                    <img src={post.songImageUrl} alt="Song" className="profile-image" />
                    <div>
                        <p className="profile-info">{post.songName}</p>
                        <p className="username-text">{post.artistName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
