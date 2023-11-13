import { formatDistanceToNow } from 'date-fns';

export const formatCommentTime = (dateString: string) => {
	const date = new Date(dateString);
	return formatDistanceToNow(date, { addSuffix: true });
};
