import { ContextState } from './state';
import { updateRepliedComments, updateCommentContent } from './utils';
import { CommentReply } from 'models';

export enum ReducerActions {
    SET_COMMENT_REPLY_ID = 'SET_COMMENT_REPLY_ID',
    SET_COMMENT_EDIT_ID = 'SET_COMMENT_EDIT_ID',
    REPLY_COMMENT = 'REPLY_COMMENT',
    EDIT_COMMENT = 'EDIT_COMMENT'
}

type ReducerAction =
    | {
          type: ReducerActions.SET_COMMENT_REPLY_ID;
          payload: number | null;
      }
    | {
          type: ReducerActions.SET_COMMENT_EDIT_ID;
          payload: number | null;
      }
    | {
          type: ReducerActions.REPLY_COMMENT;
          payload: CommentReply;
      }
    | {
          type: ReducerActions.EDIT_COMMENT;
          payload: string;
      };

export const reducer = (state: ContextState, action: ReducerAction): ContextState => {
    switch (action.type) {
        case ReducerActions.SET_COMMENT_REPLY_ID: {
            return { ...state, commentReplyId: action.payload };
        }

        case ReducerActions.SET_COMMENT_EDIT_ID: {
            return { ...state, commentEditId: action.payload };
        }

        case ReducerActions.REPLY_COMMENT: {
            const updatedComments = updateRepliedComments(
                state.commentReplyId as number,
                action.payload,
                state.comments
            );

            return { ...state, comments: updatedComments };
        }

        case ReducerActions.EDIT_COMMENT: {
            const updatedComments = updateCommentContent(
                state.commentEditId as number,
                action.payload,
                state.comments
            );

            return { ...state, comments: updatedComments };
        }

        default:
            return state;
    }
};
