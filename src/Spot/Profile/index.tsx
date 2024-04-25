import React, { useState, useEffect } from 'react';
import GymSplit from './GymSplit';
import MealPlan from './MealPlan';
import GymStatistics from './GymStatistics';
import Post from './Post';
import { FaCalendarAlt, FaUtensils, FaDumbbell } from 'react-icons/fa';
import "./index.css";
import * as client from './client';

import User from '../Interfaces/User';
import GymSplitData from '../Interfaces/GymSplit';
import MealPlanData from '../Interfaces/MealPlan';
import GymStatistic from '../Interfaces/GymStatistic';
import PostData from '../Interfaces/PostData';


const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User | null>();
  const [gymSplits, setGymSplits] = useState<GymSplitData[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlanData[]>([]);
  const [gymStatistics, setGymStatistics] = useState<GymStatistic[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const userId = "active_amy"; // Replace with actual logic to determine userId if needed

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await client.getUsersByUsername(userId);
        setUserProfile(userProfile);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(()=> {
    console.log('userProfile', userProfile);
    console.log('userProfile.gym', userProfile?.gymSplitIds);
  }, [userProfile?.gymSplitIds]);


  useEffect(() => {
    if (userProfile && userProfile.mealPlanIds) {
      const fetchMealPlans = async () => {
        const fetchedMealPlans = [];
        for (const id of userProfile.mealPlanIds) {
          const mealPlan = await client.getMealPlanById(id);
          fetchedMealPlans.push(mealPlan);
        }
        setMealPlans(fetchedMealPlans);
      };

      fetchMealPlans();
    }
  }, [userProfile?.mealPlanIds]);

  useEffect(() => {
    if (userProfile && userProfile.gymStatisticIds) {
      const fetchGymStatistics = async () => {
        const fetchedGymStatistics = [];
        for (const id of userProfile.gymStatisticIds) {
          const gymStatistic = await client.getGymStatisticsById(id);
          fetchedGymStatistics.push(gymStatistic);
        }
        setGymStatistics(fetchedGymStatistics);
      };

      fetchGymStatistics();
    }
  }, [userProfile?.gymStatisticIds]);

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
          <h3 className="heading"><FaUtensils className="header-icon" />Meal Plans</h3>
          <MealPlan mealPlans={mealPlans} />
        </div>
        <div className="profile-column">
          <h3 className="heading"><FaDumbbell className="header-icon" />Gym Stats</h3>
          <GymStatistics statistics={gymStatistics} />
        </div>
        <div className="posts-header">
          <h3>User Posts</h3>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
