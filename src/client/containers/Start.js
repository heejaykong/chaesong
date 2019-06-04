import React, {Component} from 'react';
import {Authentication, RecommendPage} from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

class Start extends Component {
    render() {
        return (
            <div>
                <h3> start </h3>
            </div>
        );
    }
}


export default Start;