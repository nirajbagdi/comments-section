import Modal from 'components/UI/Modal';
import Button from 'components/UI/Button';

import styles from './CommentDeleteModal.module.css';

type Props = {
    onCancel: () => void;
    onConfirm: () => void;
};

const CommentDeleteModal: React.FC<Props> = props => {
    return (
        <Modal onClose={props.onCancel}>
            <div className={styles.deleteModalContent}>
                <h2>Delete comment</h2>

                <p>
                    Are you sure you want to delete this comment? This will remove the comment and can't be
                    undone.
                </p>

                <div className={styles.deleteModalActions}>
                    <Button variant="contained-secondary" label="No, Cancel" onClick={props.onCancel} />
                    <Button variant="contained-danger" label="Yes, Delete" onClick={props.onConfirm} />
                </div>
            </div>
        </Modal>
    );
};

export default CommentDeleteModal;
