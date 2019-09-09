import React from 'react';
class VisitsCreate extends React.Component {
 constructor(props){
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.state = {
      error: null,
      isLoaded: false,
      clients: {},
      sellers: {}
    };
 }

 handleChange(event){
  event.preventDefault();
  console.log(this);
  if( this.refs.clients_id){
  fetch(process.env.REACT_APP_SERVICE_URL + "/client/client_visits_percentage_service/" + this.refs.clients_id.value,{
      }).then(res => res.json())
      .then(
        (result) => {
          console.log(result, this.refs.visit_price.value);
          this.refs.visit_price.value = parseFloat(result) * parseFloat(this.refs.price.value)
        },
        (error) => {
          alert(error);
        }
      );
  }
  
  }


componentDidMount(){
      Promise.all([
          fetch(process.env.REACT_APP_SERVICE_URL + "/client/clients_list_service"),
          fetch(process.env.REACT_APP_SERVICE_URL + "/client/sellers_list_service")
      ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
          clients: data1, 
          sellers: data2,
          isLoaded: true,
      }));
  }


 handleSubmit(event){ 
  event.preventDefault();
  const dataForm = {
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
  fetch(process.env.REACT_APP_SERVICE_URL + "/visit/visits_create_service",{
      method: 'POST',
      body: flagT,
      headers: {
          "Content-type": "application/x-www-form-urlencoded"
      }
      }).then(res => res.json())
      .then(
        (result) => {
          alert(result);
          window.location.href = "./visitas";
        },
        (error) => {
          alert(error);
        }
      );
    }

 render () {
  const { error, isLoaded, clients, sellers } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
  return (<div id="visitCreate">
    <form onSubmit={this.handleSubmit}>
         <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                  <strong>Cliente</strong>
                  <select name="clients_id" ref="clients_id" id="clients_id" className="form-control" required>
                      {clients.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                  </select>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Vendedor</strong>
                  <select name="sellers_id" ref="sellers_id" className="form-control" required>
                      {sellers.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                  </select>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Fecha</strong>
                  <input type="date" name="date" ref="date" id="date" className="form-control" placeholder="Fecha" required/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Valor neto</strong>
                  <input type="number" name="price" ref="price" id="price" className="form-control" placeholder="Valor neto" onChange={this.handleChange} required/>
              </div>
          </div>

          <div className="col-md-6">
              <div className="form-group">
                  <strong>Valor visita</strong>
                  <input type="text" name="visit_price" ref="visit_price" id="visit_price" className="form-control" placeholder="Valor visita" readOnly required/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Observaciones</strong>
                  <textarea className="form-control" ref="observations" name="observations" rows="3" required></textarea>
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

export default VisitsCreate;