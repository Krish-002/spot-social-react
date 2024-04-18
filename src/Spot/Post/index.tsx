import React from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import './index.css';

function PostScreen() {
    return (
        <div className="container-fluid text-center kb-fullscreen">
            <h1 className="my-4 kb-screen-header">POST</h1>
            <div className="d-flex flex-row justify-content-center align-items-center mb-4 kb-full-width">
                <div className="d-flex flex-column justify-content-center align-items-center kb-half-screen">
                    <button className="btn kb-button-large">
                        <FaPlus className="me-2" size={250}/>
                    </button>
                    <div className="btn kb-button-large-text">Choose a Picture</div>
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center kb-half-screen kb-input-group">
                    <input type="text" className="kb-search-bar form-control" placeholder="Search song" aria-label="Search song" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary kb-search-button" type="button">
                        <FaSearch />
                    </button>
                </div>
            </div>
            <button className="btn kb-post-button">Post</button>
        </div>
    );
}

export default PostScreen;
