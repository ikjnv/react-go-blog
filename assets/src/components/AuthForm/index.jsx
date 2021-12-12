import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/authContext';
import { Link } from 'react-router-dom';
import { FormBlock, Form } from './styled';
import Errors from '../Errors/Errors';

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

		try {
			const response = await fetch(endpoint,
				{
					method: 'POST',
					body: JSON.stringify({
						Username: username,
						Password: password,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			if (!response.ok) {
				let errorText = loggingIn ? 'Login failed' : 'Sign up failed';
				if (!data.hasOwnProperty('error')) {
					throw new Error(errorText);
				}
				if ((typeof data['error'] === 'string')) {
					setErrors({'unknown': data['error']})
				} else {
					setErrors(data['error']);
				} 
			} else {
				context.login(data.jwt);
				context.setUsername(data.username);
				navigate('/', { replace: true });
			}
		} catch (error) {
			setErrors({"error": error.message});
		}

	}

	const title = loggingIn ? 'Sign in' : 'Sign up';
	const suggestBtn = loggingIn ? 'Create new account' : 'Already have an account?'
	const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors);

	return (
		<FormBlock>
			<h4>{title}</h4>
			<Form onSubmit={submitHandler}>
				<div>
					<input type="text" ref={usernameRef} />
				</div>
				<div>
					<input type="password" ref={passwordRef} />
				</div>
				<div>
					<button>{title}</button>
				</div>
				<div>
					<Link to="" onClick={switchMode}>{suggestBtn}</Link>
				</div>
			</Form>
			{errorContent}
		</FormBlock>
	);
};
