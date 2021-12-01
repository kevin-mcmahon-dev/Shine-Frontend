import { useState } from 'react';
import authorizationModel from '../models/authorization';
import { useNavigate } from 'react-router-dom';

const NewUser = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const nav = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		authorizationModel.register({username, name, email, password}).then((data) => {
			if (data.status === 201) {
				nav("/");
			}
		})
	}

    return (
		<>
			<h2>Create an Account</h2>
			<form onSubmit={handleSubmit}>
				<div className='input-field'>
					<label htmlFor='name'>Name</label>
					<input type='text'
						name='name'
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				</div>
				<div className='input-field'>
					<label htmlFor='username'>Username</label>
					<input type='text'
						name='username'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
				</div>
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
				<input type='submit' value='Create Account' />
			</form>
		</>
	);
}

export default NewUser;