import styles from './styles.module.css';

const FormWrapper = ({children}) => {
    return ( 
        <div className={styles.wrapper}> 
            {children}
        </div>
     );
}
 
export default FormWrapper;