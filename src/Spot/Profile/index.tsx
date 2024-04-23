import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GymSplit from './GymSplit';
import MealPlan from './MealPlan';
import GymStatistics from './GymStatistics';
import Post from './Post';
import { FaCalendarAlt, FaUtensils, FaDumbbell } from 'react-icons/fa';
import "./index.css";

interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl: string;
  gymSplits: Array<{
    dayOfWeek: string;
    musclesTrained: string[];
  }>;
  mealPlans: string[];
  gymStatistics: Array<{
    exercise: string;
    weight: number;
    unit: string;
  }>;
  posts: Array<{
    imageUrl: string;
    songImageUrl: string;
    songName: string;
    artistName: string;
    likes: string[];
  }>;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    username: '',
    profilePictureUrl: '',
    gymSplits: [],
    mealPlans: [],
    gymStatistics: [],
    posts: []
  });

  // useEffect(() => {
  //     const fetchProfile = async () => {
  //         try {
  //             const { data } = await axios.get<UserProfile>('/api/users/profile');
  //             setUserProfile(data);
  //         } catch (error) {
  //             console.error('Error fetching profile data', error);
  //         }
  //     };

  //     fetchProfile();
  // }, []);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = "6624bd98b942154f8f0e048e";
        const { data } = await axios.get<UserProfile>(`http://localhost:4000/api/users/${userId}`);
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };
    fetchProfile();
  }, []);

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
          <GymSplit splits={userProfile.gymSplits} />
        </div>
        <div className="profile-column">
          <h3 className="heading"><FaUtensils className="header-icon" />Meal Plan</h3>
          <MealPlan mealPlans={userProfile.mealPlans} />
        </div>
        <div className="profile-column">
          <h3 className="heading"><FaDumbbell className="header-icon" />Gym Stats</h3>
          <GymStatistics statistics={userProfile.gymStatistics} />
        </div>
      </div>
      <div className="posts-header">
        <h3>User Posts</h3>
      </div>
      {userProfile.posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
}

export default Profile;
