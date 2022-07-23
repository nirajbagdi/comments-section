import styles from './CommentContent.module.css';

type Props = {
    replyingTo: string;
    content: string;
};

const CommentContent: React.FC<Props> = props => (
    <blockquote className={styles.commentContent}>
        {props.replyingTo !== '' && (
            <a href="/" className={styles.replyingTo}>
                @{props.replyingTo}
            </a>
        )}{' '}
        {props.content}
    </blockquote>
);

export default CommentContent;
