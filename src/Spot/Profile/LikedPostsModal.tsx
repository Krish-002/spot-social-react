import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './LikedPostsModal.css';  // Ensure this CSS file is correctly linked and includes the new styles
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
        <Modal show={show} onHide={onHide} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Liked Posts
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {likedPosts.length > 0 ? (
                    <div className="sp-modal-body">  {/* Grid layout will apply here */}
                        {likedPosts.map((post, index) => (
                            <LikedPost key={index} post={post} onDislike={handleDislike} />
                        ))}
                    </div>
                ) : (
                    <p>No liked posts to display.</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default LikedPostsModal;
