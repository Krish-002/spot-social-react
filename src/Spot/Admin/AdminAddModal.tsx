import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as client from './client';
import './EditUserForm.css';

interface AdminAddModalProps {
    show: boolean;
    handleClose: () => void;
}

const AdminAddModal = ({ show, handleClose }: AdminAddModalProps) => {
    const [newAdmin, setNewAdmin] = useState({ firstName: '', lastName: '', username: '', password: '' });
    const [error, setError] = useState('');

    const handleSaveAdmin = async () => {
        try {
            await client.createAdmin(newAdmin);
            handleClose();
        } catch (err) {
            setError('Failed to create admin.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="kb-form-big-container">
            <Modal.Header closeButton className="kb-header-seperate">
                <Modal.Title className="kb-form-title">Add New Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body className="kb-form-container">
                <Form>
                    <Form.Group className="kb-form-group">
                        <Form.Label className="kb-form-label">First Name</Form.Label>
                        <Form.Control
                            className="kb-form-control"
                            type="text"
                            value={newAdmin.firstName}
                            onChange={(e) => setNewAdmin({ ...newAdmin, firstName: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="kb-form-group">
                        <Form.Label className="kb-form-label">Last Name</Form.Label>
                        <Form.Control
                            className="kb-form-control"
                            type="text"
                            value={newAdmin.lastName}
                            onChange={(e) => setNewAdmin({ ...newAdmin, lastName: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="kb-form-group">
                        <Form.Label className="kb-form-label">Username</Form.Label>
                        <Form.Control
                            className="kb-form-control"
                            type="text"
                            value={newAdmin.username}
                            onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="kb-form-group">
                        <Form.Label className="kb-form-label">Password</Form.Label>
                        <Form.Control
                            className="kb-form-control"
                            type="password"
                            value={newAdmin.password}
                            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                        />
                    </Form.Group>
                    {error && <div className="sp-admin-error">{error}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveAdmin}>Save Admin</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminAddModal;
