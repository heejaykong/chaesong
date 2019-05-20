import React, {Component} from 'react';
import {RecipeBox} from '../components';
import PropTypes from 'prop-types';
import {Search} from '../components';
class RecipeViewsTest extends Component{

    state = {
        searchWord : "",
        seafoodchecked:true,
        milkchecked:true,
        eggchecked:true,
        seafood : 0,
        milk: 0,
        egg: 0
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSeafoodChange = (event) =>{
        this.setState({ seafoodchecked: event.target.checked }) ;
    }
    handleMilkChange = (event) =>{
        this.setState({ milkchecked: event.target.checked }) ;
    }
    handleEggChange = (event) =>{
        this.setState({ eggchecked: event.target.checked }) ;
    }

    handleSearch = () => {
        let searchWord = !this.state.searchWord? " ": this.state.searchWord;
        let seafood = this.state.seafoodchecked? 1: 0;
        let milk = this.state.milkchecked? 1:0;
        let egg = this.state.eggchecked? 1:0;
        console.log("container: "+ searchWord);
        console.log("seafood: "  + seafood +"/ milk: " + milk + "/ egg: " + egg);
        this.props.onSearch(searchWord, seafood, milk, egg);
    }

    handleKeyPress = (e) => {
        if(e.charCode==13) {
            this.handleSearch();
        }
    }

    render(){
        const searchBox=(
            <div>
                <div className="input-field col s12">
                    <label>검색</label>
                    <input
                        name="searchWord"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.searchWord}
                        onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );

        const recipeCheckBox =(
          <div>
              <label>재료 포함</label>
              <input
                  name="seafood"
                  type="checkbox"
                  className="validate"
                  checked={this.state.seafoodchecked}
                  onChange={this.handleSeafoodChange}
                  value="1"/>
              해산물
              <input
                  name="milk"
                  type="checkbox"
                  className="validate"
                  checked={this.state.milkchecked}
                  onChange={this.handleMilkChange}
                  value="1"/>
              우유
              <input
                  name="egg"
                  type="checkbox"
                  className="validate"
                  checked={this.state.eggchecked}
                  onChange={this.handleEggChange}
                  value="1"/>
              계란
          </div>
        );

        const mapToComponents = data => {
            return data.map((recipe, i)=>{
                return (
                  <RecipeBox
                    data={recipe}
                    key={recipe.recipe_code}
                    index={i}
                    current={this.props.currentUser}
                    onScrap={this.props.onScrap}
                    onEat={this.props.onEat}
                  />

                );
            })
        };

        return(
            <div className="row">
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

/*<div>
                    {searchBox}
                </div>
                <div>
                    {recipeCheckBox}
                    <button onClick={this.handleSearch}>검색</button>
                </div>*/

RecipeViewsTest.propTypes={
  mode: PropTypes.bool,
  data: PropTypes.array,
  onScrap: PropTypes.func,
  onEat: PropTypes.func,
  onSearch: PropTypes.func,
  history: PropTypes.object
};

RecipeViewsTest.defaultProps={
  mode: true,
  data: [],
  onScrap: (user_id,recipe_code) =>{console.error("scrap function is not defined");},
  onEat: (user_id,recipe_code) =>{console.error("eat function is not defined");},
  onSearch:(searchWord, seafood, milk, egg)=>{console.error("search function is not defined")}
};


export default RecipeViewsTest;