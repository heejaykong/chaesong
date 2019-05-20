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

export default function personalpage (state = initialState, action){
    switch (action.type){
        case types.SCRAP_LOAD:
            console.log("eatenlist reducer waiting");
            return{
                ...state,
                lis: {
                    ...state.list,
                    status: 'waiting'
                }
            };
        case types.SCRAP_LOAD_SUCCESS:
            console.log("eatenlist reducer success");
            if(action.isInitial){
                return{
                    ...state,
                    list: {
                        ...state.list,
                        status: 'SUCCESS',
                        data: action.data
                    }
                }
            } else{
                if(action.listType == 'new'){
                    return{
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
        case types.SCRAP_LOAD_FAILURE:
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
