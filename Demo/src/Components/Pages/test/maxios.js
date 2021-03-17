import React, { Component } from "react";
import axios from 'axios';


class Login extends Component {
    constructor() {
        super();
        this.state = { correo: "", password: "", login: false, store: null };
    }

    componentDidMount() {
        var data = JSON.stringify({ "correo": "micorreo@uao.edu.co", "password": "contraseña123" });

        var config = {
            method: 'post',
            url: 'http://localhost:3030/login',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: data
        };

        axios(config)
            .then((response)=> {
                        console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                algo
            </div>
        );
    }
}

export default Login;