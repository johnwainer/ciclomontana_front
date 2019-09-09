import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class PieChart extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: {}
	    };
	  }

	  componentDidMount() {
	    fetch(process.env.REACT_APP_SERVICE_URL + "/visit/get_count_visits_by_city_service")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            items: result
	          });
	        },
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      )
	  }

	render() {

			const { error, isLoaded, items } = this.state;
		    if (error) {
		      return <div>Error: {error.message}</div>;
		    } else if (!isLoaded) {
		      return <div>Cargando...</div>;
		    } else {
				let jsonData = {};
		    	let jsonTest = [];

		    	for (const item of items) {
		    		jsonData = { y: item.total, label: item.name};
				    jsonTest.push(jsonData);
				  }

				const options = {
					exportEnabled: true,
					animationEnabled: true,
					title: {
						text: "Visitas a clientes por ciudad"
					},
					data: [{
						type: "pie",
						startAngle: 75,
						toolTipContent: "<b>{label}</b>: {y}",
						showInLegend: "true",
						legendText: "{label}",
						indexLabelFontSize: 16,
						indexLabel: "{label} - {y}",
						dataPoints: jsonTest
					}]
				}

				return (
					<div>
					<CanvasJSChart options = {options}/>
					</div>
				);	
			}

		
	}
}

export default PieChart;