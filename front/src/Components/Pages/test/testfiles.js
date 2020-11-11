import React, { Component } from "react";
import axios from 'axios'; 

class Test extends Component{
    constructor(props){
        super(props)
        this.state={
            img:''
        }
    }
    detectarCambio(event){
        let files = event.target.files; 
        //console.log(files); 
        var reader = new FileReader(); 
        reader.readAsDataURL(files[0]);
       
        reader.onload=(event)=>{

            const formData = {id:"default",name:files[0].name ,file:event.target.result }
            console.log(formData); 
                const httpInstance = axios.create( {
                baseURL:"http://localhost:3030/",
                timeout: 1000,
                headers: {'Content-Type': 'application/json'}
            });//
          
            httpInstance.interceptors.response.use(null, error => {
              const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
              if (!expectedError) {
                  // Loggear mensaje de error a un servicio como Sentry
                  // Mostrar error genérico al usuario
                  return Promise.reject(error);
              }
            }
          );
            //------
            httpInstance.post('proyecto/insertarArchivo',formData).then(respuesta => {
              if(respuesta.statusText === "OK" ){
                console.log(respuesta.data);
              }else{
                console.log("error fatal")
              }
              
          }).catch(error => {
              console.error(error);
          })
          

        }
       
        
    }
    cargarArchivo(event){
        
    }
    render(){
        return(
         <div>
                <div onSubmit={this.onFormSubmit}>
                <h1>Subir archivos en react js </h1>
                 <input type="file" name="file" onChange={(event)=> this.detectarCambio(event)}   />
                  
       
                 </div>

                 <div>
                     <h2>cargar imagen</h2>
                 </div>
       
         </div> );
    }
}

export default Test;