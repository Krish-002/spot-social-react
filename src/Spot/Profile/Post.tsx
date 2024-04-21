import React from 'react';

interface PostProps {
    imageUrl: string;
    songImageUrl: string;
    songName: string;
    artistName: string;
    likes: string[];
}

const Post: React.FC<PostProps> = ({ imageUrl, songImageUrl, songName, artistName, likes }) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img src={imageUrl} className="card-img-top" alt="Post" />
            <div className="card-body">
                <div className="card-title">
                    <i className="fas fa-heart"></i> {likes.length}
                </div>
                <div className="d-flex align-items-center">
                    <img src={songImageUrl} alt="Song" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <div>
                        <p className="m-0">{songName}</p>
                        <p className="card-text"><small>{artistName}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
