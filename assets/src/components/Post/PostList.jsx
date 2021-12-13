import Post from './Post';

export default function PostList(props) {
	return (
		<ul>
			{props.posts.map((post) => (
				<Post
					key={post.ID}
					onDeletePost={props.onDeletePost}
					onEditPost={props.onEditPost}
					post={post}
				/>
			))}
		</ul>
	)
};
