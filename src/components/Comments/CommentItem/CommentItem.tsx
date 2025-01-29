import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { motion } from 'framer-motion';
import { useAppContext } from 'store/context';
import {
    CommentActions,
    CommentHeader,
    CommentScore,
    CommentContent,
    CommentList,
    CommentDeleteModal,
    CommentEditForm,
    CommentReplyForm,
} from 'components/Comments';
import { IComment } from 'models';
import styles from './CommentItem.module.scss';

interface Props {
    comment: IComment;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [hasEdited, setHasEdited] = useState(false);

    const appContext = useAppContext();
    const isCurrentUser = comment.user.username === appContext.currentUser.username;

    const handleDelete = () => setIsDeleting(true);
    const handleCancelDelete = () => setIsDeleting(false);
    const handleConfirmDelete = () => appContext.deleteComment(comment.id);

    const handleEdit = () => setIsEditing(true);

    const handleConfirmEdit = (contentValue: string) => {
        if (!contentValue.trim().length || contentValue === comment.content) {
            setIsEditing(false);
            return;
        }

        const updatedComment: IComment = {
            ...comment,
            content: contentValue,
            createdAt: new Date().toISOString(),
        };

        appContext.updateComment(updatedComment);
        setIsEditing(false);
        setHasEdited(true);
    };

    const handleReply = () => setIsReplying(true);

    const handleConfirmReply = (contentValue: string) => {
        const repliedComment: IComment = {
            id: uuid(),
            content: contentValue,
            createdAt: new Date().toISOString(),
            user: appContext.currentUser,
            replyingTo: comment.user.username,
            score: 0,
        };

        appContext.addReply(comment.id, repliedComment);
        setIsReplying(false);
    };

    const commentRepliesContent = comment.replies &&
        comment.replies.length !== 0 && (
            <div className={styles.replies}>
                <CommentList comments={comment.replies} />
            </div>
        );

    return (
        <>
            {isDeleting && (
                <CommentDeleteModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            <motion.div
                layout
                initial={{ opacity: 0, y: -80, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={styles.comment}
            >
                <CommentScore comment={comment} isCurrentUser={isCurrentUser} />

                <CommentHeader
                    user={comment.user}
                    createdAt={comment.createdAt}
                    isCurrentUser={isCurrentUser}
                    hasEdited={hasEdited}
                />

                {isEditing ? (
                    <CommentEditForm
                        defaultValue={comment.content}
                        onFormSubmit={handleConfirmEdit}
                    />
                ) : (
                    <CommentContent
                        replyingTo={comment.replyingTo ?? ''}
                        content={comment.content}
                    />
                )}

                <CommentActions
                    isCurrentUser={isCurrentUser}
                    onCommentDelete={handleDelete}
                    onCommentEdit={handleEdit}
                    onCommentReply={handleReply}
                />
            </motion.div>

            {isReplying && (
                <CommentReplyForm
                    currentUser={appContext.currentUser}
                    onFormSubmit={handleConfirmReply}
                />
            )}

            {commentRepliesContent}
        </>
    );
};

export default CommentItem;
