import { Comment } from 'models';
import commentsData from 'data/commentsData.json';

export type ContextState = {
    comments: Comment[];
    currentUser: string;
};

export const initialState: ContextState = {
    comments: commentsData.comments,
    currentUser: commentsData.currentUser.username
};
