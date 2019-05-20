import React, {Component} from 'react';
import {Authentication } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

class Login extends Component {

    handleLogin = (user_id, pw) => {
        return this.props.loginRequest(user_id, pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        user_id: user_id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    this.props.history.push('/MainPage');
                    return true;
                } else {
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Authentication mode={true}
                                onLogin={this.handleLogin}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (user_id, pw) => {
            return dispatch(loginRequest(user_id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);