import React from 'react';

interface GymSplitProps {
    splits: Array<{
        dayOfWeek: string;
        musclesTrained: string[];
    }>;
}

const GymSplit: React.FC<GymSplitProps> = ({ splits }) => {
    return (
        <div>
            <h3>Gym Splits</h3>
            <ul>
                {splits.map((split, index) => (
                    <li key={index}>{split.dayOfWeek}: {split.musclesTrained.join(', ')}</li>
                ))}
            </ul>
        </div>
    );
}

export default GymSplit;
