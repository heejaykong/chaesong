import * as types from '../actions/ActionType';

const initialState = {
    //초기화
};

export default function recommendpage(state = initialState, action) {
    switch(action.type) {
        case types.RECIPE_LIST:
            return {
                ...state,
                post: {
                    ...state.post,
                    status: 'WAITING',
                    error: -1
                }
            };
        case types.RECIPE_LIST_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    status: 'SUCCESS'
                }
            };
        case types.RECIPE_LIST_FAILURE:
            return {
                ...state,
                post: {
                    ...state.post,
                    status: 'FAILURE',
                    error: action.error
                }
            };
        default:
            return state;
    }
}
