import React, { Component } from "react";
import io from "socket.io-client"; 


class Test extends Component {
    constructor(){
        super();
        this.state ={ mensajes : [] }
    }
    componentDidMount(){

        this.socket = io('http://localhost:3030/'); 
        this.socket.on('chat message', msj =>{
            this.setState({ mensajes : [msj, ...this.state.mensajes]}); 
        });
    }
    enviar(event){
        //console.log(event.targe.value);
        const body = event.target.value; 
        if(event.keyCode ===13 && body ){
            const msj = {body, from:'me' }; 
            this.socket.emit('chat message',msj); 
            event.target.value =''; 
        } 
        
    }

    render(){
        const mesanjes = this.state.mensajes.map((msj, index)=>{
            console.log(msj); 
            return (<li key={index}>
                <b>{msj.from}  :   {msj.body } </b>
                </li>);
        }); 
        return(
            <div>
                <h1>Intento de chat 1 sin canales solo hilos </h1>
                <input
                type="text"
                placeholder="inserte el mesnaje "
                onKeyUp={this.enviar.bind(this)}
                ></input>
                <ul>
                {mesanjes}
                </ul>
               
            </div>
        ); 
    }
}

export default Test ; 