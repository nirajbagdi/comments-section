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

    const replyComment = (commentReplyObj: CommentReply) => {
        dispatch({ type: ReducerActions.REPLY_COMMENT, payload: commentReplyObj });
    };

    const contextValue = {
        ...state,
        setCommentReplyId,
        replyComment
    };

    return (
        <CommentsContext.Provider value={contextValue}>
            {children}
        </CommentsContext.Provider>
    );
};
