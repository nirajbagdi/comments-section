import { Comment, CommentReply } from 'models';
import commentsData from 'data/commentsData.json';

export type ContextState = {
    comments: Comment[] | CommentReply[];
    currentUser: string;
    commentReplyId: number | null;
    setCommentReplyId: (id: number | null) => void;
    replyComment: (replyObj: CommentReply) => void;
};

export const initialState: ContextState = {
    comments: commentsData.comments,
    currentUser: commentsData.currentUser.username,
    commentReplyId: null,
    setCommentReplyId: id => {},
    replyComment: replyObj => {}
};
