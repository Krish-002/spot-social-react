import React from 'react';

interface MealPlanProps {
    mealPlans: Array<{
        name: string;
        link: string;
        calories: number;
    }>;
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
