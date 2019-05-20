import React, {Component} from 'react';
import {Main, RecipeViewTest} from '../components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication';

class MainPage extends Component {

    componentDidMount() {
        function getCookie(name) {
            const value = "; " + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length == 2)
                return parts.pop().split(";").shift();
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
                        user_id: null
                    };
                    document.cookie='key=' + btoa(JSON.stringify(loginData));
                }
            }
        );
    }

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logoutRequest().then(
            () => {
                console.log("logout");
                let loginData = {
                    _id: '',
                    isLoggedIn: false,
                    user_id: ''
                };
                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
               // this.props.history.push('/login');
            }
        );
    };

    render(){
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);
        return (
            <div>
                {isAuth ? undefined : <Main isLoggedIn={this.props.status.isLoggedIn}
                                            onLogout={this.handleLogout}/>}
                {this.props.children}
            </div>
        );
        /*
        return(
          <Main isLoggedIn={this.props.status.isLoggedIn}
              onLogout={this.handleLogout}/>
        );
        */
    }
}


const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);