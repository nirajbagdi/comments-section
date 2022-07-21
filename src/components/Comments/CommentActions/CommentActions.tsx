import { ReactComponent as IconReply } from 'assets/icon-reply.svg';
import { ReactComponent as IconDelete } from 'assets/icon-delete.svg';
import { ReactComponent as IconEdit } from 'assets/icon-edit.svg';

import Button from 'components/UI/Button';

import styles from './CommentActions.module.css';

type Props = {
    isCurrentUser: boolean;
    onCommentReply: () => void;
    onCommentEdit: () => void;
    onCommentDelete: () => void;
};

const CommentActions: React.FC<Props> = props => {
    const globalUserActions = (
        <Button
            variant="outline-primary"
            label="Reply"
            iconElement={<IconReply />}
            onClick={props.onCommentReply}
        />
    );

    const currentUserActions = (
        <>
            <Button
                variant="outline-danger"
                label="Delete"
                iconElement={<IconDelete />}
                onClick={props.onCommentDelete}
            />

            <Button
                variant="outline-primary"
                label="Edit"
                iconElement={<IconEdit />}
                onClick={props.onCommentEdit}
            />
        </>
    );

    return (
        <div className={styles.commentActions}>
            {props.isCurrentUser ? currentUserActions : globalUserActions}
        </div>
    );
};

export default CommentActions;
