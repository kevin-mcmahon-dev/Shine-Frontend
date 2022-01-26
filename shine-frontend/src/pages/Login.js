import { useState } from 'react';
import authorizationModel from '../models/authorization';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();

        authorizationModel.login({ email, password}).then((response) => {
            console.log(response);
            // localStorage.setItem("uid", response.signedJwt);
            localStorage.setItem("uid", response.token);
            console.log(response.token);
            if (response.status === 200) {
                nav('/profile')
            }
        })
    }
    
    return (
        <>
            <form className='userEntryForm' onSubmit={handleSubmit}>
                <div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input type='text'
                        className='form-control'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>
                <div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input type='password'
                        className='form-control'
						name='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
        </>
    );
}

export default Login;