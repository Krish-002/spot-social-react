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
            {statistics.map((stat, index) => (
                <div key={index} className="gym-stat-item">
                    <div className="exercise">{stat.exercise}</div>
                    <div className="weight-unit">{`${stat.weight} ${stat.unit}`}</div>
                </div>
            ))}
        </div>
    );
}

export default GymStatistics;
