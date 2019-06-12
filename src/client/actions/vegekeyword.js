import axios from 'axios';
import {
    VEGEKEYWORD_LOAD,
    VEGEKEYWORD_LOAD_SUCCESS,
    VEGEKEYWORD_LOAD_FAILURE
} from './ActionType';
import {infoList, infoLoadFailure, infoLoadSuccess} from "./personal";

export function vegekeywordListRequest(isInitial, listType) {
    return (dispatch) => {
        dispatch(vegekeywordLoad());
        let url = '/api/vegekeyword';
        return axios.get(url)
            .then((response) => {
                console.log("vegekeyword dispatch success");
                dispatch(vegekeywordLoadSuccess(response.data, isInitial, listType));
            }).catch((error) => {
                console.log("vegekeyword dispatch failure");
                dispatch(vegekeywordLoadFailure());
            });
    };
}

export function vegekeywordLoad() {
    return {
        type: VEGEKEYWORD_LOAD
    };
}

export function vegekeywordLoadSuccess(data, isInitial, listType) {
    return {
        type: VEGEKEYWORD_LOAD_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function vegekeywordLoadFailure() {
    return {
        type: VEGEKEYWORD_LOAD_FAILURE
    };
}
