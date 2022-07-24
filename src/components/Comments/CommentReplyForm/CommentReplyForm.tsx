import { useRef, useEffect } from 'react';

import { motion } from 'framer-motion';

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

    useEffect(() => {
        replyInputRef.current!.focus();
    }, []);

    return (
        <motion.form
            className={styles.replyForm}
            onSubmit={handleFormSubmit}
            initial={{ y: -50, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <img src={userImg} alt={commentsCtx.currentUser} />
            <Input ref={replyInputRef} input={{ placeholder: 'Add a reply...' }} />
            <Button variant="contained-primary" label="Reply" />
        </motion.form>
    );
};

export default CommentReplyForm;
