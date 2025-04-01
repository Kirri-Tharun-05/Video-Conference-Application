import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import server from '../environment';

const isAuth = (WrappedContent) => {
    const AuthComponent = (props) => {
        const router = useNavigate();
        const [isAuthenticated, setIsAuthenticated] = useState(null);

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const response = await fetch(`${server}/auth/check-session`, {
                        credentials: 'include', // Important for sending cookies
                    });
                    const data = await response.json();
                    if (data.authenticated) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                        router('/login');
                    }
                } catch (error) {
                    console.error('Error checking authentication:', error);
                    setIsAuthenticated(false);
                    router('/login');
                }
            };

            checkAuth();
        }, [router]);

        if (isAuthenticated === null) {
            return <p>Loading...</p>; // Show a loading state while checking authentication
        }

        return isAuthenticated ? <WrappedContent {...props} /> : null;
    };

    return AuthComponent;
};

export default isAuth;
