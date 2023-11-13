import { createContext, useContext } from 'react';
import { IComment, IUser } from 'models';
import commentsData from 'data/commentsData.json';

export type ContextState = {
	currentUser: IUser;
	comments: IComment[];

	addComment: (comment: IComment) => void;
	deleteComment: (commentID: string) => void;
	updateComment: (updatedComment: IComment) => void;
	addReply: (commentID: string, repliedComment: IComment) => void;
	updateScore: (commentID: string, score: number) => void;
};

export const initialState: ContextState = {
	currentUser: commentsData.currentUser,
	comments: commentsData.comments,

	addComment: comment => {},
	deleteComment: commentID => {},
	updateComment: updatedComment => {},
	addReply: (commentID, repliedComment) => {},
	updateScore: (commentID, score) => {},
};

export const AppStateContext = createContext(initialState);
export const useAppContext = () => useContext(AppStateContext);
