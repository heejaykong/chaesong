import React, { Component } from 'react';
import {Header, RecipeViewTest} from '../components';
import { connect } from 'react-redux';
import { getStatusRequest } from '../actions/authentication';
import {recipeSearchRequest} from "../actions/recipe";


class App extends Component {

    handleSearch = (searchWord, seafood, milk, egg) =>{
        this.props.recipeSearchRequest(searchWord,seafood,milk,egg);
    }

    componentDidMount() { //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인
        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // get loginData from cookie
        let loginData = getCookie('key');

        // if loginData is undefined, do nothing
        if(typeof loginData === "undefined") return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));

        // if not logged in, do nothing
        if(!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                // if session is not valid
                if(!this.props.status.valid) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        user_id: ''
                    };

                    document.cookie='key=' + btoa(JSON.stringify(loginData));

                    // and notify
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);
                }
            }
        );
    }

    render(){
        let re = /(login|register|startpage|recipeview)/;
        let isAuth = re.test(this.props.location.pathname);
        return (
            <div>
                {isAuth ? undefined :<Header isLoggedIn={this.props.status.isLoggedIn}
                                             currentUser = {this.props.currentUser}
                                             onSearch={this.handleSearch}
                                             searchWord={this.props.searchWord}
                                             history={this.props.history}/> }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        errorCode : state.recipe.scrap.error,
        searchWord: state.search.searchWord,
        searchstatus: state.search.status,
        searchData : state.search.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        recipeSearchRequest:(searchWord, seafood, milk, egg) =>{
            return dispatch(recipeSearchRequest(searchWord, seafood, milk, egg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);