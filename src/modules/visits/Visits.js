import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
class Visits extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }

  componentDidMount() {
    this._isMounted = true;
    fetch(process.env.REACT_APP_SERVICE_URL + "/visit/visits_list_service")
      .then(res => res.json())
      .then(
        (result) => {
          if (this._isMounted) {
            this.setState({
              isLoaded: true,
              items: result
            });
          }
        },
        (error) => {
          if (this._isMounted) {
            this.setState({
              isLoaded: true,
              error
            });
          }
        }
      )
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  deleteVisit(id){
  if(window.confirm('Estás seguro de borrar esta visita')){
  const dataDelete = {
    "id": id,
    "delete": true
   };

  var str = [];
  for (var p in dataDelete)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dataDelete[p]));
  const flagT = str.join("&");
  fetch(process.env.REACT_APP_SERVICE_URL + "/visit/visits_delete_service",{
      method: 'POST',
      body: flagT,
      headers: {
          "Content-type": "application/x-www-form-urlencoded"
      }
      }).then(res => res.json())
      .then(
        (result) => {
          document.getElementById(id).remove();
          alert(result);
        },
        (error) => {
          alert(error);
        }
      );
    }
    }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <tbody><tr key='error'><td colSpan="8">Error: {error.message}</td></tr></tbody>;
    } else if (!isLoaded) {
      return <tbody><tr key='loading'><td colSpan="8">Cargando...</td></tr></tbody>;
    } else {
      return (
        <tbody>
          {items.map(item => (
            <tr id={item.id} key={item.id}>
              <td>{item.date}</td>
              <td>{item.client_name}</td>
              <td>{item.seller_name}</td>
              <td>{item.price}</td>
              <td>{item.visit_price}</td>
              <td>{item.observations}</td>
              <td><Link className="btn btn-primary" to={"/editar_visita/" + item.id}>Editar</Link></td>
              <td><button className="btn btn-danger" onClick={() => this.deleteVisit(item.id)}> Eliminar </button></td>
            </tr>
          ))}
        </tbody>
      );
    }
  }
}

export default Visits;