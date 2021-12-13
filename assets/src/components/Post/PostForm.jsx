import { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../../store/authContext';
import Errors from '../Errors/Errors';
import { FormBlock, Form } from "./styled"

export default function PostForm(post) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [errors, setErrors] = useState({});
	const context = useContext(AuthContext);

	const populateFields = useCallback(() => {
		if(post) {
			setTitle(post.Title);
			setContent(post.Content);
		}
	}, [post]);

	useEffect(() => {
		populateFields();
	}, [populateFields]);

	const titleChangeHandler = (e) => {
		setTitle(e.target.value);
	};

	const contentChangeHandler = (e) => {
		setContent(e.target.value);
	};

	async function submitHandler(e) {
		e.preventDefault();
		setErrors({});

		try {
			const method = post.editPostHandler ? 'PUT' : 'POST';
			let body = {
				Title: title,
				Content: content
			};

			if(post.editPostHandler) {
				body.ID = post.ID;
			};
			const res = await fetch('/api/v1/posts',
				{
					method: method,
					body: JSON.stringify(body),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${context.token}`
					}
				}
			);

			const data = await res.json();
			if(!res.ok) {
				let errorTxt = 'Post creation process failed';
				if(!data.hasOwnProperty('error')) {
					throw new Error(errorTxt);
				}
				if(typeof data['error'] === 'string') {
					setErrors({'unknown': data['error']});
				} else {
					setErrors(data['error']);
				}
			} else {
				setTitle('');
				setContent('');
				if(post.addPostHandler) {
					post.addPostHandler(data.data);
				}
				if(post.editPostHandler) {
					post.editPostHandler(data.data);
				}
			}
		} catch (err) {
			setErrors({"error": err.message});
		}
	}

	const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors);
	const submitBtn = post.editPostHandler ? 'Edit post' : 'Create post';

	return (
		<FormBlock>
			<h4>Create post</h4>
			<Form onSubmit={submitHandler}>
				<div>
					<input
						type="text"
						placeholder="Post title"
						value={title}
						onChange={titleChangeHandler}
					/>
				</div>
				<div>
					<textarea
						type="text"
						rows={5}
						placeholder="Content"
						value={content}
						onChange={contentChangeHandler}
					/>
				</div>
				<button>{submitBtn}</button>
			</Form>
			{errorContent}
		</FormBlock> 
	)
};
