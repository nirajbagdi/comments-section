import { createContext, useContext, useReducer } from 'react';
import { initialState } from './state';
import reducer from './reducer';

type Props = { children: React.ReactNode };

const CommentsContext = createContext(initialState);
export const useComments = () => useContext(CommentsContext);

export const CommentsProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = {
        comments: state.comments,
        currentUser: state.currentUser
    };

    return (
        <CommentsContext.Provider value={contextValue}>
            {children}
        </CommentsContext.Provider>
    );
};
