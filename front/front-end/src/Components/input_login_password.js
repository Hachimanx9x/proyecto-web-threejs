import React,{Component} from 'react';

class App extends Component{
    render(){
        return(
            <div className="form-group col-sm-8">
                <div className="espacio_login">
                    <label for="correo">Contraseña</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Ingrese su contraseña" />    
                </div>
            </div>
        );
    }
}

export default App;