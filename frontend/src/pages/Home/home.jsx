'use client'

import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';
import BottomNav from '../../components/BottomNav/bottomNav';

const Home = () => {
    const [profile, setProfile] = useState('');

    useEffect(() => {
        fetch('/api/myprofile')
        .then(res => {
            return res.json()
        })
        .then(result => {
            // console.log(result)
            setProfile(result.user);
        })
        .catch(err => {
            console.error(err);
        })
    }, []);

    
    return ( 
        <>
        <Header />
        <div className={styles.home}>
       {/*  {profile.name} {profile.surname} {profile.role === 1 ? 'admin' : 'normal'} */}
        <button>Logout</button>
        </div>
        <BottomNav />
        </>
     );
}
 
export default Home;