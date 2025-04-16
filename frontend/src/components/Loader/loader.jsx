import styles from './styles.module.css';
import truck from '../../images/loader.png';

const Loader = () => {
    return ( 
        <div className={styles.loaderContainer}>
            <img src={truck} alt="loader" className={styles.loader} />
        </div>
     );
}
 
export default Loader;