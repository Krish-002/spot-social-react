import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import * as client from './client';
import './Admin.css';
import EditUserForm from './EditUserForm';
import User from '../Interfaces/User';
import GymSplit from '../Interfaces/GymSplit';
import MealPlan from '../Interfaces/MealPlan';
import GymStatistic from '../Interfaces/GymStatistic';
import PostData from '../Interfaces/PostData';


function AdminHomePage() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState<User | null>(null);

const handleUpdate = (user: User) => {
  setEditingUser(user);
};


    const handleSearch = async () => {
        try {
            const response = await client.getUsersByUsername(searchTerm);
            setUsers(response);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setUsers([]);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                handleSearch();
            } else {
                setUsers([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleDelete = async (userId: string) => {
        try {
            await client.deleteUser(userId);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div>
            <h1>Admin Home Page</h1>
            <Form.Control
                type="text"
                className="kb-search-input"
                placeholder="Search user by username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {editingUser && (
      <EditUserForm
        user={editingUser}
        onSave={(updatedUser) => {
          // Implement API call to save the user details
          console.log('Save user', updatedUser);
          setEditingUser(null);
        }}
        onCancel={() => setEditingUser(null)}
      />
    )}
            <Table className="kb-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>
                                <Button className="kb-update-btn" onClick={() => handleUpdate(user)}>Update</Button>
                                <Button className="kb-delete-btn" onClick={() => handleDelete(user._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminHomePage;
