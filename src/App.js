import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Clients from './modules/clients/Clients';
import ClientsCreate from './modules/clients/Clients_create';
import ClientsEdit from './modules/clients/Clients_edit';
import VisitsCreate from './modules/visits/Visits_create';
import VisitsEdit from './modules/visits/Visits_edit';
import Visits from './modules/visits/Visits';
import PieChart from './modules/reports/Pie';
import ColumnChart from './modules/reports/Column';
require('dotenv').config();

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Ciclomontaña</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link to="/">Escritorio</Link>
                  </li>
                  <li className="nav-item">
                      <Link to="/clientes">Clientes</Link>
                  </li>
                  <li className="nav-item">
                      <Link to="/visitas">Visitas</Link>
                  </li>
                  <li className="nav-item">
                      <Link to="/logout">Salir</Link>
                  </li>
              </ul>
          </div>
      </nav>
      <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/clientes" component={Clients_component} />
          <Route path="/crear_cliente" component={Clients_create_component} />
          <Route exact  path="/editar_cliente/:id" component={Clients_edit_component} />
          <Route path="/visitas" component={Visits_component} />
          <Route path="/crear_visita" component={Visits_create_component} />
          <Route exact  path="/editar_visita/:id" component={Visits_edit_component} />
          <Route path="/logout" component={Logout_component} />
      </div>
  </Router>
  );
}

function Home() {
  return (
    <React.Fragment>
    <b>Esta es la ruta que se ha definido para los servicios:</b> (Si no es correcta, modificarla en el archivo <b>.env</b>)<pre>{process.env.REACT_APP_SERVICE_URL}</pre>
    <h1>Reportes</h1>
      <PieChart/>
      <hr className="p-3"/>
      <ColumnChart/>
    </React.Fragment>
  );
}

function Logout_component() {
  localStorage.clear();
  window.location.href = "/";
}

function Clients_create_component() {
  return (
    <React.Fragment>
    <h1>Crear cliente</h1>
      <ClientsCreate/>
    </React.Fragment>
  );
}

function Clients_edit_component() {
  return (
    <React.Fragment>
    <h1>Editar cliente</h1>
      <ClientsEdit/>
    </React.Fragment>
  );
}

function Visits_create_component() {
  return (
    <React.Fragment>
    <h1>Crear cliente</h1>
      <VisitsCreate/>
    </React.Fragment>
  );
}

function Visits_edit_component() {
  return (
    <React.Fragment>
    <h1>Editar visita</h1>
      <VisitsEdit/>
    </React.Fragment>
  );
}

function Clients_component() {
  return (
      
      <React.Fragment>
          <h1>Clientes</h1>
          <div className="col-md-2 p-3">
          
            <Link className="btn btn-danger" to="/crear_cliente">Agregar cliente</Link>
            <div className="content">
            </div>
          
          </div>
          <table className="col-lg-12 table table-bordered">
              <thead>
                  <tr>
                      <th>Nombre</th>
                      <th>Dirección</th>
                      <th>Teléfono</th>
                      <th>Ciudad</th>
                      <th>Cupo</th>
                      <th>Saldo cupo</th>
                      <th>Porcentaje de visitas</th>
                      <th colSpan="2">Acciones</th>
                  </tr>
              </thead>
              <Clients/>
          </table>
      </React.Fragment>
  );
}

function Visits_component() {
  return (
    <React.Fragment>
        <h1>Visitas</h1>
        <div className="col-md-2 p-3">
            <Link className="btn btn-danger" to="/crear_visita">Agregar visita</Link>
        </div>
        <table className="col-lg-12 table table-bordered">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Vendedor</th>
                    <th>Valor neto</th>
                    <th>Valor visita</th>
                    <th>Observaciones</th>
                    <th colSpan="2">Acciones</th>
                </tr>
            </thead>
            <Visits/>
        </table>
    </React.Fragment>
  );
}

export default App;