import CommentHeader from 'components/Comments/CommentHeader';
import CommentScore from 'components/Comments/CommentScore';
import CommentContent from 'components/Comments/CommentContent';
import Button from 'components/UI/Button';

import { ReactComponent as IconReply } from 'assets/icon-reply.svg';

import { useComments } from 'context';
import { Comment, CommentReply } from 'models';

import styles from './CommentItem.module.css';

type Props = {
    comment: Comment | CommentReply;
};

const CommentItem: React.FC<Props> = props => {
    const commentsCtx = useComments();

    const isCurrentUser = props.comment.user.username === commentsCtx.currentUser;

    return (
        <>
            <div className={styles.comment}>
                <CommentScore score={props.comment.score} />

                <CommentHeader
                    username={props.comment.user.username}
                    createdAt={props.comment.createdAt}
                    isCurrentUser={isCurrentUser}
                />

                <div className={styles.commentActions}>
                    <Button
                        variant="outline-primary"
                        label="Reply"
                        iconElement={<IconReply />}
                    />
                </div>

                <CommentContent
                    content={props.comment.content}
                    replyingTo={props.comment.replyingTo || ''}
                />
            </div>

            {props.comment.replies?.map(commentReply => (
                <div className={styles.commentReply} key={commentReply.id}>
                    <CommentItem comment={commentReply} />
                </div>
            ))}
        </>
    );
};

export default CommentItem;