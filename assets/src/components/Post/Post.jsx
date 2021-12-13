import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/authContext';
import Errors from '../Errors/Errors';
import PostForm from './PostForm';
import { BtnBlock, EditBtnBlock, EditPostBody, EditTitleBlock, PostBlock, PostBody, TitleBlock } from './styled';

export default function Post(props) {
	const context = useContext(AuthContext);
	const [editing, setEditing] = useState(false);
	const [errors, setErrors] = useState({});

	const switchMode = () => {
		setEditing(prevState => !prevState);
		setErrors({});
	};

	async function deleteHandler() {
		try {
			const res = await fetch(`/api/v1/posts/${props.post.ID}`,
				{
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${context.token}`
					}
				}
			);

			const data = await res.json();
			if(!res.ok) {
				let errorTxt = 'Could not delete post';
				
				if(!data.hasOwnProperty('error')) {
					throw new Error(errorTxt);
				}

				if(typeof data['error'] === 'string') {
					setErrors({'unknown': data['error']});
				} else {
					setErrors(data['error']);
				}
			} else {
				props.onDeletePost(props.post.ID);
			}
		} catch (err) {
			setErrors({'error': err.message});
		};	
	};

	const editPostHandler = () => {
		setEditing(false);
		props.onEditPost();
	};

	const titleContent = editing ? <EditTitleBlock>Editing</EditTitleBlock> : <TitleBlock>{props.post.Title}</TitleBlock>;
	const postBody = editing ? 
			<EditPostBody>
				<PostForm post={props.post} onEditPost={editPostHandler} editing={true} />
			</EditPostBody>
			:
			<PostBody>
				{props.post.Content}
			</PostBody>
	const switchModeBtn = editing ? 'Cancel' : 'Edit';
	const btns = editing ?
		<EditBtnBlock>
			<Link to="#" onClick={switchMode}>{switchModeBtn}</Link>
			<button onClick={deleteHandler}>Delete</button>
		</EditBtnBlock>
		:
		<BtnBlock>
			<Link to="#" onClick={switchMode}>{switchModeBtn}</Link>
			<button onClick={deleteHandler}>Delete</button>
		</BtnBlock>
	
	const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors);

	return (
		<PostBlock>
			{titleContent}
			{postBody}
			{btns}
			{errorContent}
		</PostBlock>
	)
};
