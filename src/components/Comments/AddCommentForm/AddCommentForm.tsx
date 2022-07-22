import { useRef } from 'react';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';

import { useComments } from 'context';
import { Comment } from 'models';

import styles from './AddCommentForm.module.css';

type Props = {
    currentUser: string;
};

const AddCommentForm: React.FC<Props> = props => {
    const textInputRef = useRef<HTMLTextAreaElement>(null);
    const commentsCtx = useComments();

    const userImg = require(`assets/avatars/image-${props.currentUser}.png`);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const commentText = textInputRef.current!.value;
        if (!commentText.trim().length) return;

        const commentObj = new Comment(commentsCtx.currentUser, commentText);
        commentsCtx.addComment(commentObj);
        textInputRef.current!.value = '';
    };

    return (
        <form className={styles.addForm} onSubmit={handleFormSubmit}>
            <img src={userImg} alt={props.currentUser} />
            <Input ref={textInputRef} input={{ placeholder: 'Add a comment...' }} />
            <Button variant="contained-primary" label="Send" />
        </form>
    );
};

export default AddCommentForm;
