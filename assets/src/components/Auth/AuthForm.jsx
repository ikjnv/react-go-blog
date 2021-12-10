import { useState, useContext, useRef } from 'react';
import AuthContext from '../../store/authContext';
import Header from '../Header';

const AuthForm = () => {
	const context = useContext(AuthContext);
	const [loggingIn, setLoggingIn] = useState(true);

	const usernameRef = useRef();
	const passwordRef = useRef();

	const title = loggingIn ? "Sign in" : "Sign up";
	
	return (
		<div>
			<Header />
			<h4>{title}</h4>

			<form>
				<input type="text" ref={usernameRef} />
				<input type="password" ref={passwordRef} />

				<button>{title}</button>
			</form>
		</div>
	);
};

export default AuthForm;
