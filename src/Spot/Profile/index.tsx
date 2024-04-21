import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GymSplit from './GymSplit';
import MealPlan from './MealPlan';
import GymStatistics from './GymStatistics';
import Post from './Post';

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
        // Example user ID from your user example provided
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
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-auto">
          <img src={userProfile.profilePictureUrl || 'default-profile.png'} alt="Profile" className="img-fluid rounded-circle" style={{ width: '100px', height: '100px' }} />
        </div>
        <div className="col">
          <h1 className="display-4">{userProfile.firstName} {userProfile.lastName}</h1>
          <h2 className="lead">@{userProfile.username}</h2>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <GymSplit splits={userProfile.gymSplits} />
        </div>
        <div className="col-md-3 mb-3">
          <MealPlan mealPlans={userProfile.mealPlans} />
        </div>
        <div className="col-md-3 mb-3">
          <GymStatistics statistics={userProfile.gymStatistics} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h3>User Posts</h3>
          {userProfile.posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
