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

rutas.post("/agregar/contacto", proToken, async (req, res) => {
  let { usuario, preferencia } = req.body;
  usuario = parseInt(usuario, 10);
  if (preferencia == "false") {
    preferencia = false;
  }
  if (preferencia == "true") {
    preferencia = true;
  }

  if (typeof usuario === "number" && typeof preferencia === "boolean") {
    await jwt.verify(req.token, LLAVE, async (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (data.rows.length > 0) {
          await insertDB
            .insertContacts(req.body)
            .then(async (result) => {
              await buscarDB
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
        integrantes.push({
          user: data.rows[0].id,
          rol: "Arquitecto Experiencia Multimedia",
        });
        console.log({ nombre, descripcion, practica, integrantes });
        console.log(chalk.bgBlue("___________________"));
        console.log(chalk.bgBlue("___________________"));
        console.log(chalk.bgBlue(req.files));

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
                        banner != null &&
                        banner != undefined &&
                        icon == null &&
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
                        banner == null &&
                        banner == undefined &&
                        icon != null &&
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
                                  .updateproyecticon({
                                    icono: icon.name,
                                    id: result.proyectoid,
                                  })
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
                        banner != null &&
                        banner != undefined &&
                        icon != null &&
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
                                                  icono: icon.name,
                                                  id: result.proyectoid,
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

rutas.post("/insert/auto/tecnicas", async (req, res) => {
  let arradef = [];
  for (let a = 0; a < modelomt.Practicas.length; a++) {
    arradef.push(modelomt.Practicas[a].Tecnicas);
  }
  arradef = reordenararraytecnicas(arradef);
  let fin = false;

  let promesatecnica = new Promise(async (resu, rej) => {
    let num = 0;
    for (let b = 0; b < arradef.length; b++) {
      await insertDB
        .insertTechnical({
          titulo: arradef[num].titulo,
          descripcion: arradef[num].descripcion,
          bibliografia: arradef[num].bibliografia,
        })

        .then((resul) => {
          console.log(`Tecnica ${arradef[num].titulo} agregada`);
          if (num === arradef.length - 1) {
            resu({ msj: "echo" });
          }

          num++;
        })
        .catch((err) => rej(err));
    }
  });
  await promesatecnica
    .then((reul) => {
      res.json(reul);
    })
    .catch((err) => res.json(err));
});
rutas.post("/insert/auto/herramientasmetodologia", async (req, res) => {
  let arradef = [];
  for (let a = 0; a < modelomt.Practicas.length; a++) {
    arradef.push(modelomt.Practicas[a].Herramientas);
  }
  arradef = reordenararrayherramientasmetodologia(arradef);
  let fin = 0;

  let promesatecnica = new Promise(async (resu, rej) => {
    for (let b = 0; b < arradef.length; b++) {
      await insertDB
        .insertMethodologyTool({
          nombre: arradef[fin].nombre,
          descripcion: arradef[fin].descripcion,
          bibliografia: arradef[fin].bibliografia,
        })
        .then((resul) => {
          console.log(
            `herramienta meto ${arradef[fin].nombre} a sido agregada`
          );
          if (fin === arradef.length - 1) {
            resu({ msj: "echo" });
          }
          fin++;
        })
        .catch((err) => rej(err));
    }
  });
  await promesatecnica
    .then((reul) => {
      res.json(reul);
    })
    .catch((err) => res.json(err));
});
rutas.post("/insert/auto/roles", async (req, res) => {
  let arradef = [];
  for (let a = 0; a < modelomt.Practicas.length; a++) {
    arradef.push(modelomt.Practicas[a].Roles);
  }
  arradef = reordenararrayroles(arradef);

  let promesarol = new Promise(async (resu, rej) => {
    let fin = 0;
    for (let b = 0; b < arradef.length; b++) {
      await insertDB
        .inserRoles({
          titulo: arradef[fin].nombre,
          descripcion: arradef[fin].descripcion,
          recomendacion: "",
        })
        .then((result) => {
          console.log(`rol ${arradef[fin].nombre} agregado`);
          if (fin === arradef.length - 1) {
            resu({ msj: "echo" });
          }
          fin++;
        })
        .catch((err) => {
          rej(err);
          console.log(err);
        });
    }
  });
  await promesarol
    .then((reul) => {
      res.json(reul);
    })
    .catch((err) => res.json(err));
});
rutas.post("/auto/idiomas", async (req, res) => {
  const arra = [
    { nombre: "Ingles", nivel: "A1 Beginner" },
    { nombre: "Ingles", nivel: "A2 Elementary" },
    { nombre: "Ingles", nivel: "B1 LowerIntermediate" },
    { nombre: "Ingles", nivel: "B2 Intermediate" },
    { nombre: "Ingles", nivel: "C1 Upperintermediate" },
    { nombre: "Ingles", nivel: "C2 Advanced" },
    { nombre: "Ingles", nivel: "native" },
    { nombre: "Español", nivel: "A1 Acceso/Elemental" },
    { nombre: "Español", nivel: "A2 Plataforma/Básico" },
    { nombre: "Español", nivel: "B1 Intermedio" },
    { nombre: "Español", nivel: "B2 Intermedio alto/Avanzado" },
    { nombre: "Español", nivel: "C1 Superior" },
    { nombre: "Español", nivel: "C2 Perfeccionamiento" },
    { nombre: "Español", nivel: "nativo" },
  ];
  let con = 0;
  for (let a = 0; a < arra.length; a++) {
    await insertDB.insertLenguaje(arra[con]).then((result) => {
      console.log(
        `el idioma ${arra[con].nombre} con nivel ${arra[con].nivel} fue agregado`
      );
      if (con == arra.length - 1) {
        res.json({ msj: "idiomas agregados" });
      }
      con++;
    });
  }
});
rutas.post("/auto/habilidades", async (req, res) => {
  const arra = [
    {
      tipo: "Desarrollo",
      descripcion: "es capas de afrontar el desarrollo a nivel logico",
      nivel: "basico",
    },
    {
      tipo: "Diseño",
      descripcion: "es capas de afrontar el desarrollo a nivel estetico",
      nivel: "basico",
    },
  ];
  let num = 0;
  for (let a = 0; a < arra.length; a++) {
    await insertDB.insertAbility(arra[num]).then((result) => {
      console.log(`la habilidad de ${arra[num].tipo}`);
      if (num >= arra.length - 1) {
        res.json({ msj: "terminado" });
      }
      num++;
    });
  }
});
rutas.post("/auto/herramienta", async (req, res) => {
  const arra = [
    {
      nombre: "Reactjs",
      tipo: "desarrollo",
      descripcion:
        "Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres. ",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/reactjs-icon.svg",
    },
    {
      nombre: "Angularjs",
      tipo: "desarrollo",
      descripcion:
        "Es un framework de JavaScript de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página. Su objetivo es aumentar las aplicaciones basadas en navegador con capacidad de Modelo Vista Controlador (MVC), en un esfuerzo para hacer que el desarrollo y las pruebas sean más fáciles.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/angular-icon.svg",
    },
    {
      nombre: "Vuejs",
      tipo: "desarrollo",
      descripcion:
        "Es un framework de JavaScript de código abierto para la construcción de interfaces de usuario y aplicaciones de una sola página. Fue creado por Evan You, y es mantenido por él y por el resto de los miembros activos del equipo central que provienen de diversas empresas como Netlify y Netguru.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/vuejs-icon.svg",
    },
    {
      nombre: "Nodejs",
      tipo: "desarrollo",
      descripcion:
        "Es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google. Fue creado con el enfoque de ser útil en la creación de programas de red altamente escalables, como por ejemplo, servidores web.​ Fue creado por Ryan Dahl en 2009 y su evolución está apadrinada por la empresa Joyent, que además tiene contratado a Dahl en plantilla.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/nodejs-icon.svg",
    },
    {
      nombre: "HTML5",
      tipo: "desarrollo",
      descripcion:
        "Conocida como HTML5, y una variante XHTML conocida como sintaxis XHTML 5 que deberá servirse con sintaxis XML (application/xhtml+xml).1​2​ Esta es la primera vez que HTML y XHTML se han desarrollado en paralelo. La versión definitiva de la quinta revisión del estándar se publicó en octubre de 2014",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/w3_html5-icon.svg",
    },
    {
      nombre: "CSS3",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de diseño gráfico para definir y crear la presentación de un documento estructurado escrito en un lenguaje de marcado.2​ Es muy usado para establecer el diseño visual de los documentos web, e interfaces de usuario escritas en HTML o XHTML; el lenguaje puede ser aplicado a cualquier documento XML, incluyendo XHTML, SVG, XUL, RSS, etcétera. Te puede ayudar a crear tu propio sitio web. Junto con HTML y JavaScript, CSS es una tecnología usada por muchos sitios web para crear páginas visualmente atractivas, interfaces de usuario para aplicaciones web y GUIs para muchas aplicaciones móviles (como Firefox OS)",
      url_icono:
        "https://raw.githubusercontent.com/devicons/devicon/ac557d6ff33ff370a5db99f97aeab35ea5c67fbd/icons/css3/css3-original.svg",
    },
    {
      nombre: "PHP",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de programación de uso general que se adapta especialmente al desarrollo web.2​ Fue creado inicialmente por el programador danés-canadiense Rasmus Lerdorf en 1994.3​ En la actualidad, la implementación de referencia de PHP es producida por The PHP Group.4​ PHP originalmente significaba Personal Home Page (Página personal), pero ahora significa el inicialismon 1​ recursivo PHP: Hypertext Preprocessor.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/php-icon.svg",
    },
    {
      nombre: "Flutter",
      tipo: "desarrollo",
      descripcion:
        "Es un SDK de código fuente abierto de desarrollo de aplicaciones móviles creado por Google. Suele usarse para desarrollar interfaces de usuario para aplicaciones en Android, iOS y Web así como método primario para crear aplicaciones para Google Fuchsia",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/flutterio-icon.svg",
    },
    {
      nombre: "Mysql",
      tipo: "desarrollo",
      descripcion:
        "Es un sistema de gestión de bases de datos relacional desarrollado bajo licencia dual: Licencia pública general/Licencia comercial por Oracle Corporation y está considerada como la base de datos de código abierto más popular del mundo, y una de las más populares en general junto a Oracle y Microsoft SQL Server, todo para entornos de desarrollo web.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/mysql-7.svg",
    },
    {
      nombre: "golang",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de programación concurrente y compilado inspirado en la sintaxis de C, que intenta ser dinámico como Python y con el rendimiento de C o C++. Ha sido desarrollado por Google9​ y sus diseñadores iniciales fueron Robert Griesemer, Rob Pike y Ken Thompson. 10​ Actualmente está disponible en formato binario para los sistemas operativos Windows, GNU/Linux, FreeBSD y Mac OS X, pudiendo también ser instalado en estos y en otros sistemas mediante el código fuente.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/golang-official.svg",
    },
    {
      nombre: "graphql",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de consulta y manipulación de datos para APIs, y un entorno de ejecución para realizar consultas con datos existentes.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/graphql-icon.svg",
    },
    {
      nombre: "typescript",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases. Anders Hejlsberg, diseñador de C# y creador de Delphi y Turbo Pascal, ha trabajado en el desarrollo de TypeScript.1​ TypeScript es usado para desarrollar aplicaciones JavaScript que se ejecutarán en el lado del cliente o del servidor, o extensiones para programas (Node.js y Deno (software)).",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/typescriptlang-icon.svg",
    },
    {
      nombre: "jquery",
      tipo: "desarrollo",
      descripcion:
        "Es una biblioteca multiplataforma de JavaScript, creada inicialmente por John Resig, que permite simplificar la manera de interactuar con los documentos HTML, manipular el árbol DOM, manejar eventos, desarrollar animaciones y agregar interacción con la técnica AJAX a páginas web.1​ Fue presentada el 14 de enero de 2006 en el BarCamp NYC. De acuerdo a un análisis de la Web (realizado en 2017) JQuery es la biblioteca de JavaScript más utilizada, por un amplio margen.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/jquery-icon.svg",
    },
    {
      nombre: "bootstrap",
      tipo: "desarrollo",
      descripcion:
        "Es una biblioteca multiplataforma o conjunto de herramientas de código abierto para diseño de sitios y aplicaciones web. Contiene plantillas de diseño con tipografía, formularios, botones, cuadros, menús de navegación y otros elementos de diseño basado en HTML y CSS, así como extensiones de JavaScript adicionales. A diferencia de muchos frameworks web, solo se ocupa del desarrollo front-end.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/getbootstrap-icon.svg",
    },
    {
      nombre: "python",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de programación interpretado cuya filosofía hace hincapié en la legibilidad de su código.2​ Se trata de un lenguaje de programación multiparadigma, ya que soporta orientación a objetos, programación imperativa y, en menor medida, programación funcional. Es un lenguaje interpretado, dinámico y multiplataforma.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/python-icon.svg",
    },
    {
      nombre: "django",
      tipo: "desarrollo",
      descripcion:
        "Es un framework de desarrollo web de código abierto, escrito en Python, que respeta el patrón de diseño conocido como modelo–vista–controlador (MVC). Fue desarrollado en origen para gestionar varias páginas orientadas a noticias de la World Company de Lawrence, Kansas, y fue liberada al público bajo una licencia BSD en julio de 2005; el framework fue nombrado en alusión al guitarrista de jazz gitano Django Reinhardt.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/djangoproject-icon.svg",
    },
    {
      nombre: "mongodb",
      tipo: "desarrollo",
      descripcion:
        "Es un sistema de base de datos NoSQL, orientado a documentos y de código abierto.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/mongodb-icon.svg",
    },
    {
      nombre: "javascript",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos,2​ basado en prototipos, imperativo, débilmente tipado y dinámico.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/javascript.svg",
    },
    {
      nombre: "material-ui",
      tipo: "desarrollo",
      descripcion:
        "Es una biblioteca de código abierto que implementa el lenguaje visual de «materiales» de Google en sus componentes React. Ofrece la capacidad de combinar su biblioteca de interfaz de usuario, con el marco front-end de React.js.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/material-ui-1.svg",
    },
    {
      nombre: "rails",
      tipo: "desarrollo",
      descripcion:
        "También conocido como RoR o Rails, es un framework de aplicaciones web de código abierto escrito en el lenguaje de programación Ruby, siguiendo el paradigma del patrón Modelo Vista Controlador (MVC).",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/rails.svg",
    },
    {
      nombre: "figma",
      tipo: "desarrollo",
      descripcion:
        "es un programa que ofrece todas las herramientas necesarias para diseñar un proyecto. Sobre todo es ideal para crear interfaces de usuario tanto para web como para móvil. También permite crear prototipos,  generar código para el traspaso (hand-off) e ilustrar, aunque para esto último no es la mejor herramienta para ello.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/figma-1.svg",
    },
    {
      nombre: "dotnet",
      tipo: "desarrollo",
      descripcion:
        "Es un framework de Microsoft que hace un énfasis en la transparencia de redes, con independencia de plataforma de hardware y que permite un rápido desarrollo de aplicaciones. Basada en ella, la empresa intenta desarrollar una estrategia horizontal que integre sus productos, desde el sistema operativo hasta las herramientas de mercado.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/dotnet.svg",
    },
    {
      nombre: "sqlite",
      tipo: "desarrollo",
      descripcion:
        "es un sistema de gestión de bases de datos relacional compatible con ACID, contenida en una relativamente pequeña (~275 kiB)2​ biblioteca escrita en C. SQLite es un proyecto de dominio público1​ creado por D. Richard Hipp.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/sqlite-icon.svg",
    },
    {
      nombre: "android",
      tipo: "desarrollo",
      descripcion:
        "es el entorno de desarrollo integrado oficial para la plataforma Android. Fue anunciado el 16 de mayo de 2013 en la conferencia Google I/O, y reemplazó a Eclipse como el IDE oficial para el desarrollo de aplicaciones para Android. La primera versión estable fue publicada en diciembre de 2014.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/android.svg",
    },
    {
      nombre: "ionic",
      tipo: "desarrollo",
      descripcion:
        "Es una estructura tecnológica (Framework)  de código abierto que se utiliza en el desarrollo de aplicaciones móviles híbridas, es decir, se combinan el HTML5, CSS y JavaScript dando como resultado aplicaciones con una interfaz amigable e intuitiva para el usuario que luego se comercializan o descargan en plataformas como Android o IOs.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/ionicframework-icon.svg",
    },
    {
      nombre: "c++",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de programación diseñado en 1979 por Bjarne Stroustrup. La intención de su creación fue extender al lenguaje de programación C mecanismos que permiten la manipulación de objetos. En ese sentido, desde el punto de vista de los lenguajes orientados a objetos, C++ es un lenguaje híbrido.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/c%2B%2B.svg",
    },
    {
      nombre: "c",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de programación de propósito general2​:1 originalmente desarrollado por Dennis Ritchie entre 1969 y 1972 en los Laboratorios Bell,1​ como evolución del anterior lenguaje B, a su vez basado en BCPL.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/c.svg",
    },
    {
      nombre: "c#",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de programación orientado a objetos. Con este nuevo lenguaje se quiso mejorar con respecto de los dos lenguajes anteriores de los que deriva el C, y el C++.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/cs.svg",
    },
    {
      nombre: "java",
      tipo: "desarrollo",
      descripcion:
        "Es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez en 1995 por Sun Microsystems. Hay muchas aplicaciones y sitios web que no funcionarán, probablemente, a menos que tengan Java instalado y cada día se crean más. Java es rápido, seguro y fiable. ",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/java-icon.svg",
    },
    {
      nombre: "wordpress",
      tipo: "diseño",
      descripcion:
        "Es un sistema de gestión de contenidos ( en inglés, Content Management System o CMS) lanzado el 27 de mayo de 2003, enfocado a la creación de cualquier tipo de página web. Originalmente alcanzó una gran popularidad en la creación de blogs, para luego convertirse en una de las principales herramientas para la creación de páginas web comerciales",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/wordpress-blue.svg",
    },
    {
      nombre: "Adobe  XD",
      tipo: "diseño",
      descripcion:
        "Es un editor de gráficos vectoriales desarrollado y publicado por Adobe Inc para diseñar y crear un prototipo de la experiencia del usuario para páginas web y aplicaciones móviles. El software está disponible para MacOS y Windows.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/adobe-xd.svg",
    },
    {
      nombre: "Adobe Illustrator",
      tipo: "diseño",
      descripcion:
        "Es un editor de gráficos vectoriales en forma de taller de arte que trabaja sobre un tablero de dibujo, conocido como «mesa de trabajo» y está destinado a la creación artística de dibujo y pintura para ilustración, para crear y diseñar imágenes, sirve para editar entre otras cosas (ilustración como rama del arte digital aplicado a la ilustración técnica o el diseño gráfico, entre otros).",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/adobe-illustrator-cc.svg",
    },
    {
      nombre: "Adobe Premiere",
      tipo: "diseño",
      descripcion:
        "es un software de edición de video desarrollado por Adobe y publicado como parte de Adobe Creative Cloud. Está orientado a la edición de vídeos profesionales, mientras que su derivado, Adobe Premiere Elements, apunta al mercado de consumidores. Lanzado en 2003, luego de una reescritura de código, Adobe Premiere Pro es el sucesor de Adobe Premiere, originalmente lanzado en 1991, el cual contiene funciones más avanzadas.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/premiere-cc.svg",
    },
    {
      nombre: "Adobe Photoshop",
      tipo: "diseño",
      descripcion:
        "Es un editor de fotografías desarrollado por Adobe Systems Incorporated. Usado principalmente para el retoque de fotografías y gráficos, su nombre en español significa 'taller de fotos'. Es conocido mundialmente.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/photoshop-cc.svg",
    },
    {
      nombre: "Adobe After Effects",
      tipo: "diseño",
      descripcion:
        "Es una aplicación que tiene forma de estudio destinado para la creación o aplicación en una composición, así como realización de gráficos profesionales en movimiento y efectos especiales, que desde sus raíces han consistido básicamente en la superposición de capas. Adobe After Effects es uno de los softwares basados en línea de tiempo más potentes del mercado junto con Autodesk Combustion y Eyeon Fusion.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/after-effects-cc.svg",
    },
    {
      nombre: "Apollo",
      descripcion:
        "Apollo Client es una biblioteca de administración de estado integral para JavaScript que le permite administrar datos tanto locales como remotos con GraphQL. Se usa para buscar, almacenar en caché y modificar los datos de la aplicación, todo mientras actualiza automáticamente su interfaz de usuario.",
      url_icono:
        "https://raw.githubusercontent.com/Hachimanx9x/proyecto-web-threejs/master/min.io/iconos/apollographql-icon.svg",
    },
  ];
  let g = 0;
  for (let a = 0; a < arra.length; a++) {
    await insertDB.insertTools(arra[g]).then((result) => {
      console.log(`la herramienta ${arra[g].nombre} a sido agregada`);
      if (g === arra.length - 1) {
        res.json(result);
      }
      g++;
    });
  }
});
rutas.post("/crear/reunion", proToken, (req, res) => {
  let {
    proyec,
    fecha,
    hora,
    inicio,
    fin,
    duracion,
    descripcion,
    titulo,
  } = req.body;

  if (
    proyec != undefined &&
    fecha != undefined &&
    inicio != undefined &&
    fin != undefined
  ) {
    const hora1 = inicio.split(":");
    const hora2 = fin.split(":");
    let tem = parseInt(hora2[0]) - parseInt(hora1[0]);
    if (duracion === undefined) {
      if (tem < 1) {
        duracion = 1;
      } else {
        duracion = tem;
      }
    }
    if (hora === undefined) {
      hora = inicio;
    }
    if (titulo === undefined) {
      titulo = `Reunion del proyecto ${proyec}`;
    }
    if (descripcion === undefined) {
      descripcion = `Reunión asignado para la fecha ${fecha}`;
    }
    insertDB
      .crearreunion({ proyec, fecha, hora, duracion, descripcion, titulo })
      .then((resu) => {
        res.json(resu);
      })
      .catch((err) => res.json(err));
  } else {
    res.json({
      msj: "error de datos",
      obj: {
        proyec,
        fecha,
        hora,
        inicio,
        fin,
        duracion,
        descripcion,
        titulo,
      },
    });
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
