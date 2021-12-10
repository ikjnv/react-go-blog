import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/authContext';

export default function Header() {
	const context = useContext(AuthContext);
	console.log('header context', context);
	return (
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			{ context.loggedIn ? (
				<li>{context.username}</li>
			) : (
				<li>
					<Link to="/auth">Sign in</Link>
				</li>
			)}
		</ul>
	)
};
