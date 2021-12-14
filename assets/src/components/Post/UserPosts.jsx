import { useContext, useState, useEffect, useCallback } from 'react';
import AuthContext from '../../store/authContext';
import PostForm from './PostForm';
import PostList from './PostList';

export default function UserPosts() {
	const context = useContext(AuthContext);
	const [posts, setPosts] = useState([]);
	const [errors, setErrors] = useState({});

	const fetchPosts = useCallback(async () => {
		setErrors({});
		try {
			const res = await fetch('/api/v1/user/posts',
				{
					headers: {
						Authorization: `Bearer ${context.token}`
					}
				}
			);

			const data = await res.json();
			if(!res.ok) {
				const errorTxt = 'Error while fetching posts';

				if(!data.hasOwnProperty('error')) {
					throw new Error(errorTxt);
				};

				if(typeof data['error'] === 'string') {
					setErrors({'unknown': data['error']});
				} else {
					setErrors(data['error']);
				}
			} else {
				setPosts(data.data);
			}
		} catch (err) {
			setErrors({'error': err.message});
		}
	}, [context.token]);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const addPostHandler = (postData) => {
		setPosts(prevState => [...prevState, postData]);
	};

	const deletePostHandler = (postId) => {
		setPosts(prevState => prevState.filter((post) => post.ID !== postId));
	};

	const editPostHandler = () => {
		fetchPosts();
	};

	const postsContent = posts.length === 0 ?
		<p>No posts yet</p>
		:
		<PostList
			posts={posts}
			onDeletePost={deletePostHandler}
			onEditPost={editPostHandler}
		/>;

	const errorsContent = Object.keys(errors).length === 0 ? null : errors;

	return (
		<section>
			{errorsContent}
			<PostForm onAddPost={addPostHandler} />
			{postsContent}
		</section>
	);
};
