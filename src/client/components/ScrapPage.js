import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import {ScrapView} from "./index";
import {scrapListRequest} from "../actions/personal";
import {connect} from "react-redux";

class ScrapPage extends Component{
    constructor(props){
        super(props);
        this.state={
            user_Id : Cookies.get('member')
        }
    } // cookie

    componentDidMount(){
        this.props.scrapListRequest(true, undefined);
    }

    render(){
        return(
            <div className="main-panel" id="main-panel">
                <div className="content">
                    <div className="container-fluid">
                        <h4 className="page-title">스크랩 레시피</h4>
                        <div className="row">
                            <ScrapView data={this.props.scrapData}
                                       currentUser = {this.props.currentUser}
                                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ScrapPage.propTypes = {
    isLoggedIn : PropTypes.bool,
    onLogout: PropTypes.func
};

ScrapPage.defaultProps = {
    isLoggedIn : true,
    onLogout: () => {console.error("logout function not defined")}
};

const mapStateToProps = (state) => {
    return{
        scrapData : state.personalpage.list.data,
        listStatus : state.personalpage.list.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        scrapListRequest: (isInitial, listType)=>{
            return dispatch(scrapListRequest(isInitial, listType));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrapPage);