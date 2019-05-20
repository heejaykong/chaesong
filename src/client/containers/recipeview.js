import React, {Component} from 'react';
import {recipeListRequest, scrapRequest, eatRequest, recipeSearchRequest} from '../actions/recipe';
import {connect} from 'react-redux';
import {RecipeViewTest} from '../components';
import shallowEqual from 'fbjs/lib/shallowEqual';

class recipeview extends Component{


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

    /*shouldComponentUpdate(nextProps, nextState){
        return true;
    }*/

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

    /*shouldComponentUpdate(nextProps, nextState, nextContext){
        console.log('shouldComponentUpdate');
        console.log(!shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState));
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }*/

    componentDidMount(){
        this.props.recipeListRequest(true, undefined);
    }



    render(){
        console.log("container-> ");
        if(this.props.searchstatus === "SUCCESS"){
            console.log("container search=====> ");
            return(
                <div className="Wrapper">
                    <RecipeViewTest data={this.props.searchData}
                                    currentUser = {this.props.currentUser}
                                    onScrap={this.handleScrap}
                                    onEat={this.handleEat}
                                    onSearch={this.handleSearch}
                                    history={this.props.history}/>
                </div>
            );
        }else{
            console.log("container first=====> ");
            return(
                <div className="Wrapper">
                    <RecipeViewTest data={this.props.recipeData}
                                    currentUser = {this.props.currentUser}
                                    onScrap={this.handleScrap}
                                    onEat={this.handleEat}
                                    onSearch={this.handleSearch}
                                    history={this.props.history}/>
                </div>
            );
        }

    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(recipeview);