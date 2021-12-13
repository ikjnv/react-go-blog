import { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../../store/authContext';
import Errors from '../Errors/Errors';
import { FormBlock, Form } from "./styled"

export default function PostForm(props) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [errors, setErrors] = useState({});
	const context = useContext(AuthContext);

	const populateFields = useCallback(() => {
		if(props.post) {
			setTitle(props.post.Title);
			setContent(props.post.Content);
		}
	}, [props.post]);

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
			const method = props.onEditPost ? 'PUT' : 'POST';
			let body = {
				Title: title,
				Content: content
			};
			if(props.onEditPost) {
				body.ID = props.post.ID;
			};
			const res = await fetch('/api/v1/posts',
				{
					method: method,
					body: JSON.stringify(body),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${context.token}`
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
				if(props.onAddPost) {
					props.onAddPost(data.data);
				}
				if(props.onEditPost) {
					props.onEditPost(data.data);
				}
			}
		} catch (err) {
			setErrors({"error": err.message});
		}
	}

	const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors);
	const submitBtn = props.onEditPost ? 'Edit post' : 'Create post';

	return (
		<FormBlock>
			<Form onSubmit={submitHandler}>
				<div>
					<input
						type="text"
						placeholder="Post title"
						required
						value={title}
						onChange={titleChangeHandler}
					/>
				</div>
				<div>
					<textarea
						type="text"
						rows={5}
						required
						placeholder="Content"
						value={content}
						onChange={contentChangeHandler}
					/>
				</div>
				<div>
					<button>{submitBtn}</button>
				</div>
			</Form>
			{errorContent}
		</FormBlock> 
	)
};
