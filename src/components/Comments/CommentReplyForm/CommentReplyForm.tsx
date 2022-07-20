import { useRef } from 'react';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';

import { useComments } from 'context';
import { CommentReply } from 'models';

import styles from './CommentReplyForm.module.css';

type Props = {};

const CommentReplyForm: React.FC<Props> = props => {
    const replyInputRef = useRef<HTMLTextAreaElement>(null);
    const commentsCtx = useComments();

    const userImg = require(`assets/avatars/image-${commentsCtx.currentUser}.png`);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (replyInputRef.current!.value === '') return;

        const commentsWithReplies = [
            ...commentsCtx.comments,
            ...commentsCtx.comments.map(c => c.replies).flat()
        ];

        const replyingToUser = commentsWithReplies.find(
            c => c.id === commentsCtx.commentReplyId
        );

        const commentReply = new CommentReply(
            commentsCtx.currentUser,
            replyingToUser?.user.username || '',
            replyInputRef.current!.value
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
