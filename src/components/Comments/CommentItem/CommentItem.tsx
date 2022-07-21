import CommentReplyForm from 'components/Comments/CommentReplyForm';
import CommentHeader from 'components/Comments/CommentHeader';
import CommentScore from 'components/Comments/CommentScore';
import CommentContent from 'components/Comments/CommentContent';
import CommentActions from 'components/Comments/CommentActions';

import { useComments } from 'context';
import { Comment, CommentReply } from 'models';

import styles from './CommentItem.module.css';

type Props = {
    comment: Comment | CommentReply;
};

const CommentItem: React.FC<Props> = props => {
    const commentsCtx = useComments();

    const isCurrentUser = props.comment.user.username === commentsCtx.currentUser;
    const isReplying = props.comment.id === commentsCtx.commentReplyId;

    const handleCommentReply = () => commentsCtx.setCommentReplyId(props.comment.id);
    const handleCommentEdit = () => {};
    const handleCommentDelete = () => {};

    return (
        <>
            <div className={styles.comment}>
                <CommentScore score={props.comment.score} />

                <CommentHeader
                    username={props.comment.user.username}
                    createdAt={props.comment.createdAt}
                    isCurrentUser={isCurrentUser}
                />

                <CommentActions
                    isCurrentUser={isCurrentUser}
                    onCommentDelete={handleCommentDelete}
                    onCommentEdit={handleCommentEdit}
                    onCommentReply={handleCommentReply}
                />

                <CommentContent
                    content={props.comment.content}
                    replyingTo={props.comment.replyingTo || ''}
                />
            </div>

            {isReplying && <CommentReplyForm />}

            {props.comment.replies?.map(commentReply => (
                <div className={styles.commentReply} key={commentReply.id}>
                    <CommentItem comment={commentReply} />
                </div>
            ))}
        </>
    );
};

export default CommentItem;
