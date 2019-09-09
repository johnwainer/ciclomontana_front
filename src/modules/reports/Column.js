import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ColumnChart extends Component {


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

		const options = {
			title: {
				text: "Saldo clientes por fecha"
			},
			axisY: {
				title: 'Valor visita',
				suffix: "",
				includeZero: false
			},
			axisX: {
				title: "Fecha"
			},
			animationEnabled: true,
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
					{ label: "06-09-2019",  y: 10000  },
					{ label: "07-09-2019", y: 2000  },
					{ label: "08-09-2019", y: 500  },
					{ label: "09-09-2019",  y: 5000  },
					{ label: "10-09-2019",  y: 900  }
				]
			}
			]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
		);

	}

	}
}

export default ColumnChart;