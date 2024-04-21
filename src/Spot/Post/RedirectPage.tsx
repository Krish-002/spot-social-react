import React, { useEffect } from 'react';
import _ from 'lodash';
import { useNavigate, useLocation } from 'react-router-dom';
import { getParamValues } from './Utils/Functions';

const RedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      if (_.isEmpty(location.hash)) {
        navigate('/Spot/Post/Dashboard');
        return;
      }
      const access_token = getParamValues(location.hash);
      console.log(access_token);
      const expiresInSeconds = parseInt(access_token.expires_in, 10);
      console.log(expiresInSeconds);
      const expiryTime = new Date().getTime() + expiresInSeconds * 1000;
      const expiryTimeInSeconds = Math.floor(expiryTime / 1000);
      localStorage.setItem('params', JSON.stringify(access_token));
      localStorage.setItem('expiry_time', expiryTime.toString());
      navigate('/Spot/Post/Dashboard');
    } catch (error) {
      navigate('/Spot/Post/Home');
    }
  }, [location, navigate]);

  return null;
};

export default RedirectPage;
