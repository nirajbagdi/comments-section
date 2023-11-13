import { CommentList, AddCommentForm } from 'components/Comments';
import { useAppContext } from 'store/context';

const App = () => {
	const appContext = useAppContext();

	return (
		<div className="container">
			<CommentList comments={appContext.comments} />
			<AddCommentForm />
		</div>
	);
};

export default App;
