import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store';
import SpotNavigation from './Navigation';
import AdminHomePage from './Admin';
import PostScreen from './Post';
import Profile from './Profile';
import RedirectPage from './Post/RedirectPage';
import Feed from './Feed';
import Signin from './Login/Signin';
import AdminSignin from './Admin/Signin';
import OtherProfile from './OtherProfile';

const Spot = () => {
  const location = useLocation();
  const showNavigation = ['/Profile', '/Profile/:userId', '/Post/*', '/Feed', '/redirect'].some(path => location.pathname.includes(path.replace('/*', '').replace('/:userId', '')));

  return (
    <Provider store={store}>
      <div className="kb-container">
        {showNavigation && <SpotNavigation />}

        <Routes>
          <Route path="/" element={<Navigate to="/Signin" />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Admin/Signin" element={<AdminSignin />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/:userId" element={<OtherProfile />} />
          <Route path="/Post/*" element={<PostScreen />} />
          <Route path="/Admin" element={<AdminHomePage />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/redirect" element={<RedirectPage />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default Spot;
