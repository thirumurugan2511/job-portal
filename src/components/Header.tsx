// Header.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice'; // Import logout action

const Header = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); //logout action
    };

    return (
        <div className='container my-4 text-center justify-content-between'>
            <h2> Advanced Job Application System</h2>
            {isAuthenticated && user ? (
                <div>
                    <p>Welcome, {user.name}</p>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button className='btn btn-primary'>Login</button>
            )}
        </div>
    );
};

export default Header;
