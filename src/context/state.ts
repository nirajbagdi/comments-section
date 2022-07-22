import { Comment, CommentReply } from 'models';
import commentsData from 'data/commentsData.json';

export type ContextState = {
    comments: Comment[] | CommentReply[];
    currentUser: string;
    commentReplyId: number | null;
    commentEditId: number | null;
    commentDeleteId: number | null;
    setCommentReplyId: (id: number | null) => void;
    setCommentEditId: (id: number | null) => void;
    setCommentDeleteId: (id: number | null) => void;
    replyComment: (replyObj: CommentReply) => void;
    editComment: (editedText: string) => void;
    deleteComment: (commentId: number) => void;
};

export const initialState: ContextState = {
    comments: commentsData.comments,
    currentUser: commentsData.currentUser.username,
    commentReplyId: null,
    commentEditId: null,
    commentDeleteId: null,
    setCommentReplyId: id => {},
    setCommentEditId: id => {},
    setCommentDeleteId: id => {},
    replyComment: replyObj => {},
    editComment: editedText => {},
    deleteComment: commentId => {}
};
