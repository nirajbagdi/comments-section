import { ContextState } from './state';

enum ReducerActions {}

type ReducerAction = {
    type: ReducerActions;
    payload: any;
};

const reducer = (state: ContextState, action: ReducerAction): ContextState => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;
