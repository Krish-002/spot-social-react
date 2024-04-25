import { ChangeEvent } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select, { MultiValue, StylesConfig } from 'react-select';
import GymSplit from '../Interfaces/GymSplit';

interface Props {
    gymSplits: GymSplit[];
    setGymSplits: (splits: GymSplit[]) => void;
    onRemoveGymSplit: (updatedGymSplits: GymSplit[]) => void;  // New prop
    onCreateGymSplit: () => void;  // Ensure this prop is included

}

const GymSplitForm: React.FC<Props> = ({ gymSplits, setGymSplits, onRemoveGymSplit, onCreateGymSplit }) => {
    const handleDayOfWeekChange = (index: number, day: string) => {
        const updatedSplits = [...gymSplits];
        updatedSplits[index].dayOfWeek = day;
        setGymSplits(updatedSplits);
    };

    const handleMusclesChange = (index: number, selectedOptions: MultiValue<{ value: string; label: string }>) => {
        const updatedSplits = [...gymSplits];
        updatedSplits[index].musclesTrained = selectedOptions.map(option => option.value);
        setGymSplits(updatedSplits);
    };

    const addGymSplit = () => {
        onCreateGymSplit();
        };

    const removeGymSplit = (index: number) => {
        const updatedSplits = [...gymSplits];
        updatedSplits.splice(index, 1);
        setGymSplits(updatedSplits);
        onRemoveGymSplit(updatedSplits);  // Call the callback with updated splits
    };

    const muscleOptions = [
        { value: 'Chest', label: 'Chest' },
        { value: 'Back', label: 'Back' },
        { value: 'Legs', label: 'Legs' },
        { value: 'Glutes', label: 'Glutes'},
        { value: 'Hamstrings', label: 'Hamstrings' },
        { value: 'Quads', label: 'Quads' },
        { value: 'Calves', label: 'Calves'},
        { value: 'Forearms', label: 'Forearms'},
        { value: 'Arms', label: 'Arms' },
        { value: 'Biceps', label: 'Biceps' },
        { value: 'Triceps', label: 'Triceps' },
        { value: 'Shoulders', label: 'Shoulders' },
        { value: 'Abs', label: 'Abs' },
        { value: 'Core', label: 'Core' },
        { value: 'Cardio', label: 'Cardio'},
        { value: 'Rest', label: 'Rest' }
    ];

    const dayOfWeekOptions = [
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' }
    ];

    return (
        <div>
            {gymSplits.map((split, index) => (
                <Form.Group as={Row} key={index} className="mb-3">
                    <Col sm={3}>
                        <Form.Label>Day</Form.Label>
                        <Select className='kb-dropdown'
                            options={dayOfWeekOptions}
                            value={dayOfWeekOptions.find(option => option.value === split.dayOfWeek)}
                            onChange={(selectedOption) => handleDayOfWeekChange(index, selectedOption ? selectedOption.value : '')}
                        />
                    </Col>
                    <Col sm={8}>
                        <Form.Label>Muscles Trained</Form.Label>
                        <Select
                            isMulti
                            options={muscleOptions}
                            value={muscleOptions.filter(option => split.musclesTrained.includes(option.value))}
                            onChange={(selectedOptions) => handleMusclesChange(index, selectedOptions)}
                        />
                    </Col>
                    <Col sm={1}>
                        <Button variant="danger" onClick={() => removeGymSplit(index)} style={{ marginTop: '30px' }}>X</Button>
                    </Col>
                </Form.Group>
            ))}
            <Button onClick={addGymSplit}>Add Gym Split</Button>
        </div>
    );
};

export default GymSplitForm;
