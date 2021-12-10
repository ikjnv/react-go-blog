import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../../store/authContext';

export default function Header() {
	const navigate = useNavigate();
	const context = useContext(AuthContext);

	console.log('header context', context);

	const handleLogout = () => {
		context.logout();
		navigate('/', { replace: true });
	}

	return (
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			{ context.loggedIn ? (
				<>
					<li>
						<Link to="/posts">Posts</Link>
					</li>
					<li>
						<Link to="/create">Create post</Link>
					</li>
					<li>{context.username}</li>
					<li>
						<button onClick={handleLogout}>
							Log out
						</button>
					</li>
				</>
			) : (
				<>
					<li>
						<Link to="/auth">Sign in</Link>
					</li>
				</>
			)}
		</ul>
	)
};
