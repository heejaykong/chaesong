// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import {RecommendBox} from './RecommendBox';
//
// class RecommendPage extends Component{
//     render() {
//         const mapToComponents = data => {
//             return data.map((recipe, i)=>{
//                 console.log("RecommendPage test");
//                 return (
//                     <RecommendBox
//                         data={recipe}
//                         key={recipe.recipe_code}
//                         // index={i}
//                         // current={this.props.currentUser}
//                         onScrap={this.props.onScrap}
//                     />
//                 );
//             })
//         };
//
//         return(
//             <div>
//                 {mapToComponents(this.props.data)}
//             </div>
//         );
//     }
// }
//
// RecommendPage.propTypes={
//     data: PropTypes.array,
//     onScrap: PropTypes.func,
// };
// RecommendPage.defaultProps={
//     data: [],
//     onScrap: (user_id,recipe_code) =>{console.error("scrap function is not defined");},
// };
//
// export default RecommendPage;
// ---------------------------------------------------------------------

import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {RecipeBox} from '../components';
import {RecommendBox} from './RecommendBox';

class RecommendPage extends Component{
    render(){
        const mapToComponents = data => {
            return data.map((recipe, i)=>{
                return (
                    <RecommendBox
                        data={recipe}
                        key={recipe.recipe_code}
                        index={i}
                        onClick={this.props.onClick}
                        // current={this.props.currentUser}
                        // onEat={this.props.onEat}
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

RecommendPage.propTypes={
    mode: PropTypes.bool,
    data: PropTypes.array,
    history: PropTypes.object
};

RecommendPage.defaultProps={
    mode: true,
    data: []
};

export default RecommendPage;