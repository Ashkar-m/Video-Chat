import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loading, error} = useSelector((state)=> state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        let userCredentials = {
            email, password
        }
        dispatch(loginUser(userCredentials)).then((result)=>{
            if(result.payload){
                setEmail('');
                setPassword('');
                navigate('/');
            }
        })
    }
  return (
    <div>

        <form action="" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">
                {loading?'Loading':'Login'}
            </button>
            {error&&(
                <div>{error}</div>
            )}
        </form>
      
    </div>
  )
}

export default Login
