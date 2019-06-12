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

export default function vegekeyword(state = initialState, action) {
    switch (action.type) {
        case types.VEGEKEYWORD_LOAD:
            console.log("vegekeyword reducer waiting");
            return{
                ...state,
                list: {
                    ...state.list,
                    status : 'WAITING'
                }
            };
        case types.INFO_LOAD_SUCCESS:
            console.log("infolist reducer success");
            return{
                ...state,
                status: "SUCCESS",
                data: action.data
            };

        case types.VEGEKEYWORD_LOAD_SUCCESS:
            console.log("vegekeyword reducer success");
            console.log(action.data);
            if(action.isInitial){
                return{
                    ...state,
                    list: {
                        ...state.list,
                        status: 'SUCCESS',
                        data: action.data,
                        //isLast : action.data.length <6
                    }
                }
            } //else {
            //     if(action.listType === 'new'){
            //         return {
            //             ...state,
            //             list:{
            //                 ...state.list,
            //                 status: 'SUCCESS',
            //                 data: [...action.data, ...state.list.data]
            //             }
            //         }
            //     } else {
            //         return {
            //             ...state,
            //             list:{
            //                 ...state.list,
            //                 status: 'SUCCESS',
            //                 data: [...state.list.data, ...action.data],
            //                 //islast: action.data.length < 6
            //             }
            //         }
            //     }
            // }
        case types.VEGEKEYWORD_LOAD_FAILURE:
            return{
                ...state,
                list:{
                    ...state.list,
                    status: 'FAILURE'
                }
            };
        default : return state;
    }
}
