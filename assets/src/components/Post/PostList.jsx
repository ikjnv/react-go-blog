import Post from './Post';

export default function PostList(props) {
	return (
		<ul>
			{props.posts && props.posts.map((post) => (
				<Post
					key={post.ID}
					onDelete={props.onDeleteHandler}
					onEdit={props.onEditHandler}
					post={post}
				/>
			))}
		</ul>
	)
};
