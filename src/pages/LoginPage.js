import React, {useEffect, useState} from 'react';
import LoginForm from '../Components/Auth/LoginForm';
import axios from "axios";
import {useNavigate} from "react-router";
import useAuthCheck from "../hooks/useAuthCheck";
import authService from "../services/authService";
import { colors } from '@mui/material';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {loggedIn,setLoggedIn,username,setUsername} = useAuthCheck(navigate);

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (username !== '' && password !== '') {
            try {
                await authService.login(username, password)
                    .then(res => {
                        console.log(res.data);
                        setLoggedIn(true);
                        alert("Successful Login In"); // Alert for successful login
                        navigate('/welcome');
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Login Failed, try again");
                        setUsername('');
                        setPassword('');
                    });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div style={{
            height:'100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: 'url("https://th.bing.com/th/id/OIG1.p_UucIwNBT9lQlpgHSe3?w=1024&h=1024&rs=1&pid=ImgDetMain")', // Background image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}>
          
   

            <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
            />
        </div>
    );
};

export default LoginPage;
