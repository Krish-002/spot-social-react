import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { getAllPosts, getUsersById } from './client'; // Ensure getUsersById is correctly imported
import './PostView.css';
import Post from '../Interfaces/PostData';
import User from '../Interfaces/User';
import * as client from './client';
import { useSelector } from 'react-redux';
import { RootState } from '../Store';


export default function PostView() {
    interface UserMap {
        [key: string]: User | null;
    }
    interface LikeCounts {
        [key: string]: number;
    }
    

    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<UserMap>({}); // Use UserMap here to allow null values
    const [likeCounts, setLikeCounts] = useState<LikeCounts>({});

    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLike = async (postId: string) => {
        if (user) {
            try {
                await client.likePost(postId, user._id);
                // Increment like count in the state
                setLikeCounts((prevCounts: LikeCounts) => ({
                    ...prevCounts,
                    [postId]: (prevCounts[postId] || 0) + 1
                }));
            } catch (error: any) {
                alert(`Error liking post: ${error.message}`);
            }
        } else {
            alert("User is not logged in");
        }
    };




    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postResponse = await client.getAllPosts();
                setPosts(postResponse.data);
                const initialLikeCounts = postResponse.data.reduce((acc: any, post: Post) => {
                    acc[post._id] = post.likes.length; // Assuming 'likes' is an array
                    return acc;
                }, {});
                setLikeCounts(initialLikeCounts);


                // After setting posts, fetch user details for each post
                const userIds = postResponse.data.map((post: Post) => post.postedBy);
                const uniqueUserIds = userIds.filter((id: string, index: number, array: string[]) => array.indexOf(id) === index);
                const usersMap: UserMap = {}; // Define usersMap with explicit type
                for (const userId of uniqueUserIds) {
                    try {
                        const userData = await client.getUsersById(userId);
                        console.log(`Fetched user with ID ${userId}:`, userData);
                        usersMap[userId] = userData; // Safely assign userData to usersMap
                    } catch (error) {
                        console.error(`Failed to fetch user with ID ${userId}:`, error);
                        usersMap[userId] = null; // Handle error by assigning null
                    }
                }
                setUsers(usersMap);
            } catch (error) {
                console.error("Error fetching posts or users:", error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        console.log('Users:', users);
    }
        , [users]);

    return (
        <div className="post-view-container">
            <div className="post-list">
                {posts.map(post => (
                    <Card key={post._id} className="post-card">
                        <Card.Body
                            className='card-body kb-card-body-top d-flex align-items-center'
                            onClick={() => navigate(`/Spot/Profile/${post.postedBy}`)} // Navigate to user's profile
                            style={{ cursor: 'pointer' }} // Make it appear clickable
                        >
                            <Image
                                src={users[post.postedBy]?.profilePictureUrl || 'default-profile.png'}
                                roundedCircle
                                className="profile-image"
                            />
                            <div className='user-info-container'>
                                <div className="profile-info">{users[post.postedBy]?.username}</div>
                                <div className="username-text">{users[post.postedBy]?.firstName} {users[post.postedBy]?.lastName}</div>
                            </div>
                        </Card.Body>


                        <Card.Img className="kb-card-img-top card-img-top-feed" variant="top" src={post.imageUrl} />
                        <Card.Body className='card-body'>
                            <Button onClick={() => handleLike(post._id)} variant="link" className="text-danger">
                                <FaHeart /> {likeCounts[post._id] || 0}
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
