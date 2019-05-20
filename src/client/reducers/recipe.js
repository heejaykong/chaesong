import * as types from '../actions/ActionType';

const initialState = {
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    },
    star: {
        status: 'INIT',
        error: -1
    },
    scrap:{
        scrapstatus : 'INIT',
        error : -1
    },
    eat:{
        eatstatus : 'INIT',
        error : -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: ''
    }
};

export default function recipe(state = initialState, action) {
    switch (action.type) {
        case types.RECIPE_LIST:
            console.log("recipeviewtest reducer waiting");
            return{
                ...state,
                list: {
                    ...state.list,
                    status : 'WAITING'
                }
            };
        case types.RECIPE_LIST_SUCCESS:
            console.log("recipeviewtest reducer success");
            console.log(action.data);
            if(action.isInitial){
                return{
                    ...state,
                    list: {
                        ...state.list,
                        status: 'SUCCESS',
                        data: action.data,
                        isLast : action.data.length <6
                    }
                }
            } else {
                if(action.listType === 'new'){
                    return {
                        ...state,
                        list:{
                            ...state.list,
                            status: 'SUCCESS',
                            data: [...action.data, ...state.list.data]
                        }
                    }
                } else {
                    return {
                        ...state,
                        list:{
                            ...state.list,
                            status: 'SUCCESS',
                            data: [...state.list.data, ...action.data],
                            islast: action.data.length < 6
                        }
                    }
                }
            }
        case types.RECIPE_LIST_FAILURE:
            return{
                ...state,
                list:{
                    ...state.list,
                    status: 'FAILURE'
                }
            };

            ////////////////////////////////////
        case types.RECIPE_SCRAP:
            console.log("scrap reducer waiting");
            return{
                ...state,
                scrap:{
                    scrapstatus: 'WAITING',
                    error : -1
                }
            };
        case types.RECIPE_SCRAP_SUCCESS:
            console.log("scrap reducer success");
            return{
                ...state,
                scrap:{
                    ...state.scrap,
                    scrapstatus: 'SUCCESS'
                }
            };
        case types.RECIPE_SCRAP_FAILURE:
            console.log("scrap reducer failure");
            return{
                ...state,
                scrap:{
                    ...state.scrap,
                    scrapstatus: 'FAILURE',
                    error: action.error
                }
            };

            ////////////////////////////////////////////////
        case types.RECIPE_EAT:
            console.log("EAT reducer waiting");
            return{
                ...state,
                eat:{
                    eatstatus: 'WAITING',
                    error : -1
                }
            };
        case types.RECIPE_EAT_SUCCESS:
            console.log("EAT reducer success");
            return{
                ...state,
                eat:{
                    ...state.eat,
                    eatstatus: 'SUCCESS'
                }
            };
        case types.RECIPE_EAT_FAILURE:
            console.log("EAT reducer failure");
            return{
                ...state,
                eat:{
                    ...state.eat,
                    eatstatus: 'FAILURE',
                    error: action.error
                }
            };

        ///////////////////////////////////////////////////////

        default : return state;
    }
}
