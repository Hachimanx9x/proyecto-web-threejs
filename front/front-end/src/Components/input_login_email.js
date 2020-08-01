import React,{Component} from 'react';

class App extends Component{
    render(){
        return(
            <div className="form-group col-sm-8">
                <div className="espacio_login">
                    <label for="correo">Correo</label>
                    <input 
                    type="email" 
                    className="form-control " 
                    placeholder="Ingrese el correo" /> 

                </div>
            </div>
        );
    }
}

export default App;