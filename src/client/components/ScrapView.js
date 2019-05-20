import React, {Component} from 'react';
import {ScrapBox} from '../components';
import PropTypes from 'prop-types';

class ScrapView extends Component{
    render(){
        const mapToComponents = data => {
            return data.map((personalpage, i)=>{
                console.log("personal page test map to component");
                return (
                    <ScrapBox
                        data ={personalpage}
                        key={personalpage.recipe_code}
                        index={i}
                        current={this.props.currentUser}
                        current_id={this.props.current_id}
                    />
                );
            })
        };
        return (
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

ScrapView.propTypes={
    data: PropTypes.array
};
ScrapView.defaultProps={
    data: []
};

export default ScrapView;