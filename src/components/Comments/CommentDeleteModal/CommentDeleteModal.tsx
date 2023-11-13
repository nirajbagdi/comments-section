import { Modal, Button } from 'components/UI';
import styles from './CommentDeleteModal.module.scss';

interface Props {
	onConfirm: () => void;
	onCancel: () => void;
}

const CommentDeleteModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
	return (
		<Modal onClose={onCancel}>
			<div className={styles.deleteModalContent}>
				<h2>Delete Comment</h2>

				<p>
					Are you sure you want to delete this comment? This will remove the comment and
					can't be undone.
				</p>

				<div className={styles.deleteModalActions}>
					<Button variant="contained-secondary" label="No, Cancel" onClick={onCancel} />
					<Button variant="contained-danger" label="Yes, Delete" onClick={onConfirm} />
				</div>
			</div>
		</Modal>
	);
};

export default CommentDeleteModal;
