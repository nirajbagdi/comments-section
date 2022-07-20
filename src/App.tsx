import CommentItem from 'components/Comments/CommentItem';
import { useComments } from 'context';

const App = () => {
    const { comments } = useComments();

    return (
        <div className="container">
            {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default App;
