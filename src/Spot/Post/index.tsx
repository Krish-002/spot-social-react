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




function PostScreen() {
    const dispatch = useDispatch();
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const selectedTrack = useSelector((state: RootState) => state.tracks.selectedTrack);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImageFile(event.target.files[0]); // Store the file itself, not just the URL
        }
    };

    const [post, setPost] = useState({imageUrl: '', songImageUrl: '', songName: '', artistName: '', likes:[]});

    const handlePost = async () => {
        if (!selectedTrack || !selectedImageFile) {
            alert("Please select both a song and an image.");
            return;
        }

    

    // Prepare the post object first, before setting the state.
    const newPost = {
        imageUrl: URL.createObjectURL(selectedImageFile), // Note: This URL should not be sent to the server, it's only useful on the client-side
        songImageUrl: selectedTrack.album.images[0].url,
        songName: selectedTrack.name,
        artistName: selectedTrack.artists.map(artist => artist.name).join(", "),
        likes: []
    };

    setPost(newPost); // Update the state if needed for other reasons


        try {
            console.log(newPost);
            const response = await client.createPost(newPost);
            console.log(response.data);
            setSelectedImageFile(null); // Clear the selected image after posting
            setPost({imageUrl: '', songImageUrl: '', songName: '', artistName: '', likes:[]}); // Clear the post object
            dispatch(clearSelectedTrack()); // Clear the selected track in the Redux store

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
                        <Route path="/" element={<Home />}/>
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
