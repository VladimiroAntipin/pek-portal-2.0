'use client'

import styles from './styles.module.css';
import { useEffect, useState } from 'react';

const Feed = () => {
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
        <div className={styles.feed}>
            siuuuuuuum
        </div>
     );
}
 
export default Feed;