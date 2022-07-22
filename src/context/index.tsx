import { createContext, useContext, useReducer } from 'react';

import { CommentReply } from 'models';
import { initialState } from './state';
import { reducer, ReducerActions } from './reducer';

type Props = { children: React.ReactNode };

const CommentsContext = createContext(initialState);
export const useComments = () => useContext(CommentsContext);

export const CommentsProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setCommentReplyId = (commentId: number | null) => {
        dispatch({ type: ReducerActions.SET_COMMENT_REPLY_ID, payload: commentId });
    };

    const setCommentEditId = (commentId: number | null) => {
        dispatch({ type: ReducerActions.SET_COMMENT_EDIT_ID, payload: commentId });
    };

    const setCommentDeleteId = (commentId: number | null) => {
        dispatch({ type: ReducerActions.SET_COMMENT_DELETE_ID, payload: commentId });
    };

    const replyComment = (commentReplyObj: CommentReply) => {
        dispatch({ type: ReducerActions.REPLY_COMMENT, payload: commentReplyObj });
    };

    const editComment = (editedText: string) => {
        dispatch({ type: ReducerActions.EDIT_COMMENT, payload: editedText });
    };

    const deleteComment = (commentId: number) => {
        dispatch({ type: ReducerActions.DELETE_COMMENT, payload: commentId });
    };

    const contextValue = {
        ...state,
        setCommentReplyId,
        setCommentEditId,
        setCommentDeleteId,
        replyComment,
        editComment,
        deleteComment
    };

    return <CommentsContext.Provider value={contextValue}>{children}</CommentsContext.Provider>;
};
