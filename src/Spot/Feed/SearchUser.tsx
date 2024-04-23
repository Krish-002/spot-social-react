import React, { useState, useEffect } from 'react';
import { ListGroup, Image } from 'react-bootstrap';
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

    const handleSearch = async () => {
        if (username.trim()) {  // Check if the username input is not just empty spaces
            try {
                const response = await client.getUsersByUsername(username);
                console.log("Users:", response);
                setUsers(response || []); // Ensure that response.data is used, assuming the API call is correct
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setUsers([]);
            }
        } else {
            setUsers([]); // Clear users when the input is empty
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch();
        }, 500); // Debounce the search request
        return () => clearTimeout(timeoutId);
    }, [username]); // Trigger the effect when 'username' changes

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
                            <ListGroup.Item key={user._id} className="d-flex align-items-center">
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
