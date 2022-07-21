import { useState, useEffect, useCallback } from 'react';
import Errors from '../Errors/Errors';
import PostList from './PostList';

export default function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [errors, setErrors] = useState({});

	const fetchPosts = useCallback(
		async () => {
			try {
				const res = await fetch('/api/v1/posts');
				const data = await res.json();

				if(!res.ok) {
					let errorTxt = "Error while fetching all posts";

					if(!data.hasOwnProperty('error')) {
						throw new Error(errorTxt);
					}

					if(typeof data['error'] === "string") {
						setErrors({"unknown": data['error']});
					} else {
						setErrors(data['error']);
					}
				} else if(data.posts == null) {
					setErrors({});
				} else {
					setErrors({});
					setPosts(data.posts);
				}
			} catch (err) {
				setErrors({"error": err.message});
			}
		}, 
		[]
	);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const deletePostHandler = (postId) => {
		return posts.filter((post) => post.ID !== postId);
	};

	const editPostHandler = () => {
		fetchPosts();
	};

	const postContent = posts.length === 0 ?
		<p>No posts yet</p>
		:
		<PostList
			posts={posts}
			onDeletePost={deletePostHandler}
			onEditPost={editPostHandler}
		/>;

	const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors);

	return (
		<section>
			{postContent}
			{errorContent}
		</section>
	);
};
