import { useContext, useState, useEffect, useCallback } from 'react';
import AuthContext from '../../store/authContext';
import PostForm from './PostForm';
import PostList from './PostList';

export default function Posts() {
	const context = useContext(AuthContext);
	const [posts, setPosts] = useState([]);
	const [errors, setErrors] = useState({});

	const fetchPosts = useCallback(async () => {
		setErrors({});
		await fetch('/api/v1/posts',
			{
				headers: {
					Authorization: `Bearer ${context.token}`
				}
			}
		)
			.then(res => res.json())
			.then(res => setPosts(res.data))
			.catch(err => setErrors({"error": err.message}));

	}, [context.token]);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const addPostHandler = (postData) => {
		setPosts(prevState => [...prevState, postData]);
	};

	const deleteHandler = (postId) => {
		setPosts(prevState => prevState.filter((post) => post.ID !== postId));
	};

	const editHandler = () => {
		fetchPosts();
	};

	const postsContent = posts.length === 0 ?
		<p>No posts yet</p>
		:
		<PostList
			posts={posts}
			onDeletePost={deleteHandler}
			onEditPost={editHandler}
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
