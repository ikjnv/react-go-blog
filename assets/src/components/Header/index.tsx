import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../../store/authContext';
import { Navbar, Auth } from './styled';

export default function Header() {
	const navigate = useNavigate();
	const context = useContext(AuthContext);

	console.log('header context', context);

	const handleLogout = () => {
		context.logout();
		navigate('/', { replace: true });
	}

	return (
		<Navbar>
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
					<Auth>
						<li id="usrname">{context.username}</li>
						<li>
							<Link to="" onClick={handleLogout}>
								Log out
							</Link>
						</li>
					</Auth>
				</>
			) : (
				<Auth>
					<li>
						<Link to="/auth">Sign in</Link>
					</li>
				</Auth>
			)}
		</Navbar>
	)
};
