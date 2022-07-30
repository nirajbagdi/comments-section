import { Comment, CommentReply } from 'models';

export const deepFindCommentReplies = (
    commentId: number,
    comments: Comment[] | CommentReply[]
): Comment | CommentReply => {
    let result: any;

    comments.some(
        comment =>
            (comment.id === commentId && (result = comment)) ||
            (result = deepFindCommentReplies(commentId, comment?.replies || []))
    );

    return result;
};

export const getCommentElapsedTime = (commentDate: Date) => {
    const currDate = Date.now();
    let timeDiff = Math.floor((+currDate - +commentDate) / 1000);

    const secondsLeft = timeDiff % 60;
    timeDiff = Math.floor(timeDiff / 60);

    const minutesLeft = timeDiff % 60;
    timeDiff = Math.floor(timeDiff / 60);

    const hoursLeft = timeDiff % 24;
    timeDiff = Math.floor(timeDiff / 24);

    const daysLeft = timeDiff;

    if (daysLeft > 0) return `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} ago`;
    if (hoursLeft > 0) return `${hoursLeft} ${hoursLeft === 1 ? 'hour' : 'hours'} ago`;
    if (minutesLeft > 0) return `${minutesLeft} ${minutesLeft === 1 ? 'minute' : 'minutes'} ago`;
    return 'Just now';
};
