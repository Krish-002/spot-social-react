import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form, Modal, ListGroup } from 'react-bootstrap';
import './ProfileSettings.css';
import * as client from './client';
import GymSplitForm from '../Admin/GymSplitForm';
import User from '../Interfaces/User';
import GymSplit from '../Interfaces/GymSplit';
import MealPlan from '../Interfaces/MealPlan';
import GymStatistic from '../Interfaces/GymStatistic';

interface Props {
    user: User;
    onSave: (user: User) => void;
    onCancel: () => void;
}

const ProfileSettings: React.FC<Props> = ({ user, onSave, onCancel }) => {
    const [gymSplits, setGymSplits] = useState<GymSplit[]>([]);
    const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
    const [gymStatistics, setGymStatistics] = useState<GymStatistic[]>([]);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);



    useEffect(() => {
        const fetchGymSplits = async () => {
            const fetchedGymSplits: GymSplit[] = [];
            for (const id of user.gymSplitIds) {
                const gymSplit = await client.getGymSplitsById(id);
                fetchedGymSplits.push(gymSplit);
            }
            setGymSplits(fetchedGymSplits);
        };


        fetchGymSplits();
    }, [user.gymSplitIds]);

    useEffect(() => {
        const fetchMealPlan = async () => {
            const fetchedMealPlan: MealPlan[] = [];
            for (const id of user.mealPlanIds) {
                const mealPlan = await client.getMealPlanById(id);
                fetchedMealPlan.push(mealPlan);
            }
            setMealPlans(fetchedMealPlan);
        };
        fetchMealPlan();

    }, [user.mealPlanIds]);

    useEffect(() => {
        const fetchGymStatistics = async () => {
            const fetchedGymStatistics: GymStatistic[] = [];
            for (const id of user.gymStatisticIds) {
                const gymStatistic = await client.getGymStatisticsById(id);
                fetchedGymStatistics.push(gymStatistic);
            }
            setGymStatistics(fetchedGymStatistics);
        };
        fetchGymStatistics();
    }, [user.gymStatisticIds]);

    const handleGymSplitRemove = (updatedGymSplits: GymSplit[]) => {
        setGymSplits(updatedGymSplits);
        setEditedUser({
            ...editedUser,
            gymSplitIds: updatedGymSplits.map(split => split._id)
        });
    };


    const handleMealPlanChange = (index: number, field: keyof MealPlan, value: string) => {
        const updatedMealPlans = mealPlans.map((mealPlan, i) => {
            if (i === index) {
                return { ...mealPlan, [field]: value };
            }
            return mealPlan;
        });
        setMealPlans(updatedMealPlans);
    };

    const handleGymStatisticChange = (index: number, field: keyof GymStatistic, value: string) => {
        const updatedGymStatistics = gymStatistics.map((gymStatistic, i) => {
            if (i === index) {
                return { ...gymStatistic, [field]: value };
            }
            return gymStatistic;
        });
        setGymStatistics(updatedGymStatistics);
    }

    const handleGymSplitAdd = async () => {
        const newGymSplit = { dayOfWeek: 'Sunday', musclesTrained: ["Abs"] };
        try {
            const createdGymSplit = await client.createGymSplit(newGymSplit);
            setGymSplits([...gymSplits, createdGymSplit]);
            setEditedUser({ ...editedUser, gymSplitIds: [...editedUser.gymSplitIds, createdGymSplit._id] });
        } catch (error) {
            console.error("Failed to create gym split:", error);
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const addMealPlan = async () => {
        const newMealPlan = { name: 'Default Name', link: 'Default Link', calories: 0 };
        try {
            const createdMealPlan = await client.createMealPlan(newMealPlan);  // Now awaited
            setMealPlans([...mealPlans, createdMealPlan]);  // Assuming you want to use the returned object
            setEditedUser({ ...editedUser, mealPlanIds: [...editedUser.mealPlanIds, createdMealPlan._id] });
        } catch (error) {
            console.error("Failed to create meal plan:", error);
        }
    }

    const deleteMealPlan = (index: number) => {
        const updatedMealPlans = mealPlans.filter((_, i) => i !== index);
        setMealPlans(updatedMealPlans);
        setEditedUser({ ...editedUser, mealPlanIds: updatedMealPlans.map(mealPlan => mealPlan._id) });

    }

    const addGymStatistic = async () => {
        // Define the new gym statistic object
        const newGymStat = {
            exercise: 'Default Exercise',  // Replace 'Default Exercise' with user input if applicable
            weight: 0,  // Set a valid default weight
            unit: 'kg'
        };

        try {
            // Create the new gym statistic in the backend and receive the created object
            const createdGymStat = await client.createGymStats(newGymStat);

            // Add the newly created gym statistic to the gymStatistics array in the state
            setGymStatistics([...gymStatistics, createdGymStat]);
            setEditedUser({ ...editedUser, gymStatisticIds: [...editedUser.gymStatisticIds, createdGymStat._id] });

        } catch (error) {
            console.error("Failed to create gym statistic:", error);
            // Optionally handle the error, e.g., by showing an error message to the user
        }
    }


    const deleteGymStatistic = (index: number) => {
        const updatedGymStatistics = gymStatistics.filter((_, i) => i !== index);
        setGymStatistics(updatedGymStatistics);
        setEditedUser({ ...editedUser, gymStatisticIds: updatedGymStatistics.map(gymStatistic => gymStatistic._id) });
    }

    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
        setEditedUser({ ...editedUser, [field]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedImage) {            
            const userId = user._id;
            // Upload the image first and then get the URL to save with the user profile
            const imageUrl = await client.uploadImage(userId, selectedImage);
            setEditedUser({ ...editedUser, profilePictureUrl: imageUrl });
            editedUser.profilePictureUrl = imageUrl;
        }

        try {
            // Update Gym Splits
            for (const gymSplit of gymSplits) {
                await client.updateGymSplit(gymSplit._id, gymSplit);
            }

            // Update Meal Plans
            for (const mealPlan of mealPlans) {
                await client.updateMealPlan(mealPlan._id, mealPlan);
            }

            // Update Gym Statistics
            for (const gymStatistic of gymStatistics) {
                await client.updateGymStats(gymStatistic._id, gymStatistic);
            }

            // Update User
            console.log('editedUser:', editedUser);
            await client.updateUser(editedUser._id, editedUser);
            onSave(editedUser); // This will close the form and optionally refresh the user list
            alert('User and related data updated successfully!');
        } catch (error) {
            console.error("Failed to update user and related data:", error);
            alert('Failed to update data.');
        }
    };
    


    return (
        <Modal className='kb-form-big-container' show onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title className='kb-form-title'>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='kb-form-container' onSubmit={handleSubmit}>
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
                        <Form.Label className='kb-form-label'>Profile Picture</Form.Label>
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            {selectedImage && (
                                <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: '100%', maxHeight: '300px', marginTop: '20px' }} />
                            )}
                        </div>
                    </Form.Group>
                    <h2 className='kb-header-seperate'>Gym Splits</h2>
                    <GymSplitForm gymSplits={gymSplits} setGymSplits={setGymSplits} onRemoveGymSplit={handleGymSplitRemove}
                        onCreateGymSplit={handleGymSplitAdd} />
                    <h2 className='kb-header-seperate'>Meal Plans</h2>
                    <ListGroup variant="flush">
                        {mealPlans.map((mealPlan, index) => (
                            <ListGroup.Item key={index}>
                                <Form.Group className="mb-3" controlId={`mealPlan-${index}`}>
                                    <div className='kb-form-div'>
                                        <Form.Label className='kb-form-label'>Meal Plan Name</Form.Label>
                                        <Form.Control
                                            className="kb-form-control"

                                            type="text"
                                            value={mealPlan.name}
                                            onChange={(e) => handleMealPlanChange(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className='kb-form-div'>
                                        <Form.Label className='kb-form-label'>Meal Plan Link</Form.Label>
                                        <Form.Control
                                            className="kb-form-control"
                                            type="text"
                                            value={mealPlan.link}
                                            onChange={(e) => handleMealPlanChange(index, 'link', e.target.value)}
                                        />
                                    </div>
                                    <div className='kb-form-div'>
                                        <Form.Label className='kb-form-label'>Calories</Form.Label>
                                        <Form.Control
                                            className="kb-form-control"

                                            type="number"
                                            value={mealPlan.calories}
                                            onChange={(e) => handleMealPlanChange(index, 'calories', e.target.value)}
                                        />
                                    </div>
                                    <Button variant="danger" onClick={() => deleteMealPlan(index)}>Delete</Button>

                                </Form.Group>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Button variant="primary" onClick={addMealPlan}>Add Meal Plan</Button>
                    <h2 className='kb-header-seperate'>Gym Statistics</h2>
                    <ListGroup variant="flush">
                        {gymStatistics.map((gymStatistic, index) => (
                            <ListGroup.Item key={index}>
                                <Form.Group className="mb-3" controlId={`gymStatistic-${index}`}>
                                    <div className='kb-form-div'>
                                        <Form.Label className='kb-form-label'>Gym Stat</Form.Label>
                                        <Form.Control
                                            className="kb-form-control"

                                            type="text"
                                            value={gymStatistic.exercise}
                                            onChange={(e) => handleGymStatisticChange(index, 'exercise', e.target.value)} />
                                    </div>
                                    <div className='kb-form-div'>
                                        <Form.Label className='kb-form-label'>Weight</Form.Label>
                                        <Form.Control
                                            className="kb-form-control"

                                            type="number"
                                            value={gymStatistic.weight}
                                            onChange={(e) => handleGymStatisticChange(index, 'weight', e.target.value)}
                                        />
                                    </div>
                                    <div className='kb-form-div'>
                                        <Form.Label className='kb-form-label'>Unit</Form.Label>
                                        <Form.Control
                                            className="kb-form-control"
                                            type="text"
                                            value={gymStatistic.unit}
                                            onChange={(e) => handleGymStatisticChange(index, 'unit', e.target.value)} />
                                    </div>
                                    <Button variant="danger" onClick={() => deleteGymStatistic(index)}>Delete</Button>
                                    <br />
                                </Form.Group>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Button variant="primary" onClick={addGymStatistic}>Add Gym Stat</Button>
                    <br />
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

export default ProfileSettings;
