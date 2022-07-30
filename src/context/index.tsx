import { createContext, useContext, useReducer, useEffect } from 'react';

import { Comment, CommentReply } from 'models';
import { ContextState, initialState } from './state';
import { reducer, ReducerActions } from './reducer';

type Props = { children: React.ReactNode };

const CommentsContext = createContext(initialState);
export const useComments = () => useContext(CommentsContext);

const initializer = (state: ContextState = initialState) => {
    const storageValue = localStorage.getItem('comments');
    const storageComments = storageValue !== null ? JSON.parse(storageValue) : state.comments;
    return { ...state, comments: storageComments };
};

export const CommentsProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, initializer);

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(state.comments));
    }, [state.comments]);

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

    const addComment = (commentObj: Comment) => {
        dispatch({ type: ReducerActions.ADD_COMMENT, payload: commentObj });
    };

    const updateScore = (commentId: number, updatedScore: number) => {
        dispatch({ type: ReducerActions.UPDATE_SCORE, payload: { commentId, updatedScore } });
    };

    const contextValue = {
        ...state,
        setCommentReplyId,
        setCommentEditId,
        setCommentDeleteId,
        replyComment,
        editComment,
        deleteComment,
        addComment,
        updateScore
    };

    return <CommentsContext.Provider value={contextValue}>{children}</CommentsContext.Provider>;
};
