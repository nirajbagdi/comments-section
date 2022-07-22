import { useRef, useEffect } from 'react';

import Input from 'components/UI/Input';
import Button from 'components/UI/Button';

import { useComments } from 'context';

import styles from './CommentEditForm.module.css';

type Props = { defaultValue: string };

const CommentEditForm: React.FC<Props> = props => {
    const editInputRef = useRef<HTMLTextAreaElement>(null);
    const commentsCtx = useComments();

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const editedText = editInputRef.current!.value;
        if (!editedText.trim().length) return;

        commentsCtx.editComment(editedText);
        commentsCtx.setCommentEditId(null);
    };

    useEffect(() => {
        editInputRef.current!.focus();
    }, []);

    return (
        <form className={styles.editForm} onSubmit={handleFormSubmit}>
            <Input ref={editInputRef} input={{ defaultValue: props.defaultValue }} />
            <Button variant="contained-primary" label="Update" />
        </form>
    );
};

export default CommentEditForm;
