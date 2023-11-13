import { useState, useEffect } from 'react';
import { useAppContext } from 'store/context';
import { IComment } from 'models';
import styles from './CommentScore.module.scss';

interface Props {
	comment: IComment;
	isCurrentUser: boolean;
}

const CommentScore: React.FC<Props> = ({ comment, isCurrentUser }) => {
	const [score, setScore] = useState(comment.score);
	const [scoreScale, setScoreScale] = useState(1);

	const [hasScoreUpdated, setHasScoreUpdated] = useState<boolean>(
		() => JSON.parse(localStorage.getItem(`hasScoreUpdated_${comment.id}`)!) || false
	);

	const appContext = useAppContext();

	useEffect(() => {
		if (hasScoreUpdated) {
			appContext.updateScore(comment.id, score);
			setScoreScale(1.8);

			const timeout = setTimeout(() => setScoreScale(1), 200);
			return () => clearTimeout(timeout);
		}

		// eslint-disable-next-line
	}, [hasScoreUpdated, score]);

	const handleScoreUpdate = (type: 'inc' | 'dec') => {
		if (!hasScoreUpdated && !isCurrentUser) {
			setScore(prev => (type === 'inc' ? prev + 1 : prev - 1));
			setHasScoreUpdated(true);
			localStorage.setItem(`hasScoreUpdated_${comment.id}`, 'true');
		}
	};

	return (
		<div className={styles.score}>
			<button
				onClick={() => handleScoreUpdate('inc')}
				disabled={hasScoreUpdated || isCurrentUser}
			>
				+
			</button>

			<p style={{ transform: `scale(${scoreScale})` }}>{score}</p>

			<button
				onClick={() => handleScoreUpdate('dec')}
				disabled={hasScoreUpdated || isCurrentUser}
			>
				—
			</button>
		</div>
	);
};

export default CommentScore;
