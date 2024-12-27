import React from 'react'

const Login = () => {
  return (
    <div>

        <form action="">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button type="submit">Login</button>
        </form>
      
    </div>
  )
}

export default Login
