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
