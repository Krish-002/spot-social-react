import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Post from './Post';
import PostData from '../Interfaces/PostData';
import * as client from './client';
import { useSelector } from 'react-redux';
import { RootState } from '../Store';
import LikedPost from './LikedPost';

interface LikedPostsModalProps {
    show: boolean;
    onHide: () => void;
}

const LikedPostsModal: React.FC<LikedPostsModalProps> = ({ show, onHide }) => {
    const [likedPosts, setLikedPosts] = useState<PostData[]>([]);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const fetchLikedPosts = async () => {
            if (user) {
                const posts = await client.findAllLikedPostsByUser(user._id);
                setLikedPosts(posts);
            }
        };

        if (show) {
            fetchLikedPosts();
        }
    }, [show, user]);

    const handleDislike = async (postId: string) => {
        if (user) {
            await client.dislikePost(postId, user._id);
            setLikedPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Liked Posts
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {likedPosts.map((post, index) => (
                    <LikedPost key={index} post={post} onDislike={handleDislike} />
                ))}
                {likedPosts.length === 0 && <p>No liked posts to display.</p>}
            </Modal.Body>
        </Modal>
    );
};

export default LikedPostsModal;