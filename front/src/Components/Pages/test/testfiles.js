import React, { Component } from "react";
import axios from "axios";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
    };
    this.enviar = this.enviar.bind(this);
    this.httpInstance = axios.create({
      baseURL: "http://localhost:3030/",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        authorization:
          "llave eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6NjAsImVtYWlsIjoiYmxhMkBnbWFpbC5jb20iLCJjb250cmFzZW5hIjoiMTIzNDU2IiwiZm90b3BlcmZpbCI6InBuZ2VnZy5wbmciLCJub21icmVhcmNoaXZvaG9qYWRldmlkYSI6IjIucG5nIiwiYW5vc2RlZXhwZXJpZW5jaWEiOjUsIm5vbWJyZSI6IkFjY2VsIFpldG8iLCJkZXNjcmlwY2lvbiI6InVuZGVmaW5lZCIsInBhaXMiOiJDb2xvbWJpYSIsImVkYWQiOm51bGwsImdpdGh1YiI6Ik5hbWUiLCJnaXRsYWIiOiJOYW1lIiwiYml0YnVja2V0IjoiTmFtZSIsImxpbmtlZGluIjoiTmFtZSJ9XSwiaWF0IjoxNjE4NDM2NTgxfQ.JQ4koe_vj7uGFvcrpZTjrn_a7BO5IuQZnBbl9jWc_c4",
      },
    });
    this.httpInstance.interceptors.response.use(null, (error) => {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (!expectedError) {
        // Loggear mensaje de error a un servicio como Sentry
        // Mostrar error genérico al usuario
        return Promise.reject(error);
      }
    });
  }
  detectarCambio(event) {
    let files = event.target.files;
    //console.log(files);
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (event) => {
      const formData = {
        herramienta: "1,2,6",
        idiomas: "1,3,5",
        palabra: "hola2,dfdsf",
        foto: event.target.result,
      };
      console.log(formData);
      const httpInstance = axios.create({
        baseURL: "http://localhost:3030/",
        timeout: 1000,
        headers: {
          "Content-Type": "application/json",
          authorization:
            "llave eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6NjAsImVtYWlsIjoiYmxhMkBnbWFpbC5jb20iLCJjb250cmFzZW5hIjoiMTIzNDU2IiwiZm90b3BlcmZpbCI6InBuZ2VnZy5wbmciLCJub21icmVhcmNoaXZvaG9qYWRldmlkYSI6IjIucG5nIiwiYW5vc2RlZXhwZXJpZW5jaWEiOjUsIm5vbWJyZSI6IkFjY2VsIFpldG8iLCJkZXNjcmlwY2lvbiI6InVuZGVmaW5lZCIsInBhaXMiOiJDb2xvbWJpYSIsImVkYWQiOm51bGwsImdpdGh1YiI6Ik5hbWUiLCJnaXRsYWIiOiJOYW1lIiwiYml0YnVja2V0IjoiTmFtZSIsImxpbmtlZGluIjoiTmFtZSJ9XSwiaWF0IjoxNjE4NDM2NTgxfQ.JQ4koe_vj7uGFvcrpZTjrn_a7BO5IuQZnBbl9jWc_c4",
        },
      }); //

      httpInstance.interceptors.response.use(null, (error) => {
        const expectedError =
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500;
        if (!expectedError) {
          // Loggear mensaje de error a un servicio como Sentry
          // Mostrar error genérico al usuario
          return Promise.reject(error);
        }
      });
      //------
      httpInstance
        .put("actualizar/usuario", formData)
        .then((respuesta) => {
          if (respuesta.statusText === "OK") {
            console.log(respuesta.data);
          } else {
            console.log("error fatal");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }
  cargarArchivo(event) {}
  enviar = () => {
    const data = new FormData();
    const file = this.state.img;
    console.log(file);
    data.append("herramienta", "1,2,6");
    data.append("idiomas", "1,3,5");
    data.append("palabra", "hola2,dfdsf");
    data.append("foto", file);
    console.log(data);
    this.httpInstance
      .put("actualizar/usuario", data)
      .then((respuesta) => {
        if (respuesta.statusText === "OK") {
          console.log(respuesta.data);
        } else {
          console.log("error fatal");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <div>
        <div onSubmit={this.onFormSubmit}>
          <h1>Subir archivos en react js </h1>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              this.setState({ img: e.target.files[0] });
            }}
          />

          <button onClick={this.enviar}>Enviar</button>
        </div>

        <div>
          <h2>cargar imagen</h2>
        </div>
      </div>
    );
  }
}

export default Test;

/**
 * var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('archivo', fs.createReadStream('/C:/Users/DIEGO/Videos/2020-12-02_21-47-13.mp4'));

var config = {
  method: 'post',
  url: 'http://localhost:3030/proyecto/insertarArchivo2',
  headers: {
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

 */
