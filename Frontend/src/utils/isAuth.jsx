import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const isAuth = (WrapedContent) => {
    const AuthComponent = (props) => {
        const router = useNavigate();

        const isAuthenticated = () => {
            if (localStorage.getItem('googleMessage')) {
                return true;
            }
            return false;
        }
        useEffect(()=>{
            if(!isAuthenticated()){
                router('/login')
            }
        },[router]);
        return isAuthenticated()? <WrapedContent{...props}/> : null;
    }
    return AuthComponent;
};

export default isAuth;