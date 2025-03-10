import {useNavigate} from 'react-router-dom';

const isAuth =(WrapedContent)=>{
    const AuthComponent=(props)=>{
        const router= useNavigate();

        const isAuthenticated=()=>{
            if(localStorage.getItems('')){return;}
        }
    }
}