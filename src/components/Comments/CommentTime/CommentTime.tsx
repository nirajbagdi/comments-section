import { useState, useEffect } from 'react';
import { formatCommentTime } from 'utils';

interface Props {
	date: string;
}

const CommentTime: React.FC<Props> = ({ date }) => {
	const [timeAgo, setTimeAgo] = useState(() => formatCommentTime(date));

	useEffect(() => {
		const updateTime = () => setTimeAgo(formatCommentTime(date));

		updateTime();
		const intervalID = setInterval(updateTime, 60000);
		return () => clearInterval(intervalID);
	}, [date]);

	return <p>{timeAgo}</p>;
};

export default CommentTime;
