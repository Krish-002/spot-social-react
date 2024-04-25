import React from 'react';
import './Post.css'; // Import the Post.css file

interface PostProps {
    imageUrl: string;
    songImageUrl: string;
    songName: string;
    artistName: string;
    likes: string[];
}

const Post: React.FC<PostProps> = ({ imageUrl, songImageUrl, songName, artistName, likes }) => {
    console.log('my print', imageUrl, songImageUrl, songName, artistName, likes);
    return (
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="Post" />
            <div className="card-body">
                <button className="heart-button">
                    <i className="fas fa-heart"></i> {likes.length}
                </button>
                <div className="d-flex align-items-center">
                    <img src={songImageUrl} alt="Song" className="profile-image" />
                    <div>
                        <p className="profile-info">{songName}</p>
                        <p className="username-text">{artistName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
