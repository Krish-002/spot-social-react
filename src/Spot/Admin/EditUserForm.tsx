import { useState, ChangeEvent } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './EditUserForm.css';
import * as client from './client';
import User from '../Interfaces/User';
import GymSplit from '../Interfaces/GymSplit';
import MealPlan from '../Interfaces/MealPlan';
import GymStatistic from '../Interfaces/GymStatistic';
import PostData from '../Interfaces/PostData';

interface Props {
    user: User;
    onSave: (user: User) => void;
    onCancel: () => void;
}

const EditUserForm: React.FC<Props> = ({ user, onSave, onCancel }) => {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
        setEditedUser({ ...editedUser, [field]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedUser);
    };

    return (
        <Modal show onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title className='kb-form-title'>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="kb-form-group">
                        <Form.Label className='kb-form-label'>First Name</Form.Label>
                        <Form.Control
                            className="kb-form-control"
                            type="text"
                            placeholder="Enter first name"
                            value={editedUser.firstName}
                            onChange={(e) => handleChange(e, 'firstName')}
                        />
                    </Form.Group>
                    <Form.Group className="kb-form-group">
                        <Form.Label className='kb-form-label'>Last Name</Form.Label>
                        <Form.Control
                            className="kb-form-control"
                            type="text"
                            placeholder="Enter last name"
                            value={editedUser.lastName}
                            onChange={(e) => handleChange(e, 'lastName')}
                        />
                    </Form.Group>
                    <Form.Group className="kb-form-group">
                        <Form.Label className='kb-form-label'>Username</Form.Label>
                        <Form.Control
                            className="kb-form-control"
                            type="text"
                            placeholder="Enter username"
                            value={editedUser.username}
                            onChange={(e) => handleChange(e, 'username')}
                        />
                    </Form.Group>
                    <Form.Group className="kb-form-group">
                        <Form.Label className='kb-form-label'>Password</Form.Label>
                        <Form.Control
                            className="kb-form-control"
                            type="text"
                            placeholder="Enter password"
                            value={editedUser.password}
                            onChange={(e) => handleChange(e, 'password')}
                        />
                    </Form.Group>

                    <Form.Group className="kb-form-group">
                        <Form.Label className='kb-form-label'>Profile Picture URL</Form.Label>
                        <Form.Control
                            className="kb-form-control"
                            type="text"
                            placeholder="Enter profile picture URL"
                            value={editedUser.profilePictureUrl}
                            onChange={(e) => handleChange(e, 'profilePictureUrl')}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditUserForm;
