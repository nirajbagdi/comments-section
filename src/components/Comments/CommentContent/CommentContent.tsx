import styles from './CommentContent.module.scss';

interface Props {
	replyingTo: string;
	content: string;
}

const CommentContent: React.FC<Props> = ({ replyingTo, content }) => {
	return (
		<p className={styles.text}>
			{replyingTo && <span className={styles.replyingTo}>@{replyingTo}</span>} {content}
		</p>
	);
};

export default CommentContent;
