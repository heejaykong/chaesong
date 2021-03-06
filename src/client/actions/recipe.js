import axios from 'axios';
import{
    RECIPE_LIST,
    RECIPE_LIST_SUCCESS,
    RECIPE_LIST_FAILURE,
    RECIPE_SCRAP,
    RECIPE_SCRAP_SUCCESS,
    RECIPE_SCRAP_FAILURE,
    RECIPE_EAT,
    RECIPE_EAT_SUCCESS,
    RECIPE_EAT_FAILURE,
    RECIPE_SEARCH,
    RECIPE_SEARCH_SUCCESS,
    RECIPE_SEARCH_FAILURE
} from './ActionType';

export function recipeListRequest(isInitial, listType){
    return (dispatch) => {
        dispatch(recipeList());
        let url = './api/recipe';

        return axios.get(url)
            .then((response)=>{
                console.log("recipeviestest dispatch success" );
                dispatch(recipeListSuccess(response.data, isInitial, listType));
            }).catch((error) => {
                console.log("recipeviestest dispatch failure");
                dispatch(recipeListFailure());
            })
    }
}

export function recipeList() {
    return {
        type: RECIPE_LIST
    };
}

export function recipeListSuccess(data, isInitial, listType) {
    return {
        type: RECIPE_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function recipeListFailure() {
    return {
        type: RECIPE_LIST_FAILURE
    };
}

export function scrapRequest(user_id, recipe_code) {
    return (dispatch) =>{
        dispatch(recipescrap());

        return axios.post('/api/scrap', {user_id,recipe_code})
            .then((response)=>{
                console.log("post action: ",user_id, recipe_code);
                console.log("scrap dispatch success ");
                dispatch(recipescrapSuccess());
            }).catch((error)=>{
                console.log("scrap dispatch failure");
                dispatch(recipescrapFailure(error.response.data.code));
            });
    }
}

export function recipescrap() {
    return{
        type : RECIPE_SCRAP
    };
}

export function recipescrapSuccess() {
    return{
        type: RECIPE_SCRAP_SUCCESS
    };
}

export function recipescrapFailure(error) {
    return {
        type: RECIPE_SCRAP_FAILURE,
        error
    };
}

export function eatRequest(user_id, recipe_code) {
    return (dispatch) =>{
        dispatch(recipeEat());

        return axios.post('/api/eat', {user_id,recipe_code})
            .then((response)=>{
                console.log("eat post action: ",user_id, recipe_code);
                console.log("eat dispatch success ");
                dispatch(recipeEatSuccess());
            }).catch((error)=>{
                console.log("eat dispatch failure");
                dispatch(recipeEatFailure(error.response.data.code));
            });
    }
}

export function recipeEat() {
    return{
        type : RECIPE_EAT
    };
}

export function recipeEatSuccess() {
    return{
        type: RECIPE_EAT_SUCCESS
    };
}

export function recipeEatFailure(error) {
    return {
        type: RECIPE_EAT_FAILURE,
        error
    };
}

export function recipeSearchRequest(searchWord){
    return (dispatch) =>{
        dispatch(recipeSearch());

        return axios.get('/api/recipe/search/' + searchWord)
            .then((response)=>{
                dispatch(recipeSearchSuccess(response.data));
            }).catch((error) =>{
                dispatch(recipeSearchFailure());
            });
    };
}

export function recipeSearch(){
    return{
        type: RECIPE_SEARCH
    };
}

export function recipeSearchSuccess(searchWord){
    return{
        type: RECIPE_SEARCH_SUCCESS,
        searchWord
    }
}

export function recipeSearchFailure(){
    return {
        type: RECIPE_SEARCH_FAILURE
    }
}