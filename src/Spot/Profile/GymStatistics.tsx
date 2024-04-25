import React from 'react';
import GymStatistic from '../Interfaces/GymStatistic';

interface GymStatisticsProps {
    statistics: GymStatistic[];
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
