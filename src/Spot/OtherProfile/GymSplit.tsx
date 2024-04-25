import React from 'react';
import GymSplitData from '../Interfaces/GymSplit';

interface GymSplitProps {
    splits: GymSplitData[];
}

const GymSplit: React.FC<GymSplitProps> = ({ splits }) => {
    return (
        <div>
            {splits.map((split, index) => (
                <div key={index} className="gym-split-item">
                    <div className="day-of-week">{split.dayOfWeek}</div>
                    <div className="muscles-trained">{split.musclesTrained.join(', ')}</div>
                </div>
            ))}
        </div>
    );
}

export default GymSplit;
