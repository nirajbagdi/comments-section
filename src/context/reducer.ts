import { ContextState } from './state';
import { CommentReply, Comment } from 'models';

export enum ReducerActions {
    SET_COMMENT_REPLY_ID = 'SET_COMMENT_REPLY_ID',
    SET_COMMENT_EDIT_ID = 'SET_COMMENT_EDIT_ID',
    SET_COMMENT_DELETE_ID = 'SET_COMMENT_DELETE_ID',
    REPLY_COMMENT = 'REPLY_COMMENT',
    EDIT_COMMENT = 'EDIT_COMMENT',
    DELETE_COMMENT = 'DELETE_COMMENT'
}

type ReducerAction =
    | { type: ReducerActions.SET_COMMENT_REPLY_ID; payload: number | null }
    | { type: ReducerActions.SET_COMMENT_EDIT_ID; payload: number | null }
    | { type: ReducerActions.SET_COMMENT_DELETE_ID; payload: number | null }
    | { type: ReducerActions.REPLY_COMMENT; payload: CommentReply }
    | { type: ReducerActions.EDIT_COMMENT; payload: string }
    | { type: ReducerActions.DELETE_COMMENT; payload: number };

export const reducer = (state: ContextState, action: ReducerAction): ContextState => {
    switch (action.type) {
        case ReducerActions.SET_COMMENT_REPLY_ID: {
            return { ...state, commentReplyId: action.payload };
        }

        case ReducerActions.SET_COMMENT_EDIT_ID: {
            return { ...state, commentEditId: action.payload };
        }

        case ReducerActions.SET_COMMENT_DELETE_ID: {
            return { ...state, commentDeleteId: action.payload };
        }

        case ReducerActions.REPLY_COMMENT: {
            const updatedComments = state.comments.map(comment => {
                const hasReplies = comment.replies?.some(r => r.id === state.commentReplyId);

                if (comment.id === state.commentReplyId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), action.payload]
                    };
                }

                if (hasReplies) {
                    const updatedReplies = [...(comment.replies || []), action.payload];
                    return { ...comment, replies: updatedReplies };
                }

                return comment;
            });

            return { ...state, comments: updatedComments as Comment[] | CommentReply[] };
        }

        case ReducerActions.EDIT_COMMENT: {
            const updatedComments = state.comments.map(comment => {
                const hasReplies = comment.replies?.some(r => r.id === state.commentEditId);

                if (comment.id === state.commentEditId) {
                    return { ...comment, content: action.payload };
                }

                if (hasReplies) {
                    const updatedReplies = comment.replies!.map(reply => {
                        return reply.id === state.commentEditId
                            ? { ...reply, content: action.payload }
                            : reply;
                    });

                    return { ...comment, replies: updatedReplies };
                }

                return comment;
            });

            return { ...state, comments: updatedComments as Comment[] | CommentReply[] };
        }

        case ReducerActions.DELETE_COMMENT: {
            const comments = state.comments as Comment[];

            const updatedComments = comments.filter(comment => {
                const hasReplies = comment.replies?.some(r => r.id === state.commentDeleteId);

                if (hasReplies) {
                    const updatedReplies = comment.replies.filter(r => r.id !== state.commentDeleteId);
                    comment.replies = [...updatedReplies];
                }

                return comment.id !== state.commentDeleteId;
            });

            return { ...state, comments: updatedComments };
        }

        default:
            return state;
    }
};
