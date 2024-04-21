import React from 'react';

interface GymStatisticsProps {
    statistics: Array<{
        exercise: string;
        weight: number;
        unit: string;
    }>;
}

const GymStatistics: React.FC<GymStatisticsProps> = ({ statistics }) => {
    return (
        <div>
            <h3>Gym Statistics</h3>
            <ul>
                {statistics.map((stat, index) => (
                    <li key={index}>{stat.exercise}: {stat.weight} {stat.unit}</li>
                ))}
            </ul>
        </div>
    );
}

export default GymStatistics;
