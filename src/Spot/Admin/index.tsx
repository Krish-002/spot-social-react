import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import * as client from './client';
import './Admin.css';
import EditUserForm from './EditUserForm';
import AdminAddModal from './AdminAddModal';
import User from '../Interfaces/User';

function AdminHomePage() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState({ firstName: '', lastName: '', username: '', password: '' });

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const adminId = '662a0f75c3dcf55281db8886';
                const adminData = await client.getAdminById(adminId);
                setCurrentAdmin(adminData);
            } catch (error) {
                console.error("Failed to fetch admin details:", error);
            }
        };

        fetchAdminDetails();
    }, []);

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
      console.error("Failed to delete ", error);
    }
  };

    return (
        <div>
            <h1>Hello Admin: {currentAdmin.firstName} {currentAdmin.lastName}</h1>
            <Button className="sp-admin-btn-primary" onClick={() => setShowAddAdminModal(true)}>Add New Admin</Button>
            <Form.Control
                type="text"
                className="kb-search-input"
                placeholder="Search user by username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
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
            <AdminAddModal show={showAddAdminModal} handleClose={() => setShowAddAdminModal(false)} />
        </div>
    );
}

export default AdminHomePage;
