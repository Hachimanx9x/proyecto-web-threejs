const ex = require("express");
const rutas = ex.Router();

const nodemailer = require("nodemailer");

const path = require("path");
const env = require("../env");
const ftpminio = require("../ftp/peticiones");
const buscarDB = require("../database/buscarDB");
const insertDB = require("../database/insertarDB");
const actualizarDB = require("../database/actualizarDB");
const jwt = require("jsonwebtoken");
const modelomt = require("../models/models");

const LLAVE = "misecretos";
const chalk = require("chalk");
rutas.post("/registro", (req, res) => {
  const { nombre, correo, password } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: true,
    auth: {
      user: "walton64@ethereal.email",
      pass: "KH4CURQ3h5fWMaty6W",
    },
  });
  const htmlc = `    
    <div>
    <h1> Bienvenido ${nombre} </h1>
    <p>Te registraste con el correo ${correo}</p>
    
    </div>
    `;
  const opcionescorreo = {
    from: '"Remitente', // sender address
    to: `"${correo}"`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `"${htmlc}"`, // html body
  };

  transporter.sendMail(opcionescorreo, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("Email enviado");
      res.status(200).jsonp(req.params);
    }
  });
});

//-----------------

rutas.post("/create/usuario", (req, res) => {
  const { email, password, nombre } = req.body;
  if (
    typeof email === "string" &&
    typeof password === "string" &&
    typeof nombre === "string"
  ) {
    buscarDB.obtenertodasUsuarios().then((result4) => {
      if (comprobaremail(result4.API, email)) {
        let model = {
          email: email,
          contrasena: password,
          fotoperfil: null,
          nombrearchivohojadevida: null,
          anosdeexperiencia: null,
          nombre: nombre,
          descripcion: null,
          pais: null,
          edad: null,
          github: null,
          gitlab: null,
          bitbucket: null,
          linkedin: null,
        };
        insertDB
          .insertUser(model)
          .then((result) => {
            buscarDB
              .obtenertodasUsuarios()
              .then((result3) => {
                const { API } = result3;
                let ultimo = API[API.length - 1].id;
                let usuario = API[API.length - 1];
                const bucket = `usuario${ultimo}`;
                ftpminio
                  .creatBucket(bucket)
                  .then((result2) => {
                    let rows = [];
                    rows.push(usuario);
                    const token = jwt.sign({ rows }, LLAVE);
                    buscarDB
                      .obtenerusuarioid({ id: rows[0].id })
                      .then((usua) => {
                        buscarDB
                          .buscartalentogeneral2(rows[0].id)
                          .then((talento) => {
                            if (talento.data.length < 1) {
                              let tem = null;
                              if (
                                usua.fotoperfil !== null &&
                                usua.fotoperfil !== "null"
                              ) {
                                tem = `${env.host}/proyecto/contenido/usuario${rows[0].id}/${usua.fotoperfil}`;
                              }
                              res.json({
                                token: token,
                                datos: {
                                  id: rows[0].id,
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
                                tem = `${env.host}/proyecto/contenido/usuario${rows[0].id}/${usua.fotoperfil}`;
                              }
                              res.json({
                                token: token,
                                datos: {
                                  id: rows[0].id,
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
                  .catch((err2) => {
                    res.json(err2);
                  });
              })
              .catch((err3) => {
                res.json(err3);
              });
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({ msj: "error email ya registrado" });
      }
    });
  } else {
    res.json({
      msj: `Erro en los datos  email => ${email} password=> ${password} nombre => ${nombre} `,
    });
  }
});

rutas.post("/agregar/contacto", proToken, (req, res) => {
  let { usuario, preferencia } = req.body;
  usuario = parseInt(usuario, 10);
  if (preferencia == "false") {
    preferencia = false;
  }
  if (preferencia == "true") {
    preferencia = true;
  }

  if (typeof usuario === "number" && typeof preferencia === "boolean") {
    jwt.verify(req.token, LLAVE, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (data.rows.length > 0) {
          insertDB
            .insertContacts(req.body)
            .then((result) => {
              buscarDB
                .obtenertodasContactos()
                .then((result2) => {
                  const { API } = result2;
                  let ultimo = API[API.length - 1].id;
                  const id = data.rows[0].id;
                  insertDB
                    .insertlistContacts({ usuario: id, contacto: ultimo })
                    .then((result) => {
                      res.json(result);
                    })
                    .catch((err3) => res.json(err3));
                })
                .catch((err2) => res.json(err2));
            })
            .catch((err) => res.json(err));
        }
      }
    });
  }
});

rutas.post("/agregar/palabraclave", proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (data.rows.length > 0) {
        const { palabra } = req.body;
        if (Array.isArray(palabra)) {
          let c = 0;
          for (let a = 0; a < palabra.length; a++) {
            insertDB
              .insertKeyword({ user: data.rows[0].id, palabra: palabra[a] })
              .then((result) => {
                if (c === palabra.length - 1) {
                  res.json(result);
                }
                c++;
              })
              .catch((err) => res.json(err));
          }
        } else {
          res.json({ msj: "palabra no es un array" });
        }
      } else {
        res.sendStatus(403);
      }
    }
  });
});
rutas.post("/agregar/idioma", proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      // console.log(data)
      const { idioma } = req.body;
      if (Array.isArray(idioma)) {
        let c = 0;
        for (let a = 0; a < idioma.length; a++) {
          insertDB
            .insertlistlenguaje({ user: data.rows[0].id, idioma: idioma[a] })
            .then((result) => {
              if (c === idioma.length - 1) {
                res.json(result);
              }
              c++;
            })
            .catch((err) => res.json(err));
        }
      } else {
        res.json({ msj: "idioma no es un array" });
      }
    }
  });
});

rutas.post("/agregar/herramientas", proToken, (req, res) => {
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { herramienta } = req.body;
      if (Array.isArray(herramienta)) {
        insertDB
          .agregarherramientas({
            herramientas: herramienta,
            id: data.rows[0].id,
          })
          .then((resul) => {
            res.json({ msj: "agregados" });
          })
          .catch((err) => res.json(err));
      } else {
        res.json({ msj: "herramienta no es un array" });
      }
    }
  });
});

rutas.post("/create/proyecto", proToken, (req, res) => {
  console.log(req.body);
  jwt.verify(req.token, LLAVE, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (data.rows.length > 0) {
        let { nombre, descripcion, practica, integrantes } = req.body;
        if (typeof practica === "string") {
          practica = practica.split(",");
        }
        if (typeof integrantes === "string") {
          integrantes = JSON.parse(`[${integrantes}]`);
        }
        console.log({ nombre, descripcion, practica, integrantes });
        console.log(chalk.bgBlue("___________________"));
        console.log(chalk.bgBlue("___________________"));
        console.log(chalk.bgBlue(req.files));
        integrantes.push({
          user: data.rows[0].id,
          rol: "Arquitecto Experiencia Multimedia",
        });
        let proyecto = {
          nombre: nombre,
          descripcion: descripcion,
        };
        if (proyecto.nombre != undefined) {
          const { nombre, descripcion } = proyecto;
          if (
            typeof nombre === "string" &&
            typeof descripcion === "string" &&
            Array.isArray(practica) &&
            Array.isArray(integrantes)
          ) {
            insertDB
              .creaproyecto3({
                proyect: {
                  nombre: proyecto.nombre,
                  descripcion: proyecto.descripcion,
                  icono: null,
                  banner: null,
                },
                members: integrantes,
                practice: practica,
              })
              .then((result) => {
                console.log(
                  chalk.bgBlue("____") +
                    chalk.blue(
                      ` se terminico de cargar el proyecto ${result.proyectoid} `
                    ) +
                    chalk.bgBlue("____")
                );
                const bucket = `proyecto${result.proyectoid}`;
                ftpminio
                  .creatBucket(bucket)
                  .then((result2) => {
                    console.log(
                      chalk.bgBlue("_▓_") +
                        chalk.blue(
                          ` bucket proyecto${result.proyectoid} a sido cargado `
                        ) +
                        chalk.bgBlue("_▓_")
                    );
                    if (req.files != null && req.files != undefined) {
                      const { banner, icon } = req.files;
                      if (
                        banner != null ||
                        (banner != undefined && icon == null) ||
                        icon == undefined
                      ) {
                        banner.mv(__dirname + "/tmp/" + banner.name, (err) => {
                          if (!err) {
                            var metaData = {
                              "Content-Type": `${banner.mimetype}`,
                              size: banner.size,
                              "X-Amz-Meta-Testing": 1234,
                              example: 5678,
                            };
                            ftpminio
                              .putFile(
                                bucket,
                                banner.name,
                                path.join(__dirname, `/tmp/${banner.name}`),
                                metaData
                              )
                              .then((resulbaner) => {
                                actualizarDB
                                  .updateproyectbanner({
                                    banner: banner.name,
                                    id: result.proyectoid,
                                  })
                                  .then((resultba) => {
                                    console.log(
                                      chalk.bgRed("__") +
                                        chalk.bgYellow("__") +
                                        chalk.bgGreen("__") +
                                        chalk.green("=>proyecto creado")
                                    );
                                    res.json({ msj: "guardado" });
                                  })
                                  .catch((err) => res.json(err));
                              })
                              .catch((err) => res.json(err));
                          } else {
                            console.log(err);
                          }
                        });
                      } else if (
                        banner == null ||
                        (banner == undefined && icon != null) ||
                        icon != undefined
                      ) {
                        icon.mv(__dirname + "/tmp/" + icon.name, (err) => {
                          if (!err) {
                            var metaData = {
                              "Content-Type": `${icon.mimetype}`,
                              size: icon.size,
                              "X-Amz-Meta-Testing": 1234,
                              example: 5678,
                            };
                            ftpminio
                              .putFile(
                                bucket,
                                icon.name,
                                path.join(__dirname, `/tmp/${icon.name}`),
                                metaData
                              )
                              .then((resulicon) => {
                                actualizarDB
                                  .updateproyecticon({ icono, id })
                                  .then((resultdf) => {
                                    console.log(
                                      chalk.bgRed("__") +
                                        chalk.bgYellow("__") +
                                        chalk.bgGreen("__") +
                                        chalk.green("=>proyecto creado")
                                    );
                                    res.json({ msj: "guardado" });
                                  })
                                  .catch((err) => res.json(err));
                              })
                              .catch((err) => res.json(err));
                          } else {
                            console.log(err);
                          }
                        });
                      } else if (
                        banner != null ||
                        (banner != undefined && icon != null) ||
                        icon != undefined
                      ) {
                        banner.mv(__dirname + "/tmp/" + banner.name, (err) => {
                          if (!err) {
                            var metaData = {
                              "Content-Type": `${banner.mimetype}`,
                              size: banner.size,
                              "X-Amz-Meta-Testing": 1234,
                              example: 5678,
                            };
                            ftpminio
                              .putFile(
                                bucket,
                                banner.name,
                                path.join(__dirname, `/tmp/${banner.name}`),
                                metaData
                              )
                              .then((resulbaner) => {
                                actualizarDB
                                  .updateproyectbanner({
                                    banner: banner.name,
                                    id: result.proyectoid,
                                  })
                                  .then((resultba) => {
                                    icon.mv(
                                      __dirname + "/tmp/" + icon.name,
                                      (err) => {
                                        if (!err) {
                                          var metaData = {
                                            "Content-Type": `${icon.mimetype}`,
                                            size: icon.size,
                                            "X-Amz-Meta-Testing": 1234,
                                            example: 5678,
                                          };
                                          ftpminio
                                            .putFile(
                                              bucket,
                                              icon.name,
                                              path.join(
                                                __dirname,
                                                `/tmp/${icon.name}`
                                              ),
                                              metaData
                                            )
                                            .then((resulicon) => {
                                              actualizarDB
                                                .updateproyecticon({
                                                  icono,
                                                  id,
                                                })
                                                .then((resultdf) => {
                                                  console.log(
                                                    chalk.bgRed("__") +
                                                      chalk.bgYellow("__") +
                                                      chalk.bgGreen("__") +
                                                      chalk.green(
                                                        "=>proyecto creado"
                                                      )
                                                  );
                                                  res.json({ msj: "guardado" });
                                                })
                                                .catch((err) => res.json(err));
                                            })
                                            .catch((err) => res.json(err));
                                        } else {
                                          console.log(err);
                                        }
                                      }
                                    );
                                  })
                                  .catch((err) => res.json(err));
                              })
                              .catch((err) => res.json(err));
                          } else {
                            console.log(err);
                          }
                        });
                      } else {
                        console.log(
                          chalk.bgRed("__") +
                            chalk.bgYellow("__") +
                            chalk.bgGreen("__") +
                            chalk.green("=>proyecto creado")
                        );
                        res.json({ msj: "guardado" });
                      }
                    } else {
                      console.log(
                        chalk.bgRed("__") +
                          chalk.bgYellow("__") +
                          chalk.bgGreen("__") +
                          chalk.green("=>proyecto creado")
                      );
                      res.json({ msj: "guardado" });
                    }
                  })
                  .catch((err2) => res.json({ msj: err2 }));
              })
              .catch((err) => res.json({ msj: err }));
          } else {
            res.json({ msj: "error datos incorrectos" });
          }
        }
      }
    }
  });
}); //fin de l ruta

rutas.post("/insert/auto/tecnicas", (req, res) => {
  let arradef = [];
  for (let a = 0; a < modelomt.Practicas.length; a++) {
    arradef.push(modelomt.Practicas[a].Tecnicas);
  }
  arradef = reordenararraytecnicas(arradef);
  let fin = false;

  let promesatecnica = new Promise((resu, rej) => {
    for (let b = 0; b < arradef.length; b++) {
      insertDB
        .insertTechnical({
          titulo: arradef[b].titulo,
          descripcion: arradef[b].descripcion,
          bibliografia: arradef[b].bibliografia,
        })
        .then((resul) => {
          if (fin) {
            resu({ msj: "echo" });
          }
        })
        .catch((err) => rej(err));
      if (b === arradef.length - 1) {
        fin = true;
      }
    }
  });
  promesatecnica
    .then((reul) => {
      res.json(reul);
    })
    .catch((err) => res.json(err));
});
rutas.post("/insert/auto/herramientasmetodologia", (req, res) => {
  let arradef = [];
  for (let a = 0; a < modelomt.Practicas.length; a++) {
    arradef.push(modelomt.Practicas[a].Herramientas);
  }
  arradef = reordenararrayherramientasmetodologia(arradef);
  let fin = false;

  let promesatecnica = new Promise((resu, rej) => {
    for (let b = 0; b < arradef.length; b++) {
      insertDB
        .insertMethodologyTool({
          nombre: arradef[b].nombre,
          descripcion: arradef[b].descripcion,
          bibliografia: arradef[b].bibliografia,
        })
        .then((resul) => {
          if (fin) {
            resu({ msj: "echo" });
          }
        })
        .catch((err) => rej(err));
      if (b === arradef.length - 1) {
        fin = true;
      }
    }
  });
  promesatecnica
    .then((reul) => {
      res.json(reul);
    })
    .catch((err) => res.json(err));
});
rutas.post("/insert/auto/roles", (req, res) => {
  let arradef = [];
  for (let a = 0; a < modelomt.Practicas.length; a++) {
    arradef.push(modelomt.Practicas[a].Roles);
  }
  arradef = reordenararrayroles(arradef);
  let fin = false;

  let promesarol = new Promise((resu, rej) => {
    for (let b = 0; b < arradef.length; b++) {
      insertDB
        .inserRoles({
          titulo: arradef[b].nombre,
          descripcion: arradef[b].descripcion,
          recomendacion: "",
        })
        .then((result) => {
          if (fin) {
            resu({ msj: "echo" });
          }
        })
        .catch((err) => {
          rej(err);
          console.log(err);
        });
      if (b === arradef.length - 1) {
        fin = true;
      }
    }
  });
  promesarol
    .then((reul) => {
      res.json(reul);
    })
    .catch((err) => res.json(err));
});

rutas.post("/crear/reunion", proToken, (req, res) => {
  const { proyec, fecha, hora, duracion, descripcion, titulo } = req.body;

  if (
    proyec != undefined &&
    fecha != undefined &&
    hora != undefined &&
    duracion != undefined &&
    descripcion != undefined &&
    titulo != undefined
  ) {
    insertDB
      .crearreunion({ proyec, fecha, hora, duracion, descripcion, titulo })
      .then((resu) => {
        res.json(resu);
      })
      .catch((err) => res.json(err));
  }
});
/**
      db      `7MM"""Mq. `7MMF'                                 mm    `7MM                       `7MM          
     ;MM:       MM   `MM.  MM                                   MM      MM                         MM          
    ,V^MM.      MM   ,M9   MM      `7MMpMMMb.pMMMb.   .gP"Ya  mmMMmm    MMpMMMb.   ,pW"Wq.    ,M""bMM  ,pP"Ybd 
   ,M  `MM      MMmmdM9    MM        MM    MM    MM  ,M'   Yb   MM      MM    MM  6W'   `Wb ,AP    MM  8I   `" 
   AbmmmqMA     MM         MM        MM    MM    MM  8M""""""   MM      MM    MM  8M     M8 8MI    MM  `YMMMa. 
  A'     VML    MM         MM        MM    MM    MM  YM.    ,   MM      MM    MM  YA.   ,A9 `Mb    MM  L.   I8 
.AMA.   .AMMA..JMML.     .JMML.    .JMML  JMML  JMML. `Mbmmd'   `Mbmo .JMML  JMML. `Ybmd9'   `Wbmd"MML.M9mmmP' 
 */
//--------------------------------------------------
rutas.post("/insert/lenguaje", (req, res) => {
  const { nombre, nivel } = req.body;
  if (typeof nombre === "string" && typeof nivel === "string") {
    insertDB.insertLenguaje(req.body).then((result) => {
      res.json(result);
    });
  } else {
    res.json({ msj: "error en los datos" });
  }
});
//--------------------------------------------------
rutas.post("/insert/user", (req, res) => {
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
  } = req.body;

  if (
    typeof email === "string" &&
    typeof contrasena === "string" &&
    typeof fotoperfil === "string" &&
    typeof nombrearchivohojadevida === "string" &&
    typeof anosdeexperiencia === "string" &&
    typeof nombre === "string" &&
    typeof descripcion === "string" &&
    typeof pais === "string" &&
    typeof edad === "string" &&
    typeof github === "string" &&
    typeof gitlab === "string" &&
    typeof bitbucket === "string" &&
    typeof linkedin === "string"
  ) {
    insertDB.insertUser(req.body).then((result) => res.json(result));
  }
});
//---------------------------------------------------
rutas.post("/insert/Keyword", (req, res) => {
  const { user, palabra } = req.body;
  if (typeof user === "number" && typeof palabra === "string") {
    insertDB.insertKeyword(req.body).then((result) => res.json(result));
  }
});
//---------------------------------------------------
rutas.post("/insert/listlenguaje", (req, res) => {
  const { user, idioma } = req.body;
  if (typeof user === "string" && typeof idioma === "number") {
    insertDB.insertlistlenguaje(req.body).then((result) => {
      res.json(result);
    });
  }
});
//-----------------------------------------------------
rutas.post("/insert/Ability", (req, res) => {
  const { tipo, descripcion, nivel } = req.body;
  if (
    typeof tipo === "string" &&
    typeof descripcion === "string" &&
    typeof nivel === "string"
  ) {
    insertDB.insertAbility(req.body).then((result) => res.json(result));
  }
});
//-----------------------------------------------------
rutas.post("/insert/ListAbility", (req, res) => {
  const { usuario, habilidad } = req.body;
  if (typeof usuario === "string" && typeof habilidad === "number") {
    insertDB.insetlistAbility(req.body).then((resul) => res.json(resul));
  }
});
//-----------------------------------------------------
rutas.post("/insert/tools", (req, res) => {
  const { nombre, tipo, descripcion, url_icono } = req.body;
  if (
    typeof nombre === "string" &&
    typeof tipo === "string" &&
    typeof descripcion === "string" &&
    typeof url_icono === "string"
  ) {
    insertDB.insertTools(req.body).then((result) => {
      res.json(result);
    });
  }
});
//--------------------------------------------------------------
rutas.post("/insert/listtools", (req, res) => {
  const { usuario, herramienta } = req.body;
  if (typeof usuario === "string" && typeof herramienta === "string") {
    insertDB
      .insertlistTool(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/metodology", (req, res) => {
  const { nombre, descripcion, consejo } = req.body;
  if (
    typeof nombre === "string" &&
    typeof descripcion === "string" &&
    typeof consejo === "string"
  ) {
    insertDB
      .insertMethodology(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/history", (req, res) => {
  const { descripcion } = req.body;
  if (typeof descripcion === "string") {
    insertDB
      .insertHistory(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/proyect", (req, res) => {
  const {
    nombre,
    descripcion,
    estado,
    icon,
    banner,
    metodologia,
    historia,
  } = req.body;
  if (
    typeof nombre === "string" &&
    typeof descripcion === "string" &&
    typeof estado === "string" &&
    typeof icon === "string" &&
    typeof banner === "string" &&
    typeof metodologia === "string" &&
    typeof historia === "string"
  ) {
    insertDB
      .insertHistory(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/practice", (req, res) => {
  const { nombre, descripcion } = req.body;
  if (typeof nombre === "string" && typeof descripcion === "string") {
    insertDB
      .insertPractice(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/role", (req, res) => {
  const { titulo, descripcion, recomendacion } = req.body;
  if (
    typeof titulo === "string" &&
    typeof descripcion === "string" &&
    typeof recomendacion === "string"
  ) {
    insertDB
      .inserRoles(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error datos" });
  }
});
//--------------------------------------------------------------
rutas.post("/insert/listrole", (req, res) => {
  const { practica, rol } = req.body;
  if (typeof practica === "number" && typeof rol === "number") {
    insertDB
      .insertlistRoles(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/member", (req, res) => {
  const { usuario, rol } = req.body;
  if (typeof usuario === "number" && typeof rol === "number") {
    insertDB
      .insertMembers(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/listmember", (req, res) => {
  const { proyecto, integrante } = req.body;
  if (typeof proyecto === "number" && typeof integrante === "number") {
    insertDB
      .insertlistMembers(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/Alpha", (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  if (
    typeof nombre === "string" &&
    typeof descripcion === "string" &&
    typeof estado === "string"
  ) {
    insertDB
      .insertAlpha(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/listAlpha", (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  if (
    typeof nombre === "string" &&
    typeof descripcion === "string" &&
    typeof estado === "string"
  ) {
    insertDB
      .insertlistAlpha(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/deliverable", (req, res) => {
  const {
    titulo,
    descripcion,
    estado,
    tipoArchivo,
    fechaEntrega,
    numeroRevisiones,
  } = req.body;
  if (
    typeof titulo === "string" &&
    typeof descripcion === "string" &&
    typeof estado === "string" &&
    typeof tipoArchivo === "string" &&
    typeof fechaEntrega === "string" &&
    typeof numeroRevisiones === "number"
  ) {
    insertDB
      .insertDeliverable(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/technical", (req, res) => {
  const { titulo, descripcion, bibliografia } = req.body;
  if (
    typeof titulo === "string" &&
    typeof descripcion === "string" &&
    typeof bibliografia === "string"
  ) {
    insertDB
      .insertTechnical(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/activity", (req, res) => {
  const {
    titulo,
    estado,
    descripcion,
    fechacreacion,
    fechaentrega,
    revision,
    tecnica,
  } = req.body;
  if (
    typeof titulo === "string" &&
    typeof descripcion === "string" &&
    typeof estado === "string" &&
    typeof fechacreacion === "string" &&
    typeof fechaentrega === "string" &&
    typeof revision === "number" &&
    typeof tecnica === "number"
  ) {
    insertDB
      .insertActivity(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  } else {
    res.json({ msj: "error" });
  }
});
//--------------------------------------------------------------
rutas.post("/insert/listactivity", (req, res) => {
  const { integrante, actividad } = req.body;
  if (typeof integrante === "number" && typeof actividad === "number") {
    insertDB
      .insertTechnical(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/chat", (req, res) => {
  const { archivo, fecha } = req.body;
  if (typeof archivo === "string" && typeof fecha === "string") {
    insertDB
      .insertchat(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/listchat", (req, res) => {
  const { historial, chat } = req.body;
  if (typeof historial === "number" && typeof chat === "string") {
    insertDB
      .insertlistchat(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/event", (req, res) => {
  const { fechacreacion } = req.body;
  if (typeof fechacreacion === "string") {
    insertDB
      .insertEvent(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/listevent", (req, res) => {
  const { historial, evento, integrante } = req.body;
  if (
    typeof historial === "number" &&
    typeof evento === "number" &&
    typeof integrante === "number"
  ) {
    insertDB
      .insertListEvent(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/Meeting", (req, res) => {
  const { titulo, fecha, hora, duracion, descripcion, vigente } = req.body;
  if (
    typeof titulo === "string" &&
    typeof fecha === "string" &&
    typeof hora === "string" &&
    typeof duracion === "string" &&
    typeof descripcion === "string" &&
    typeof vigente === "string"
  ) {
    insertDB
      .insertMeeting(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/listMeeting", (req, res) => {
  const { evento, reunion } = req.body;
  if (typeof evento === "number" && typeof reunion === "number") {
    insertDB
      .insertListMeeting(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/delivery", (req, res) => {
  const {
    titulo,
    descripcion,
    nombrearchivoguardado,
    actividad,
    entragable,
  } = req.body;
  if (
    typeof titulo === "string" &&
    typeof descripcion === "string" &&
    typeof nombrearchivoguardado === "string" &&
    typeof actividad === "number" &&
    typeof entragable === "number"
  ) {
    insertDB
      .insertDelivery(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/contenct", (req, res) => {
  const { nombre, nombrearchivo, descripcion, bibliografia } = req.body;
  if (
    typeof nombre === "string" &&
    typeof nombrearchivo === "string" &&
    typeof descripcion === "string" &&
    typeof bibliografia === "string"
  ) {
    insertDB
      .insertContent(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/listcontent", (req, res) => {
  const { entregable, contenido, actividad } = req.body;
  if (
    typeof entregable === "number" &&
    typeof contenido === "number" &&
    typeof actividad === "number"
  ) {
    insertDB
      .insertlistContent(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/methodologyTool", (req, res) => {
  const { nombre, descripcion, bibliografia } = req.body;
  if (
    typeof nombre === "string" &&
    typeof descripcion === "string" &&
    typeof bibliografia === "string"
  ) {
    insertDB
      .insertMethodologyTool(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post("/insert/listmethodologyTool", (req, res) => {
  const { entregable, herramientametodologia } = req.body;
  if (
    typeof entregable === "number" &&
    typeof herramientametodologia === "number"
  ) {
    insertDB
      .insertListMethodologyTool(req.body)
      .then((resul) => {
        res.json(resul);
      })
      .catch((err) => res.json(err));
  }
});

//--------------------------------------------------------------
/**
 `7MMF'                                        mm        `7MM"""YMM   db  `7MM           
  MM                                          MM          MM    `7         MM           
  MM  `7MMpMMMb.  ,pP"Ybd  .gP"Ya  `7Mb,od8 mmMMmm        MM   d   `7MM    MM   .gP"Ya  
  MM    MM    MM  8I   `" ,M'   Yb   MM' "'   MM          MM""MM     MM    MM  ,M'   Yb 
  MM    MM    MM  `YMMMa. 8M""""""   MM       MM          MM   Y     MM    MM  8M"""""" 
  MM    MM    MM  L.   I8 YM.    ,   MM       MM          MM         MM    MM  YM.    , 
.JMML..JMML  JMML.M9mmmP'  `Mbmmd' .JMML.     `Mbmo     .JMML.     .JMML..JMML. `Mbmmd' 
 */
rutas.post("/api/crearbucket", (req, res) => {
  const { bucket } = req.body;
  ftpminio
    .creatBucket(bucket)
    .then((r) => {
      if (r) {
        res.json({ msj: "creado" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

rutas.post("/proyecto/insertarArchivo", (req, res) => {
  console.log(req.body);
  const { bucket } = req.body;
  const { archivo } = req.files;
  //console.log(`entro el archivo ${archivo.name}`);
  archivo.mv(__dirname + "/tmp/" + archivo.name, (err) => {
    if (!err) {
      var metaData = {
        "Content-Type": `${archivo.mimetype}`,
        size: archivo.size,
        "X-Amz-Meta-Testing": 1234,
        example: 5678,
      };

      ftpminio
        .putFile(
          bucket,
          archivo.name,
          path.join(__dirname, `/tmp/${archivo.name}`),
          metaData
        )
        .then((resul) => res.json({ estado: "completado" }))
        .catch((err) => res.json(err));
    } else {
      console.log(err);
    }
  });
});

//-------------------
/*
`7MM"""YMM                                    mm      db                                
  MM    `7                                    MM                                        
  MM   d   `7MM  `7MM  `7MMpMMMb.   ,p6"bo  mmMMmm  `7MM   ,pW"Wq.  `7MMpMMMb.  ,pP"Ybd 
  MM""MM     MM    MM    MM    MM  6M'  OO    MM      MM  6W'   `Wb   MM    MM  8I   `" 
  MM   Y     MM    MM    MM    MM  8M         MM      MM  8M     M8   MM    MM  `YMMMa. 
  MM         MM    MM    MM    MM  YM.    ,   MM      MM  YA.   ,A9   MM    MM  L.   I8 
.JMML.       `Mbod"YML..JMML  JMML. YMbmd'    `Mbmo .JMML. `Ybmd9'  .JMML  JMML.M9mmmP' 
*/
function comprobaremail(array, email) {
  let vari = true;
  for (let a = 0; a < array.length; a++) {
    if (array[a].email == email) {
      return false;
    }
  }
  return vari;
}
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
function reordenararraytecnicas(array) {
  let arratem = [];
  for (let a = 0; a < array.length; a++) {
    for (let b = 0; b < array[a].length; b++) {
      arratem.push(array[a][b]);
    }
  }
  let c = 0,
    d = 1,
    tem = 1;
  for (c; c < arratem.length; c++) {
    d = tem;
    for (d; d < arratem.length; d++) {
      if (arratem[c].titulo === arratem[d].titulo) {
        arratem.splice(d, 1);
      }
    }
    tem++;
  }
  return arratem;
}
function reordenararrayherramientasmetodologia(array) {
  let arratem = [];
  for (let a = 0; a < array.length; a++) {
    for (let b = 0; b < array[a].length; b++) {
      arratem.push(array[a][b]);
    }
  }
  let c = 0,
    d = 1,
    tem = 1;
  for (c; c < arratem.length; c++) {
    d = tem;
    for (d; d < arratem.length; d++) {
      if (arratem[c].nombre === arratem[d].nombre) {
        arratem.splice(d, 1);
      }
    }
    tem++;
  }
  return arratem;
}
function reordenararrayroles(array) {
  let arratem = [];
  for (let a = 0; a < array.length; a++) {
    for (let b = 0; b < array[a].length; b++) {
      arratem.push(array[a][b]);
    }
  }
  let c = 0,
    d = 1,
    tem = 1;
  for (c; c < arratem.length; c++) {
    d = tem;
    for (d; d < arratem.length; d++) {
      if (arratem[c].nombre === arratem[d].nombre) {
        arratem.splice(d, 1);
      }
    }
    tem++;
  }
  return arratem;
}
module.exports = rutas;

/*
                             _.      .' `-.
                        .'  `-.::/_.    `.
                       /   _.   .'        \
                     .' .'\  `./      `.   \
                  .-'  /   '.    .'.    \   ;
               .-'  .-'      \ .'   \    .  |
            .-'   .'      .-._'_.-.  \    . :
           /     /     .-'    '    `. '.     \         :
          :     :     /              `. '.    `.      /|
           \    |    /                /`. '-.   `-._.' ;
            ;   |  .;                :   \   '-.      /
    `.     /    :.'/      _       _   \   \     \  _.'
     \`._.'    // :    .s$$P     T$$s. '.  \     ; \
      `._.   .':  |  .dP'           `Tb. \  \    |  `.
         /  /  |  | dP  .-.       .-.  Tb ;  .   |    `-.
     `_.'  :   |  |'   'd$b       d$b`   `|` |   |     | `.
      '.   |   |  :   ':$$$       $$$:`   '\ |   '    /|   \
        `-'|   |  :` ; |T$P       T$P| : '  :|  /   .' ;    ;
           :   :   \\`-:__.       .__:-'/ .' |.'\_.'  /     |
           /\   \   .\        s        / :   /|      /      :
          .  '.  \  | \     .___.     /   \ : |    .'      /
        .'     \  'X   '.           .'\    '.\|\.-'      .'
      .'        \   '.  |`.       .'|  :      `.'.    .-'|
     /           '    '-:  `-._.-'; |   `.      \ '-.'   ;
    :             '      \       /  |--.._J.-.    '.  './    -.
     \             \      \     :         / . `-.  \   '.     \`.
      `.      .     ;      ;             /   `-. `-.;    \     : .
        `-._.'      |      |          __/          /|     \._.'  '
         .' .       ;      :     _.-"'.'         .: |      ;    /
        /   |\     /      /         .' .-'    .-'  \|      |   /
       /    : '._.'     .'.       .'  /    .-'     .'      : .'
      :      \        .'-. `.   .' .-'  .-'       /       /"'
  .:' |      |`-.__.-'`-. \_ `s'.-'  .-'         /      .'
.'/   :      :           `._.' `._.-'           :    .-'
.' :     \      \             `._.'               |   (
.   :     /`.     `-.           ;|:      [bug]     :    \
:    `._.'   `-._    `-.       , : .               |\    '.
`.               `.     `.     ;'. ;               ' `.    `-.__.
`-._   _.'      ;\      `.   | : |              /    `*+.__.-'
.'  `"'        /  ;       \  |.' |             '
/             .'   |        . : ` ;--._     _.-'
/   :      _.-'     :        |  \ /
:    |\             /         ;   V
|    `.`.        _.'         /
:      \ `-.._.-'          .'
*/
