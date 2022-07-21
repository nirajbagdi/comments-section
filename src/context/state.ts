import { Comment, CommentReply } from 'models';
import commentsData from 'data/commentsData.json';

export type ContextState = {
    comments: Comment[] | CommentReply[];
    currentUser: string;
    commentReplyId: number | null;
    commentEditId: number | null;
    setCommentReplyId: (id: number | null) => void;
    setCommentEditId: (id: number | null) => void;
    replyComment: (replyObj: CommentReply) => void;
    editComment: (editedText: string) => void;
};

export const initialState: ContextState = {
    comments: commentsData.comments,
    currentUser: commentsData.currentUser.username,
    commentReplyId: null,
    commentEditId: null,
    setCommentReplyId: id => {},
    setCommentEditId: id => {},
    replyComment: replyObj => {},
    editComment: editedText => {}
};
