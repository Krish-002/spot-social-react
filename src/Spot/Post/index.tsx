import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Store';
import axios from 'axios'; // Assuming axios for HTTP requests
import { FaPlus } from 'react-icons/fa';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import RedirectPage from './RedirectPage';
import Dashboard from './Dashboard';
import NotFoundPage from './NotFoundPage';
import * as client from './client';
import { clearSelectedTrack } from '../Reducers/tracks'; // Correct path is needed
import { setUser } from '../Reducers/authSlice'; // Correct path is needed

function PostScreen() {
    const dispatch = useDispatch();
    const sessionDataJson = localStorage.getItem('sessionData');
    const sessionData = sessionDataJson ? JSON.parse(sessionDataJson) : null;
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) {
        if (sessionData && sessionData.user) {
            console.log("Reauthenticating user", sessionData.user);
            dispatch(setUser(sessionData.user));  // Reauthenticate by setting the user in the global state
            localStorage.clear()// Clear the session data after reauthentication
        } else {
            console.log("Session data is missing");
        }
    }

    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const selectedTrack = useSelector((state: RootState) => state.tracks.selectedTrack);
    if (!user) {
        return <div>Please Log in</div>;
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImageFile(event.target.files[0]); // Store the file itself, not just the URL
        }
    };

    const handlePost = async () => {
        if (!selectedTrack || !selectedImageFile) {
            alert("Please select both a song and an image.");
            return;
        }

        const formData = new FormData();
        formData.append('postedBy', user._id);
        formData.append('image', selectedImageFile);
        formData.append('songImageUrl', selectedTrack.album.images[0].url);
        formData.append('songName', selectedTrack.name);
        formData.append('artistName', selectedTrack.artists.map(artist => artist.name).join(", "));

        try {
            const response = await client.createPost(formData);


            const updatedPosts = [...user.postIds, response._id]; // Directly add the new post ID
            const updatedUser = { ...user, postIds: updatedPosts }; // Spread the existing user and update the postIds field

            const userData = await client.updateUser(user._id, updatedUser);
            dispatch(setUser(updatedUser));
            console.log("msg", userData);
            setSelectedImageFile(null);
            dispatch(clearSelectedTrack());
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="container-fluid text-center kb-fullscreen">
            <h1 className="my-4 kb-screen-header">POST</h1>
            <div className="d-flex flex-row justify-content-center align-items-center mb-4 kb-full-width">
                <div className="d-flex flex-column justify-content-center align-items-center kb-half-screen">
                    {/* Display the selected image if available */}
                    {selectedImageFile && (
                        <img src={URL.createObjectURL(selectedImageFile)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '20px' }} />
                    )}
                    <label className="btn kb-button-large">
                        <FaPlus className="me-2" size={25} />
                        <input type="file" style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
                    </label>
                    <div className="btn kb-button-large-text">Choose a Picture</div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center kb-half-screen kb-input-group">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/redirect" element={<RedirectPage />} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route element={<NotFoundPage />} />
                    </Routes>
                </div>
            </div>
            <button className="btn kb-post-button" onClick={handlePost}>Post</button>
        </div>
    );
}

export default PostScreen;
