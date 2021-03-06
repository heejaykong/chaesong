import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

class RecipeBox extends Component{

    handleScrap = () => {
        console.log("scrap click");
        let user_id = Cookies.get('member');
        let recipe_code = this.props.data.recipe_code;
        this.props.onScrap(user_id,recipe_code);
        console.log("scrap recipe box : ",user_id, recipe_code);
    }

    handleEat = () => {
        console.log("eat click");
        let user_id = Cookies.get('member');
        let recipe_code = this.props.data.recipe_code;
        this.props.onEat(user_id,recipe_code);
        console.log("eat recipe box : ",user_id, recipe_code);
    }

    render() {
        return (
            <div className="container recipe">
                <div className="card">
                    <div className="info">
                        <h3 className="recipename">{this.props.data.recipe_name}</h3>
                    </div>
                    <div className="card-content">
                        <img src={this.props.data.imgurl} alt="recipe"/>
                        <br/>
                        <pre>
                        {this.props.data.content}
                        </pre>
                    </div>
                    <div className="footer">
                        <button onClick={this.handleEat}>
                            먹었음
                        </button>
                        <button onClick={this.handleScrap}>
                            스크랩
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

RecipeBox.propTypes={
  data: PropTypes.object,
  onScrap: PropTypes.scrap,
  onEat: PropTypes.eat,
  currentUser: PropTypes.string
};

RecipeBox.defaultProps={
  data:{
      recipe_id : '315',
      recipe_code: 'B0030000009j',
      recipe_name: '감자튀김',
      content: '',
      imgurl: 'https://i.imgur.com/ryJzBgY.jpg'
  },
    onScrap: (user_id, recipe_code) =>{
      console.error('scrap recipe function net defined');
    },
    onEat: (user_id, recipe_code) =>{
        console.error('eat recipe function net defined');
    },
    currentUser: ''
};

export default RecipeBox