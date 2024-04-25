import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import GymSplit from './GymSplit';
import MealPlan from './MealPlan';
import GymStatistics from './GymStatistics';
import Post from './Post';
import { FaCalendarAlt, FaUtensils, FaDumbbell } from 'react-icons/fa';
import "./index.css";
import * as client from './client';
import { useSelector } from 'react-redux';
import { RootState } from '../Store';

import User from '../Interfaces/User';
import GymSplitData from '../Interfaces/GymSplit';
import MealPlanData from '../Interfaces/MealPlan';
import GymStatistic from '../Interfaces/GymStatistic';
import PostData from '../Interfaces/PostData';


const OtherProfile: React.FC = () => {

  const [userProfile, setUserProfile] = useState<User>();
  const [gymSplits, setGymSplits] = useState<GymSplitData[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlanData[]>([]);
  const [gymStatistics, setGymStatistics] = useState<GymStatistic[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const { userId } = useParams();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userId) {
          const userProfile = await client.getUserById(userId);
          setUserProfile(userProfile);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();
  }, []);

    useEffect(() => {
    const fetchGymSplits = async () => {
      const fetchedGymSplits: GymSplitData[] = [];
      if (userProfile) {
        for (const id of userProfile.gymSplitIds) {
          const gymSplit = await client.getGymSplitsById(id);
          fetchedGymSplits.push(gymSplit);
        }
      }
      setGymSplits(fetchedGymSplits);
    };


    fetchGymSplits();
  }, [userProfile?.gymSplitIds]);

useEffect(() => {
    const fetchMealPlan = async () => {
        const fetchedMealPlan: MealPlanData[] = [];
        if(userProfile){
        for (const id of userProfile.mealPlanIds) {
            const mealPlan = await client.getMealPlanById(id);
            fetchedMealPlan.push(mealPlan);
        }
      }
        setMealPlans(fetchedMealPlan);
    };
    fetchMealPlan();

}, [userProfile?.mealPlanIds]);

useEffect(() => {
    const fetchGymStatistics = async () => {
        const fetchedGymStatistics: GymStatistic[] = [];
        if(userProfile){
        for (const id of userProfile.gymStatisticIds) {
            const gymStatistic = await client.getGymStatisticsById(id);
            fetchedGymStatistics.push(gymStatistic);
        }
      }
        setGymStatistics(fetchedGymStatistics);
    };
    fetchGymStatistics();
}, [userProfile?.gymStatisticIds]);

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
    if (userProfile && userProfile.postIds) {
      const fetchPosts = async () => {
        const fetchedPosts = [];
        for (const id of userProfile.postIds) {
          const post = await client.getPostById(id);
          fetchedPosts.push(post);
        }
        setPosts(fetchedPosts);
      };

      fetchPosts();
    }
  }, [userProfile?.postIds]);

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
      </div>
      <div className="posts-header">
          <h3>User Posts</h3>
        </div>
        <div className='kb-post-container card-container'>
        {posts.map((post, index) => (
            <Post key={index} post={post}/>
          ))}
          </div>
    </div>
  );
};

export default OtherProfile;
