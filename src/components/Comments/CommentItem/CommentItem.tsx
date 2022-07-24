import CommentReplyForm from 'components/Comments/CommentReplyForm';
import CommentEditForm from 'components/Comments/CommentEditForm';
import CommentDeleteModal from 'components/Comments/CommentDeleteModal';
import CommentHeader from 'components/Comments/CommentHeader';
import CommentScore from 'components/Comments/CommentScore';
import CommentContent from 'components/Comments/CommentContent';
import CommentActions from 'components/Comments/CommentActions';

import { useComments } from 'context';
import { Comment, CommentReply } from 'models';

import { motion } from 'framer-motion';

import styles from './CommentItem.module.css';

type Props = {
    comment: Comment | CommentReply;
};

const CommentItem: React.FC<Props> = props => {
    const commentsCtx = useComments();

    const isCurrentUser = props.comment.user.username === commentsCtx.currentUser;
    const isReplying = props.comment.id === commentsCtx.commentReplyId;
    const isEditing = props.comment.id === commentsCtx.commentEditId;
    const isDeleting = props.comment.id === commentsCtx.commentDeleteId;

    const handleCommentReply = () => commentsCtx.setCommentReplyId(props.comment.id);
    const handleCommentEdit = () => commentsCtx.setCommentEditId(props.comment.id);
    const handleCommentDelete = () => commentsCtx.setCommentDeleteId(props.comment.id);

    const handleCommentDeleteModalConfirm = () => commentsCtx.deleteComment(props.comment.id);
    const handleCommentDeleteModalCancel = () => commentsCtx.setCommentDeleteId(null);

    return (
        <div className={styles.commentContainer}>
            {isDeleting && (
                <CommentDeleteModal
                    onCancel={handleCommentDeleteModalCancel}
                    onConfirm={handleCommentDeleteModalConfirm}
                />
            )}

            <motion.div
                layout
                initial={{ opacity: 0, y: -100, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={styles.comment}
            >
                <CommentScore comment={props.comment} />

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

                {!isEditing && (
                    <CommentContent
                        content={props.comment.content}
                        replyingTo={props.comment.replyingTo || ''}
                    />
                )}

                {isEditing && <CommentEditForm defaultValue={props.comment.content} />}
            </motion.div>

            {isReplying && <CommentReplyForm />}

            <div className={styles.commentReplies}>
                {props.comment.replies?.map(commentReply => (
                    <div className={styles.commentReply} key={commentReply.id}>
                        <CommentItem comment={commentReply} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentItem;
