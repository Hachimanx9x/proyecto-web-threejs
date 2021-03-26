const jwt = require("jsonwebtoken");
const promesa = require("../database");
const buscarDB = require("./buscarDB");
const Query = require("./querys");
const LLAVE = "misecretos";
const modelo = require("../models/models");
const chalk = require("chalk");
const funcionesDB = () => {
  console.log("funciones de la base de datos");
};

/*
 ________  __  __                     
|        \|  \|  \                    
| $$$$$$$$ \$$| $$  ______    _______ 
| $$__    |  \| $$ /      \  /       \
| $$  \   | $$| $$|  $$$$$$\|  $$$$$$$
| $$$$$   | $$| $$| $$    $$ \$$    \ 
| $$      | $$| $$| $$$$$$$$ _\$$$$$$\
| $$      | $$| $$ \$$     \|       $$
 \$$       \$$ \$$  \$$$$$$$ \$$$$$$$ 
                                       */

funcionesDB.agregarherramientas = (obj) => {
  return new Promise((res, rej) => {
    buscarDB
      .obtenertodasherramientas()
      .then((tools) => {
        const { herramientas, id } = obj;
        // console.log(obj)
        let habi = organizarherramientasparahabilidaes(herramientas, tools.API);
        // console.log(habi)
        let c = 0;
        // console.log("hola")
        for (let a = 0; a < herramientas.length; a++) {
          funcionesDB
            .insertlistTool({ usuario: id, herramienta: herramientas[a] })
            .then((resul) => {
              //  console.log(`${a} vs ${herramientas.length} ==  ${herramientas[a]}`)
              if (c === herramientas.length - 1) {
                organizarhabilidades(habi)
                  .then((result3) => {
                    console.log(result3);
                    let g = 0;
                    for (let d = 0; d < result3.length; d++) {
                      funcionesDB
                        .insetlistAbility({
                          usuario: id,
                          habilidad: result3[d],
                        })
                        .then((fin) => {
                          if (g === result3.length - 1) res("Echo");
                          g++;
                        })
                        .catch((errv) => {
                          rej(errv);
                        });
                    }
                  })
                  .catch((errw) => rej(errw));
              }
              c++;
            })
            .catch((err) => rej(err));
        }
      })
      .catch((errt) => rej(errt));
  });
};

funcionesDB.creaproyecto2 = (obj) => {
  return new Promise((res, rej) => {
    const { proyect, members, practice } = obj;
    insertmetodologia()
      .then((result1) => {
        inserthistoria()
          .then((result2) => {
            inserproyecto({
              nombre: proyect.nombre,
              descripcion: proyect.descripcion,
              estado: "iniciado",
              icon: proyect.icono,
              banner: proyect.banner,
              metodologia: result1.id,
              historia: result2.id,
            })
              .then((result3) => {
                for (let a = 0; a < practice.length; a++) {
                  for (let b = 0; b < modelo.Practicas.length; b++) {
                    if (practice[a] == modelo.Practicas[b].nombre) {
                      insertpractica({
                        nombre: modelo.Practicas[b].nombre,
                        descripcion: modelo.Practicas[b].descripcion,
                      })
                        .then((result4) => {
                          for (
                            let c = 0;
                            c < modelo.Practicas[b].alfas.length;
                            c++
                          ) {
                            insertalfa({
                              nombre: modelo.Practicas[b].alfas[c].nombre,
                              descripcion:
                                modelo.Practicas[b].alfas[c].descripcion,
                              estado: modelo.Practicas[b].alfas[c].estado,
                            })
                              .then((result5) => {
                                funcionesDB
                                  .insertlistAlpha({
                                    practica: result4.id,
                                    alfa: result5.id,
                                  })
                                  .then((result6) => {
                                    console.log(
                                      "insert list alfa " + result6.msj
                                    );
                                    for (
                                      let d = 0;
                                      d <
                                      modelo.Practicas[b].alfas[c].entregable
                                        .length;
                                      d++
                                    ) {
                                      for (
                                        let e = 0;
                                        e <
                                        modelo.Practicas[b].Entregables.length;
                                        e++
                                      ) {
                                        if (
                                          modelo.Practicas[b].alfas[c]
                                            .entregable[d] ===
                                          modelo.Practicas[b].Entregables[e]
                                            .entregatitulo
                                        ) {
                                          insertentregable({
                                            titulo:
                                              modelo.Practicas[b].Entregables[e]
                                                .entregatitulo,
                                            descripcion:
                                              modelo.Practicas[b].Entregables[e]
                                                .entregadescripcion,
                                            estado:
                                              modelo.Practicas[b].Entregables[e]
                                                .entregaestado,
                                            tipoArchivo:
                                              modelo.Practicas[b].Entregables[e]
                                                .entregatipoArchivo,
                                            fechaEntrega:
                                              modelo.Practicas[b].Entregables[e]
                                                .entregafechaEntrega,
                                            numeroRevisiones:
                                              modelo.Practicas[b].Entregables[e]
                                                .entreganumeroRevisiones,
                                          })
                                            .then((result7) => {
                                              insertcontenido()
                                                .then((result8) => {
                                                  funcionesDB
                                                    .insertlistContent({
                                                      entregable: result7.id,
                                                      contenido: result8.id,
                                                      actividad: null,
                                                    })
                                                    .then((result9) => {
                                                      console.log(
                                                        "insert list contenido " +
                                                          result9.msj
                                                      );
                                                      if (
                                                        c ===
                                                          modelo.Practicas[b]
                                                            .alfas.length -
                                                            1 &&
                                                        d ===
                                                          modelo.Practicas[b]
                                                            .alfas[c].entregable
                                                            .length -
                                                            1 &&
                                                        e ===
                                                          modelo.Practicas[b]
                                                            .Entregables
                                                            .length -
                                                            1
                                                      ) {
                                                        buscarDB
                                                          .obtenertodasRoles()
                                                          .then((result10) => {
                                                            for (
                                                              let f = 0;
                                                              f <
                                                              members.length;
                                                              f++
                                                            ) {
                                                              for (
                                                                let g = 0;
                                                                g <
                                                                result10.API
                                                                  .length;
                                                                g++
                                                              ) {
                                                                if (
                                                                  members[f]
                                                                    .rol ==
                                                                  result10.API[
                                                                    g
                                                                  ].roltitulo
                                                                ) {
                                                                  console.log(
                                                                    members[f]
                                                                      .rol +
                                                                      " | " +
                                                                      result10
                                                                        .API[g]
                                                                        .roltitulo
                                                                  );
                                                                  insertintegrante(
                                                                    {
                                                                      usuario:
                                                                        members[
                                                                          f
                                                                        ].user,
                                                                      rol:
                                                                        result10
                                                                          .API[
                                                                          g
                                                                        ].id,
                                                                    }
                                                                  )
                                                                    .then(
                                                                      (
                                                                        result11
                                                                      ) => {
                                                                        funcionesDB
                                                                          .insertlistMembers(
                                                                            {
                                                                              proyecto:
                                                                                result3.id,
                                                                              integrante:
                                                                                result11.id,
                                                                            }
                                                                          )
                                                                          .then(
                                                                            (
                                                                              result12
                                                                            ) => {
                                                                              console.log(
                                                                                "insert list integrante " +
                                                                                  result12.msj
                                                                              );
                                                                              let fin = false;
                                                                              for (
                                                                                let h = 0;
                                                                                h <
                                                                                modelo
                                                                                  .Practicas[
                                                                                  b
                                                                                ]
                                                                                  .Roles
                                                                                  .length;
                                                                                h++
                                                                              ) {
                                                                                for (
                                                                                  let i = 0;
                                                                                  i <
                                                                                  modelo
                                                                                    .Practicas[
                                                                                    b
                                                                                  ]
                                                                                    .Roles[
                                                                                    h
                                                                                  ]
                                                                                    .actividades
                                                                                    .length;
                                                                                  i++
                                                                                ) {
                                                                                  for (
                                                                                    let j = 0;
                                                                                    j <
                                                                                    modelo
                                                                                      .Practicas[
                                                                                      b
                                                                                    ]
                                                                                      .Actividades
                                                                                      .length;
                                                                                    j++
                                                                                  ) {
                                                                                    if (
                                                                                      modelo
                                                                                        .Practicas[
                                                                                        b
                                                                                      ]
                                                                                        .Roles[
                                                                                        h
                                                                                      ]
                                                                                        .nombre ===
                                                                                        members[
                                                                                          f
                                                                                        ]
                                                                                          .rol &&
                                                                                      modelo
                                                                                        .Practicas[
                                                                                        b
                                                                                      ]
                                                                                        .Roles[
                                                                                        h
                                                                                      ]
                                                                                        .actividades[
                                                                                        i
                                                                                      ] ===
                                                                                        modelo
                                                                                          .Practicas[
                                                                                          b
                                                                                        ]
                                                                                          .Actividades[
                                                                                          j
                                                                                        ]
                                                                                          .titulo
                                                                                    ) {
                                                                                      insertactividad(
                                                                                        {
                                                                                          titulo:
                                                                                            modelo
                                                                                              .Practicas[
                                                                                              b
                                                                                            ]
                                                                                              .Actividades[
                                                                                              j
                                                                                            ]
                                                                                              .titulo,
                                                                                          estado:
                                                                                            modelo
                                                                                              .Practicas[
                                                                                              b
                                                                                            ]
                                                                                              .Actividades[
                                                                                              j
                                                                                            ]
                                                                                              .estado,
                                                                                          descripcion:
                                                                                            modelo
                                                                                              .Practicas[
                                                                                              b
                                                                                            ]
                                                                                              .Actividades[
                                                                                              j
                                                                                            ]
                                                                                              .descripcion,
                                                                                          fechacreacion:
                                                                                            modelo
                                                                                              .Practicas[
                                                                                              b
                                                                                            ]
                                                                                              .Actividades[
                                                                                              j
                                                                                            ]
                                                                                              .fechacreacion,
                                                                                          fechaentrega:
                                                                                            modelo
                                                                                              .Practicas[
                                                                                              b
                                                                                            ]
                                                                                              .Actividades[
                                                                                              j
                                                                                            ]
                                                                                              .fechaentrega,
                                                                                          revision:
                                                                                            modelo
                                                                                              .Practicas[
                                                                                              b
                                                                                            ]
                                                                                              .Actividades[
                                                                                              j
                                                                                            ]
                                                                                              .revision,
                                                                                          tecnica:
                                                                                            modelo
                                                                                              .Practicas[
                                                                                              b
                                                                                            ]
                                                                                              .Actividades[
                                                                                              j
                                                                                            ]
                                                                                              .tecnica,
                                                                                        }
                                                                                      )
                                                                                        .then(
                                                                                          (
                                                                                            result13
                                                                                          ) => {
                                                                                            funcionesDB
                                                                                              .insertlistActivity(
                                                                                                {
                                                                                                  integrante:
                                                                                                    result11.id,
                                                                                                  actividad:
                                                                                                    result13.id,
                                                                                                }
                                                                                              )
                                                                                              .then(
                                                                                                (
                                                                                                  result14
                                                                                                ) => {
                                                                                                  console.log(
                                                                                                    "insert list actividad " +
                                                                                                      result14.msj
                                                                                                  );
                                                                                                  insertcontenido()
                                                                                                    .then(
                                                                                                      (
                                                                                                        result15
                                                                                                      ) => {
                                                                                                        funcionesDB
                                                                                                          .insertlistContent(
                                                                                                            {
                                                                                                              entregable: null,
                                                                                                              contenido:
                                                                                                                result15.id,
                                                                                                              actividad:
                                                                                                                result13.id,
                                                                                                            }
                                                                                                          )
                                                                                                          .then(
                                                                                                            (
                                                                                                              result16
                                                                                                            ) => {
                                                                                                              console.log(
                                                                                                                "insert list contenido2 " +
                                                                                                                  result16.msj
                                                                                                              );
                                                                                                              if (
                                                                                                                fin
                                                                                                              ) {
                                                                                                                res(
                                                                                                                  {
                                                                                                                    proyectoid:
                                                                                                                      result3.id,
                                                                                                                  }
                                                                                                                );
                                                                                                              }
                                                                                                            }
                                                                                                          )
                                                                                                          .catch(
                                                                                                            (
                                                                                                              err16
                                                                                                            ) =>
                                                                                                              rej(
                                                                                                                err16
                                                                                                              )
                                                                                                          );
                                                                                                      }
                                                                                                    )
                                                                                                    .catch(
                                                                                                      (
                                                                                                        err15
                                                                                                      ) =>
                                                                                                        rej(
                                                                                                          err15
                                                                                                        )
                                                                                                    );
                                                                                                }
                                                                                              )
                                                                                              .catch(
                                                                                                (
                                                                                                  err14
                                                                                                ) =>
                                                                                                  rej(
                                                                                                    err14
                                                                                                  )
                                                                                              );
                                                                                          }
                                                                                        )
                                                                                        .catch(
                                                                                          (
                                                                                            err13
                                                                                          ) =>
                                                                                            rej(
                                                                                              err13
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                    if (
                                                                                      a ==
                                                                                      practice.length -
                                                                                        1
                                                                                    ) {
                                                                                      if (
                                                                                        f ===
                                                                                        members.length -
                                                                                          1
                                                                                      ) {
                                                                                        if (
                                                                                          h ===
                                                                                          modelo
                                                                                            .Practicas[
                                                                                            b
                                                                                          ]
                                                                                            .Roles
                                                                                            .length -
                                                                                            1
                                                                                        ) {
                                                                                          if (
                                                                                            i ===
                                                                                            modelo
                                                                                              .Practicas[
                                                                                              b
                                                                                            ]
                                                                                              .Roles[
                                                                                              h
                                                                                            ]
                                                                                              .actividades
                                                                                              .length -
                                                                                              1
                                                                                          ) {
                                                                                            if (
                                                                                              j ===
                                                                                              modelo
                                                                                                .Practicas[
                                                                                                b
                                                                                              ]
                                                                                                .Actividades
                                                                                                .length -
                                                                                                1
                                                                                            ) {
                                                                                              fin = true;
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          )
                                                                          .catch(
                                                                            (
                                                                              err12
                                                                            ) =>
                                                                              rej(
                                                                                err12
                                                                              )
                                                                          );
                                                                      }
                                                                    )
                                                                    .catch(
                                                                      (err11) =>
                                                                        rej(
                                                                          err11
                                                                        )
                                                                    );
                                                                }
                                                              }
                                                            }
                                                          })
                                                          .catch((err10) =>
                                                            rej(err10)
                                                          );
                                                      }
                                                    })
                                                    .catch((err9) => rej(err9));
                                                })
                                                .catch((err8) => rej(err8));
                                            })
                                            .catch((err7) => rej(err7));
                                        }
                                      }
                                    }
                                  })
                                  .catch((err6) => rej(err6));
                              })
                              .catch((err5) => rej(err5));
                          }
                        })
                        .catch((err3) => rej(err3));
                    }
                  }
                }
              })
              .catch((err2) => rej(err3));
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
};

funcionesDB.creaproyecto3 = (obj) => {
  return new Promise((res, rej) => {
    const { proyect, members, practice } = obj;
    inserproyectocompleto(proyect)
      .then((proyecto) => {
        console.log(chalk.blue(`agregado proyecto ${proyecto.pro.id}`));
        insertpracticasconalfascompleto2(practice, proyecto)
          .then((result) => {
            console.log(chalk.blue(`entregables`));
            insertintegrantesconrolesyactividades(proyecto, members, practice)
              .then((result2) => {
                console.log(chalk.blue(`actividades`));
                res({ proyectoid: proyecto.pro.id });
              })
              .catch((err3) => rej(err3));
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
};

funcionesDB.agregarcontacto = (obj) => {
  return new Promise((res, rej) => {
    const { usuario, preferiodo, propietario } = obj;
    funcionesDB
      .insertContacts({ usuario: usuario, preferencia: preferiodo })
      .then((result) => {
        console.log("insert contacto " + result);
        buscarDB
          .obtenertodasContactos()
          .then((result2) => {
            let ultimo = result2.API[result2.API.length - 1];
            funcionesDB
              .insertlistContacts({ usuario: propietario, contacto: ultimo.id })
              .then((result3) => {
                res({ msj: `contacto ${result3}` });
              })
              .catch((err3) => rej(err3));
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
};

funcionesDB.crearreunion = (obj) => {
  return new Promise((res, rej) => {
    const { proyec, fecha, hora, duracion, descripcion, titulo } = obj;
    buscarDB
      .obtenerproyectoid({ id: proyec })
      .then((proyecto) => {
        let date = new Date();
        funcionesDB
          .insertEvent({ fechacreacion: date })
          .then((resul) => {
            buscarDB
              .obtenertodasEventos()
              .then((eventos) => {
                let ultievento = eventos.API[eventos.API.length - 1];
                funcionesDB
                  .insertListEvent({
                    historial: proyecto.historia,
                    evento: ultievento.id,
                    integrante: null,
                  })
                  .then((result) => {
                    funcionesDB
                      .insertMeeting({
                        titulo: titulo,
                        fecha: fecha,
                        hora: hora,
                        duracion: duracion,
                        descripcion: descripcion,
                        vigente: true,
                      })
                      .then((result) => {
                        buscarDB
                          .obtenertodasReuniones()
                          .then((reuniones) => {
                            let ultireu =
                              reuniones.API[reuniones.API.length - 1];
                            funcionesDB
                              .insertListMeeting({
                                evento: ultievento.id,
                                reunion: ultireu.id,
                              })
                              .then((result) => {
                                res(result);
                              })
                              .catch((err6) => rej(err6));
                          })
                          .catch((err5) => rej(err5));
                      })
                      .catch((err4) => rej(err4));
                  })
                  .catch((err3) => rej(err3));
              })
              .catch((err2) => rej(err2));
          })
          .catch((err) => rej(err));
      })
      .catch((err0) => rej(err0));
  });
};

/**
 * 
 _______              __                __                                     
|       \            |  \              |  \                                    
| $$$$$$$\  ______  _| $$_     ______  | $$____    ______    _______   ______  
| $$  | $$ |      \|   $$ \   |      \ | $$    \  |      \  /       \ /      \ 
| $$  | $$  \$$$$$$\\$$$$$$    \$$$$$$\| $$$$$$$\  \$$$$$$\|  $$$$$$$|  $$$$$$\
| $$  | $$ /      $$ | $$ __  /      $$| $$  | $$ /      $$ \$$    \ | $$    $$
| $$__/ $$|  $$$$$$$ | $$|  \|  $$$$$$$| $$__/ $$|  $$$$$$$ _\$$$$$$\| $$$$$$$$
| $$    $$ \$$    $$  \$$  $$ \$$    $$| $$    $$ \$$    $$|       $$ \$$     \
 \$$$$$$$   \$$$$$$$   \$$$$   \$$$$$$$ \$$$$$$$   \$$$$$$$ \$$$$$$$   \$$$$$$$
 */
//--------------------------------------------------------------
funcionesDB.insertLenguaje = (obj) => {
  return new Promise((res, rej) => {
    const { nombre, nivel } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.insertLenguaje(nombre, nivel), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      } else {
        sqlite.all(Query.insertLenguaje(nombre, nivel), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      }
    });
  });
};
funcionesDB.insertUser = (obj) => {
  return new Promise((res, rej) => {
    const {
      email,
      contrasena,
      fotoperfil,
      nombrearchivohojadevida,
      anosdeexperiencia,
      nombre,
      descripcion,
      pais,
      edad,
      github,
      gitlab,
      bitbucket,
      linkedin,
    } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertUser(
            email,
            contrasena,
            fotoperfil,
            nombrearchivohojadevida,
            anosdeexperiencia,
            nombre,
            descripcion,
            pais,
            edad,
            github,
            gitlab,
            bitbucket,
            linkedin
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertUser(
            email,
            contrasena,
            fotoperfil,
            nombrearchivohojadevida,
            anosdeexperiencia,
            nombre,
            descripcion,
            pais,
            edad,
            github,
            gitlab,
            bitbucket,
            linkedin
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};

funcionesDB.ingresartecnicas = (obj) => {
  return new Promise((res, rej) => {
    let final = false;
    for (let a = 0; a < obj.length; a++) {
      funcionesDB
        .insertTechnical({
          titulo: obj[a].titulo,
          descripcion: obj[a].descripcion,
          bibliografia: obj[a].bibliografia,
        })
        .then((result) => {
          if (final) {
            res({ msj: "termino" });
          }
        })
        .catch((err) => rej(err));
      if (a === obj.length - 1) {
        final = true;
      }
    }
  });
};

funcionesDB.ingresarherramientasmetodologia = (obj) => {
  return new Promise((res, rej) => {
    let final = false;
    for (let a = 0; a < obj.length; a++) {
      funcionesDB
        .insertMethodologyTool({
          nombre: obj[a].nombre,
          descripcion: obj[a].descripcion,
          bibliografia: obj[a].bibliografia,
        })
        .then((result) => {
          if (final) {
            res({ msj: "termino" });
          }
        })
        .catch((err) => rej(err));
      if (a === obj.length - 1) {
        final = true;
      }
    }
  });
};
//--------------------------------------------------------------------
funcionesDB.insertKeyword = (obj) => {
  return new Promise((res, rej) => {
    const { user, palabra } = obj;
    promesa
      .then((result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
          mariaDB.query(Query.insertpalabraclave(user, palabra), (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          });
        } else {
          sqlite.all(Query.insertpalabraclave(user, palabra), (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }).catch((e) => {
    console.log(e);
  });
};
//---------------------------------------------------------
funcionesDB.insertlistlenguaje = (obj) => {
  return new Promise((res, rej) => {
    const { user, idioma } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.insertlistaidiomas(user, idioma), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      } else {
        sqlite.all(Query.insertlistaidiomas(user, idioma), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      }
    });
  });
};
//----------------------------------------------------------
//return new Promise((res, rej) => {});
funcionesDB.insertAbility = (obj) => {
  return new Promise((res, rej) => {
    const { tipo, descripcion, nivel } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertHabilidades(tipo, descripcion, nivel),
          (err, rows, fields) => {
            if (!err) {
              res.json({ msj: "success" });
            } else {
              res.json({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertHabilidades(tipo, descripcion, nivel),
          (err, rows) => {
            if (!err) {
              res.json({ msj: "success" });
            } else {
              res.json({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//----------------------------------------------------------
funcionesDB.insetlistAbility = (obj) => {
  return new Promise((res, rej) => {
    const { usuario, habilidad } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertlistaHabilidades(usuario, habilidad),
          (err, rows, fields) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertlistaHabilidades(usuario, habilidad),
          (err, rows) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//----------------------------------------------------------
funcionesDB.insertContacts = (obj) => {
  return new Promise((res, rej) => {
    const { usuario, preferencia } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertcontactos(usuario, preferencia),
          (err, rows, fields) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          }
        );
      } else {
        sqlite.all(Query.insertcontactos(usuario, preferencia), (err, rows) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      }
    });
  });
};
//----------------------------------------------------------
funcionesDB.insertlistContacts = (obj) => {
  return new Promise((res, rej) => {
    const { usuario, contacto } = obj;
    console.log(obj);
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertlistcontactos(usuario, contacto),
          (err, rows, fields) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertlistcontactos(usuario, contacto),
          (err, rows) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          }
        );
      }
    });
  });
};
//--------------------------------------------------------------

funcionesDB.insertTools = (obj) => {
  return new Promise((res, rej) => {
    const { nombre, tipo, descripcion, url_icono } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertherramientas(nombre, tipo, descripcion, url_icono),
          (err, rows, fields) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertherramientas(nombre, tipo, descripcion, url_icono),
          (err, rows) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//--------------------------------------------------------------
funcionesDB.insertlistTool = (obj) => {
  return new Promise((res, rej) => {
    const { usuario, herramienta } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertlistaherramientas(usuario, herramienta),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertlistaherramientas(usuario, herramienta),
          (err, rows) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          }
        );
      }
    });
  });
};
//----------------------------------------------------------------
funcionesDB.insertMethodology = (obj) => {
  return new Promise((res, rej) => {
    const { nombre, descripcion, consejo } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertmetodologia(nombre, descripcion, consejo),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertmetodologia(nombre, descripcion, consejo),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          }
        );
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertHistory = (obj) => {
  return new Promise((res, rej) => {
    const { descripcion } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.inserthistoriales(descripcion), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      } else {
        sqlite.all(Query.inserthistoriales(descripcion), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertProject = (obj) => {
  return new Promise((res, rej) => {
    const {
      nombre,
      descripcion,
      estado,
      icon,
      banner,
      metodologia,
      historia,
    } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertproyecto(
            nombre,
            descripcion,
            estado,
            icon,
            banner,
            metodologia,
            historia
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertproyecto(
            nombre,
            descripcion,
            estado,
            icon,
            banner,
            metodologia,
            historia
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertPractice = (obj) => {
  return new Promise((res, rej) => {
    const { nombre, descripcion } = obj;
    console.log(nombre);
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.insertpractica(nombre, descripcion), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err.message });
          }
        });
      } else {
        sqlite.all(Query.insertpractica(nombre, descripcion), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err.message });
          }
        });
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertlistPractice = (obj) => {
  return new Promise((res, rej) => {
    const { metodologia, practica } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertlistapracticas(metodologia, practica),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(Query.insertlistapracticas(metodologia, practica), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.inserRoles = (obj, res) => {
  return new Promise((res, rej) => {
    const { titulo, descripcion, recomendacion } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertRol(titulo, descripcion, recomendacion),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertRol(titulo, descripcion, recomendacion),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertlistRoles = (obj) => {
  return new Promise((res, rej) => {
    const { practica, rol } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.insertlistaroles(practica, rol), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      } else {
        sqlite.all(Query.insertlistaroles(practica, rol), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertMembers = (obj) => {
  return new Promise((res, rej) => {
    const { usuario, rol } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.insertIntegrante(usuario, rol), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      } else {
        sqlite.all(Query.insertIntegrante(usuario, rol), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "insertMembers" });
          }
        });
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertlistMembers = (obj) => {
  return new Promise((res, rej) => {
    const { proyecto, integrante } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertListaintegrantes(proyecto, integrante),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertListaintegrantes(proyecto, integrante),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertAlpha = (obj) => {
  return new Promise((res, rej) => {
    const { nombre, descripcion, estado } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.insertAlfa(nombre, descripcion, estado), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      } else {
        sqlite.all(Query.insertAlfa(nombre, descripcion, estado), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertlistAlpha = (obj) => {
  return new Promise((res, rej) => {
    const { practica, alfa } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.insertlistAlfas(practica, alfa), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      } else {
        sqlite.all(Query.insertlistAlfas(practica, alfa), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertDeliverable = (obj) => {
  return new Promise((res, rej) => {
    const {
      titulo,
      descripcion,
      estado,
      tipoArchivo,
      fechaEntrega,
      numeroRevisiones,
    } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertEntregables(
            titulo,
            descripcion,
            estado,
            tipoArchivo,
            fechaEntrega,
            numeroRevisiones
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertEntregables(
            titulo,
            descripcion,
            estado,
            tipoArchivo,
            fechaEntrega,
            numeroRevisiones
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertlistDeliverable = (obj) => {
  return new Promise((res, rej) => {
    const { alfa, entregable } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.insertlistEntregables(alfa, entregable), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      } else {
        sqlite.all(Query.insertlistEntregables(alfa, entregable), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertTechnical = (obj) => {
  return new Promise((res, rej) => {
    const { titulo, descripcion, bibliografia } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertTecnicas(titulo, descripcion, bibliografia),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertTecnicas(titulo, descripcion, bibliografia),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertActivity = (obj) => {
  return new Promise((res, rej) => {
    const {
      titulo,
      estado,
      descripcion,
      fechacreacion,
      fechaentrega,
      revision,
      tecnica,
    } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertActividades(
            titulo,
            estado,
            descripcion,
            fechacreacion,
            fechaentrega,
            revision,
            tecnica
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertActividades(
            titulo,
            estado,
            descripcion,
            fechacreacion,
            fechaentrega,
            revision,
            tecnica
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertlistActivity = (obj) => {
  return new Promise((res, rej) => {
    const { integrante, actividad } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertlistaactiviades(integrante, actividad),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertlistaactiviades(integrante, actividad),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertchat = (obj) => {
  return new Promise((res, rej) => {
    const { archivo, fecha } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.insertchats(archivo, fecha), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      } else {
        sqlite.all(Query.insertchats(archivo, fecha), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      }
    });
  });
};
//-----------------------------------------------------------------------
funcionesDB.insertlistchat = (obj) => {
  return new Promise((res, rej) => {
    const { historial, chat } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.insertlistchats(historial, chat), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      } else {
        sqlite.all(Query.insertlistchats(historial, chat), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: "error" });
          }
        });
      }
    });
  });
};
//---------------------------------------------------------------------
funcionesDB.insertEvent = (obj) => {
  return new Promise((res, rej) => {
    const { fechacreacion } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.inserteventos(fechacreacion), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      } else {
        sqlite.all(Query.inserteventos(fechacreacion), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      }
    });
  });
};
//---------------------------------------------------------------------
funcionesDB.insertListEvent = (obj) => {
  return new Promise((res, rej) => {
    const { historial, evento, integrante } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertlisteventos(historial, evento, integrante),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertlisteventos(historial, evento, integrante),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//---------------------------------------------------------------------
funcionesDB.insertMeeting = (obj) => {
  return new Promise((res, rej) => {
    const { titulo, fecha, hora, duracion, descripcion, vigente } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertreunion(
            titulo,
            fecha,
            hora,
            duracion,
            descripcion,
            vigente
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertreunion(
            titulo,
            fecha,
            hora,
            duracion,
            descripcion,
            vigente
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: err });
            }
          }
        );
      }
    });
  });
};
//---------------------------------------------------------------------
funcionesDB.insertListMeeting = (obj) => {
  return new Promise((res, rej) => {
    const { evento, reunion } = obj;

    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;

      if (vDB) {
        mariaDB.query(Query.insertlistreunion(evento, reunion), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      } else {
        sqlite.all(Query.insertlistreunion(evento, reunion), (err) => {
          if (!err) {
            res({ msj: "success" });
          } else {
            rej({ msj: err });
          }
        });
      }
    });
  });
};
//---------------------------------------------------------------------
funcionesDB.insertDelivery = (obj) => {
  return new Promise((res, rej) => {
    const {
      titulo,
      descripcion,
      nombrearchivoguardado,
      actividad,
      entragable,
    } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertentrega(
            titulo,
            descripcion,
            nombrearchivoguardado,
            actividad,
            entragable
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertentrega(
            titulo,
            descripcion,
            nombrearchivoguardado,
            actividad,
            entragable
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//---------------------------------------------------------------------
funcionesDB.insertContent = (obj) => {
  return new Promise((res, rej) => {
    const { nombre, nombrearchivo, descripcion, bibliografia } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertcontenido(
            nombre,
            nombrearchivo,
            descripcion,
            bibliografia
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertcontenido(
            nombre,
            nombrearchivo,
            descripcion,
            bibliografia
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//---------------------------------------------------------------------
funcionesDB.insertlistContent = (obj) => {
  return new Promise((res, rej) => {
    const { entregable, contenido, actividad } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertlistcontenido(entregable, contenido, actividad),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertlistcontenido(entregable, contenido, actividad),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//---------------------------------------------------------------------
funcionesDB.insertMethodologyTool = (obj) => {
  return new Promise((res, rej) => {
    const { nombre, descripcion, bibliografia } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertherramientametodologia(nombre, descripcion, bibliografia),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertherramientametodologia(nombre, descripcion, bibliografia),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//---------------------------------------------------------------------
funcionesDB.insertListMethodologyTool = (obj) => {
  return new Promise((res, rej) => {
    const { entregable, herramientametodologia } = obj;
    promesa.then((result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.insertlistherramientametodologia(
            entregable,
            herramientametodologia
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      } else {
        sqlite.all(
          Query.insertlistherramientametodologia(
            entregable,
            herramientametodologia
          ),
          (err) => {
            if (!err) {
              res({ msj: "success" });
            } else {
              rej({ msj: "error" });
            }
          }
        );
      }
    });
  });
};
//-----------------------------------------------

function insertmetodologia() {
  return new Promise((res, rej) => {
    funcionesDB
      .insertMethodology({
        nombre: modelo.nombre,
        descripcion: modelo.descripcion,
        consejo: modelo.consejo,
      })
      .then((result) => {
        console.log("insert metodologia " + result.msj);
        buscarDB
          .obtenertodasMetodologias()
          .then((result2) => {
            res(result2.API[result2.API.length - 1]);
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}

function inserthistoria() {
  return new Promise((res, rej) => {
    const fecha = new Date();
    const descri = `proyecto creado el ${fecha}`;
    funcionesDB
      .insertHistory({ descripcion: descri })
      .then((result) => {
        console.log("insert historia " + result.msj);
        buscarDB
          .obtenertodasHistoriales()
          .then((result1) => {
            res(result1.API[result1.API.length - 1]);
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}

function inserproyecto(obj) {
  return new Promise((res, rej) => {
    funcionesDB
      .insertProject(obj)
      .then((result) => {
        console.log("insert proyecto " + result.msj);
        buscarDB
          .obtenertodasProyectos()
          .then((result1) => {
            res(result1.API[result1.API.length - 1]);
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}

function insertpractica(obj) {
  return new Promise((res, rej) => {
    funcionesDB
      .insertPractice(obj)
      .then((result) => {
        console.log("insert practica " + result.msj);
        buscarDB
          .obtenertodasPracticas()
          .then((result1) => {
            res(result1.API[result1.API.length - 1]);
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}
function insertalfa(obj) {
  return new Promise((res, rej) => {
    funcionesDB
      .insertAlpha(obj)
      .then((result) => {
        console.log("insert alfa " + result.msj);
        buscarDB
          .obtenertodasAlfas()
          .then((result1) => {
            res(result1.API[result1.API.length - 1]);
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}
function insertentregable(obj) {
  return new Promise((res, rej) => {
    funcionesDB
      .insertDeliverable(obj)
      .then((result) => {
        console.log("insert entragable " + result.msj);
        buscarDB
          .obtenertodasEntregables()
          .then((result1) => {
            res(result1.API[result1.API.length - 1]);
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}
function insertcontenido() {
  return new Promise((res, rej) => {
    funcionesDB
      .insertContent({
        nombre: null,
        nombrearchivo: null,
        descripcion: null,
        bibliografia: null,
      })
      .then((result) => {
        console.log("insert contenido1 " + result.msj);
        buscarDB
          .obtenertodasContenidos()
          .then((result1) => {
            res(result1.API[result1.API.length - 1]);
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}

function insertintegrante(obj, proyecto) {
  return new Promise(async (res, rej) => {
    await funcionesDB
      .insertMembers(obj)
      .then(async (result) => {
        await buscarDB
          .obtenertodasIntegrantes()
          .then(async (result1) => {
            console.log(
              chalk.red(`integrante ${result1.API[result1.API.length - 1].id}`)
            );
            await funcionesDB
              .insertlistMembers({
                proyecto: proyecto.id,
                integrante: result1.API[result1.API.length - 1].id,
              })
              .then((result) => {
                res(result1.API[result1.API.length - 1]);
              })
              .catch((err3) => rej(err3));
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}

function inserintegrantes2(array) {
  return new Promise(async (res, rej) => {
    let con = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertMembers({
          usuario: array[a].user.user,
          rol: array[a].rol.id,
        })
        .then((result) => {
          if (con == array.length - 1) {
            res(true);
          }
          con++;
        })
        .catch((err) => rej(err));
    }
  });
}
function inserlistintegrantes2(array, proyecto) {
  return new Promise(async (res, rej) => {
    let con = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertlistMembers({
          proyecto: proyecto.id,
          integrante: array[a].id,
        })
        .then((result) => {
          if (con == array.length - 1) {
            res(true);
            console.log(chalk.green("fin lista integrantes"));
          }
          con++;
        })
        .catch((err) => {
          rej(err);
          console.log(err);
        });
      if (a === array.length - 1) {
      }
    }
  });
}
function asignaentrecontenidopro(array) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertlistContent({
          entregable: array[a].entre,
          contenido: array[a].con,
          actividad: null,
        })
        .then((result) => {
          if (cont === array.length - 1) res(true);
          cont++;
        })
        .catch((err) => {
          console.log(err);
          rej(err);
        });
    }
  });
}
function asignaractividadconintegrante(array) {
  //{ integrante: users[a].integrante, actividad: actividades[c].id }
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertlistActivity({
          integrante: array[a].integrante,
          actividad: array[a].actividad,
        })
        .then((result) => {
          if (cont === array.length - 1) res(true);
          cont++;
        })
        .catch((err) => {
          console.log(err);
          rej(err);
        });
    }
  });
}

function asignarcontenidoaactividad(array) {
  //{actividad:actividad[a].id, contenido:cotenido[b].id }
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertlistContent({
          entregable: null,
          contenido: array[a].contenido,
          actividad: array[a].actividad,
        })
        .then((result) => {
          if (cont === array.length - 1) res(true);
          cont++;
        })
        .catch((err) => rej(err));
    }
  });
}
function asignarentregaactividad(array) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertDelivery({
          titulo: "",
          descripcion: "",
          nombrearchivoguardado: "",
          actividad: array[a].actividad,
          entragable: null,
        })
        .then((result) => {
          if (cont === array.length - 1) res(true);
          cont++;
        })
        .catch((err) => rej(err));
    }
  });
}

function asignarentregaconentregable(array) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertDelivery({
          titulo: "",
          descripcion: "",
          nombrearchivoguardado: "",
          actividad: null,
          entragable: array[a].entre,
        })
        .then((result) => {
          if (cont === array.length - 1) res(true);
          cont++;
        })
        .catch((err) => rej(err));
    }
  });
}
function crearcontenidos(num) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < num; a++) {
      funcionesDB
        .insertContent({
          nombre: null,
          nombrearchivo: null,
          descripcion: null,
          bibliografia: null,
        })
        .then((result) => {
          if (cont === num - 1) res(true);
          cont++;
        })
        .catch((err) => rej(err));
    }
  });
}

function insertlispracmeto(array, metodologia) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertlistPractice({
          metodologia: metodologia.id,
          practica: array[a].id,
        })
        .then((result) => {
          if (cont === array.length - 1) res(true);
          cont++;
        })
        .catch((err) => rej(err));
    }
  }).catch((err) => rej(err));
}
function insertarraypracticas(array) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertPractice({
          nombre: modelo.Practicas[a].nombre,
          descripcion: modelo.Practicas[a].descripcion,
        })
        .then((result) => {
          if (cont === array.length - 1) res(true);
          cont++;
        })
        .catch((err) => {
          rej(err);
        });
    }
  });
}
function insertaralfasendb(array) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertAlpha({
          nombre: array[a].alfa.nombre,
          descripcion: array[a].alfa.descripcion,
          estado: array[a].alfa.estado,
        })
        .then((result) => {
          if (cont === array.length - 1) res(true);
          cont++;
        })
        .catch((err) => rej(err));
    }
  });
}
function inserlistalfa(alfas) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < alfas.length; a++) {
      funcionesDB
        .insertlistAlpha({
          practica: alfas[a].pra.id,
          alfa: alfas[a].alfa.id,
        })
        .then((result) => {
          if (cont === alfas.length - 1) res(true);
          cont++;
        })
        .catch((err) => rej(err));
    }
  });
}
function insertlistentregablepro(array) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertlistDeliverable({
          alfa: array[a].alfa,
          entregable: array[a].entre,
        })
        .then((result) => {
          if (cont === array.length - 1) res(true);
          cont++;
        })
        .catch((err) => rej(err));
    }
  });
}
function reordenaralfaspracticas(practicas, alfas, orden) {
  let arraydef = [];
  for (let a = 0; a < practicas.length; a++) {
    for (let b = 0; b < orden.length; b++) {
      if (orden[b].pra === practicas[a].practicanombre) {
        for (let c = 0; c < alfas.length; c++) {
          if (orden[b].alfa.nombre === alfas[c].alfanombre) {
            arraydef.push({ pra: practicas[a], alfa: alfas[c] });
          }
        }
      }
    }
  }
  return arraydef;
}
function enlistalfaspracti(practicas) {
  let arraydef = [];
  for (let a = 0; a < practicas.length; a++) {
    for (let b = 0; b < modelo.Practicas.length; b++) {
      if (practicas[a].practicanombre === modelo.Practicas[b].nombre) {
        for (let c = 0; c < modelo.Practicas[b].alfas.length; c++) {
          arraydef.push({
            pra: modelo.Practicas[b].nombre,
            alfa: modelo.Practicas[b].alfas[c],
          });
        }
      }
    }
  }
  return arraydef;
}

function asignaciondeactividaporrol(array, practicas, API) {
  let arraydef = [];
  let num = 0;
  let actiyemp = [];
  let actiyemp2 = [];
  for (let a1 = 0; a1 < practicas.length; a1++) {
    for (let b1 = 0; b1 < modelo.Practicas.length; b1++) {
      if (practicas[a1] === modelo.Practicas[b1].nombre) {
        for (let f1 = 0; f1 < modelo.Practicas[b1].Actividades.length; f1++) {
          actiyemp.push({
            titulo: modelo.Practicas[b1].Actividades[f1].titulo,
            estado: modelo.Practicas[b1].Actividades[f1].estado,
            descripcion: modelo.Practicas[b1].Actividades[f1].descripcion,
            fechacreacion: modelo.Practicas[b1].Actividades[f1].fechacreacion,
            fechaentrega: modelo.Practicas[b1].Actividades[f1].fechaentrega,
            revision: modelo.Practicas[b1].Actividades[f1].revision,
            tecnica: buscartecnicaactividad(
              API,
              modelo.Practicas[b1].Actividades[f1].titulo
            ),
          });
        }
      }
    }
  }
  let lider;
  for (let a = 0; a < practicas.length; a++) {
    for (let b = 0; b < modelo.Practicas.length; b++) {
      if (practicas[a] === modelo.Practicas[b].nombre) {
        for (let c = 0; c < array.length; c++) {
          let actividades = [];
          for (let d = 0; d < modelo.Practicas[b].Roles.length; d++) {
            if (array[c].rol === modelo.Practicas[b].Roles[d].nombre) {
              for (
                let e = 0;
                e < modelo.Practicas[b].Roles[d].actividades.length;
                e++
              ) {
                for (
                  let f = 0;
                  f < modelo.Practicas[b].Actividades.length;
                  f++
                ) {
                  if (
                    modelo.Practicas[b].Roles[d].actividades[e] ===
                    modelo.Practicas[b].Actividades[f].titulo
                  ) {
                    actividades.push({
                      titulo: modelo.Practicas[b].Actividades[f].titulo,
                      estado: modelo.Practicas[b].Actividades[f].estado,
                      descripcion:
                        modelo.Practicas[b].Actividades[f].descripcion,
                      fechacreacion:
                        modelo.Practicas[b].Actividades[f].fechacreacion,
                      fechaentrega:
                        modelo.Practicas[b].Actividades[f].fechaentrega,
                      revision: modelo.Practicas[b].Actividades[f].revision,
                      tecnica: buscartecnicaactividad(
                        API,
                        modelo.Practicas[b].Actividades[f].titulo
                      ),
                    });
                    actiyemp2.push({
                      titulo: modelo.Practicas[b].Actividades[f].titulo,
                      estado: modelo.Practicas[b].Actividades[f].estado,
                      descripcion:
                        modelo.Practicas[b].Actividades[f].descripcion,
                      fechacreacion:
                        modelo.Practicas[b].Actividades[f].fechacreacion,
                      fechaentrega:
                        modelo.Practicas[b].Actividades[f].fechaentrega,
                      revision: modelo.Practicas[b].Actividades[f].revision,
                      tecnica: buscartecnicaactividad(
                        API,
                        modelo.Practicas[b].Actividades[f].titulo
                      ),
                    });
                    num++;
                  }
                }
              }
              if (array[c].rol === "Arquitecto Experiencia Multimedia") {
                lider = array[c].integrante;
              }
            }
          }
          arraydef.push({
            integrante: array[c].integrante,
            actividades: actividades,
          });
        }
      }
    }
  }

  for (let z1 = 0; z1 < actiyemp2.length; z1++) {
    for (let z2 = 0; z2 < actiyemp.length; z2++) {
      if (actiyemp2[z1].titulo === actiyemp[z2].titulo) {
        actiyemp.splice(z2, 1);
      }
    }
  }
  let g = 0;
  for (let zz = 0; zz < arraydef.length; zz++) {
    if (arraydef[zz].integrante == lider) {
      g++;
    }
  }
  let gfin = 0;
  for (let zz = 0; zz < arraydef.length; zz++) {
    if (arraydef[zz].integrante == lider) {
      if (gfin == g - 1) {
        let tem = arraydef[zz].actividades;
        arraydef[zz].actividades = tem.concat(actiyemp);
        // console.log(arraydef[zz].actividades)
      }
      gfin++;
    }
  }

  // console.log(lider)
  num += actiyemp.length;
  return { user: arraydef, num };
}
function listaintegranteconroles(array) {
  return new Promise(async (res, rej) => {
    let arraydef = [];
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      buscarDB
        .obtenerintegranteconrol(array[a].id)
        .then((result) => {
          arraydef.push({
            integrante: result.API[0].id,
            rol: result.API[0].roltitulo,
          });
          if (cont == array.length - 1) res(arraydef);
          cont++;
        })
        .catch((err) => rej(err));
    }
  });
}

function creactividades(array) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertActivity({
          titulo: array[a].titulo,
          estado: array[a].estado,
          descripcion: array[a].descripcion,
          fechacreacion: array[a].fechacreacion,
          fechaentrega: array[a].fechaentrega,
          revision: array[a].revision,
          tecnica: array[a].tecnica,
        })
        .then((result) => {
          if (cont === array.length - 1) {
            res(true);
          }
          cont++;
        })
        .catch((err) => {
          console.log(err);
          rej(err);
        });
    }
  });
}
function insertentregableherr(array) {
  return new Promise((res, rej) => {
    let cont = 0;
    for (let a = 0; a < array.length; a++) {
      funcionesDB
        .insertDeliverable({
          titulo: array[a].entragable.nombre,
          descripcion: array[a].entragable.descripcion,
          estado: array[a].entragable.estado,
          tipoArchivo: array[a].entragable.tipoarchivo,
          fechaEntrega: array[a].entragable.fechaentrega,
          numeroRevisiones: array[a].entragable.revisiones,
        })
        .then((result) => {
          if (cont === array.length - 1) {
            res(true);
          }
          cont++;
        })
        .catch((err) => rej(err));
    }
  });
}
function reorganizarroles(integrantes, API) {
  let arraydef = [];
  for (let a = 0; a < integrantes.length; a++) {
    for (let b = 0; b < API.length; b++) {
      if (integrantes[a].rol == API[b].roltitulo) {
        arraydef.push({ user: integrantes[a], rol: API[b] });
      }
    }
  }
  return arraydef;
}
function reoryasignarvalores(API, num) {
  let ref = 1;
  let arradef = [];
  for (let a = 0; a < num; a++) {
    arradef.push(API[API.length - ref]);
    ref++;
  }
  return arradef;
}
function estraeractividades(array) {
  let arradef = [];
  for (let a = 0; a < array.length; a++) {
    for (let b = 0; b < array[a].actividades.length; b++) {
      arradef.push(array[a].actividades[b]);
    }
  }
  return arradef;
}

function reasignacionactividadintegrante(actividades, users) {
  let arradef = [];

  for (let a = 0; a < users.length; a++) {
    for (let b = 0; b < users[a].actividades.length; b++) {
      for (let c = 0; c < actividades.length; c++) {
        if (users[a].actividades[b].titulo === actividades[c].actividadtitulo) {
          arradef.push({
            integrante: users[a].integrante,
            actividad: actividades[c].id,
          });
        }
      }
    }
  }
  return arradef;
}
function ordenaractividadcontenido(actividad, cotenido) {
  let arradef = [];
  for (let a = 0; a < actividad.length; a++) {
    for (let b = 0; b < cotenido.length; b++) {
      if (a == b) {
        arradef.push({ actividad: actividad[a].id, contenido: cotenido[b].id });
      }
    }
  }
  return arradef;
}

function pranticasainsertar(array) {
  let arradef = [];
  for (let a = 0; a < array.length; a++) {
    for (let b = 0; b < modelo.Practicas.length; b++) {
      if (array[a] === modelo.Practicas[b].nombre) {
        arradef.push({
          nombre: modelo.Practicas[b].nombre,
          descripcion: modelo.Practicas[b].descripcion,
        });
      }
    }
  }
  return arradef;
}

function reorganizamientoentrealfa(entregables, orden) {
  let arradef = [];
  for (let a = 0; a < entregables.length; a++) {
    for (let b = 0; b < orden.length; b++) {
      if (entregables[a].entregatitulo === orden[b].entragable.nombre) {
        arradef.push({ alfa: orden[b].alfa, entre: entregables[a].id });
      }
    }
  }
  return arradef;
}
function reordenaralfaconentregable(array) {
  let arradef = [];
  for (let a = 0; a < modelo.Practicas.length; a++) {
    for (let b = 0; b < array.length; b++) {
      if (array[b].pra.practicanombre === modelo.Practicas[a].nombre) {
        for (let c = 0; c < modelo.Practicas[a].alfas.length; c++) {
          if (
            array[b].alfa.alfanombre === modelo.Practicas[a].alfas[c].nombre
          ) {
            for (
              let d = 0;
              d < modelo.Practicas[a].alfas[c].entregable.length;
              d++
            ) {
              for (let e = 0; e < modelo.Practicas[a].Entregables.length; e++) {
                if (
                  modelo.Practicas[a].alfas[c].entregable[d] ===
                  modelo.Practicas[a].Entregables[e].entregatitulo
                ) {
                  arradef.push({
                    alfa: array[b].alfa.id,
                    entregable: modelo.Practicas[a].Entregables[e],
                  });
                }
              }
            }
          }
        }
      }
    }
  }
  return arradef;
}
function filtadodeherramientas(array, API) {
  let arradef = [];
  for (let a = 0; a < array.length; a++) {
    for (let b = 0; b < API.length; b++) {
      if (array[a].entregable.Herramientas[0] === API[b].nombre) {
        arradef.push({
          alfa: array[a].alfa,
          entragable: {
            nombre: array[a].entregable.entregatitulo,
            descripcion: array[a].entregable.entregadescripcion,
            estado: array[a].entregable.entregaestado,
            tipoarchivo: array[a].entregable.entregatipoArchivo,
            fechaentrega: array[a].entregable.entregafechaEntrega,
            revisiones: array[a].entregable.entreganumeroRevisiones,
            herramienta: API[b].id,
          },
        });
      }
    }
  }
  return arradef;
}
function ordenarconteentregable(contenidos, entregables) {
  let arradef = [];
  for (let a = 0; a < contenidos.length; a++) {
    arradef.push({ con: contenidos[a].id, entre: entregables[a].entre });
  }
  return arradef;
}

//------------------------------------------------
function insertactividad(obj) {
  return new Promise((res, rej) => {
    funcionesDB
      .insertActivity(obj)
      .then((result) => {
        console.log("insert actividad " + result.msj);
        buscarDB
          .obtenertodasActividades()
          .then((result1) => {
            res(result1.API[result1.API.length - 1]);
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}
function inserproyectocompleto(obj) {
  return new Promise((res, rej) => {
    const { nombre, descripcion, icono, banner } = obj;
    insertmetodologia()
      .then((metodologia) => {
        inserthistoria()
          .then((historia) => {
            inserproyecto({
              nombre: nombre,
              descripcion: descripcion,
              estado: "iniciado",
              icon: icono,
              banner: banner,
              metodologia: metodologia.id,
              historia: historia.id,
            })
              .then((proyecto) => {
                res({ pro: proyecto, meto: metodologia });
              })
              .catch((err3) => rej(err3));
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}

function insertpracticasconalfascompleto2(practicas, proyecto) {
  //{pro:proyecto, meto: metodologia}
  return new Promise((res, rej) => {
    let practicasus = pranticasainsertar(practicas);
    insertarraypracticas(practicasus)
      .then((result) => {
        console.log(chalk.green("practicas ingresadas"));
        buscarDB
          .obtenertodasPracticas()
          .then((practicaapi) => {
            let pracparaasig = reoryasignarvalores(
              practicaapi.API,
              practicasus.length
            );
            console.log(
              chalk.green(`practicas en la base de datos ${practicasus.length}`)
            );
            insertlispracmeto(pracparaasig, proyecto.meto)
              .then((result0) => {
                console.log(chalk.green("practicas lista ingresadas"));
                let lisalfas = enlistalfaspracti(pracparaasig);
                insertaralfasendb(lisalfas)
                  .then((result1) => {
                    console.log(chalk.green("alfas ingresadas"));
                    buscarDB
                      .obtenertodasAlfas()
                      .then((alfas) => {
                        let alfaslist = reoryasignarvalores(
                          alfas.API,
                          lisalfas.length
                        );
                        let practicaalfa = reordenaralfaspracticas(
                          pracparaasig,
                          alfaslist,
                          lisalfas
                        );
                        inserlistalfa(practicaalfa)
                          .then((result2) => {
                            console.log(chalk.green("alfas lista ingresadas"));
                            let entregaslis = reordenaralfaconentregable(
                              practicaalfa
                            );
                            buscarDB
                              .obtenertodasHerramientasMetodologia()
                              .then((herramientas) => {
                                let entregafilto = filtadodeherramientas(
                                  entregaslis,
                                  herramientas.API
                                );
                                insertentregableherr(entregafilto)
                                  .then((result5) => {
                                    console.log(
                                      chalk.green("entregables ingresadas")
                                    );
                                    buscarDB
                                      .obtenertodasEntregables()
                                      .then((entregables) => {
                                        let entregalist = reoryasignarvalores(
                                          entregables.API,
                                          entregafilto.length
                                        );
                                        let alfalistpre = reorganizamientoentrealfa(
                                          entregalist,
                                          entregafilto
                                        );
                                        insertlistentregablepro(alfalistpre)
                                          .then((result6) => {
                                            console.log(
                                              chalk.green(
                                                "entregables lista ingresadas"
                                              )
                                            );
                                            crearcontenidos(alfalistpre.length)
                                              .then((result7) => {
                                                console.log(
                                                  chalk.green(
                                                    `contenidos creados ${alfalistpre.length}`
                                                  )
                                                );
                                                buscarDB
                                                  .obtenertodasContenidos()
                                                  .then((contendos) => {
                                                    let lisconteni = reoryasignarvalores(
                                                      contendos.API,
                                                      alfalistpre.length
                                                    );
                                                    let preconteentre = ordenarconteentregable(
                                                      lisconteni,
                                                      alfalistpre
                                                    );
                                                    asignaentrecontenidopro(
                                                      preconteentre
                                                    )
                                                      .then((result8) => {
                                                        console.log(
                                                          chalk.green(
                                                            "contenidos lista ingresadas"
                                                          )
                                                        );
                                                        asignarentregaconentregable(
                                                          preconteentre
                                                        )
                                                          .then((result8) => {
                                                            console.log(
                                                              chalk.green(
                                                                "entregas colocadas"
                                                              )
                                                            );
                                                            res(true);
                                                          })
                                                          .catch((err13) =>
                                                            rej(err13)
                                                          );
                                                      })
                                                      .catch((err12) =>
                                                        rej(err12)
                                                      );
                                                  })
                                                  .catch((err11) => rej(err11));
                                              })
                                              .catch((err10) => rej(err10));
                                          })
                                          .catch((err9) => rej(err9));
                                      })
                                      .catch((err9) => rej(err9));
                                  })
                                  .catch((err8) => rej(err8));
                              })
                              .catch((err7) => rej(err7));
                          })
                          .catch((err6) => rej(err6));
                      })
                      .catch((err5) => rej(err5));
                  })
                  .catch((err4) => rej(err4));
              })
              .catch((err3) => rej(err3));
          })
          .catch((err2) => rej(err2));
      })
      .catch((err) => rej(err));
  });
}

function insertintegrantesconrolesyactividades(
  proyecto,
  integrantes,
  practicas
) {
  return new Promise((res, rej) => {
    buscarDB.obtenertodasRoles().then((roles) => {
      let date = reorganizarroles(integrantes, roles.API);
      inserintegrantes2(date)
        .then((result) => {
          console.log(chalk.green("entegrantes ingresadas"));
          buscarDB
            .obtenertodasIntegrantes()
            .then((allinter) => {
              let dateintegrantes = reoryasignarvalores(
                allinter.API,
                date.length
              );
              inserlistintegrantes2(dateintegrantes, proyecto.pro)
                .then((result1) => {
                  console.log(chalk.green("entegrantes lista ingresadas"));
                  listaintegranteconroles(dateintegrantes)
                    .then((interol) => {
                      console.log(chalk.green("obtener integrantes con rol"));
                      buscarDB
                        .obtenertodasTecnicas()
                        .then((tecnicas) => {
                          let dataActividades = asignaciondeactividaporrol(
                            interol,
                            practicas,
                            tecnicas.API
                          );

                          crearcontenidos(dataActividades.num)
                            .then((result2) => {
                              console.log(
                                chalk.green(
                                  `contenidos creados ${dataActividades.num}`
                                )
                              );
                              buscarDB
                                .obtenertodasContenidos()
                                .then((contendos) => {
                                  let datacontenidos = reoryasignarvalores(
                                    contendos.API,
                                    dataActividades.num
                                  );
                                  let actividadesrea = estraeractividades(
                                    dataActividades.user
                                  );

                                  creactividades(actividadesrea)
                                    .then((result3) => {
                                      console.log(
                                        chalk.green(`creandoactividades`)
                                      );
                                      buscarDB
                                        .obtenertodasActividades()
                                        .then((actividades) => {
                                          let actiadignar = reoryasignarvalores(
                                            actividades.API,
                                            actividadesrea.length
                                          );
                                          let asiginteacti = reasignacionactividadintegrante(
                                            actiadignar,
                                            dataActividades.user
                                          );
                                          asignaractividadconintegrante(
                                            asiginteacti
                                          )
                                            .then((result4) => {
                                              console.log(
                                                chalk.green(
                                                  `asignada las actividades a los contenidos`
                                                )
                                              );
                                              asignarcontenidoaactividad(
                                                ordenaractividadcontenido(
                                                  actiadignar,
                                                  datacontenidos
                                                )
                                              )
                                                .then((result5) => {
                                                  console.log(
                                                    chalk.green(
                                                      `lista de contenidos agregada`
                                                    )
                                                  );
                                                  asignarentregaactividad(
                                                    ordenaractividadcontenido(
                                                      actiadignar,
                                                      datacontenidos
                                                    )
                                                  )
                                                    .then((result6) => {
                                                      console.log(
                                                        chalk.green(
                                                          `asignado los entregables`
                                                        )
                                                      );
                                                      res({
                                                        proyectoid:
                                                          proyecto.pro.id,
                                                      });
                                                    })
                                                    .catch((err11) =>
                                                      rej(err11)
                                                    );
                                                })
                                                .catch((err10) => rej(err10));
                                            })
                                            .catch((err10) => {
                                              console.log(err10);
                                              rej(err10);
                                            });
                                        })
                                        .catch((err9) => rej(err9));
                                    })
                                    .catch((err8) => rej(err8));
                                })
                                .catch((err7) => rej(err7));
                            })
                            .catch((err6) => rej(err6));
                        })
                        .catch((err5) => rej(err5));
                    })
                    .catch((err4) => rej(err4));
                })
                .catch((err3) => rej(err3));
            })
            .catch((err2) => rej(err2));
        })
        .catch((err) => rej(err));
    });
  });
}

function organizarhabilidades(array) {
  return new Promise((res, rej) => {
    buscarDB
      .obtenertodasHabilidades()
      .then((habilidades) => {
        // console.log(array)
        //  console.log(habilidades.API.length)
        let obj = [];
        for (let a = 0; a < array.length; a++) {
          for (let z = 0; z < habilidades.API.length; z++) {
            // console.log(`${array[a]} ==  ${habilidades.API[z].habilidadtipo}`)
            if (
              array[a] === "desarrollo" &&
              habilidades.API[z].habilidadtipo === "Desarrollo"
            ) {
              obj.push(habilidades.API[z].id);
            } else if (
              array[a] === "diseño" &&
              habilidades.API[z].habilidadtipo === "Diseño"
            ) {
              obj.push(habilidades.API[z].id);
            }
          }
        }
        console.log(obj);
        let set = new Set(obj.map(JSON.stringify));
        let arrSinDuplicaciones = Array.from(set).map(JSON.parse);
        //  console.log(arrSinDuplicaciones)
        res(arrSinDuplicaciones);
      })
      .catch((err) => rej(err));
  });
}

function organizarherramientasparahabilidaes(herramienta, API) {
  let habilidades = [];
  for (let a = 0; a < herramienta.length; a++) {
    for (let b = 0; b < API.length; b++) {
      if (herramienta[a] === API[b].id) {
        habilidades.push(API[b].tipo);
      }
    }
  }
  let set = new Set(habilidades.map(JSON.stringify));
  let arrSinDuplicaciones = Array.from(set).map(JSON.parse);
  return arrSinDuplicaciones;
}

function buscartecnicaactividad(API, actividad) {
  if (actividad == "A8") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Video como apoyo a la etnografía") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A9") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Producción de metáforas y analogías") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A10") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Generación de Storyboards") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A11") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Producción de metáforas y analogías") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A12") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Wireframes") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A14") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Simulación de experiencia") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A17") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Identificación de políticas y normativas") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A18") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Uso no dirigido") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A19") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Análisis de respuestas de usuarios") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A4") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Análisis DOFA") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A5") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Identificación análoga de los recursos") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A6") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (
        API[a1].tecnicatitulo == "Análisis para la identificación de riesgos"
      ) {
        return API[a1].id;
      }
    }
  } else if (actividad == "A13") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (
        API[a1].tecnicatitulo ==
        "Análisis para la definición preliminar de tecnologías Software"
      ) {
        return API[a1].id;
      }
    }
  } else if (actividad == "A16") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (
        API[a1].tecnicatitulo ==
        "Identificación de los métodos, motivaciones y recursos del adversario e impacto del sistema en las personas."
      ) {
        return API[a1].id;
      }
    }
  } else if (actividad == "A20") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Matriz de proposición de valor") {
        return API[a1].id;
      }
    }
  } else if (actividad == "A21") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (
        API[a1].tecnicatitulo ==
        "Estructura para la formulación de la visión del SMMV"
      ) {
        return API[a1].id;
      }
    }
  } else if (actividad == "A22") {
    for (let a1 = 0; a1 < API.length; a1++) {
      if (API[a1].tecnicatitulo == "Canvas de SMMV") {
        return API[a1].id;
      }
    }
  }
}

function buscarherramientaparaentregable(API, entregable) {
  if (entregable === "Propuesta de diseño de la Experiencia Multimedia") {
    for (let a = 0; a < API.length; a++) {
      if (API[a].nombre == "Boceto de Storyboards") {
        return API[a].id;
      }
    }
  } else if (entregable === "Especificaciones del diseño responsable") {
    for (let a = 0; a < API.length; a++) {
      if (API[a].nombre == "Reunión lluvia de ideas leyes y normatividades") {
        return API[a].id;
      }
    }
  } else if (entregable === "Análisis de viabilidad del Sistema Multimedia") {
    for (let a = 0; a < API.length; a++) {
      if (API[a].nombre == "Matriz DOFA") {
        return API[a].id;
      }
    }
  } else if (entregable === "Proposición de valor del Sistema Multimedia") {
    for (let a = 0; a < API.length; a++) {
      if (API[a].nombre == "Matriz de proposición de valor") {
        return API[a].id;
      }
    }
  } else if (entregable === "Visión del Sistema Multimedia Minimo Viable") {
    for (let a = 0; a < API.length; a++) {
      if (
        API[a].nombre == "Estructura para la formulación de la visión del SMMV"
      ) {
        return API[a].id;
      }
    }
  } else if (
    entregable === "Modelo Canvas del Sistema Multimedia Minimo Viable"
  ) {
    for (let a = 0; a < API.length; a++) {
      if (API[a].nombre == "Modelo Canvas adaptado") {
        return API[a].id;
      }
    }
  }
}

module.exports = funcionesDB;
