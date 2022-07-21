import { useRef } from 'react';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';

import { useComments } from 'context';
import { deepFindCommentReplies } from 'utils';
import { CommentReply } from 'models';

import styles from './CommentReplyForm.module.css';

const CommentReplyForm = () => {
    const replyInputRef = useRef<HTMLTextAreaElement>(null);
    const commentsCtx = useComments();

    const userImg = require(`assets/avatars/image-${commentsCtx.currentUser}.png`);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const replyContent = replyInputRef.current!.value;
        if (!replyContent.trim().length) return;

        const replyingToComment = deepFindCommentReplies(
            commentsCtx.commentReplyId as number,
            commentsCtx.comments
        );

        const commentReply = new CommentReply(
            commentsCtx.currentUser,
            replyingToComment.user.username,
            replyContent
        );

        commentsCtx.replyComment(commentReply);
        commentsCtx.setCommentReplyId(null);
    };

    return (
        <form className={styles.replyForm} onSubmit={handleFormSubmit}>
            <img src={userImg} alt={commentsCtx.currentUser} />
            <Input ref={replyInputRef} input={{ placeholder: 'Add a reply...' }} />
            <Button variant="contained-primary" label="Reply" />
        </form>
    );
};

export default CommentReplyForm;
