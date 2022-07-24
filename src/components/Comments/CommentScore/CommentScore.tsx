import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import { useComments } from 'context';
import { Comment, CommentReply } from 'models';

import styles from './CommentScore.module.css';

type Props = { comment: Comment | CommentReply };

const CommentScore: React.FC<Props> = props => {
    const [score, setScore] = useState(props.comment.score);
    const [scoreScale, setScoreScale] = useState(1);
    const commentsCtx = useComments();

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
        setScoreScale(1.3);

        const timer = setTimeout(() => setScoreScale(1), 300);
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [score]);

    return (
        <div className={styles.commentScore}>
            <button onClick={handleScoreIncrease}>+</button>
            <motion.span animate={{ scale: scoreScale }}>
                {props.comment.updatedScore || props.comment.score}
            </motion.span>
            <button onClick={handleScoreDecrease}>&mdash;</button>
        </div>
    );
};

export default CommentScore;
