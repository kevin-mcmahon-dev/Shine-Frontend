import { useState } from 'react';
import authorizationModel from '../models/authorization';
import { useNavigate } from 'react-router-dom';

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
                nav('/')
            }
        })
    }
    
    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-field'>
					<label htmlFor='email'>Email</label>
					<input type='text'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>
                <div className='input-field'>
					<label htmlFor='password'>Password</label>
					<input type='text'
						name='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
                <input type='submit' value='Login' />
            </form>
        </>
    );
}

export default Login;