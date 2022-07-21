import { Comment, CommentReply } from 'models';

export const updateRepliedComments = (
    replyId: number,
    replyObj: CommentReply,
    comments: Comment[] | CommentReply[]
) => {
    const updatedComments = comments.map(comment => {
        const hasReplies = comment.replies?.some(r => r.id === replyId);
        const hasDeepReplies = comment.replies?.some(r => r.replies?.length !== 0);

        if (comment.id === replyId)
            return { ...comment, replies: [replyObj, ...(comment.replies || [])] };

        if (hasReplies) {
            const updatedReplies = comment.replies!.map(reply => {
                return reply.id === replyId
                    ? { ...reply, replies: [replyObj, ...(reply?.replies || [])] }
                    : reply;
            });

            return { ...comment, replies: updatedReplies };
        }

        if (hasDeepReplies) {
            const updatedDeepReplies = updateRepliedComments(
                replyId,
                replyObj,
                comment.replies || []
            ) as CommentReply[];

            return { ...comment, replies: updatedDeepReplies };
        }

        return comment;
    });

    return updatedComments as Comment[] | CommentReply[];
};