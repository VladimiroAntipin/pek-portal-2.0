import { useLocation, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest}) => {
    const auth = localStorage.getItem('token');
    const location = useLocation();

    if (auth) {
        return children
    }
    return ( 
        <Navigate to='/login' state={{from: location}} />
     );
}
 
export default PrivateRoute;