import React from 'react';
import MealPlanData from '../Interfaces/MealPlan';

interface MealPlanProps {
    mealPlans: MealPlanData[];
}

const MealPlan: React.FC<MealPlanProps> = ({ mealPlans }) => {
    return (
        <div>
            {mealPlans.map((plan, index) => (
                <div key={index} className="meal-plan-item">
                    <a href={plan.link} target="_blank" rel="noopener noreferrer">
                        {plan.name} - {plan.calories} calories
                    </a>
                </div>
            ))}
        </div>
    );
}

export default MealPlan;
