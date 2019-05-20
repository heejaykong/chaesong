import axios from 'axios';
import {
    SCRAP_LOAD,
    SCRAP_LOAD_SUCCESS,
    SCRAP_LOAD_FAILURE
} from './ActionType';

export function scrapListRequest(isInitial, listType){
    return (dispatch) => {
        dispatch(scrapList());
        let url = './api/personalpage/scrap';
        return axios.get(url)
            .then((response)=>{
                console.log("scrap list dispatch success");
                dispatch(scrapLoadSuccess(response.data, isInitial, listType));
            }).catch((error) => {
                console.log("scrap list dispatch failure");
                dispatch(scrapLoadFailure());
            })
    }
}

export function scrapList() {
    return {
        type: SCRAP_LOAD
    };
}

export function scrapLoadSuccess(data, isInitial, listType) {
    return {
        type: SCRAP_LOAD_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function scrapLoadFailure() {
    return {
        type: SCRAP_LOAD_FAILURE
    };
}
