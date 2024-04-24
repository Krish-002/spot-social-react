import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { getAllPosts } from './client';
import './PostView.css'; // Import the CSS styles

interface Post {
    _id: string;
    imageUrl: string;
    likes: string[];
    songImageUrl: string;
    songName: string;
    artistName: string;
}

export default function PostView() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts();
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="post-view-container">
            <div className="post-list">
                {posts.map(post => (
                    <Card key={post._id} className="post-card">
                        <Card.Img className="card-img-top-feed" variant="top" src={post.imageUrl} />
                        <Card.Body className='card-body'>
                            <Button variant="link" className="text-danger">
                                <FaHeart /> {post.likes.length}
                            </Button>
                            <div className="d-flex align-items-center">
                                <Image
                                    src={post.songImageUrl}
                                    rounded
                                    className="profile-image"
                                />
                                <div>
                                    <div className="profile-info">{post.songName}</div>
                                    <div className="username-text">{post.artistName}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
