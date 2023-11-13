import { ContextState } from './context';
import { IComment } from 'models';
import { ActionTypes } from './constants';

type ReducerAction =
	| { type: ActionTypes.ADD_COMMENT; payload: IComment }
	| { type: ActionTypes.DELETE_COMMENT; payload: string }
	| { type: ActionTypes.UPDATE_COMMENT; payload: IComment }
	| { type: ActionTypes.ADD_REPLY; payload: { commentID: string; repliedComment: IComment } }
	| { type: ActionTypes.UPDATE_SCORE; payload: { commentID: string; score: number } };

const reducer = (state: ContextState, action: ReducerAction) => {
	switch (action.type) {
		case ActionTypes.ADD_COMMENT: {
			const updatedComments = [...state.comments, action.payload];
			return { ...state, comments: updatedComments };
		}

		case ActionTypes.DELETE_COMMENT: {
			const filteredComments = state.comments.filter(comment => {
				const hasReplies = comment.replies?.some(r => r.id === action.payload);

				if (hasReplies) {
					const filteredReplies = comment.replies!.filter(r => r.id !== action.payload);
					comment.replies = filteredReplies;
				}

				return comment.id !== action.payload;
			});

			return { ...state, comments: filteredComments };
		}

		case ActionTypes.UPDATE_COMMENT: {
			const updatedComments = state.comments.map(comment => {
				const hasReplies = comment.replies?.some(r => r.id === action.payload.id);

				if (hasReplies) {
					const updatedReplies = comment.replies!.map(r =>
						r.id === action.payload.id ? action.payload : r
					);

					return { ...comment, replies: updatedReplies };
				}

				return comment.id === action.payload.id ? action.payload : comment;
			});

			return { ...state, comments: updatedComments };
		}

		case ActionTypes.ADD_REPLY: {
			const updatedComments = state.comments.map(comment => {
				const hasReplies = comment.replies?.some(r => r.id === action.payload.commentID);

				if (comment.id === action.payload.commentID || hasReplies) {
					return {
						...comment,
						replies: [...(comment.replies || []), action.payload.repliedComment],
					};
				}

				return comment;
			});

			return { ...state, comments: updatedComments };
		}

		case ActionTypes.UPDATE_SCORE: {
			const updatedComments = state.comments.map(comment => {
				if (comment.id === action.payload.commentID)
					return { ...comment, score: action.payload.score };
				return comment;
			});

			return { ...state, comments: updatedComments };
		}

		default:
			return state;
	}
};

export default reducer;
