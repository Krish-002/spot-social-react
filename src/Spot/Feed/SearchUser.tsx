import React, { useState, useEffect } from 'react';
import { ListGroup, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import * as client from './client';
import './SearchUser.css'; // Import the CSS styles

interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePictureUrl?: string;
}

const SearchUser = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate(); // Create a navigate function using the useNavigate hook

    const handleSearch = async () => {
        if (username.trim()) {
            try {
                const response = await client.getUsersByUsername(username);
                console.log("Users:", response);
                setUsers(response || []);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setUsers([]);
            }
        } else {
            setUsers([]);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch();
        }, 500); // Debounce the search request
        return () => clearTimeout(timeoutId);
    }, [username]);

    return (
        <div className="search-container">
            <input
                type="text"
                className="form-control"
                placeholder="Search user by name..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {username && (
                <ListGroup className="list-group-search mt-3">
                    {users.length > 0 ? (
                        users.map(user => (
                            <ListGroup.Item key={user._id} className="d-flex align-items-center" onClick={() => navigate(`/Spot/Profile/${user._id}`)} style={{ cursor: 'pointer' }}>
                                <Image
                                    src={user.profilePictureUrl || "https://via.placeholder.com/60"}
                                    roundedCircle
                                    className="profile-image"
                                    alt="Profile"
                                />
                                <div>
                                    <div className="profile-info-search">{user.firstName} {user.lastName}</div>
                                    <div className="username-text">{user.username}</div>
                                </div>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>No users found</ListGroup.Item>
                    )}
                </ListGroup>
            )}
        </div>
    );
};

export default SearchUser;
