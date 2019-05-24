import axios from 'axios';
import {
    EATEN_LIST,
    EATEN_LIST_SUCCESS,
    EATEN_LIST_FAILURE,
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

export function eatenListRequest(isInitial, listType){
    return (dispatch) => {
        dispatch(eatenList());
        let url = './api/personalpage/eaten';
        return axios.get(url)
            .then((response)=> {
                console.log("eaten list dispatch success");
                dispatch(eatenLoadSuccess(response.data, isInitial, listType));
            }).catch((error) => {
                console.log("eaten list dispatch failure");
                dispatch(eatenLoadFailure());
            })
    }
}

export function scrapList() {
    return {
        type: SCRAP_LOAD
    };
}

export function eatenList() {
    return {
        type: EATEN_LIST
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

export function eatenLoadSuccess(data, isInitial, listType){
    return {
        type: EATEN_LIST_SUCCESS,
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

export function eatenLoadFailure() {
    return{
        type: EATEN_LIST_FAILURE
    };
}
