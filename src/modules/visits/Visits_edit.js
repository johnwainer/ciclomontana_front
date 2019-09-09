import React from 'react';
class VisitsEdit extends React.Component {
 constructor(props){
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state = {
      error: null,
      isLoaded: false,
      clients: {},
      sellers: {},
      visitData: {}
    };

  this.idData = window.location.href.split('/')[window.location.href.split('/').length - 1];
 }


  componentDidMount(){
      Promise.all([
          fetch(process.env.REACT_APP_SERVICE_URL + "/visit/visits_list_by_id_service/" + this.idData),
          fetch(process.env.REACT_APP_SERVICE_URL + "/client/clients_list_service"),
          fetch(process.env.REACT_APP_SERVICE_URL + "/visit/sellers_list_service")
      ])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([data1, data2, data3]) => this.setState({
          visitData: data1, 
          clients: data2,
          sellers: data3,
          isLoaded: true,
      }));
  }

 handleSubmit(event){ 
  event.preventDefault();
  const dataForm = {
    "id": this.refs.id.value,
    "clients_id": this.refs.clients_id.value,
    "sellers_id": this.refs.sellers_id.value,
    "date": this.refs.date.value,
    "price": this.refs.price.value,
    "visit_price": this.refs.visit_price.value,
    "observations": this.refs.observations.value
   };

  var str = [];
  for (var p in dataForm)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dataForm[p]));
  const flagT = str.join("&");
  
  fetch(process.env.REACT_APP_SERVICE_URL + "/visit/visits_update_service",{
        method: 'POST',
      body: flagT,
      headers: {
          "Content-type": "application/x-www-form-urlencoded"
      }
    }).then(res => res.json())
      .then(
        (result) => {
          alert(result);
          window.location.href = "../../visitas";
        },
        (error) => {
          alert(error);
        }
      );
  }

 render () {
  const { error, isLoaded, visitData, clients, sellers } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
  return (<div id="visitUpdate">
    <form onSubmit={this.handleSubmit}>
    <input type="hidden" value={visitData.id} ref="id" name="id"/>
         <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                  <strong>Cliente</strong>
                  <select name="clients_id" ref="clients_id" id="clients_id" className="form-control" readOnly>
                      {clients.map(item => (
                        <option selected={item.id == visitData.clients_id} key={item.id} value={item.id}>{item.name}</option>
                      ))}
                  </select>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Vendedor</strong>
                  <select name="sellers_id" ref="sellers_id" className="form-control" required>
                      {sellers.map(item => (
                        <option selected={item.id == visitData.sellers_id} key={item.id} value={item.id}>{item.name}</option>
                      ))}
                  </select>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Fecha</strong>
                  <input defaultValue={visitData.date} type="date" name="date" ref="date" id="date" className="form-control" placeholder="Fecha" required/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Valor neto</strong>
                  <input defaultValue={visitData.price} type="number" name="price" ref="price" id="price" className="form-control" placeholder="Valor neto" readOnly/>
              </div>
          </div>

          <div className="col-md-6">
              <div className="form-group">
                  <strong>Valor visita</strong>
                  <input defaultValue={visitData.visit_price} type="text" name="visit_price" ref="visit_price" id="visit_price" className="form-control" placeholder="Valor visita" readOnly/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Observaciones</strong>
                  <textarea className="form-control" ref="observations" name="observations" rows="3" required defaultValue={visitData.observations}></textarea>
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

export default VisitsEdit;