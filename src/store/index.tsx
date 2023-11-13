import { useReducer, useEffect } from 'react';
import { AppStateContext, ContextState, initialState } from './context';
import reducer from './reducer';
import { IComment } from 'models';
import { ActionTypes } from './constants';

interface Props {
	children: React.ReactNode;
}

const initializer = (state: ContextState = initialState) => {
	const storageValue = localStorage.getItem('comments');
	const storageComments = storageValue !== null ? JSON.parse(storageValue) : state.comments;
	return { ...state, comments: storageComments };
};

const AppStateProvider: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState, initializer);

	useEffect(() => {
		localStorage.setItem('comments', JSON.stringify(state.comments));
	}, [state.comments]);

	const addComment = (comment: IComment) =>
		dispatch({ type: ActionTypes.ADD_COMMENT, payload: comment });

	const deleteComment = (commentID: string) =>
		dispatch({ type: ActionTypes.DELETE_COMMENT, payload: commentID });

	const updateComment = (updatedComment: IComment) =>
		dispatch({ type: ActionTypes.UPDATE_COMMENT, payload: updatedComment });

	const addReply = (commentID: string, repliedComment: IComment) =>
		dispatch({ type: ActionTypes.ADD_REPLY, payload: { commentID, repliedComment } });

	const updateScore = (commentID: string, score: number) =>
		dispatch({ type: ActionTypes.UPDATE_SCORE, payload: { commentID, score } });

	const contextValue = {
		currentUser: state.currentUser,
		comments: state.comments,

		addComment,
		deleteComment,
		updateComment,
		addReply,
		updateScore,
	};

	return <AppStateContext.Provider value={contextValue}>{children}</AppStateContext.Provider>;
};

export default AppStateProvider;
