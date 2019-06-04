import * as types from '../actions/ActionType'

const initialState = {
    list: {
        status: 'INIT',
        data: []
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: ''
    }
};

export default function personalgraph (state = initialState, action){
    switch (action.type){
        case types.EATEN_LIST:
            console.log("eatenlist reducer waiting");
            return{
                ...state,
                list: {
                    ...state.list,
                    status: "waiting"
                }
            };

        case types.EATEN_LIST_SUCCESS:
            console.log("eatenlist reducer success");
            if(action.isInitial){
                return {
                    ...state,
                    list: {
                        ...state.list,
                        status: "SUCCESS",
                        data: action.data
                    }
                }
            }
            else{
                if(action.listType == 'new'){
                    return {
                        ...state,
                        list: {
                            ...state.list,
                            status: 'SUCCESS',
                            data: [...action.data, ...state.list.data]
                        }
                    }
                }
                else{
                    return {
                        ...state,
                        list: {
                            ...state.list,
                            status: 'SUCCESS',
                            data: [...state.list.data, ...action.data]
                        }
                    }
                }
            }
        case types.EATEN_LIST_FAILURE:
            return{
                ...state,
                list: {
                    ...state.list,
                    status: 'FAILURE'
                }
            };

        default: return state;
    }
}
