const ex = require("express");
const rutas = ex.Router();
const jwt = require("jsonwebtoken");
const actualizarDB = require("../database/actualizarDB");
const buscarDB = require("../database/buscarDB");
const insertDB = require("../database/insertarDB");
const ftpminio = require("../ftp/peticiones");
const chalk = require("chalk");
const LLAVE = "misecretos";
const path = require("path");
const env = require("../env");
rutas.put("/entrega/actividad", proToken, (req, res) => {
  const { actividad } = req.body;
  if (req.files !== undefined || req.files !== null) {
    if (req.files.archivo !== undefined || req.files.archivo !== null) {
      const { archivo } = req.files;
      if (typeof actividad === "string") {
        archivo.mv(__dirname + "/tmp/" + archivo.name, (err) => {
          if (!err) {
            var metaData = {
              "Content-Type": `${archivo.mimetype}`,
              size: archivo.size,
              "X-Amz-Meta-Testing": 1234,
              example: 5678,
            };
            console.log(chalk.bgGreen("|   |") + " actualizando actividad");
            actualizarDB
              .entregaractividad(actividad, archivo.name)
              .then((result) => {
                console.log(
                  chalk.bgGreen("|   |") +
                    `insertando en el bocket ${result.proyecto}`
                );
                ftpminio
                  .putFile(
                    `proyecto${result.proyecto}`,
                    archivo.name,
                    path.join(__dirname, `/tmp/${archivo.name}`),
                    metaData
                  )
                  .then((result) => {
                    res.json({ msj: `activdad ${actividad} entregada` });
                  })
                  .catch((err2) => res.json(err2));
              })
              .catch((err) => res.json(err));
          } else {
            console.log(err);
          }
        });
      }
    }
  }
});

rutas.put("/entrega/entregable", proToken, (req, res) => {
  const { entregable } = req.body;
  if (req.files !== undefined || req.files !== null) {
    if (req.files.archivo !== undefined || req.files.archivo !== null) {
      const { archivo } = req.files;
      if (typeof entregable === "string") {
        archivo.mv(__dirname + "/tmp/" + archivo.name, (err) => {
          if (!err) {
            var metaData = {
              "Content-Type": `${archivo.mimetype}`,
              size: archivo.size,
              "X-Amz-Meta-Testing": 1234,
              example: 5678,
            };
            console.log(chalk.bgGreen("|   |") + " actualizando entregable");
            actualizarDB
              .entregarentregable(entregable, archivo.name)
              .then((result) => {
                console.log(
                  chalk.bgGreen("|   |") +
                    `insertando en el bocket ${result.proyecto}`
                );
                ftpminio
                  .putFile(
                    `proyecto${result.proyecto}`,
                    archivo.name,
                    path.join(__dirname, `/tmp/${archivo.name}`),
                    metaData
                  )
                  .then((result) => {
                    res.json({ msj: `entregalbe ${entregable} entregado` });
                  })
                  .catch((err3) => res.json(err3));
              })
              .catch((err2) => res.json(err2));
          } else {
            res.json(err);
          }
        });
      }
    }
  }
});

rutas.put(`/actualizar/usuario`, proToken, (req, res) => {
  console.log(req.body);
  let {
    email,
    password,
    experiencia,
    nombre,
    descripcion,
    pais,
    edad,
    github,
    gitlab,
    bitbucket,
    linkedin,
    herramienta,
    palabra,
    idiomas,
  } = req.body;

  let herraas = herramienta.split(",");
  let palatem = palabra.split(",");
  let idiotemop = idiomas.split(",");
  let her = [];
  let pal = [];
  let idip = [];
  for (let a = 0; a < herraas.length; a++) {
    her.push(parseInt(herraas[a], 10));
  }
  for (let a = 0; a < palatem.length; a++) {
    pal.push(palatem[a]);
  }
  for (let a = 0; a < idiotemop.length; a++) {
    idip.push(parseInt(idiotemop[a], 10));
  }
  herramienta = her;
  palabra = pal;
  idiomas = idip;

  experiencia = parseInt(experiencia, 10);

  jwt.verify(req.token, LLAVE, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (data != {} || data !== {} || data !== null || data !== undefined) {
        buscarDB
          .obtenerusuarioid({ id: data.rows[0].id })
          .then((datos) => {
            let bucket = `usuario${data.rows[0].id}`;
            if (req.files !== null && req.files !== undefined) {
              if (
                req.files.foto != null &&
                req.files.foto != undefined &&
                req.files.cv === null &&
                req.files.cv === undefined
              ) {
                console.log(
                  chalk.red(`Solo entro la foto ${req.files.foto.name}`)
                );
                if (datos.fotoperfil !== "null" && datos.fotoperfil !== null) {
                  ftpminio
                    .removeObject(bucket, datos.fotoperfil)
                    .then((result) => {
                      console.log(
                        chalk.yellow(
                          `Se elimino la foto anterior por ${req.files.foto.name}`
                        )
                      );
                      req.files.foto.mv(
                        __dirname + "/tmp/" + req.files.foto.name,
                        (err) => {
                          if (!err) {
                            var metaData = {
                              "Content-Type": `${req.files.foto.mimetype}`,
                              size: req.files.foto.size,
                              "X-Amz-Meta-Testing": 1234,
                              example: 5678,
                            };

                            ftpminio
                              .putFile(
                                bucket,
                                req.files.foto.name,
                                path.join(
                                  __dirname,
                                  `/tmp/${req.files.foto.name}`
                                ),
                                metaData
                              )
                              .then((resul) => {
                                console.log(
                                  chalk.green(
                                    `Se subio la foto ${req.files.foto.name} al buket:${bucket} `
                                  )
                                );
                                actuusermt(
                                  {
                                    email,
                                    password,
                                    experiencia,
                                    nombre,
                                    descripcion,
                                    pais,
                                    edad,
                                    github,
                                    gitlab,
                                    bitbucket,
                                    linkedin,
                                  },
                                  data.rows[0].id,
                                  req.files.foto.name,
                                  null,
                                  palabra,
                                  idiomas,
                                  herramienta
                                )
                                  .then((succes) => {
                                    console.log(
                                      chalk.blue(
                                        `Se actualizo el usuario con el id: ${data.rows[0].id}`
                                      )
                                    );
                                    datauseridmt(data.rows[0].id).then(
                                      (userdata) => {
                                        res.json(userdata);
                                      }
                                    );
                                  })
                                  .catch((err1) => {
                                    console.log(`erro ${err1}`);
                                  });
                              })
                              .catch((err) => res.json(err));
                          } else {
                            console.log(err);
                          }
                        }
                      );
                    });
                } else {
                  req.files.foto.mv(
                    __dirname + "/tmp/" + req.files.foto.name,
                    (err) => {
                      ftpminio
                        .putFile(
                          bucket,
                          req.files.foto.name,
                          path.join(__dirname, `/tmp/${req.files.foto.name}`),
                          {
                            "Content-Type": `${req.files.foto.mimetype}`,
                            size: req.files.foto.size,
                            "X-Amz-Meta-Testing": 1234,
                            example: 5678,
                          }
                        )
                        .then((resul) => {
                          console.log(
                            chalk.green(
                              `Se subio la foto ${req.files.foto.name} al buket:${bucket} `
                            )
                          );
                          actuusermt(
                            {
                              email,
                              password,
                              experiencia,
                              nombre,
                              descripcion,
                              pais,
                              edad,
                              github,
                              gitlab,
                              bitbucket,
                              linkedin,
                            },
                            data.rows[0].id,
                            req.files.foto.name,
                            null,
                            palabra,
                            idiomas,
                            herramienta
                          )
                            .then((succes) => {
                              console.log(
                                chalk.blue(
                                  `Se actualizo el usuario con el id: ${data.rows[0].id}`
                                )
                              );
                              datauseridmt(data.rows[0].id).then((userdata) => {
                                res.json(userdata);
                              });
                            })
                            .catch((err1) => {
                              console.log(`erro ${err1}`);
                            });
                        })
                        .catch((err) => res.json(err));
                    }
                  );
                }
              }

              if (
                req.files.foto === null &&
                req.files.foto === undefined &&
                req.files.cv != null &&
                req.files.cv !== undefined
              ) {
                console.log(
                  chalk.red(`Solo entro la hoja de vida ${req.files.cv.name}`)
                );
                if (
                  datos.nombrearchivohojadevida !== "null" &&
                  datos.nombrearchivohojadevida !== null
                ) {
                  ftpminio
                    .removeObject(bucket, datos.nombrearchivohojadevida)
                    .then((result) => {
                      console.log(
                        chalk.yellow(
                          `Se elimino la hoja de vida anterior por ${req.files.foto.name}`
                        )
                      );
                      req.files.cv.mv(
                        __dirname + "/tmp/" + req.files.cv.name,
                        (err) => {
                          ftpminio
                            .putFile(
                              bucket,
                              req.files.cv.name,
                              path.join(__dirname, `/tmp/${req.files.cv.name}`),
                              {
                                "Content-Type": `${req.files.cv.mimetype}`,
                                size: req.files.cv.size,
                                "X-Amz-Meta-Testing": 1234,
                                example: 5678,
                              }
                            )
                            .then((upcv) => {
                              console.log(
                                chalk.green(
                                  `Se subio la hoja de vida ${req.files.foto.name} al buket:${bucket} `
                                )
                              );
                              actuusermt(
                                {
                                  email,
                                  password,
                                  experiencia,
                                  nombre,
                                  descripcion,
                                  pais,
                                  edad,
                                  github,
                                  gitlab,
                                  bitbucket,
                                  linkedin,
                                },
                                data.rows[0].id,
                                null,
                                req.files.cv.name,
                                palabra,
                                idiomas,
                                herramienta
                              )
                                .then((succes) => {
                                  console.log(
                                    chalk.blue(
                                      `Se actualizo el usuario con el id: ${data.rows[0].id}`
                                    )
                                  );
                                  datauseridmt(data.rows[0].id).then(
                                    (userdata) => {
                                      res.json(userdata);
                                    }
                                  );
                                })
                                .catch((err1) => {
                                  console.log(`erro ${err1}`);
                                });
                            })
                            .catch((errcv2) => {
                              console.log(`error cv ${errcv2}`);
                            });
                        }
                      );
                    })
                    .catch((errcv) => {
                      console.log(`error cv ${errcv}`);
                    });
                } else {
                  req.files.cv.mv(
                    __dirname + "/tmp/" + req.files.cv.name,
                    (err) => {
                      ftpminio
                        .putFile(
                          bucket,
                          req.files.cv.name,
                          path.join(__dirname, `/tmp/${req.files.cv.name}`),
                          {
                            "Content-Type": `${req.files.cv.mimetype}`,
                            size: req.files.cv.size,
                            "X-Amz-Meta-Testing": 1234,
                            example: 5678,
                          }
                        )
                        .then((upcv) => {
                          console.log(
                            chalk.green(
                              `Se subio la hola de vida ${req.files.foto.name} al buket:${bucket} `
                            )
                          );
                          actuusermt(
                            {
                              email,
                              password,
                              experiencia,
                              nombre,
                              descripcion,
                              pais,
                              edad,
                              github,
                              gitlab,
                              bitbucket,
                              linkedin,
                            },
                            data.rows[0].id,
                            null,
                            req.files.cv.name,
                            palabra,
                            idiomas,
                            herramienta
                          )
                            .then((succes) => {
                              console.log(
                                chalk.blue(
                                  `Se actualizo el usuario con el id: ${data.rows[0].id}`
                                )
                              );
                              datauseridmt(data.rows[0].id).then((userdata) => {
                                res.json(userdata);
                              });
                            })
                            .catch((err1) => {
                              console.log(`erro ${err1}`);
                            });
                        })
                        .catch((errcv2) => {
                          console.log(`error cv ${errcv2}`);
                        });
                    }
                  );
                }
              }

              if (
                req.files.foto !== null &&
                req.files.foto !== undefined &&
                req.files.cv !== null &&
                req.files.cv !== undefined
              ) {
                console.log(
                  chalk.red(
                    `Ento foto ${req.files.foto.name} y hoja de vida ${req.files.cv.name}`
                  )
                );
                if (
                  datos.fotoperfil != "null" &&
                  datos.fotoperfil != null &&
                  datos.nombrearchivohojadevida != "null" &&
                  datos.nombrearchivohojadevida != null
                ) {
                  ftpminio
                    .removeObject(bucket, datos.nombrearchivohojadevida)
                    .then((result) => {
                      console.log(
                        chalk.yellow(
                          `Se elimino la hoja de vida por ${req.files.cv.name}`
                        )
                      );
                      ftpminio
                        .removeObject(bucket, datos.fotoperfil)
                        .then((result) => {
                          console.log(
                            chalk.yellow(
                              `Se elimino la foto por ${req.files.foto.name}`
                            )
                          );
                          req.files.cv.mv(
                            __dirname + "/tmp/" + req.files.cv.name,
                            (err) => {
                              if (!err) {
                                req.files.foto.mv(
                                  __dirname + "/tmp/" + req.files.foto.name,
                                  (err2) => {
                                    if (!err2) {
                                      ftpminio
                                        .putFile(
                                          bucket,
                                          req.files.cv.name,
                                          path.join(
                                            __dirname,
                                            `/tmp/${req.files.cv.name}`
                                          ),
                                          {
                                            "Content-Type": `${req.files.cv.mimetype}`,
                                            size: req.files.cv.size,
                                            "X-Amz-Meta-Testing": 1234,
                                            example: 5678,
                                          }
                                        )
                                        .then((upcv) => {
                                          console.log(
                                            chalk.green(
                                              `Se subio la hoja de vida ${req.files.cv.name} al buket:${bucket} `
                                            )
                                          );
                                          ftpminio
                                            .putFile(
                                              bucket,
                                              req.files.foto.name,
                                              path.join(
                                                __dirname,
                                                `/tmp/${req.files.foto.name}`
                                              ),
                                              {
                                                "Content-Type": `${req.files.foto.mimetype}`,
                                                size: req.files.foto.size,
                                                "X-Amz-Meta-Testing": 1234,
                                                example: 5678,
                                              }
                                            )
                                            .then((resul) => {
                                              console.log(
                                                chalk.green(
                                                  `Se subio la foto ${req.files.foto.name} al buket:${bucket} `
                                                )
                                              );
                                              actuusermt(
                                                {
                                                  email,
                                                  password,
                                                  experiencia,
                                                  nombre,
                                                  descripcion,
                                                  pais,
                                                  edad,
                                                  github,
                                                  gitlab,
                                                  bitbucket,
                                                  linkedin,
                                                },
                                                data.rows[0].id,
                                                req.files.foto.name,
                                                req.files.cv.name,
                                                palabra,
                                                idiomas,
                                                herramienta
                                              )
                                                .then((succes) => {
                                                  chalk.blue(
                                                    `Se actualizo el usuario con el id: ${data.rows[0].id}`
                                                  );
                                                  datauseridmt(
                                                    data.rows[0].id
                                                  ).then((userdata) => {
                                                    res.json(userdata);
                                                  });
                                                })
                                                .catch((err1) => {
                                                  console.log(`erro ${err1}`);
                                                });
                                            })
                                            .catch((err) => res.json(err));
                                        })
                                        .catch((errcv2) => {
                                          console.log(`error cv ${errcv2}`);
                                        });
                                    } else {
                                      console.log(err2);
                                    }
                                  }
                                );
                              } else {
                                console.log(err);
                              }
                            }
                          );
                        })
                        .catch((errrcv) => {
                          console.log("error re foto");
                        });
                    })
                    .catch((errrcv) => {
                      console.log("error re cv");
                    });
                }
                if (
                  datos.fotoperfil === "null" &&
                  datos.nombrearchivohojadevida === "null"
                ) {
                  console.log("sin archivos previos registrados");
                  req.files.cv.mv(
                    __dirname + "/tmp/" + req.files.cv.name,
                    (err) => {
                      if (!err) {
                        console.log(`archivo ${req.files.cv.name} en local`);
                        req.files.foto.mv(
                          __dirname + "/tmp/" + req.files.foto.name,
                          (err2) => {
                            if (!err2) {
                              console.log(
                                `archivo ${req.files.foto.name} en local`
                              );
                              ftpminio
                                .putFile(
                                  bucket,
                                  req.files.cv.name,
                                  path.join(
                                    __dirname,
                                    `/tmp/${req.files.cv.name}`
                                  ),
                                  {
                                    "Content-Type": `${req.files.cv.mimetype}`,
                                    size: req.files.cv.size,
                                    "X-Amz-Meta-Testing": 1234,
                                    example: 5678,
                                  }
                                )
                                .then((upcv) => {
                                  console.log(
                                    chalk.green(
                                      `Se subio la hoja de vida ${req.files.cv.name} al buket:${bucket} `
                                    )
                                  );
                                  ftpminio
                                    .putFile(
                                      bucket,
                                      req.files.foto.name,
                                      path.join(
                                        __dirname,
                                        `/tmp/${req.files.foto.name}`
                                      ),
                                      {
                                        "Content-Type": `${req.files.foto.mimetype}`,
                                        size: req.files.foto.size,
                                        "X-Amz-Meta-Testing": 1234,
                                        example: 5678,
                                      }
                                    )
                                    .then((resul) => {
                                      console.log(
                                        chalk.green(
                                          `Se subio la foto ${req.files.foto.name} al buket:${bucket} `
                                        )
                                      );
                                      actuusermt(
                                        {
                                          email,
                                          password,
                                          experiencia,
                                          nombre,
                                          descripcion,
                                          pais,
                                          edad,
                                          github,
                                          gitlab,
                                          bitbucket,
                                          linkedin,
                                        },
                                        data.rows[0].id,
                                        req.files.foto.name,
                                        req.files.cv.name,
                                        palabra,
                                        idiomas,
                                        herramienta
                                      )
                                        .then((succes) => {
                                          console.log(
                                            chalk.blue(
                                              `Se actualizo el usuario con el id: ${data.rows[0].id}`
                                            )
                                          );
                                          datauseridmt(data.rows[0].id).then(
                                            (userdata) => {
                                              res.json(userdata);
                                            }
                                          );
                                        })
                                        .catch((err1) => {
                                          console.log(`erro ${err1}`);
                                        });
                                    })
                                    .catch((err) => res.json(err));
                                })
                                .catch((errcv2) => {
                                  console.log(`error cv ${errcv2}`);
                                });
                            } else {
                              console.log(err2);
                            }
                          }
                        );
                      } else {
                        console.log(err);
                      }
                    }
                  );
                }
              }
            } else {
              console.log(chalk.blue("actualización sin archivos"));
              actuusermt(
                {
                  email,
                  password,
                  experiencia,
                  nombre,
                  descripcion,
                  pais,
                  edad,
                  github,
                  gitlab,
                  bitbucket,
                  linkedin,
                },
                data.rows[0].id,
                null,
                null,
                palabra,
                idiomas,
                herramienta
              )
                .then((succes) => {
                  console.log(
                    chalk.green(`usuario${data.rows[0].id} fue actualizado`)
                  );
                  datauseridmt(data.rows[0].id).then((userdata) => {
                    res.json(userdata);
                  });
                })
                .catch((err1) => {
                  console.log(`erro ${err1}`);
                });
            }
          })
          .catch((err) => console.log(err));
      }
    }
  });
});

rutas.put("/reasignar/actividad", proToken, (req, res) => {
  const { actividad, fecha, tecnica } = req.body;
  buscarDB
    .obtenerActividad()
    .then((acti) => {
      buscarDB
        .obtenertodasTecnicas()
        .then((tec) => {
          let temfecha = acti.actividadfechaentrega,
            temtecnica = acti.tecnica,
            tempnameacti = null;
          if (temfecha !== fecha) {
            temfecha = fecha;
          }
          tec.API.find((tecnicaarray) => {
            if (tecnicaarray.id === temtecnica) {
              tempnameacti = tecnica.tecnicatitulo;
            }
          });
          if (tempnameacti !== tecnica) {
            tec.API.find((tecnicaarray) => {
              if (tecnica === tecnicaarray.tecnicatitulo) {
                temtecnica = tecnicaarray.id;
              }
            });
          }
          actualizarDB
            .updatelistactvity({
              actividad,
              fecha: temfecha,
              tecnica: temtecnica,
            })
            .then((result) => {
              res.json(result);
            })
            .catch((err) => res.json(err));
        })
        .catch((errtec) => res.json(errtec));
    })
    .catch((erract) => res.json(erract));
});

rutas.put("/update/lenguaje", proToken, (req, res) => {
  const { id, nombre, nivel } = req.body;
  console.log(req.body);
  buscarDB
    .obtenertodasIdiomas()
    .then((resul) => {
      const { API } = resul;
      for (let a = 0; a < API.length; a++) {
        if (id == API[a].id) {
          if (nombre != API[a].idiomanombre && nivel === API[a].idiomanivel) {
            console.log("entro nombre");
            actualizarDB
              .updatelenguajename({ id, nombre })
              .then((re) => res.json(re))
              .catch((err) => res.json(err));
          } else if (
            nombre === API[a].idiomanombre &&
            nivel != API[a].idiomanivel
          ) {
            console.log("entro nivel");
            actualizarDB
              .updatelenguajelevel({ id, nivel })
              .then((re) => {
                console.log("entro");
                res.json(re);
              })
              .catch((err) => {
                res.json(err);
              });
          } else if (
            nombre != API[a].idiomanombre &&
            nivel != API[a].idiomanivel
          ) {
            console.log("entro idioma");
            actualizarDB
              .updatelenguaje({ id, nombre, nivel })
              .then((re) => res.json(re))
              .catch((err) => res.json(err));
          }
        }
      }
    })
    .catch((err) => res.json(err));
});
rutas.put("/update/contacto", proToken, (req, res) => {
  let { id, preferences } = req.body;

  if (typeof id === "string") {
    id = parseInt(id, 10);
  }
  if (typeof preferences === "string") {
    if (preferences === "true") {
      preferences = true;
    } else if (preferences === "false") {
      preferences = false;
    }
  }

  if (typeof id == "number" && typeof preferences === "boolean") {
    actualizarDB
      .updatecontact({ preferencias: preferences, id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});
rutas.put("/update/proyectos", proToken, (req, res) => {
  let { name, descripcion, proyecto } = req.body;
  //console.log(req.files);
  if (req.files !== undefined && req.files !== null) {
    buscarDB
      .obtenerunproyecto(proyecto)
      .then((pro) => {
        if (
          req.files.icono !== undefined &&
          req.files.icono !== null &&
          req.files.banner === undefined &&
          req.files.banner === null
        ) {
          if (pro.proyectoicon !== null && pro.proyectoicon !== "null") {
            ftpminio
              .removeObject(`proyecto${proyecto}`, pro.proyectoicon)
              .then((rev) => {
                req.files.icono.mv(
                  __dirname + "/tmp/" + req.files.icono.name,
                  (err) => {
                    ftpminio
                      .putFile(
                        `proyecto${proyecto}`,
                        req.files.icono.name,
                        path.join(__dirname, `/tmp/${req.files.icono.name}`),
                        {
                          "Content-Type": `${req.files.icono.mimetype}`,
                          size: req.files.icono.size,
                          "X-Amz-Meta-Testing": 1234,
                          example: 5678,
                        }
                      )
                      .then((resulfile) => {
                        actualizarDB

                          .proyectodatos({
                            name,
                            descripcion,
                            icono: req.files.icono.name,
                            banner: null,
                            proyecto,
                          })
                          .then((resu) => {
                            res.json(resu);
                          })
                          .catch((err) => res.json(err));
                      })
                      .catch((errfile) => {
                        res.json(errfile);
                      });
                  }
                );
              })
              .catch((errrev) => resj.json(errrev));
          }
          req.files.icono.mv(
            __dirname + "/tmp/" + req.files.icono.name,
            (err) => {
              ftpminio
                .putFile(
                  `proyecto${proyecto}`,
                  req.files.icono.name,
                  path.join(__dirname, `/tmp/${req.files.icono.name}`),
                  {
                    "Content-Type": `${req.files.icono.mimetype}`,
                    size: req.files.icono.size,
                    "X-Amz-Meta-Testing": 1234,
                    example: 5678,
                  }
                )
                .then((resulfile) => {
                  actualizarDB

                    .proyectodatos({
                      name,
                      descripcion,
                      icono: req.files.icono.name,
                      banner: null,
                      proyecto,
                    })
                    .then((resu) => {
                      res.json(resu);
                    })
                    .catch((err) => res.json(err));
                })
                .catch((errfile) => {
                  res.json(errfile);
                });
            }
          );
        } else if (
          req.files.banner !== undefined &&
          req.files.banner !== null &&
          req.files.icono === undefined &&
          req.files.icono === null
        ) {
          if (pro.proyectobanner !== null && pro.proyectobanner !== "null") {
            ftpminio
              .removeObject(`proyecto${proyecto}`, pro.proyectoicon)
              .then((rev) => {
                req.files.banner.mv(
                  __dirname + "/tmp/" + req.files.banner.name,
                  (err) => {
                    ftpminio
                      .putFile(
                        `proyecto${proyecto}`,
                        req.files.banner.name,
                        path.join(__dirname, `/tmp/${req.files.banner.name}`),
                        {
                          "Content-Type": `${req.files.banner.mimetype}`,
                          size: req.files.banner.size,
                          "X-Amz-Meta-Testing": 1234,
                          example: 5678,
                        }
                      )
                      .then((resulfile) => {
                        actualizarDB
                          .proyectodatos({
                            name,
                            descripcion,
                            icono: null,
                            banner: req.files.banner.name,
                            proyecto,
                          })
                          .then((resu) => {
                            res.json(resu);
                          })
                          .catch((err) => res.json(err));
                      })
                      .catch((errfile) => {
                        res.json(errfile);
                      });
                  }
                );
              })
              .catch((errrev) => res.json(errrev));
          }
          req.files.banner.mv(
            __dirname + "/tmp/" + req.files.banner.name,
            (err) => {
              ftpminio
                .putFile(
                  `proyecto${proyecto}`,
                  req.files.banner.name,
                  path.join(__dirname, `/tmp/${req.files.banner.name}`),
                  {
                    "Content-Type": `${req.files.banner.mimetype}`,
                    size: req.files.banner.size,
                    "X-Amz-Meta-Testing": 1234,
                    example: 5678,
                  }
                )
                .then((resulfile) => {
                  actualizarDB
                    .proyectodatos({
                      name,
                      descripcion,
                      icono: null,
                      banner: req.files.banner.name,
                      proyecto,
                    })
                    .then((resu) => {
                      res.json(resu);
                    })
                    .catch((err) => res.json(err));
                })
                .catch((errfile) => {
                  res.json(errfile);
                });
            }
          );
        } else if (
          req.files.banner !== undefined &&
          req.files.banner !== null &&
          req.files.icono !== undefined &&
          req.files.icono !== null
        ) {
          if (
            pro.proyectobanner !== null &&
            pro.proyectobanner !== "null" &&
            (pro.proyectoicon === null || pro.proyectoicon !== "null")
          ) {
            ftpminio
              .removeObject(`proyecto${proyecto}`, pro.proyectoicon)
              .then((rev) => {
                req.files.banner.mv(
                  __dirname + "/tmp/" + req.files.banner.name,
                  (err) => {
                    ftpminio
                      .putFile(
                        `proyecto${proyecto}`,
                        req.files.banner.name,
                        path.join(__dirname, `/tmp/${req.files.banner.name}`),
                        {
                          "Content-Type": `${req.files.banner.mimetype}`,
                          size: req.files.banner.size,
                          "X-Amz-Meta-Testing": 1234,
                          example: 5678,
                        }
                      )
                      .then((resulfile) => {
                        req.files.icono.mv(
                          __dirname + "/tmp/" + req.files.icono.name,
                          (err) => {
                            ftpminio
                              .putFile(
                                `proyecto${proyecto}`,
                                req.files.icono.name,
                                path.join(
                                  __dirname,
                                  `/tmp/${req.files.icono.name}`
                                ),
                                {
                                  "Content-Type": `${req.files.icono.mimetype}`,
                                  size: req.files.icono.size,
                                  "X-Amz-Meta-Testing": 1234,
                                  example: 5678,
                                }
                              )
                              .then((resulfile) => {
                                actualizarDB

                                  .proyectodatos({
                                    name,
                                    descripcion,
                                    icono: req.files.icono.name,
                                    banner: req.files.banner.name,
                                    proyecto,
                                  })
                                  .then((resu) => {
                                    res.json(resu);
                                  })
                                  .catch((err) => res.json(err));
                              })
                              .catch((errfile) => {
                                res.json(errfile);
                              });
                          }
                        );
                      })
                      .catch((errfile) => {
                        res.json(errfile);
                      });
                  }
                );
              })
              .catch((errrev) => res.json(errrev));
          } else if (
            pro.proyectoicon !== null &&
            pro.proyectoicon !== "null" &&
            (pro.proyectobanner === null || pro.proyectobanner !== "null")
          ) {
            ftpminio
              .removeObject(`proyecto${proyecto}`, pro.proyectoicon)
              .then((rev) => {
                req.files.icono.mv(
                  __dirname + "/tmp/" + req.files.icono.name,
                  (err) => {
                    ftpminio
                      .putFile(
                        `proyecto${proyecto}`,
                        req.files.icono.name,
                        path.join(__dirname, `/tmp/${req.files.icono.name}`),
                        {
                          "Content-Type": `${req.files.icono.mimetype}`,
                          size: req.files.icono.size,
                          "X-Amz-Meta-Testing": 1234,
                          example: 5678,
                        }
                      )
                      .then((resulfile) => {
                        req.files.banner.mv(
                          __dirname + "/tmp/" + req.files.banner.name,
                          (err) => {
                            ftpminio
                              .putFile(
                                `proyecto${proyecto}`,
                                req.files.banner.name,
                                path.join(
                                  __dirname,
                                  `/tmp/${req.files.banner.name}`
                                ),
                                {
                                  "Content-Type": `${req.files.banner.mimetype}`,
                                  size: req.files.banner.size,
                                  "X-Amz-Meta-Testing": 1234,
                                  example: 5678,
                                }
                              )
                              .then((resulfile) => {
                                actualizarDB
                                  .proyectodatos({
                                    name,
                                    descripcion,
                                    icono: req.files.icono.name,
                                    banner: req.files.banner.name,
                                    proyecto,
                                  })
                                  .then((resu) => {
                                    res.json(resu);
                                  })
                                  .catch((err) => res.json(err));
                              })
                              .catch((errfile) => {
                                res.json(errfile);
                              });
                          }
                        );
                      })
                      .catch((errfile) => {
                        res.json(errfile);
                      });
                  }
                );
              })
              .catch((errrev) => resj.json(errrev));
          } else if (
            pro.proyectobanner !== null &&
            pro.proyectobanner !== "null" &&
            pro.proyectoicon !== null &&
            pro.proyectoicon !== "null"
          ) {
            ftpminio
              .removeObject(`proyecto${proyecto}`, pro.proyectoicon)
              .then((rev) => {
                req.files.banner.mv(
                  __dirname + "/tmp/" + req.files.banner.name,
                  (err) => {
                    ftpminio
                      .putFile(
                        `proyecto${proyecto}`,
                        req.files.banner.name,
                        path.join(__dirname, `/tmp/${req.files.banner.name}`),
                        {
                          "Content-Type": `${req.files.banner.mimetype}`,
                          size: req.files.banner.size,
                          "X-Amz-Meta-Testing": 1234,
                          example: 5678,
                        }
                      )
                      .then((resulfile) => {
                        ftpminio
                          .removeObject(`proyecto${proyecto}`, pro.proyectoicon)
                          .then((rev) => {
                            req.files.icono.mv(
                              __dirname + "/tmp/" + req.files.icono.name,
                              (err) => {
                                ftpminio
                                  .putFile(
                                    `proyecto${proyecto}`,
                                    req.files.icono.name,
                                    path.join(
                                      __dirname,
                                      `/tmp/${req.files.icono.name}`
                                    ),
                                    {
                                      "Content-Type": `${req.files.icono.mimetype}`,
                                      size: req.files.icono.size,
                                      "X-Amz-Meta-Testing": 1234,
                                      example: 5678,
                                    }
                                  )
                                  .then((resulfile) => {
                                    actualizarDB

                                      .proyectodatos({
                                        name,
                                        descripcion,
                                        icono: req.files.icono.name,
                                        banner: req.files.banner.name,
                                        proyecto,
                                      })
                                      .then((resu) => {
                                        res.json(resu);
                                      })
                                      .catch((err) => res.json(err));
                                  })
                                  .catch((errfile) => {
                                    res.json(errfile);
                                  });
                              }
                            );
                          })
                          .catch((errrev) => resj.json(errrev));
                      })
                      .catch((errfile) => {
                        res.json(errfile);
                      });
                  }
                );
              })
              .catch((errrev) => res.json(errrev));
          }
        }
      })
      .catch((err) => res.json(err));
  } else {
    actualizarDB

      .proyectodatos({ name, descripcion, icono: null, banner: null, proyecto })
      .then((resu) => {
        res.json(resu);
      })
      .catch((err) => res.json(err));
  }
});

function actuusermt(obj, id, foto, cv, palabras, idiomas, herramientas) {
  return new Promise((res, rej) => {
    /*obj=  {
                                      email,
                                      password,
                                      experiencia,
                                      nombre,
                                      descripcion,
                                      pais,
                                      edad,
                                      github,
                                      gitlab,
                                      bitbucket,
                                      linkedin,
                                    }*/
    actualizarDB
      .actualizarusuario(obj, id, foto, cv)
      .then((result) => {
        let c = 0;
        for (let a = 0; a < palabras.length; a++) {
          insertDB
            .insertKeyword({
              user: id,
              palabra: palabras[a],
            })
            .then((result) => {
              if (c === palabras.length - 1) {
                insertDB
                  .agregarherramientas({
                    herramientas: herramientas,
                    id: id,
                  })
                  .then((resul) => {
                    let d = 0;
                    for (let a = 0; a < idiomas.length; a++) {
                      insertDB
                        .insertlistlenguaje({
                          user: id,
                          idioma: idiomas[a],
                        })
                        .then((result) => {
                          if (d === idiomas.length - 1) {
                            res("fin");
                          }
                          d++;
                        })
                        .catch((err) => rej(err));
                    }
                  })
                  .catch((err) => rej(err));
              }
              c++;
            })
            .catch((err) => rej(err));
        }
      })
      .catch((err2) => rej(err2));
  });
}

function datauseridmt(id) {
  return new Promise((res, rej) => {
    buscarDB
      .obtenerusuarioid({
        id: id,
      })
      .then((usua) => {
        const token = jwt.sign({ rows: [usua] }, LLAVE);
        buscarDB
          .buscartalentogeneral2(id)
          .then((talento) => {
            if (talento.data.length < 1) {
              let tem = null;
              if (usua.fotoperfil !== null && usua.fotoperfil !== "null") {
                tem = `${env.host}/proyecto/contenido/usuario${id}/${usua.fotoperfil}`;
              }
              res({
                token: token,
                datos: {
                  id: id,
                  nombre: usua.nombre,
                  foto: tem,
                  herramientas: [],
                  palabras: [],
                },
              });
            } else {
              let tem = null;
              if (usua.fotoperfil !== null && usua.fotoperfil !== "null") {
                tem = `${env.host}/proyecto/contenido/usuario${id}/${usua.fotoperfil}`;
              }
              res({
                token: token,
                datos: {
                  id: id,
                  nombre: usua.nombre,
                  foto: tem,
                  herramientas: talento.data[0].herramientas,
                  palabras: talento.data[0].palabras,
                },
              });
            }
          })
          .catch((talenerr) => {
            console.log(`error metodo datauseridmt ${talenerr} `);
            rej(dererro);
          });
      })
      .catch((dererro) => {
        console.log(`error metodo datauseridmt ${dererro} `);
        rej(dererro);
      });
  });
}

/**
      db      `7MM"""Mq. `7MMF'                                 mm    `7MM                       `7MM          
     ;MM:       MM   `MM.  MM                                   MM      MM                         MM          
    ,V^MM.      MM   ,M9   MM      `7MMpMMMb.pMMMb.   .gP"Ya  mmMMmm    MMpMMMb.   ,pW"Wq.    ,M""bMM  ,pP"Ybd 
   ,M  `MM      MMmmdM9    MM        MM    MM    MM  ,M'   Yb   MM      MM    MM  6W'   `Wb ,AP    MM  8I   `" 
   AbmmmqMA     MM         MM        MM    MM    MM  8M""""""   MM      MM    MM  8M     M8 8MI    MM  `YMMMa. 
  A'     VML    MM         MM        MM    MM    MM  YM.    ,   MM      MM    MM  YA.   ,A9 `Mb    MM  L.   I8 
.AMA.   .AMMA..JMML.     .JMML.    .JMML  JMML  JMML. `Mbmmd'   `Mbmo .JMML  JMML. `Ybmd9'   `Wbmd"MML.M9mmmP' 
 */

rutas.put("/update/useremail", (req, res) => {
  const { email, id } = req.body;
  if (email != undefined && id != undefined) {
    actualizarDB
      .updateuseremail(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/userpassword", (req, res) => {
  const { password, id } = req.body;
  if (password != undefined && id != undefined) {
    actualizarDB
      .updateuserpassword(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/userprofilepicture", (req, res) => {
  const { foto, id } = req.body;
  if (foto != undefined && id != undefined) {
    actualizarDB
      .updateuserprofilephoto(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/usercv", (req, res) => {
  const { cv, id } = req.body;
  if (cv != undefined && id != undefined) {
    actualizarDB
      .updateusercv(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/userexperience", (req, res) => {
  const { experiencia, id } = req.body;
  if (experiencia != undefined && id != undefined) {
    actualizarDB
      .updateuserexperience(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/username", (req, res) => {
  const { nombre, id } = req.body;
  if (nombre != undefined && id != undefined) {
    actualizarDB
      .updateusername(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/userdescription", (req, res) => {
  const { descripcion, id } = req.body;
  if (descripcion != undefined && id != undefined) {
    actualizarDB
      .updateuserdescription(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/usercountry", (req, res) => {
  const { pais, id } = req.body;
  if (pais != undefined && id != undefined) {
    actualizarDB
      .updateusercountry(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/userage", (req, res) => {
  const { edad, id } = req.body;
  if (edad != undefined && id != undefined) {
    actualizarDB
      .updateuserage(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/usergithub", (req, res) => {
  const { github, id } = req.body;
  if (github != undefined && id != undefined) {
    actualizarDB
      .updateusergithub(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/userbitbucket", (req, res) => {
  const { bitbucket, id } = req.body;
  if (bitbucket != undefined && id != undefined) {
    actualizarDB
      .updateuserbitbucket(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/usergitlab", (req, res) => {
  const { gitlab, id } = req.body;
  if (gitlab != undefined && id != undefined) {
    actualizarDB
      .updateusergitlab(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/userlinkedin", (req, res) => {
  const { linkedin, id } = req.body;
  if (linkedin != undefined && id != undefined) {
    actualizarDB
      .updateuserlinkedin(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
rutas.put("/update/user", (req, res) => {
  const {
    id,
    email,
    password,
    experiencia,
    fotoperfil,
    nombrearchivohojadevida,
    nombre,
    descripcion,
    pais,
    edad,
    github,
    gitlab,
    bitbucket,
    linkedin,
  } = req.body;
  if (
    typeof id === "number" &&
    typeof email === "string" &&
    typeof password === "string" &&
    typeof experiencia === "number" &&
    typeof fotoperfil === "string" &&
    typeof nombrearchivohojadevida === "string" &&
    typeof nombre === "string" &&
    typeof descripcion === "string" &&
    typeof pais === "string" &&
    typeof edad === "number" &&
    typeof github === "string" &&
    typeof gitlab === "string" &&
    typeof bitbucket === "string" &&
    typeof linkedin === "string"
  ) {
    actualizarDB
      .updateuser(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.json({ msj: "datos erroneos" });
  }
});
//-------------------------------------------------

rutas.put("/update/activitystate", (req, res) => {
  const { id, estado } = req.body;
  if (typeof id === "number" && typeof estado === "string") {
    actualizarDB
      .updateactivitystate(req.body)
      .then((resul) => res.json(resul))
      .catch((err) => res.json(err));
  }
});
rutas.put("/update/activitydeliverydate", (req, res) => {
  const { id, fecha } = req.body;
  if (typeof id === "number" && typeof fecha === "string") {
    actualizarDB
      .updateactivitydeliverydate(req.body)
      .then((resul) => res.json(resul))
      .catch((err) => res.json(err));
  }
});
rutas.put("/update/activityrevised", (req, res) => {
  const { id, revision } = req.body;
  if (typeof id === "number" && typeof revision === "string") {
    actualizarDB
      .updateactivityrevised(req.body)
      .then((resul) => res.json(resul))
      .catch((err) => res.json(err));
  }
});
rutas.put("/update/memberrol", (req, res) => {
  const { id, rol } = req.body;
  if (typeof id === "number" && typeof rol === "number") {
    actualizarDB
      .updatemember(req.body)
      .then((resul) => res.json(resul))
      .catch((err) => res.json(err));
  }
});
rutas.put("/update/contentfilename", (req, res) => {
  const { id, nombreArchivo } = req.body;
  if (typeof id === "number" && typeof nombreArchivo === "string") {
    actualizarDB
      .updatecontenidos(req.body)
      .then((resul) => res.json(resul))
      .catch((err) => res.json(err));
  }
});
rutas.put("/update/deliverablestate", (req, res) => {
  const { id, estado } = req.body;
  if (typeof id === "number" && typeof estado === "string") {
    actualizarDB
      .updatedeliverable(req.body)
      .then((resul) => res.json(resul))
      .catch((err) => res.json(err));
  }
});

rutas.put("/update/history", (req, res) => {
  const { id, descripcion } = req.body;
  if (typeof id === "number" && typeof descripcion === "string") {
    actualizarDB
      .updatehistory(req.body)
      .then((resul) => res.json(resul))
      .catch((err) => res.json(err));
  }
});
/**
`7MM"""YMM                                    db                                         
  MM    `7                                                                               
  MM   d   `7MM  `7MM  `7MMpMMMb.   ,p6"bo  `7MM   ,pW"Wq.  `7MMpMMMb.   .gP"Ya  ,pP"Ybd 
  MM""MM     MM    MM    MM    MM  6M'  OO    MM  6W'   `Wb   MM    MM  ,M'   Yb 8I   `" 
  MM   Y     MM    MM    MM    MM  8M         MM  8M     M8   MM    MM  8M"""""" `YMMMa. 
  MM         MM    MM    MM    MM  YM.    ,   MM  YA.   ,A9   MM    MM  YM.    , L.   I8 
.JMML.       `Mbod"YML..JMML  JMML. YMbmd'  .JMML. `Ybmd9'  .JMML  JMML. `Mbmmd' M9mmmP' 
 */
function proToken(req, res, next) {
  const header = req.headers["authorization"];
  // console.log(header);
  if (typeof header !== "undefined") {
    const portador = header.split(" ");
    const portadorToken = portador[1];
    req.token = portadorToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
function randomNumber() {
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomNumber = 0;
  for (let i = 0; i < 6; i++) {
    randomNumber += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }
  return randomNumber;
}

//-------------
module.exports = rutas;
/*
                                        __.-"..--,__
                               __..---"  | _|    "-_\
                        __.---"          | V|::.-"-._D
                   _--"".-.._   ,,::::::'"\/""'-:-:/
              _.-""::_:_:::::'-8b---"            "'
           .-/  ::::<  |\::::::"\
           \/:::/::::'\\ |:::b::\
           /|::/:::/::::-::b:%b:\|
            \/::::d:|8:::b:"%%%%%\
            |\:b:dP:d.:::%%%%%"""-,
             \:\.V-/ _\b%P_   /  .-._
             '|T\   "%j d:::--\.(    "-.
             ::d<   -" d%|:::do%P"-:.   "-,
             |:I _    /%%%o::o8P    "\.    "\
              \8b     d%%%%%%P""-._ _ \::.    \
              \%%8  _./Y%%P/      .::'-oMMo    )
                H"'|V  |  A:::...:odMMMMMM(  ./
                H /_.--"JMMMMbo:d##########b/
             .-'o      dMMMMMMMMMMMMMMP""
           /" /       YMMMMMMMMM|
         /   .   .    "MMMMMMMM/
         :..::..:::..  MMMMMMM:|
          \:/ \::::::::JMMMP":/
           :Ao ':__.-'MMMP:::Y
           dMM"./:::::::::-.Y
          _|b::od8::/:YM::/
          I HMMMP::/:/"Y/"
           \'""'  '':|
            |    -::::\
            |  :-._ '::\
            |,.|    \ _:"o
            | d" /   " \_:\.
            ".Y. \       \::\
             \ \  \      MM\:Y
              Y \  |     MM \:b
              >\ Y      .MM  MM
              .IY L_    MP'  MP
              |  \:|   JM   JP
              |  :\|   MP   MM
              |  :::  JM'  JP|
              |  ':' JP   JM |
              L   : JP    MP |
              0   | Y    JM  |
              0   |     JP"  |
              0   |    JP    |
              m   |   JP     #
              I   |  JM"     Y
              l   |  MP     :"
              |\  :-       :|
              | | '.\      :|
              | | "| \     :|
               \    \ \    :|
               |  |  | \   :|
               |  |  |   \ :|
               |   \ \    | '.
               |    |:\   | :|
               \    |::\..|  :\
                ". /::::::'  :||
                  :|::/:::|  /:\
                  | \/::|: \' ::|
                  |  :::||    ::|
                  |   ::||    ::|
                  |   ::||    ::|
                  |   ::||    ::|
                  |   ': |    .:|
                  |    : |    :|
                  |    : |    :|
                  |    :||   .:|
                  |   ::\   .:|
                 |    :::  .::|
                /     ::|  :::|
             __/     .::|   ':|
    ...----""        ::/     ::
   /m_  AMm          '/     .:::
   ""MmmMMM#mmMMMMMMM"     .:::m
      """YMMM""""""P        ':mMI
               _'           _MMMM
           _.-"  mm   mMMMMMMMM"
          /      MMMMMMM""
          mmmmmmMMMM"
*/
