import { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../../store/authContext';
import {PostProps} from './interfaces';
import { FormBlock, Form } from "./styled"

export default function PostForm(post: PostProps) {
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
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

	async function submitHandler(e: React.FormEvent) {
		e.preventDefault();
		setErrors({});

		try {

		const res = await fetch('/api/v1/posts',
			{
				method: 'POST',
				body: JSON.stringify({
					Title: title,
					Content: content,
				}),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${context.token}`
				}
			}
		);

		const data = await res.json();
		if(!res.ok) {
			let errorTxt = loggingIn ? 'Login failed' : 'Sign up failed';
			
			if(!data.hasOwnProperty('error')) {
				throw new Error(errorTxt);
			}

			if(typeof data.error === 'string') {
				setErrors({'unknown': data.error});
			} else {
				setErrors(data.error);
			}
		}

		} catch (err) {
			setErrors({ "error": err.message });
		}
	}

	return (
		<FormBlock>
			<h4>Create post</h4>
			<Form onSubmit={submitHandler}>
				<div>
					<input
						type="text"
						placeholder="Post title"
						value={title}
					/>
				</div>
				<div>
					<input
						type="text"
						placeholder="Content"
						value={content}
					/>
				</div>
				<button>Create</button>
			</Form>
		</FormBlock> 
	)
};