import React, { useState } from 'react';
import './Auth.css';

import { createUser } from '../store/user-store';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateData = (email, password) => {
        if (email.trim().length === 0 || password.trim().length === 0) {
            return { res: false, msg: "Email or password cannot be empty!" }
        }
        return { res: true, msg: null }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log('handle submit data ===> ', { email, password });

            const isValid = validateData(email, password);
            if (!isValid.res) {
                return;
            }

            // Calling GraphQL API
            const userData = await createUser(email, password);
            console.log('User created: ', userData);

        } catch (err) {
            console.error('Error creating user: ', err.message);
        }
    }

    return (
        <div>
            <form className='auth-form' onSubmit={handleSubmit}>
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
                    <button type="button">Switch to Signup</button>
                </div>
            </form>
        </div>
    );
}
export default Auth;