import React from 'react';
import './App.css';
require('dotenv').config();

class Login extends React.Component {
constructor(props){
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
 }


render () {
  return (
    <div className="content">
      <div className="login-form">
    <form onSubmit={this.handleSubmit}>
        <h2 className="text-center">Ciclomontaña</h2>       
        <div className="form-group">
            <input id="email" ref="email" name="email" type="email" className="form-control" placeholder="Email" required="required"/>
        </div>
        <div className="form-group">
            <input id="password" ref="password" name="password" type="password" className="form-control" placeholder="Contraseña" required="required"/>
        </div>
        <div className="form-group">
            <button className="btn btn-primary btn-block" onSubmit={this.handleSubmit}>Enviar</button>
        </div>    
    </form>
</div>
</div>
  );

}

handleSubmit(event){ 
  event.preventDefault();
  var md5 = require('md5');
  const dataForm = {
    "email": this.refs.email.value,
    "password": md5(this.refs.password.value)
   };

  var str = [];
  for (var p in dataForm)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dataForm[p]));
  const flagT = str.join("&");
  
  fetch(process.env.REACT_APP_SERVICE_URL + "/client/login_service",{
        method: 'POST',
      body: flagT,
      headers: {
          "Content-type": "application/x-www-form-urlencoded"
      }
    }).then(res => res.json())
      .then(
        (result) => {
          if (result != false){
            localStorage.setItem('email', result[0].email);
            localStorage.setItem('name', result[0].first_name);
            localStorage.setItem('user_id', result[0].user_id);
            window.location.href = "/";
          }else{
            alert('Verifique su Email o Contraseña e intente nuevamente.');
          }
        },
        (error) => {
          alert(error);
        }
      );
  }
}

export default Login;