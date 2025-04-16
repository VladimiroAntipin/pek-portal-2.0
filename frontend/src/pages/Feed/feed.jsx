'use client';

import { useAuth } from '../../context/authContext';
import userService from '../../api/users';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Loader from '../../components/Loader/loader';

const Feed = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await userService.getCurrentUserProfile(user.accessToken);
            setUserData(response.data);
          } catch (err) {
            setError('Failed to fetch user profile');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        if (user) {
          fetchUserProfile();
        }
      }, [user]);
    
      if (loading) return <Loader />;
      if (error) return <div>{error}</div>;

    return (
        <div className={styles.feed}>
            <div>
                Welcome,{userData.surname}!
            </div>

        </div>
    );
}

export default Feed;