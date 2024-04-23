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
