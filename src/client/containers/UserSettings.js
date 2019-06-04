import {connect} from "react-redux";
import React, {Component} from 'react';
import {SettingUI} from '../components';
import {infoListRequest} from "../actions/personal";
import {changeRequest} from "../actions/authentication";

class UserSettings extends  Component{

    handleRegister = (birthyear, sex, height, weight, active, vegantype) => {
        return this.props.changeRequest(birthyear, sex, height, weight, active, vegantype).then(
            () => {
                this.props.history.push('/mainpage');
                return true;
            }
        )
    };

    componentDidMount() {
        this.props.infoListRequest(true, undefined);
    }

    render(){
        return (
            <div>
                <SettingUI data={this.props.infoData}
                           onRegister={this.handleRegister}/>
            </div>
        );
    }

}

const mapStateToProps = (state) =>{
    return{
        infoData : state.personalpage.list.data,
        listStatus : state.personalpage.list.status
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        infoListRequest: (isInitial) =>{
            return dispatch(infoListRequest(isInitial));
        },
        changeRequest: (birthyear, sex, height, weight, active, vegantype) =>{
            return dispatch(changeRequest(birthyear, sex, height, weight, active, vegantype));
        }
    } ;
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);