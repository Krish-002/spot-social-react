import React from 'react';

interface MealPlanProps {
    mealPlans: string[];
}

const MealPlan: React.FC<MealPlanProps> = ({ mealPlans }) => {
    return (
        <div>
            {mealPlans.map((plan, index) => (
                <a key={index} href={plan} target="_blank" rel="noopener noreferrer" className="meal-plan-item">
                    {`Meal Plan ${index + 1}`}
                </a>
            ))}
        </div>
    );
}

export default MealPlan;
