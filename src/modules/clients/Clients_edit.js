import React from 'react';
class ClientsEdit extends React.Component {
 constructor(props){
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };

  this.idData = window.location.href.split('/')[window.location.href.split('/').length - 1];
 }


  componentDidMount(){
      Promise.all([
          fetch(process.env.REACT_APP_SERVICE_URL + "/client/clients_list_by_id_service/" + this.idData),
          fetch(process.env.REACT_APP_SERVICE_URL + "/client/cities_list_service")
      ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
          userData: data1, 
          cities: data2,
          isLoaded: true,
      }));
  }

 handleSubmit(event){ 
  event.preventDefault();
  const dataForm = {
    "id": this.refs.id.value,
    "name": this.refs.name.value,
    "nit": this.refs.nit.value,
    "address": this.refs.address.value,
    "cities_id": this.refs.cities_id.value,
    "phone": this.refs.phone.value,
    "quota": this.refs.quota.value,
    "quota_balance": this.refs.quota.value,
    "visits_percentage": this.refs.visits_percentage.value
   };

  var str = [];
  for (var p in dataForm)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dataForm[p]));
  const flagT = str.join("&");
  
  fetch(process.env.REACT_APP_SERVICE_URL + "/client/clients_update_service",{
        method: 'POST',
      body: flagT,
      headers: {
          "Content-type": "application/x-www-form-urlencoded"
      }
    }).then(res => res.json())
      .then(
        (result) => {
          alert(result);
          window.location.href = "../../clientes";
        },
        (error) => {
          alert(error);
        }
      );
  }

 render () {
  const { error, isLoaded, userData, cities } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
  return (<div id="clientCreate">
    <form id="clientCreateForm" onSubmit={this.handleSubmit}>
    <input type="hidden" value={userData.id} ref="id" name="id"/>
         <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <strong>NIT</strong>
                <input type="text" value={userData.nit} ref="nit" name="nit" className="form-control" placeholder="NIT*" readOnly/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Nombre completo</strong>
                <input type="text" defaultValue={userData.name} ref="name" name="name" className="form-control" placeholder="Nombre completo*" required/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Dirección</strong>
                <input type="text" defaultValue={userData.address} ref="address" name="address" className="form-control" placeholder="Dirección" required/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Ciudad</strong>
                <select ref="cities_id" name="cities_id" className="form-control" required>
                {cities.map(item => (
                  <option selected={item.id === userData.cities_id} key={item.id} value={item.id}>{item.name}</option>
                ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Teléfono</strong>
                <input type="number" defaultValue={userData.phone} ref="phone" name="phone" className="form-control" placeholder="Teléfono"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Cupo</strong>
                <input type="number" ref="quota" defaultValue={userData.quota}  name="quota" className="form-control" placeholder="Cupo*" readOnly/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Porcentaje visitas</strong>
                <input type="text" ref="visits_percentage" defaultValue={userData.visits_percentage} name="visits_percentage" className="form-control" placeholder="Porcentaje visitas*" readOnly/>
              </div>
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">Enviar</button>
            </div>
          </div>
    </form>
​   </div>)
  }
 }
}

export default ClientsEdit;