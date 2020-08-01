//importaciones funcionales
import React,{Component} from 'react';
import {Switch, Route, Router} from 'react-router-dom'
//paginas propias
import {Login} from './Pages/login'; 
import {NoEncontrado} from './Pages/noEncontrado';
//estilos 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component{
  render(){
    return(
      <div className="App">
        <Switch>
            <Route exact path ='/login' component={Login} /> 
            <Route component={ NoEncontrado } />          
        </Switch>
      </div>
    ); 
  }

}



export default App;
