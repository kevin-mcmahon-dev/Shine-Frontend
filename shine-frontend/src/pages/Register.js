import { useState } from 'react';
import authorizationModel from '../models/authorization';
import { useNavigate } from 'react-router-dom';
import "./Register.css"

const NewUser = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const nav = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		authorizationModel.register({username, name, email, password}).then((data) => {
			console.log(data);
			console.log(data.token);
			localStorage.setItem("uid", data.token)
			if (data.status === 200) {
				nav("/profile");
			}
		})
	}

    return (
		<>
			<form className="userEntryForm" onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input type='text'
						className='form-control'
						name='name'
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='username'>Username</label>
					<input type='text'
						className='form-control'
						name='username'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
				</div>
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
				<button type='submit' className='btn btn-primary'>Create Account</button>
			</form>
		</>
	);
}

export default NewUser;