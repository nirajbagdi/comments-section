import styles from './CommentScore.module.css';

type Props = { score: number };

const CommentScore: React.FC<Props> = props => {
    return (
        <div className={styles.commentScore}>
            <button>+</button>
            <span>{props.score}</span>
            <button>&mdash;</button>
        </div>
    );
};

export default CommentScore;
