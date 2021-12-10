import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/auth">Sign in</Link>
			</li>
		</ul>
	)
};
