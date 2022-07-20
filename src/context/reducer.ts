import { ContextState } from './state';
import { Comment, CommentReply } from 'models';

export enum ReducerActions {
    SET_COMMENT_REPLY_ID = 'SET_COMMENT_REPLY_ID',
    REPLY_COMMENT = 'REPLY_COMMENT'
}

type ReducerAction =
    | {
          type: ReducerActions.SET_COMMENT_REPLY_ID;
          payload: number | null;
      }
    | {
          type: ReducerActions.REPLY_COMMENT;
          payload: CommentReply;
      };

export const reducer = (state: ContextState, action: ReducerAction): ContextState => {
    switch (action.type) {
        case ReducerActions.SET_COMMENT_REPLY_ID:
            return { ...state, commentReplyId: action.payload };

        case ReducerActions.REPLY_COMMENT:
            const updatedComments = state.comments.map(comment => {
                if (comment.id === state.commentReplyId) {
                    return { ...comment, replies: [action.payload, ...comment.replies] };
                }

                if (comment.replies?.some(r => r.id === state.commentReplyId)) {
                    const updatedReplies = comment.replies.map(reply => {
                        if (reply.id === state.commentReplyId) {
                            return {
                                ...reply,
                                replies: [action.payload, ...(reply?.replies || [])]
                            };
                        }

                        return reply;
                    });

                    return { ...comment, replies: updatedReplies };
                }

                return comment;
            });

            return { ...state, comments: updatedComments };

        default:
            return state;
    }
};
