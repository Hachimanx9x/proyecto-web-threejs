import React, { Component } from "react";
import axios, {post} from 'axios'; 

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
         //  console.log(event.target); 
            const url = "http://localhost:3030/proyecto/insertarArchivo";
            const formData = {id:"default",name:files[0].name ,file:event.target.result }
            console.log(formData); 
           /* return post(url, formData)
            .then(response=>{ console.log(response)}); */
            fetch(url, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((response) => {
                response.json().then((result) => {
                    console.log(result); 
                });
              });

        }
       
        
    }
    cargarArchivo(event){
        
    }
    render(){
        return(
         <div>
                <div onSubmit={this.onFormSubmit}>
                <h1>Subir archivos en react js </h1>
                 <input type="file" name="file" onChange={(event)=> this.detectarCambio(event)} />
                  
       
                 </div>

                 <div>
                     <h2>cargar imagen</h2>
                 </div>
       
         </div> );
    }
}

export default Test;