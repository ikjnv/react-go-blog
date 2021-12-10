export default function PostForm() {
	return (
		<>
			<h4>Create post</h4>
			<form>
				<input type="text" placeholder="Post title" />
				<input type="text" placeholder="Content" />
				<input type="submit" value="Create" />
			</form>
		</>
	)
};
