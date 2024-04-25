// LikedPost.tsx
import React from 'react';
import './Post.css';  // Ensure this CSS file is correctly linked
import PostData from '../Interfaces/PostData';

interface LikedPostProps {
    post: PostData;
    onDislike: (id: string) => void;  // Function to handle dislike action
}

const LikedPost: React.FC<LikedPostProps> = ({ post, onDislike }) => {
    return (
        <div className="card">
            <img src={post.imageUrl} className="card-img-top" alt="Post" />
            <div className="card-body">
                <div className="post-details">
                    <img src={post.songImageUrl} alt="Song" className="profile-image" />
                    <div>
                        <p className="profile-info">{post.songName}</p>
                        <p className="username-text">{post.artistName}</p>
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => onDislike(post._id)}>
                    Dislike
                </button>
            </div>
        </div>
    );
}

export default LikedPost;
