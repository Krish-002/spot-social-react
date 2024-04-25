import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Header from './Header';
import { RootState } from '../Store/index';

interface HomeProps {}
const Home: React.FC<HomeProps> = () => {
    const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REACT_APP_AUTHORIZE_URL = process.env.REACT_APP_AUTHORIZE_URL;
    const REACT_APP_REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL || '';
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogin = () => {
        const sessionData = {user};
        localStorage.setItem('sessionData', JSON.stringify(sessionData));

        if (typeof window !== 'undefined') {
            const encodedRedirectUri = encodeURIComponent(REACT_APP_REDIRECT_URL);
            window.location.href = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${encodedRedirectUri}`;
            console.log('Redirecting to:', window.location.href);
        }
    };

    return (
        <div className="login">
            <Header />
            <Button variant="info" type="submit" onClick={handleLogin}>
                Login to Spotify
            </Button>
        </div>
    );
};

export default connect()(Home);
