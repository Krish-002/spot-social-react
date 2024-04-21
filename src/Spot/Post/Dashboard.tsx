import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initiateGetResult } from './Result/Results';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import Header from './Header';
import Loader from './Loader';
import { RootState } from '../Store';
import { AppDispatch } from '../Store';

const Dashboard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type for correct typing
    const navigate = useNavigate();
    const tracks = useSelector((state: RootState) => state.tracks); // Use RootState for correct state typing
  

    const handleSearch = (searchTerm: string) => {
        setIsLoading(true);
        dispatch(initiateGetResult(searchTerm))
            .unwrap() // Handles the Promise returned by the thunk
            .then((resolvedData) => {
                console.log('Tracks from API:', resolvedData); // Logs the data from the resolved promise
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Search failed:', error);
                setIsLoading(false);
                navigate('/', { state: { session_expired: true } });
            });
    };
    

  return (
    <React.Fragment>
      <SearchForm handleSearch={handleSearch} />
      <Loader show={isLoading}>Loading...</Loader>
      {tracks.items.length > 0 ? (
        <SearchResult result={{ tracks }} />
      ) : (
        isLoading || <p>No tracks found. Try a different search.</p>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
