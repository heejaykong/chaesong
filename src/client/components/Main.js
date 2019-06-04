import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import {RecipeViewTest} from "./index";
import {eatRequest, recipeListRequest, recipeSearchRequest, scrapRequest} from "../actions/recipe";
import {connect} from "react-redux";
import Modal from "./Header";

const queryString = require('query-string');

class Main extends Component{

    constructor(props){
        super(props);
        this.state={
            user_Id : Cookies.get('member')
        }
    } // cookie

    handleScrap = (user_id, recipe_code) =>{
        console.log("scrap container ", user_id, recipe_code);
        return this.props.scrapRequest(user_id, recipe_code).then(
            ()=>{
                if(this.props.scrapstatus === "SUCCESS"){
                    console.log("scrap container success");
                    return true;
                }else{
                    console.log("scrap container fail");
                    return false;
                }
            }
        );
    }

    handleEat= (user_id, recipe_code) =>{
        console.log("eat container ", user_id, recipe_code);
        return this.props.eatRequest(user_id, recipe_code).then(
            ()=>{
                if(this.props.eatstatus === "SUCCESS"){
                    console.log("eat container success");
                    return true;
                }else{
                    console.log("eat container fail");
                    return false;
                }
            }
        );
    }

    handleSearch = (searchWord, seafood, milk, egg) =>{
        console.log("search container");
        this.props.recipeSearchRequest(searchWord, seafood, milk, egg).then(
            ()=>{
                if(this.props.searchstatus === "SUCCESS"){
                    console.log(this.props.searchstatus);
                    console.log(this.props.searchData);
                    this.setState({recipeData : this.props.searchData});
                    console.log("search container success: " + searchWord);
                    return true;
                }else{
                    console.log("search container fail");
                    return false;
                }
            }
        );
    }

    componentDidMount(){
        console.log(location.search);
        const query = queryString.parse(location.search);
        console.log(query);
        const searchWord = query.searchWord
        let egg = 1;
        let milk = 1;
        let seafood = 1;

        const vegantype = Cookies.get('vegantype');
        if( vegantype === "페스코 베지테리언"){
            console.log("페스코");
            seafood = 1; milk = 1; egg = 1;
        } else if( vegantype === "락토 오보 베지테리언"){
            console.log("락토 오보");
            seafood = 0; milk = 1; egg = 1;
        } else if( vegantype === "오보 베지테리언"){
            console.log("오보");
            seafood = 0; milk = 0; egg = 1;
        } else if( vegantype === "락토 베지테리언"){
            console.log("락토");
            seafood = 0; milk = 1; egg = 0;
        } else if( vegantype === "비건"){
            console.log("비건");
            seafood = 0; milk = 0; egg = 0;
        }

        console.log("seafood: "  + seafood +"/ milk: " + milk + "/ egg: " + egg);

        if(!searchWord){
            this.props.recipeSearchRequest(" ",seafood,milk,egg);
        } else{
            this.props.recipeSearchRequest(query.searchWord,seafood,milk,egg);
            console.log("searchData->");
            console.log(this.props.searchData);
        }

    }


    render(){
        const query = queryString.parse(location.search);
        console.log(query);
        const searchWord = query.searchWord;

        return(
            <div className="main-panel" id="main-panel">
                <div className="content">
                    <div className="container-fluid">
                        <h4 className="page-title">조회된 레시피</h4>
                        <RecipeViewTest data={this.props.searchData}
                                        currentUser = {this.props.currentUser}
                                        onScrap={this.handleScrap}
                                        onEat={this.handleEat}
                                        onSearch={this.handleSearch}
                                        history={this.props.history}/>
                    </div>
                </div>
            </div>
        )

    }
}

Main.propTypes = {
    isLoggedIn : PropTypes.bool,
    onLogout: PropTypes.func
};

Main.defaultProps = {
    isLoggedIn : false,
    onLogout: () => {console.error("logout function not defined")}
};

const mapStateToProps = (state) => {
    return{
        recipeData : state.recipe.list.data,
        listStatus : state.recipe.list.status,
        isLast: state.recipe.isLast,
        scrapstatus: state.recipe.scrap.scrapstatus,
        eatstatus: state.recipe.eat.eatstatus,
        errorCode : state.recipe.scrap.error,
        searchstatus: state.search.status,
        searchData : state.search.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        recipeListRequest: (isInitial, listType)=>{
            return dispatch(recipeListRequest(isInitial, listType));
        },
        scrapRequest: (user_id, recipe_code) =>{
            return dispatch(scrapRequest(user_id, recipe_code));
        },
        eatRequest: (user_id, recipe_code) =>{
            return dispatch(eatRequest(user_id, recipe_code));
        },
        recipeSearchRequest:(searchWord, seafood, milk, egg) =>{
            return dispatch(recipeSearchRequest(searchWord, seafood, milk, egg));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);