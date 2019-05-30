import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

export class RecommendBox extends Component{
    handleClick= () => {
        //show the recipe
        let recipe_code = this.props.data.recipe_code;
        this.props.onClick(recipe_code);
        console.log("recommended clicked");
    }

    render() {
        return (
            <div className="container recipe">
                <div className="card">
                    <div className="info">
                        <h3 className="recipename">{this.props.data.recipe_name}</h3>
                    </div>
                    <div className="card-content">
                        <img
                            src={this.props.data.imgurl}
                            alt="recipe"
                            onClick={this.handleClick}
                        />
                        <br/>
                        <pre>
                        {this.props.data.content}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

RecommendBox.propTypes={
    data: PropTypes.object,
    onClick: PropTypes.click
};

RecommendBox.defaultProps={
    data:{
        recipe_id : '315',
        recipe_code: 'B0030000009j',
        recipe_name: '감자튀김',
        content: '',
        imgurl: 'https://i.imgur.com/ryJzBgY.jpg'
    },
    currentUser: ''
};