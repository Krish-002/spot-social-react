import React from 'react';
import './Post.css';
import PostData from '../Interfaces/PostData';
import { FaHeart } from 'react-icons/fa'; // Ensure this is imported

interface PostProps {
    post: PostData;
    onDelete: (id: string) => void; // Function to handle deletion
}

const Post: React.FC<PostProps> = ({ post, onDelete }) => {
    return (
        <div className="card">
            <img src={post.imageUrl} className="card-img-top" alt="Post" />
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <button className="heart-button red-heart"> {/* Adding the red-heart class */}
                        <FaHeart /> {post.likes.length}
                    </button>
                    <button className="btn btn-danger" onClick={() => onDelete(post._id)}>Delete</button>
                </div>
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
