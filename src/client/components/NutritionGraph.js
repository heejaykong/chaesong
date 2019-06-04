import React, {Component} from 'react';
import PropTypes from "prop-types";
import CanvasJSReact from '../../canvasjs.react.js';
import {connect} from "react-redux";
import {eatenListRequest} from "../actions/personal";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class NutritionGraph extends Component{

    componentDidMount(){
        this.props.eatenListRequest(true, undefined);
    }

    render(){
        function sumProperty(arr, type) {
            return arr.reduce((total, obj) =>{
                if(typeof obj[type] == 'string') {
                    return total + Number(obj[type]);
                }
                return total + Number(obj[type]);
            }, 0);
        }

        let input = ["ENERGY", "PROCNP", "FAT", "CHOTDF", "CA", "NA", "FE"];

        let totalAmount0 = parseInt(sumProperty(this.props.eatenData, input[0]));
        let totalAmount1 = parseInt(sumProperty(this.props.eatenData, input[1]));
        let totalAmount2 = parseInt(sumProperty(this.props.eatenData, input[2]));
        let totalAmount3 = parseInt(sumProperty(this.props.eatenData, input[3]));
        let totalAmount4 = parseInt(sumProperty(this.props.eatenData, input[4]));
        let totalAmount5 = parseInt(sumProperty(this.props.eatenData, input[5]));
        let totalAmount6 = parseInt(sumProperty(this.props.eatenData, input[6]));


        let options = {
            title: {
                text: " 오늘 섭취한 영양소"
            },
            toolTip: {
                shared: true
            },
            legend: {
                verticalAlign: "top"
            },
            axisY: {
                labelFormatter : "",
                valueFormatString: "",
                gridThickness: 0
            },
            backgroundColor: 'transparent',
            data: [{
                type: "stackedBar100",
                color: "#4CAF50",
                name: "섭취",
                showInLegend: true,
                indexLabel: "{y}",
                indexLabelFontColor: "white",
                dataPoints: [
                    {label: "ENERGY", y: totalAmount0},
                    {label: "PROCNP", y: totalAmount1},
                    {label: "FAT(지방)", y: totalAmount2},
                    {label: "CHOTDF", y: totalAmount3},
                    {label: "CA", y: totalAmount4},
                    {label: "NA", y: totalAmount5},
                    {label: "FE", y: totalAmount6}
                ]
            },
                {
                    type: "stackedBar100",
                    color: "#999",
                    name: "미섭취",
                    showInLegend: true,
                    indexLabel: "{y}",
                    indexLabelFontColor: "white",
                    dataPoints: [
                        {label: "ENERGY", y: (100-totalAmount0 > 0) ? 100-totalAmount0 : 0},
                        {label: "PROCNP", y: 100-totalAmount1},
                        {label: "FAT(지방)", y: 100-totalAmount2},
                        {label: "CHOTDF", y: 100-totalAmount3},
                        {label: "CA", y: 100-totalAmount4},
                        {label: "NA", y: 100-totalAmount5},
                        {label: "FE", y: 100-totalAmount6}
                    ]
                }]
        };


        return (
            <div className="main-panel" id="main-panel">
                <div className="content">
                    <div className="container-fluid">
                        <h4 className="page-title">Nutritional Status </h4>
                        <div className="row row-card-no-pd">
                            <div className = "col-md-12">
                                <CanvasJSChart options={options} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

NutritionGraph.propTypes = {
    isLoggedIn : PropTypes.bool,
    onLogout: PropTypes.func
};

NutritionGraph.defaultProps = {
    isLoggedIn : true,
    onLogout: () => {console.error("logout function not defined")}
};

const mapStateToProps = (state) => {
    return{
        eatenData : state.personalgraph.list.data,
        listStatus : state.personalgraph.list.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        eatenListRequest: (isInitial, listType)=>{
            return dispatch(eatenListRequest(isInitial, listType));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NutritionGraph);