import React, { useState, useContext } from 'react';
import AuthContext from '../context/auth-context';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './Auth.css';

import { createUser, loginUser } from '../store/user-store';

const Auth = () => {
    const authContext = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const switchHandler = () => {
        setIsLogin(!isLogin);
    }

    const validateData = (email, password) => {
        if (email.trim().length === 0 || password.trim().length === 0) {
            return { res: false, errmsg: "Email or password cannot be empty!" }
        }
        return { res: true, errmsg: null }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const isValid = validateData(email, password);

            if (isValid.errmsg !== null) {
                toast.error("Email or password cannot be empty!", {
                    position: "top-right",
                });
                return;
            }

            // Calling GraphQL API

            if (isLogin) {
                const loginData = await loginUser(email, password);
                console.log('Login successful', loginData);
                authContext.login(loginData.token, loginData.userId, loginData.tokenExpiration);
            } else {
                const userData = await createUser(email, password);
                console.log('User created: ', userData);
            }


        } catch (err) {
            toast.error("Error creating user!", {
                position: "top-right",
            });
            console.error('Error creating user: ', err.message);
        }
    }

    return (
        <div>
            <form className='auth-form' onSubmit={handleSubmit}>
                <h4>{isLogin ? "Login" : "Signup"}</h4><br />
                <div className='form-control'>
                    <label htmlFor='email'>Email: </label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='form-actions'>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={switchHandler}>Switch to {isLogin ? 'Signup' : 'Login'}</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
export default Auth;