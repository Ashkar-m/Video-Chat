import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function getUser(){
    let user = localStorage.getItem('user');
    if(user){
        user = JSON.parse(user);
    } else{
        user = null;
    }
    return user;
}

const Home = () => {
    const [user, setUser] = useState(getUser());

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }
  return (
    <div>
        {user?(
            <>
            <h4>Hello, {user.firstName} {user.lastName}</h4>
            <h5>{user.email}</h5>
            <button onClick={handleLogout()}>Logout</button>
            </>
        ):(
            <Link to='/login'>Login</Link>
        )}  
    </div>
  )
}

export default Home
