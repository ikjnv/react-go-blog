import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/authContext';

export default function AuthForm() {

	const navigate = useNavigate();
	const context = useContext(AuthContext);
	const [loggingIn, setLoggingIn] = useState(true);
	const [errors, setErrors] = useState({});

	const usernameRef = useRef();
	const passwordRef = useRef();

	const switchMode = () => {
		setLoggingIn((prevState) => !prevState);
		setErrors({});
	};

	const endpoint = loggingIn ? '/api/v1/signin' : '/api/v1/signup';

	async function submitHandler(event) {
		event.preventDefault();
		setErrors({});

		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		
		const res = await fetch(endpoint,
			{
				method: 'POST',
				body: JSON.stringify({
					Username: username,
					Password: password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then(res => res.json())
			.then(res => {
				context.setUsername(res.username);
				context.login(res.jwt)
				navigate('/', { replace: true })
			})
			.catch(err => console.error('Error:', err));
	}

	const title = loggingIn ? 'Sign in' : 'Sign up';

	return (
		<div>
			<h4>{title}</h4>
			<form onSubmit={submitHandler}>
				<input type="text" ref={usernameRef} />
				<input type="password" ref={passwordRef} />
				<button>{title}</button>
			</form>

		</div>
	);
};
