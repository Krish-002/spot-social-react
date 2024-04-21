import React from 'react';

interface MealPlanProps {
    mealPlans: string[];
}

const MealPlan: React.FC<MealPlanProps> = ({ mealPlans }) => {
    return (
        <div>
            <h3>Meal Plans</h3>
            <ul>
                {mealPlans.map((plan, index) => (
                    <li key={index}><a href={plan} target="_blank" rel="noopener noreferrer">Meal Plan Link</a></li>
                ))}
            </ul>
        </div>
    );
}

export default MealPlan;
