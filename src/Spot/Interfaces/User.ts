
interface User {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    profilePictureUrl: string;
    gymSplitIds: string[];
    mealPlanIds: string[];
    gymStatisticIds: string[];
    postIds: string[];
}

export default User;