import { ReactComponent as IconReply } from 'assets/icon-reply.svg';
import { ReactComponent as IconDelete } from 'assets/icon-delete.svg';
import { ReactComponent as IconEdit } from 'assets/icon-edit.svg';
import { Button } from 'components/UI';
import styles from './CommentActions.module.scss';
import buttonStyles from 'components/UI/Button/Button.module.scss';

interface Props {
    isCurrentUser: boolean;
    isReplying: boolean;
    isEditing: boolean;
    isDeleting: boolean;
    onCommentDelete: () => void;
    onCommentEdit: () => void;
    onCommentReply: () => void;
}

const CommentActions: React.FC<Props> = ({
    isCurrentUser,
    isReplying,
    isEditing,
    isDeleting,
    onCommentDelete,
    onCommentEdit,
    onCommentReply,
}) => {
    const authorizedActionsContent = (
        <>
            <Button
                variant="outline-danger"
                iconElement={<IconDelete />}
                label="Delete"
                className={isDeleting ? buttonStyles.active : ''}
                onClick={onCommentDelete}
            />

            <Button
                variant="outline-primary"
                iconElement={<IconEdit />}
                label="Edit"
                className={isEditing ? buttonStyles.active : ''}
                onClick={onCommentEdit}
            />
        </>
    );

    const globalActionsContent = (
        <Button
            variant="outline-primary"
            iconElement={<IconReply />}
            label="Reply"
            className={isReplying ? buttonStyles.active : ''}
            onClick={onCommentReply}
        />
    );

    return (
        <div className={styles.actions}>
            {isCurrentUser ? authorizedActionsContent : globalActionsContent}
        </div>
    );
};

export default CommentActions;
