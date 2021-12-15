import { useState, useEffect, useCon, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/authContext';
import { FormBlock } from './styled';
import Errors from '../Errors/Errors';

export default function ProjectForm() {
	const navigate = useNavigate();
	const context = useContext(AuthContext);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState('');
	const [errors, setErrors] = useState({});

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDescChange = (e) => {
		setDescription(e.target.value);
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	async function handleSubmit(e) {
		e.preventDefault();

		const fd = new FormData();
		fd.append('Title', title);
		fd.append('Description', description);
		fd.append('file', file);

		try {
			const res = await fetch('/api/v1/projects',
				{
					method: 'POST',
					body: fd,
					headers: {
						'Authorization': `Bearer ${context.token}`
					}
				}
			);

			const data = await res.json();
			if(!res.ok) {
				let errorTxt = 'Error while creating project';
				if(!data.hasOwnProperty('error')) {
					throw new Error(errorTxt);
				}

				if(typeof data['error'] === 'string') {
					setErrors({'unknown': data['error']});
				} else {
					setErrors(data['error']);
				}
			} else {
				console.log('success: ', data.data);
				navigate('/', { replace: true });
			}
		} catch (err) {
			setErrors({'error': err.message});
		}
	};

	const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors);
	
	return (
		<FormBlock>
			<h4>Project details</h4>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type="text"
						onChange={handleTitleChange}
						value={title}
						required
					/>
				</div>
				<div>
					<input
						type="text"
						rows={5}
						onChange={handleDescChange}
						value={description}
					/>
				</div>
				<div>
					<input
						type="file"
						onChange={handleFileChange}
					/>
				</div>
				<button>Submit</button>
			</form>
			{errorContent}
		</FormBlock>
	);
};
