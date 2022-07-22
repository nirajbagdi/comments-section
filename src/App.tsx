import CommentItem from 'components/Comments/CommentItem';
import AddCommentForm from 'components/Comments/AddCommentForm';

import { useComments } from 'context';

const App = () => {
    const { comments, currentUser } = useComments();

    return (
        <div className="container">
            {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
            ))}

            <AddCommentForm currentUser={currentUser} />
        </div>
    );
};

export default App;
