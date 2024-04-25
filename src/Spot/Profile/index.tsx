import React, { useState, useEffect } from 'react';
import GymSplit from './GymSplit';
import MealPlan from './MealPlan';
import GymStatistics from './GymStatistics';
import Post from './Post';
import { FaCalendarAlt, FaUtensils, FaDumbbell, FaEdit } from 'react-icons/fa';
import "./index.css";
import * as client from './client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Store';
import LikedPostsModal from './LikedPostsModal';
import User from '../Interfaces/User';
import GymSplitData from '../Interfaces/GymSplit';
import MealPlanData from '../Interfaces/MealPlan';
import GymStatistic from '../Interfaces/GymStatistic';
import PostData from '../Interfaces/PostData';
import ProfileSettings from './ProfileSettings';
import { setUser } from '../Reducers/authSlice';


const Profile: React.FC = () => {

  const [userProfile, setUserProfile] = useState<User>();
  const [editing, setEditing] = useState(false);
  const [gymSplits, setGymSplits] = useState<GymSplitData[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlanData[]>([]);
  const [gymStatistics, setGymStatistics] = useState<GymStatistic[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [showLikedPostsModal, setShowLikedPostsModal] = useState(false);

  const openLikedPostsModal = () => setShowLikedPostsModal(true);
  const closeLikedPostsModal = () => setShowLikedPostsModal(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  console.log('user', user);



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user) {
          const userProfile = await client.getUserByUsername(user.username);
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
      if (userProfile) {
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
      if (userProfile) {
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

  const handleDeletePost = async (postId: string) => {
    if (!userProfile) {
      console.error("UserProfile is undefined, cannot delete post.");
      return;
    }

    try {
      await client.deletePost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));

      const updatedPostIds = userProfile.postIds.filter(id => id !== postId);
      const updatedUserProfile = { ...userProfile, postIds: updatedPostIds };

      const updateResult = await client.updateUser(userProfile._id, updatedUserProfile);
      if (updateResult && updateResult.success) {
        setUserProfile(updatedUserProfile);
        dispatch(setUser(updatedUserProfile)); // Dispatch updated user profile to Redux store
      } else {
        throw new Error('Failed to update user profile on the backend.');
      }
    } catch (error) {
      console.error("Failed to delete post or update user profile:", error);
    }
  };



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
          <button className="edit-button" onClick={openLikedPostsModal}>
                        View Liked Posts
                    </button>
          <button className="edit-button" onClick={() => setEditing(true)}>
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>
      {editing && (
        <ProfileSettings
          user={userProfile}
          onSave={(updatedUser) => {
            console.log('User updated', updatedUser);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      )}
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
          <Post key={index} post={post} onDelete={handleDeletePost} />
        ))}
      </div>
      <LikedPostsModal show={showLikedPostsModal} onHide={closeLikedPostsModal} />
    </div>
  );
};

export default Profile;
