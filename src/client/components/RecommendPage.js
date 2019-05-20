import React, {Component} from 'react';
import {RecommendBox} from '../components';
import PropTypes from 'prop-types';

class RecommendPage extends Component{
    render() {
        const mapToComponents = data => {
            return data.map((recipe, i)=>{
                console.log("RecommendPage test");
                return (
                    <RecommendBox
                        data={recipe}
                        key={recipe.recipe_code}
                        // index={i}
                        // current={this.props.currentUser}
                        onScrap={this.props.onScrap}
                    />
                );
            })
        };

        return(
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

RecommendPage.propTypes={
    data: PropTypes.array,
    onScrap: PropTypes.func,
};
RecommendPage.defaultProps={
    data: [],
    onScrap: (user_id,recipe_code) =>{console.error("scrap function is not defined");},
};

export default RecommendPage;