import * as types from '../actions/ActionType';

const initialState = {
    status: 'INIT',
    searchWord: [],
    data: [],
    isLast: false
};

export default function search(state = initialState, action) {
    switch (action.type) {
        case types.RECIPE_SEARCH:
            console.log('search reducers waiting');
            return{
                ...state,
                status: 'WAITING'
            }
        case types.RECIPE_SEARCH_SUCCESS:
            console.log('search reducers success');
            console.log(action.data);
            return{
                ...state,
                status: 'SUCCESS',
                searchWord: action.searchWord,
                data: action.data,
                isLast : action.data.length <6
            }
        case types.RECIPE_SEARCH_FAILURE:
            console.log('search reducers failure');
            return{
                ...state,
                status: 'FAILURE',
                searchWord: []
            }
        default:
            return state;
    }
}