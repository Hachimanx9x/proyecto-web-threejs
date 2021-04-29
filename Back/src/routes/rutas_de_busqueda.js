const ex = require("express");
const jwt = require("jsonwebtoken");
const rutas = ex.Router();
const env = require("../env");
const buscarDB = require("../database/buscarDB");
const { removeObject } = require("../ftp/peticiones");
const ftpminio = require("../ftp/peticiones");
const LLAVE = "misecretos";

const model = require("../models/models");
const chalk = require("chalk");

rutas.get("/perfil", proToken, (req, res) => {
  console.log(chalk.yellow("/perfil"));
  jwt.verify(req.token, LLAVE, (err, data) => {
    buscarDB.obtenerusuarioid({ id: data.rows[0].id }).then((usuario) => {
      buscarDB.buscartalentogeneral2(data.rows[0].id).then((talentos) => {
        buscarDB.obteneridiomasusuario(data.rows[0].id).then((idiomas) => {
          let temfoto = null,
            temcv = null;
          if (usuario.fotoperfil !== null && usuario.fotoperfil !== "null") {
            temfoto = `${env.host}/proyecto/contenido/usuario${usuario.id}/${usuario.fotoperfil}`;
          }
          if (
            usuario.nombrearchivohojadevida !== null &&
            usuario.nombrearchivohojadevida !== "null"
          ) {
            temcv = `${env.host}/proyecto/contenido/usuario${usuario.id}/${usuario.nombrearchivohojadevida}`;
          }
          res.json({
            id: usuario.id,
            email: usuario.email,
            password: usuario.contrasena,
            experiencia: usuario.anosdeexperiencia,
            nombre: usuario.nombre,
            descripcion: usuario.descripcion,
            pais: usuario.pais,
            edad: usuario.edad,
            github: usuario.github,
            gitlab: usuario.gitlab,
            bitbucket: usuario.bitbucket,
            linkedin: usuario.linkedin,
            herramienta: talentos.data[0].herramientas,
            palabra: talentos.data[0].palabras,
            idiomas: quitarduplicados(idiomas.API),
            foto: temfoto,
            cv: temcv,
          });
        });
      });
    });
  });
});
rutas.post("/login", (req, res) => {
  // console.log("body", req.body);
  const { email, password } = req.body;
  if (typeof email === "string" && typeof password === "string") {
    buscarDB
      .obtenerToken(req.body)
      .then((resul) => {
        jwt.verify(resul.token, LLAVE, (err, data) => {
          buscarDB
            .obtenerusuarioid({ id: data.rows[0].id })
            .then((usua) => {
              buscarDB
                .obtenerusuarioid({ id: data.rows[0].id })
                .then((usua) => {
                  buscarDB
                    .buscartalentogeneral2(data.rows[0].id)
                    .then((talento) => {
                      if (talento.data.length < 1) {
                        let tem = null;
                        if (
                          usua.fotoperfil !== null &&
                          usua.fotoperfil !== "null"
                        ) {
                          tem = `${env.host}/proyecto/contenido/usuario${data.rows[0].id}/${usua.fotoperfil}`;
                        }
                        res.json({
                          token: resul.token,
                          datos: {
                            id: data.rows[0].id,
                            nombre: usua.nombre,
                            foto: tem,
                            herramientas: [],
                            palabras: [],
                          },
                        });
                      } else {
                        let tem = null;
                        if (
                          usua.fotoperfil !== null &&
                          usua.fotoperfil !== "null"
                        ) {
                          tem = `${env.host}/proyecto/contenido/usuario${data.rows[0].id}/${usua.fotoperfil}`;
                        }
                        res.json({
                          token: resul.token,
                          datos: {
                            id: data.rows[0].id,
                            nombre: usua.nombre,
                            foto: tem,
                            herramientas: talento.data[0].herramientas,
                            palabras: talento.data[0].palabras,
                          },
                        });
                      }
                    })
                    .catch((talenerr) => console.log(talenerr));
                })
                .catch((dererro) => res.json(dererro));
            })
            .catch((dererro) => res.json(dererro));
        });
      })
      .catch((err) => {
        buscarDB
          .obtenertodasUsuarios()
          .then((result2) => {
            const { API } = result2;
            let encontrado = false;
            for (let a = 0; a < API.length; a++) {
              if (API[a].email === email) {
                encontrado = true;
              }
            }

            if (encontrado) {
              res.json(err);
            } else {
              res.json({ msj: "Correo no registrado" });
            }
          })
          .catch((err2) => res.json({ msj: "error servidor" }));
      });
  }
});
rutas.get("/escritorio", proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (err) {
      res.sendStatus(403);
    }
    console.log(chalk.yellow(`/escritorio`));
    if (data.rows[0] != null && data.rows.length > 0) {
      buscarDB
        .obtenerusuarioid({ id: data.rows[0].id })
        .then((usua) => {
          console.log(chalk.blue(`usuario ${usua.nombre}`));
          buscarDB
            .buscartalentogeneral2(data.rows[0].id)
            .then((talento) => {
              console.log(chalk.blue(`talentos`));
              if (talento.data.length < 1) {
                buscarDB
                  .obtenerEscritorioProyectos(data)
                  .then((pro) => {
                    console.log(chalk.blue(`proyectos`));

                    buscarDB
                      .obteneractientreproyectos(data.rows[0].id, pro.proyectos)
                      .then((def) => {
                        console.log(chalk.blue(`entregado`));
                        res.json({
                          proyectos: def,
                          datos: {
                            nombre: usua.nombre,
                            foto: `${env.host}/proyecto/contenido/usuario${data.rows[0].id}/${usua.fotoperfil}`,
                            herramientas: [],
                            palabras: [],
                          },
                        });
                      })
                      .catch((dererro) => res.json(dererro));
                  })
                  .catch((err2) => res.json(err2));
              } else {
                buscarDB
                  .obtenerEscritorioProyectos(data)
                  .then((pro) => {
                    console.log(chalk.blue(`proyectos`));
                    if (pro.proyectos.length === 0) {
                      res.json({
                        proyectos: [],
                        datos: {
                          nombre: usua.nombre,
                          foto: `${env.host}/proyecto/contenido/usuario${data.rows[0].id}/${usua.fotoperfil}`,
                          herramientas: talento.data[0].herramientas,
                          palabras: talento.data[0].palabras,
                        },
                      });
                    } else {
                      buscarDB
                        .obteneractientreproyectos(
                          data.rows[0].id,
                          pro.proyectos
                        )
                        .then((def) => {
                          console.log(chalk.blue(`actividades`));
                          res.json({
                            proyectos: def,
                            datos: {
                              nombre: usua.nombre,
                              foto: `${env.host}/proyecto/contenido/usuario${data.rows[0].id}/${usua.fotoperfil}`,
                              herramientas: talento.data[0].herramientas,
                              palabras: talento.data[0].palabras,
                            },
                          });
                        })
                        .catch((dererro) => res.json(dererro));
                    }
                  })
                  .catch((err2) => res.json(err2));
              }
            })
            .catch((talenerr) => res.json(talenerr));
        })
        .catch((usererr) => res.json(usererr));
    }
  });
});

rutas.get("/talentos", proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (!err) {
      if (data.rows[0] != null || data.rows.length > 0) {
        buscarDB
          .buscartalentogeneral(data.rows[0].id)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    }
  });
});
rutas.get("/talentos/:id", proToken, (req, res) => {
  const { id } = req.params;
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (!err) {
      if (data.rows[0] != null || data.rows.length > 0) {
        buscarDB
          .buscarusuariocontatelento(id)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    }
  });
});
rutas.get("/usuarios/:id", proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (!err) {
      if (data.rows[0] != null || data.rows.length > 0) {
        buscarDB
          .buscartalentogeneral(data.rows[0].id)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    }
  });
});
rutas.get(`/contactos`, proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (!err) {
      if (data.rows[0] != null || data.rows.length > 0) {
        buscarDB
          .obtenerContactosUsuario(data)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    }
  });
});

rutas.get("/proyectos", proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (data != {} || data !== {} || data !== null || data !== undefined) {
        buscarDB
          .obtenerProyecto(data)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    }
  });
});

rutas.get("/proyectos/:id", proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (data != {} || data !== {} || data !== null || data !== undefined) {
        //     console.log(data);
        buscarDB
          .buscarProyecto(req.params.id, data.rows[0].id)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      }
    }
  });
});

rutas.get("/proyecto/contenido/:buque/:name", (req, res) => {
  const { buque, name } = req.params;
  //console.log(req.params)
  // const {id,name } = req.body;
  if (name == "null" || name == null) {
    res.json({ msj: "no existe" });
  } else {
    ftpminio.getFilesingle(buque, name, res);
  }
});
rutas.get("/proyecto/cadena/:buque/:name", (req, res) => {
  const { buque, name } = req.params;
  //console.log(req.params)
  // const {id,name } = req.body;
  if (name == "null" || name == null) {
    res.json({ msj: "no existe" });
  } else {
    ftpminio.getFilesinglestring(buque, name, res);
  }
});
/*
rutas.get("/proyecto/actividades/:id", proToken, (req, res) => {
  const { id } = req.params;
  //const {user} = req.body;
  // const {id,name } = req.body;
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (data != {} || data !== {} || data !== null || data !== undefined) {
        buscarDB
          .buscaractividadesproyecto(data.rows[0], id)
          .then((respu) => res.json(respu))
          .catch((err) => res.json(err));
      }
    }
  });
});*/
rutas.get("/proyecto/actividades/:id/:pra", proToken, (req, res) => {
  const { id, pra } = req.params;
  //const {user} = req.body;
  // const {id,name } = req.body;

  jwt.verify(req.token, LLAVE, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (data != {} || data !== {} || data !== null || data !== undefined) {
        buscarDB
          .buscaractividadesproyecto(data.rows[0], id, pra)
          .then((respu) => res.json(respu))
          .catch((err) => res.json(err));
      }
    }
  });
});

rutas.get("/proyecto/listado/:id", async (req, res) => {
  /*
     if(buscarDB.buscarProyecto(req.params)){
         
     }*/
  //  console.log(req.params);
  const { id } = req.params;
  //const {user} = req.body;
  // const {id,name } = req.body;

  ftpminio
    .listObjects(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

rutas.get("/calendario", proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, async (err, data) => {
    //console.log(data.rows[0].id)
    await buscarDB
      .buscareventoscalendario(data.rows[0].id)
      .then((respu) => res.json(respu))
      .catch((err) => res.json(err));
  });
});

rutas.get("/calendario/:id", proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, async (err, data) => {
    const { id } = req.params;
    await buscarDB
      .buscareventoscalendarioproyecto(id)
      .then((respu) => res.json(respu))
      .catch((err) => res.json(err));
  });
});
rutas.get("/metodologia/:name", (req, res) => {
  const { name } = req.params;
  if (name === "CEM") {
    res.json(reordenar("Concepción de la experiencia multimedia"));
  } else if (name === "SMMV") {
    res.json(reordenar("Sistema Multimedia mínimo viable"));
  } else {
    res.json({ datos: null });
  }
});
//-----------seccion de la api
rutas.get("/api/idiomas", async (req, res) => {
  buscarDB
    .obtenertodasIdiomas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/habilidades", async (req, res) => {
  buscarDB
    .obtenertodasHabilidades()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});

rutas.get("/api/herramientas", async (req, res) => {
  buscarDB
    .obtenertodasherramientas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});

rutas.get("/api/usuarios", async (req, res) => {
  buscarDB
    .obtenertodasUsuarios()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});

rutas.get("/api/palabrasclave", async (req, res) => {
  buscarDB
    .obtenertodasPalabrasClave()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});

rutas.get("/api/listaidiomas", async (req, res) => {
  buscarDB
    .obtenertodasListaidiomas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});

rutas.get("/api/contactos", async (req, res) => {
  buscarDB
    .obtenertodasContactos()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});

rutas.get("/api/listacontactos", async (req, res) => {
  buscarDB
    .obtenertodasListaContactos()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listahabilidades", async (req, res) => {
  buscarDB
    .obtenertodasListaHabilidades()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listaherramientas", async (req, res) => {
  buscarDB
    .obtenertodasListaHerramientas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/metodologias", async (req, res) => {
  buscarDB
    .obtenertodasMetodologias()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/practicas", async (req, res) => {
  buscarDB
    .obtenertodasPracticas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listapracticas", async (req, res) => {
  buscarDB
    .obtenertodasListasPracticas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/alfas", async (req, res) => {
  buscarDB
    .obtenertodasAlfas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});

rutas.get("/api/listaalfas", async (req, res) => {
  buscarDB
    .obtenertodasListaAlfas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/herramientasmetodologia", async (req, res) => {
  buscarDB
    .obtenertodasHerramientasMetodologia()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/tecnicas", async (req, res) => {
  buscarDB
    .obtenertodasTecnicas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/actividades", async (req, res) => {
  buscarDB
    .obtenertodasActividades()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/roles", async (req, res) => {
  buscarDB
    .obtenertodasRoles()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/integrantes", async (req, res) => {
  buscarDB
    .obtenertodasIntegrantes()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listaactividades", async (req, res) => {
  buscarDB
    .obtenertodasListaActividades()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/entregables", async (req, res) => {
  buscarDB
    .obtenertodasEntregables()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listaentregables", async (req, res) => {
  buscarDB
    .obtenertodasListaentregables()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listaherramientasmetodologia", async (req, res) => {
  buscarDB
    .obtenertodasListaHerramientasMetodologia()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listacontenidos", async (req, res) => {
  buscarDB
    .obtenertodasListaContenidos()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/entregas", async (req, res) => {
  buscarDB
    .obtenertodasEntregas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/chats", async (req, res) => {
  buscarDB
    .obtenertodasChats()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/historial", async (req, res) => {
  buscarDB
    .obtenertodasHistoriales()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listachats", async (req, res) => {
  buscarDB
    .obtenertodasListaChats()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/proyectos", async (req, res) => {
  buscarDB
    .obtenertodasProyectos()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/reuniones", async (req, res) => {
  buscarDB
    .obtenertodasReuniones()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listareuniones", async (req, res) => {
  buscarDB
    .obtenertodasListaReuniones()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listaentregas", async (req, res) => {
  buscarDB
    .obtenertodasListaEntregas()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listaeventos", async (req, res) => {
  buscarDB
    .obtenertodasListaEventos()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/listaintegrantes", async (req, res) => {
  buscarDB
    .obtenertodasListaIntegrantes()
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
rutas.get("/api/rol/:id", async (req, res) => {
  buscarDB
    .obtenerunrol(req.params)
    .then((respu) => res.json(respu))
    .catch((err) => res.json(err));
});
/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
/*
 **************************************************************************************************
 ************************Funciones*****************************************************************
 **************************************************************************************************
 */
/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
function proToken(req, res, next) {
  const header = req.headers["authorization"];
  //console.log(header);
  if (typeof header !== "undefined") {
    const portador = header.split(" ");
    const portadorToken = portador[1];
    req.token = portadorToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
function reordenar(name) {
  let objdef;
  let alfas = [],
    entregables = [],
    actividades = [],
    roles = [];
  for (let a = 0; a < model.Practicas.length; a++) {
    if (name === model.Practicas[a].nombre) {
      objdef = {
        nombre: model.Practicas[a].nombre,
        descripcion: model.Practicas[a].descripcion,
        alfas,
        entregables,
        actividades,
        roles,
      };
    }
  }

  for (let a = 0; a < model.Practicas.length; a++) {
    if (objdef.nombre === model.Practicas[a].nombre) {
      for (let b = 0; b < model.Practicas[a].alfas.length; b++) {
        objdef.alfas.push({
          nombre: model.Practicas[a].alfas[b].nombre,
          descripcion: model.Practicas[a].alfas[b].descripcion,
          herramientas: model.Practicas[a].Estados,
        });
      }
    }
  }

  for (let a = 0; a < model.Practicas.length; a++) {
    if (objdef.nombre === model.Practicas[a].nombre) {
      for (let b = 0; b < model.Practicas[a].Actividades.length; b++) {
        let herramientas = [];
        for (
          let c = 0;
          c < model.Practicas[a].Actividades[b].listecncias.length;
          c++
        ) {
          for (let d = 0; d < model.Practicas[a].Tecnicas.length; d++) {
            if (
              model.Practicas[a].Actividades[b].listecncias[c] ===
              model.Practicas[a].Tecnicas[d].titulo
            ) {
              herramientas.push({
                nombre: model.Practicas[a].Tecnicas[d].titulo,
                descripcion: model.Practicas[a].Tecnicas[d].descripcion,
                bibliografia: model.Practicas[a].Tecnicas[d].bibliografia,
              });
            }
          }
        }
        objdef.actividades.push({
          nombre: model.Practicas[a].Actividades[b].titulo,
          descripcion: model.Practicas[a].Actividades[b].descripcion,
          herramientas,
        });
      }
    }
  }
  for (let a = 0; a < model.Practicas.length; a++) {
    if (objdef.nombre === model.Practicas[a].nombre) {
      for (let b = 0; b < model.Practicas[a].Entregables.length; b++) {
        let herramientas = [];
        for (
          let c = 0;
          c < model.Practicas[a].Entregables[b].Herramientas.length;
          c++
        ) {
          for (let d = 0; d < model.Practicas[a].Herramientas.length; d++) {
            if (
              model.Practicas[a].Entregables[b].Herramientas[c] ===
              model.Practicas[a].Herramientas[d].nombre
            ) {
              herramientas.push({
                nombre: model.Practicas[a].Herramientas[d].nombre,
                descripcion: model.Practicas[a].Herramientas[d].descripcion,
                bibliografia: model.Practicas[a].Herramientas[d].bibliografia,
              });
            }
          }
        }
        objdef.entregables.push({
          nombre: model.Practicas[a].Entregables[b].entregatitulo,
          descripcion: model.Practicas[a].Entregables[b].entregadescripcion,
          herramientas,
        });
      }
    }
  }
  for (let a = 0; a < model.Practicas.length; a++) {
    if (objdef.nombre === model.Practicas[a].nombre) {
      for (let b = 0; b < model.Practicas[a].Roles.length; b++) {
        if (
          model.Practicas[a].Roles[b].nombre ===
          "Arquitecto Experiencia Multimedia"
        ) {
          objdef.roles.push({
            nombre: model.Practicas[a].Roles[b].nombre,
            descripcion: model.Practicas[a].Roles[b].descripcion,
            perfiles: model.Practicas[a].Roles[b].perfiles,
          });
        } else if (
          model.Practicas[a].Roles[b].nombre ===
          "Arquitecto de producción de contenidos"
        ) {
          objdef.roles.push({
            nombre: model.Practicas[a].Roles[b].nombre,
            descripcion: model.Practicas[a].Roles[b].descripcion,
            perfiles: model.Practicas[a].Roles[b].perfiles,
          });
        } else if (
          model.Practicas[a].Roles[b].nombre === "Arquitecto de información"
        ) {
          objdef.roles.push({
            nombre: model.Practicas[a].Roles[b].nombre,
            descripcion: model.Practicas[a].Roles[b].descripcion,
            perfiles: model.Practicas[a].Roles[b].perfiles,
          });
        } else if (
          model.Practicas[a].Roles[b].nombre === "Arquitecto de pruebas"
        ) {
          objdef.roles.push({
            nombre: model.Practicas[a].Roles[b].nombre,
            descripcion: model.Practicas[a].Roles[b].descripcion,
            perfiles: model.Practicas[a].Roles[b].perfiles,
          });
        } else if (
          model.Practicas[a].Roles[b].nombre ===
          "Arquitecto de Hardware/Software"
        ) {
          objdef.roles.push({
            nombre: model.Practicas[a].Roles[b].nombre,
            descripcion: model.Practicas[a].Roles[b].descripcion,
            perfiles: model.Practicas[a].Roles[b].perfiles,
          });
        } else if (
          model.Practicas[a].Roles[b].nombre === "Arquitecto de información"
        ) {
          objdef.roles.push({
            nombre: model.Practicas[a].Roles[b].nombre,
            descripcion: model.Practicas[a].Roles[b].descripcion,
            perfiles: model.Practicas[a].Roles[b].perfiles,
          });
        } else if (
          model.Practicas[a].Roles[b].nombre === "Diseñador Audiovisual"
        ) {
          objdef.roles.push({
            nombre: model.Practicas[a].Roles[b].nombre,
            descripcion: model.Practicas[a].Roles[b].descripcion,
            perfiles: model.Practicas[a].Roles[b].perfiles,
          });
        } else if (
          model.Practicas[a].Roles[b].nombre ===
          "Diseñador de Concepto y Storyboard"
        ) {
          objdef.roles.push({
            nombre: model.Practicas[a].Roles[b].nombre,
            descripcion: model.Practicas[a].Roles[b].descripcion,
            perfiles: model.Practicas[a].Roles[b].perfiles,
          });
        }
      }
    }
  }
  return objdef;
}
function quitarduplicados(array) {
  return Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
}
/*
 **************************************************************************************************
 ************************Exportaciones*****************************************************************
 **************************************************************************************************
 */
/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

module.exports = rutas;

/*         ,--"""",--.__,---[],-------._
       ,"   __,'            \         \--""""""==;-
     ," _,-"  "/---.___     \       ___\   ,-'',"
    /,-'      / ;. ,.--'-.__\  _,-"" ,| `,'   /
   /``""""-._/,-|:\       []\,' ```-/:;-. `. /
             `  ;:::      ||       /:,;  `-.\
                =.,'__,---||-.____',.=
                =(:\_     ||__    ):)=
               ,"::::`----||::`--':::"._
             ,':::::::::::||::::::::::::'.
    .__     ;:::.-.:::::__||___:::::.-.:::\     __,
       """-;:::( O )::::>_|| _<::::( O )::::-"""
   =======;:::::`-`:::::::||':::::::`-`:::::\=======
    ,--"";:::_____________||______________::::""----.          , ,
         ; ::`._(    |    |||     |   )_,'::::\_,,,,,,,,,,____/,'_,
       ,;    :::`--._|____[]|_____|_.-'::::::::::::::::::::::::);_
      ;/ /      :::::::::,||,:::::::::::::::::::::::::::::::::::/
     /; ``''''----------/,'/,__,,,,,____:::::::::::::::::::::,"
     ;/                :);/|_;| ,--.. . ```-.:::::::::::::_,"
    /;                :::):__,'//""\\. ,--.. \:::,:::::_,"
   ;/              :::::/ . . . . . . //""\\. \::":__,"
   ;/          :::::::,' . . . . . . . . . . .:`::\
   ';      :::::::__,'. ,--.. . .,--. . . . . .:`::`
   ';   __,..--'''-. . //""\\. .//""\\ . ,--.. :`:::`
   ;    /  \\ .//""\\ . . . . . . . . . //""\\. :`::`
   ;   /       . . . . . . . . . . . . . . . . .:`::`
   ;   (          . . . . . . . . . . . . . . . ;:::`
   ,:  ;,            . . . . . . . . . . . . . ;':::`
   ,:  ;,             . . . . . . . . . . . . .;`:::
   ,:   ;,             . . . . . . . . . . . . ;`::;`
    ,:  ;             . . . . . . . . . . . . ;':::;`
     :   ;             . . . . . . . . . . . ,':::;
      :   '.          . . . . . . . .. . . .,':::;`
       :    `.       . . . . . . . . . . . ;::::;`
        '.    `-.   . . . . . . . . . . ,-'::::;
          `:_    ``--..___________..--'':::::;'`
             `._::,.:,.:,:_ctr_:,:,.::,.:_;'`
________________`"\/"\/\/'""""`\/"\/""\/"____________________________ */
