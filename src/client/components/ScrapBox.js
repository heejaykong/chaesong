import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

class ScrapBox extends Component{
    render(){
        let current_id = Cookies.get('member');
        console.log(current_id);
        return (
            <div className = "col-md-4 recipe-box">
                <div className = "card">
                    <div className="card-header">
                        <h3 className="card-title">{this.props.data.recipe_name}</h3>
                    </div>
                    <div className="card-body">
                        <img src={this.props.data.imgurl} alt="recipe"/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

ScrapBox.propTypes={
    data: PropTypes.object,
    currentUser: PropTypes.string,
    current_id : PropTypes.string
};

ScrapBox.defaultProps = {
    data:{
        recipe_code:'E0040000009a',
        user_id: 'hello'
    },
    currentUser: ''
};

export default ScrapBox