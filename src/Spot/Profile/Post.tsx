import React from 'react';
import './Post.css';
import PostData from '../Interfaces/PostData';

interface PostProps {
    post: PostData;
    onDelete: (id: string) => void;  // Assuming you'll pass a function to handle deletion
}

const Post: React.FC<PostProps> = ({ post, onDelete }) => {
    return (
        <div className="card">
            <img src={post.imageUrl} className="card-img-top" alt="Post" />
            <div className="card-body">
                <button className="heart-button">
                    <i className="fas fa-heart"></i> {post.likes.length}
                </button>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <img src={post.songImageUrl} alt="Song" className="profile-image" />
                        <div>
                            <p className="profile-info">{post.songName}</p>
                            <div className="d-flex align-items-center">
                                <p className="username-text">{post.artistName}</p>
                                <button className="btn btn-danger" onClick={() => onDelete(post._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
