import { IComment } from 'models';
import { CommentItem } from 'components/Comments';

interface Props {
	comments: IComment[];
}

const CommentList: React.FC<Props> = ({ comments }) => (
	<>
		{comments.map(comment => (
			<CommentItem key={comment.id} comment={comment} />
		))}
	</>
);

export default CommentList;
