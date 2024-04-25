import React, { useState, useEffect } from 'react';
import { getUserById, getGymSplitsById, getMealPlansById, getGymStatisticsById, getPostById, getUsersByUsername } from './client'; // Make sure to import getUserById
import GymSplit from './GymSplit';
import MealPlan from './MealPlan';
import GymStatistics from './GymStatistics';
import Post from './Post';
import { FaCalendarAlt, FaUtensils, FaDumbbell } from 'react-icons/fa';
import "./index.css";

interface GymSplitData {
  dayOfWeek: string;
  musclesTrained: string[];
}

interface MealPlanData {
  name: string;
  link: string;
  calories: number;
}

interface GymStatistic {
  exercise: string;
  weight: number;
  unit: string;
}

interface PostData {
  imageUrl: string;
  songImageUrl: string;
  songName: string;
  artistName: string;
  likes: string[];
}

interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl: string;
  gymSplitIds: string[];
  mealPlanIds: string[];
  gymStatisticIds: string[];
  postIds: string[];
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [gymSplits, setGymSplits] = useState<GymSplitData[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlanData[]>([]);
  const [gymStatistics, setGymStatistics] = useState<GymStatistic[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    // const fetchProfile = async () => {
    //   const userId = "66289c93c3dcf55281db8860";
    //   const userProfile = await getUserById(userId);
    //   setUserProfile(userProfile);

    //   const fetchDetails = async (ids: string[], fetchFunction: (id: string) => Promise<any>) => {
    //     const responses = await Promise.all(ids.map((id: string) => fetchFunction(id)));
    //     return responses;
    //   };

    //   if (userProfile) {
    //     const fetchedGymSplits = await fetchDetails(userProfile.gymSplitIds, getGymSplitsById);
    //     const fetchedMealPlans = await fetchDetails(userProfile.mealPlanIds, getMealPlansById);
    //     const fetchedGymStatistics = await fetchDetails(userProfile.gymStatisticIds, getGymStatisticsById);
    //     const fetchedPosts = await fetchDetails(userProfile.postIds, getPostById);

    //     setGymSplits(fetchedGymSplits);
    //     setMealPlans(fetchedMealPlans);
    //     setGymStatistics(fetchedGymStatistics);
    //     setPosts(fetchedPosts);
    //   }
    // };

    // fetchProfile();

    const fetchProfile = async () => {
      const userId = "active_amy";
      try {
        const userProfile = await getUsersByUsername(userId);
        if (!userProfile) {
          console.error("User profile not found");
          return;
        }
        setUserProfile(userProfile);

        const fetchDetails = async (ids: string[], fetchFunction: (id: string) => Promise<any>) => {
          if (!ids || ids.length === 0) {
            console.log("IDs array is empty or undefined.");
            return []; // Return an empty array if there are no IDs to process
          }
          try {
            const fetchPromises = ids.map(id => fetchFunction(id)); // Create a promise for each ID
            const responses = await Promise.all(fetchPromises); // Wait for all fetch promises to resolve
            console.log("Fetched details:", responses);
            return responses.map(res => res.data); // Extract data from each response
          } catch (error) {
            console.error("Error fetching details:", error);
            return []; // Return an empty array in case of any error
          }
        };
        // Using fetchDetails to retrieve related data
        const fetchedGymSplits = await fetchDetails(userProfile.gymSplitIds, getGymSplitsById);
        const fetchedMealPlans = await fetchDetails(userProfile.mealPlanIds, getMealPlansById);
        const fetchedGymStatistics = await fetchDetails(userProfile.gymStatisticIds, getGymStatisticsById);
        const fetchedPosts = await fetchDetails(userProfile.postIds, getPostById);

        

        setGymSplits(fetchedGymSplits);
        setMealPlans(fetchedMealPlans);
        setGymStatistics(fetchedGymStatistics);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch user profile or related details:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    console.log('UserProfile updated:', userProfile);
  }, [userProfile]);

  useEffect(() => {
    console.log('Gym Splits updated:', gymSplits);
  }, [gymSplits]);

  useEffect(() => {
    console.log('Meal Plans updated:', mealPlans);
  }, [mealPlans]);

  useEffect(() => {
    console.log('Gym Statistics updated:', gymStatistics);
  }, [gymStatistics]);

  useEffect(() => {
    console.log('Posts updated:', posts);
  }, [posts]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="profile-header">
        <img src={userProfile.profilePictureUrl || 'default-profile.png'} alt="Profile" className="profile-picture" />
        <div>
          <h1 className="profile-title">{userProfile.firstName} {userProfile.lastName}</h1>
          <h2 className="profile-username">@{userProfile.username}</h2>
        </div>
      </div>
      <div className="profile-sections">
        <div className="profile-column">
          <h3 className="heading"><FaCalendarAlt className="header-icon" />Gym Splits</h3>
          <GymSplit splits={gymSplits} />
        </div>
        <div className="profile-column">
          <h3 className="heading"><FaUtensils className="header-icon" />Meal Plan</h3>
          <MealPlan mealPlans={mealPlans} />
        </div>
        <div className="profile-column">
          <h3 className="heading"><FaDumbbell className="header-icon" />Gym Stats</h3>
          <GymStatistics statistics={gymStatistics} />
        </div>
      </div>
      <div className="posts-header">
        <h3>User Posts</h3>
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
