import { useState, useEffect } from 'react';

import { useComments } from 'context';
import { Comment, CommentReply } from 'models';

import styles from './CommentScore.module.css';

type Props = { comment: Comment | CommentReply };

const CommentScore: React.FC<Props> = props => {
    const [score, setScore] = useState(props.comment.score);
    const commentsCtx = useComments();

    console.log(props.comment.score, score);

    const handleScoreIncrease = () => {
        if (score >= props.comment.score + 1) return;
        setScore(score => score + 1);
    };

    const handleScoreDecrease = () => {
        if (score <= props.comment.score - 1 || score < 1) return;
        setScore(score => score - 1);
    };

    useEffect(() => {
        commentsCtx.updateScore(props.comment.id, score);
    }, [score]);

    return (
        <div className={styles.commentScore}>
            <button onClick={handleScoreIncrease}>+</button>
            <span>{props.comment.updatedScore}</span>
            <button onClick={handleScoreDecrease}>&mdash;</button>
        </div>
    );
};

export default CommentScore;
