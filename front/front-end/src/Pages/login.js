import React,{Component} from 'react';

import Form_login from '../Components/form_login';



export class Login extends Component{

    render(){
        return(
          
            <div className="container-fluid fondo_login">
            <div className="row">

                <div className="col-sm-6 form_login  ">  
                   <div>
                    <p>El mejor lugar </p>
                    <p>Para tu trabajar con tu equipo</p>

                   </div >
                   <div className="justify-content-center h-100" >
                      <Form_login />
                   </div>
                   
                </div>

                <div className="col-sm-8">
                aqui la imagen
                </div>
            </div>
           
        </div>  
        );
    }
}