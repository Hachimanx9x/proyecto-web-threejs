const jwt = require("jsonwebtoken");
const promesa = require("../database");
const Query = require("./querys");
const LLAVE = "misecretos";
const env = require("../env");
const model = require("../models/models");
const chalk = require("chalk");

const funcionesDB = () => {
  console.log("funciones de la base de datos");
};
funcionesDB.obtenerToken = (body) => {
  return new Promise((res, rej) => {
    const { email, password } = body;

    if (email !== undefined && password !== undefined) {
      promesa.then((result) => {
        const { mariaDB, sqlite, vDB } = result;
        //console.log(vDB);
        if (vDB) {
          mariaDB.query(Query.login(body), (err, rows) => {
            if (!err) {
              // console.log(rows);
              if (rows[0] == null || rows.length == 0) {
                console.log("error en los datos ");
                rej({ msj: "Contraseña o correo equivocados" });
              } else {
                //console.log(rows);
                const token = jwt.sign({ rows }, LLAVE);
                //  console.log("token enviado");
                res({ token });
              }
            }
          });
        } else {
          sqlite.all(Query.login(body), (err, rows) => {
            if (!err) {
              // console.log(rows);
              if (rows[0] === null || rows.length === 0) {
                // console.log("error en los datos ")
                rej({ msj: "Contraseña o correo equivocados" });
              } else {
                //console.log(rows);
                const token = jwt.sign({ rows }, LLAVE);
                //  console.log("token enviado");
                res({ token });
              }
            }
          });
        }
      });
    } else {
      console.log("error datos indefinidos");
    }
  });
};

funcionesDB.obtenerusuarioid = async (body) => {
  return new Promise((res, rej) => {
    const { id } = body;
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.usuarioid(id), async (err, rows) => {
          if (!err) {
            res(rows[0]);
          } else {
            rej({ err });
          }
        });
      } else {
        sqlite.all(Query.usuarioid(id), (err, rows) => {
          if (!err) {
            res(rows[0]);
          } else {
            rej({ err });
          }
        });
      }
    });
  });
};
funcionesDB.obtenerunproyecto = (id) => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.obtenerunproyecto(id), async (err, rows) => {
          if (!err) {
            res(rows[0]);
          } else {
            rej({ err });
          }
        });
      } else {
        sqlite.all(Query.obtenerunproyecto(id), (err, rows) => {
          if (!err) {
            res(rows[0]);
          } else {
            rej({ err });
          }
        });
      }
    });
  });
};
funcionesDB.obtenerproyectoid = async (body) => {
  return new Promise((res, rej) => {
    const { id } = body;
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.proyectoid(id), async (err, rows) => {
          if (!err) {
            res(rows[0]);
          } else {
            rej({ err });
          }
        });
      } else {
        sqlite.all(Query.proyectoid(id), (err, rows) => {
          if (!err) {
            res(rows[0]);
          } else {
            rej({ err });
          }
        });
      }
    });
  });
};
funcionesDB.obtenerEscritorioActividades = async (body) => {
  return new Promise((res, rej) => {
    const { id } = body.rows[0];
    if (id !== undefined) {
      promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
          await mariaDB.query(
            Query.obtenerEscritorioActividades(id),
            async (err, rows) => {
              if (!err) {
                res({
                  actividades: ponercontenidoenactividades(rows),
                });
              } else {
                rej({ err });
              }
            }
          );
        } else {
          sqlite.all(Query.obtenerEscritorioActividades(id), (err, rows) => {
            if (!err) {
              res({
                actividades: ponercontenidoenactividades(rows),
              });
            } else {
              rej({ err });
            }
          });
        }
      });
    } //fin del i
  });
  // console.log(body.rows[0].persona);
};
funcionesDB.obtenerEscritorioProyectos = async (body) => {
  return new Promise((res, rej) => {
    const { id } = body.rows[0];
    if (id !== undefined) {
      promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
          mariaDB.query(
            Query.obtenerEscritorioProyectos(id),
            async (err, rows) => {
              if (!err) {
                res(rearmarProyectosescri(rows));
              } else {
                rej({ err });
              }
            }
          );
        } else {
          sqlite.all(Query.obtenerEscritorioProyectos(id), (err, rows) => {
            if (!err) {
              res(rearmarProyectosescri(rows));
            } else {
              rej({ err });
            }
          });
        }
      });
    } //fin del i
  });
  // console.log(body.rows[0].persona);
};

funcionesDB.obtenerdatosintgrantesdeproyecto = async (proyecto) => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(
          Query.obteneracticontinte(proyecto),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej({ err });
            }
          }
        );
      } else {
        sqlite.all(Query.obteneracticontinte(proyecto), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej({ err });
          }
        });
      }
    });
  });
};

funcionesDB.obtenerContactosUsuario = async (body) => {
  return new Promise((res, rej) => {
    const { id } = body.rows[0];
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        mariaDB.query(Query.buscarcontactosusuario(id), async (err, rows) => {
          if (!err) {
            res({ contactos: rearmarcontactos(rows) });
          } else {
            rej({ err });
          }
        });
      } else {
        sqlite.all(Query.buscarcontactosusuario(id), (err, rows) => {
          if (!err) {
            res({ contactos: rearmarcontactos(rows) });
          } else {
            rej({ err });
          }
        });
      }
    });
  });
};

funcionesDB.obtenerProyecto = async (body) => {
  return new Promise((res, rej) => {
    const { id } = body.rows[0];
    if (id !== undefined) {
      promesa.then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
          await mariaDB.query(Query.obtenerProyecto(id), (err, rows) => {
            if (!err) {
              res({ proyectos: obtenerproyectos(rows) });
            } else {
              rej({
                estado: "vulnerado",
                msj: "error interno no se como paso mis if",
              });
            }
          });
        } else {
          sqlite.all(Query.obtenerProyecto(id), (err, rows) => {
            if (!err) {
              res({ proyectos: obtenerproyectos(rows) });
            } else {
              rej({
                estado: "vulnerado",
                msj: "error interno no se como paso mis if",
              });
            }
          });
        }
      });
    }
  });
};

funcionesDB.buscarProyecto = async (idp) => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.buscarProyecto(idp), (err, rows) => {
          if (!err) {
            res({ proyectos: ordeninfoproyect(rows) });
          } else {
            rej({ err });
          }
        });
      } else {
        sqlite.all(Query.buscarProyecto(idp), (err, rows) => {
          if (!err) {
            res({ proyectos: ordeninfoproyect(rows) });
          } else {
            rej({ err });
          }
        });
      }
    });
  });
};
funcionesDB.buscartalentogeneral = async (idUser) => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.buscartalentos(), (err, rows, fields) => {
          if (!err) {
            const data = rearmas(idUser, rows);
            res({ data });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.buscartalentos(), (err, rows) => {
          if (!err) {
            const data = rearmas(idUser, rows);
            res({ data });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};

funcionesDB.buscartalentogeneral2 = async (idUser) => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.buscartalentos(), (err, rows, fields) => {
          if (!err) {
            const data = rearmas2(idUser, rows);
            res({ data });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.buscartalentos(), (err, rows) => {
          if (!err) {
            const data = rearmas2(idUser, rows);
            res({ data });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
funcionesDB.buscarusuariocontatelento = async (idp) => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.buscarcontactosusuariotalento(idp),
          (err, rows) => {
            if (!err) {
              res(filtarinfo(rows));
            } else {
              rej({ err });
            }
          }
        );
      } else {
        sqlite.all(Query.buscarcontactosusuariotalento(idp), (err, rows) => {
          if (!err) {
            res(filtarinfo(rows));
          } else {
            rej({ err });
          }
        });
      }
    });
  });
};
funcionesDB.buscareventoscalendario = async (idUser) => {
  return new Promise((res, rej) => {
    //console.log(idUser)
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenercalendario(idUser),
          (err, rows, fields) => {
            if (!err) {
              res(organizarcalendario(rows));
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenercalendario(idUser), (err, rows) => {
          if (!err) {
            res(organizarcalendario(rows));
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
funcionesDB.buscareventoscalendarioproyecto = async (proyecto) => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenercalendarioproyecto(proyecto),
          (err, rows, fields) => {
            if (!err) {
              res(organizarcalendario(rows));
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenercalendarioproyecto(proyecto), (err, rows) => {
          if (!err) {
            res(organizarcalendario(rows));
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
funcionesDB.buscaractividadesproyecto = async (user, id) => {
  console.log(user, id);
  return new Promise((res, rej) => {
    //console.log(idUser)
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenerproyectosactividadescompleto(id),
          async (err, rows) => {
            if (!err) {
              await mariaDB.query(
                Query.obtenerproyectoentregablescompleto(id),
                (err2, rows2) => {
                  if (!err) {
                    res({
                      actividades: actividadespro(user, rows, id),
                      entregables: entregablepro(rows2),
                    });
                  } else {
                    rej(err2);
                  }
                }
              );
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(
          Query.obtenerproyectosactividadescompleto(id),
          (err, rows) => {
            if (!err) {
              sqlite.all(
                Query.obtenerproyectoentregablescompleto(id),
                (err, rows2) => {
                  if (!err) {
                    res({
                      actividades: actividadespro(user, rows, id),
                      entregables: entregablepro(rows2),
                    });
                  } else {
                    rej(err2);
                  }
                }
              );
            } else {
              rej(err);
            }
          }
        );
      }
    });
  });
};

funcionesDB.obteneractientreproyectos = (array) => {
  return new Promise((res, rej) => {
    // console.log(array);
    for (let i = 0; i < array.length; i++) {
      funcionesDB
        .buscaractividadesproyecto(1, array[i].id)
        .then((contenido) => {
          /// actividad y entregable
          let arraydef = [];
          for (let j1 = 0; j1 < contenido.actividades.length; j1++) {
            if (
              contenido.actividades[j1].namefile !== null &&
              contenido.actividades[j1].namefile !== "null"
            ) {
              console.log(
                chalk.red(
                  `Actividad ${contenido.actividades[j1].nombre} con el contenido: `
                ) + chalk.blue(`${contenido.actividades[j1].namefile}`)
              );
              arraydef.push({
                userName: contenido.actividades[j1].nombre,
                projectName: array[i].title,
                activity: contenido.actividades[j1].titulo,
                date: contenido.actividades[j1].fechaentrega,
                fileName: contenido.actividades[j1].namefile,
                fileUrl: `${env.host}/proyecto/contenido/proyecto${array[i].id}/${contenido.actividades[j1].namefile}`,
              });
            }
          }
          //`${env.host}/proyecto/contenido/proyecto${array[a].proid}/${array[a].contenidonombrearchivo}`
          for (let j2 = 0; j2 < contenido.entregables.length; j2++) {
            if (
              contenido.entregables[j2].namefile !== null &&
              contenido.entregables[j2].namefile !== "null"
            ) {
              arraydef.push({
                userName: "general",
                projectName: array[i].title,
                activity: contenido.entregables[j2].nombre,
                date: contenido.entregables[j2].fechaentrega,
                fileName: contenido.entregables[j2].namefile,
                fileUrl: `${env.host}/proyecto/contenido/proyecto${array[i].id}/${contenido.entregables[j2].namefile}`,
              });
            }
          }
          console.log("entre");
          array[i].updates = arraydef;
          if (i >= array.length - 1) {
            res(array);
          }
        })
        .catch((err) => rej(err));
    }
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
funcionesDB.obtenerintegranteconrol = async (integrante) => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenerintegrantyrol(integrante),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenerintegrantyrol(integrante), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//-----------------------------------------------------
funcionesDB.obtenertodasIdiomas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.obtenertodasIdiomas(), async (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.obtenertodasIdiomas(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//----------------------------------------------------------
funcionesDB.obtenertodasHabilidades = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasHabilidades(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasHabilidades(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasherramientas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasHerramientas(),
          async (err, rows) => {
            if (!err) {
              res({ API: ponerurlherramientas(rows) });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasHerramientas(), (err, rows) => {
          if (!err) {
            res({ API: ponerurlherramientas(rows) });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasUsuarios = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.obtenertodasUsuarios(), async (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.obtenertodasUsuarios(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasPalabrasClave = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasPalabrasClave(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasPalabrasClave(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaidiomas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaidiomas(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaidiomas(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasContactos = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasContactos(),
          async (err, rows) => {
            if (!err) {
              res({ herramientas: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasContactos(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaContactos = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaContactos(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaContactos(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaHabilidades = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaHabilidades(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaHabilidades(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaHerramientas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaHerramientas(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaHerramientas(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasMetodologias = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasMetodologias(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasMetodologias(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasPracticas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasPracticas(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasPracticas(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListasPracticas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListasPracticas(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListasPracticas(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasAlfas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.obtenertodasAlfas(), async (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.obtenertodasAlfas(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaAlfas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaAlfas(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaAlfas(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasHerramientasMetodologia = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasHerramientasMetodologia(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasHerramientasMetodologia(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasTecnicas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.obtenertodasTecnicas(), async (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.obtenertodasTecnicas(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasActividades = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasActividades(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasActividades(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasRoles = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.obtenertodasRoles(), async (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.obtenertodasRoles(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaRoles = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaRoles(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaRoles(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasIntegrantes = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasIntegrantes(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasIntegrantes(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenerActividad = async (id) => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.obtenerActividades(id), async (err, rows) => {
          if (!err) {
            res(rows[0]);
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.obtenerActividades(id), (err, rows) => {
          if (!err) {
            res(rows[0]);
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
funcionesDB.obtenertodasListaActividades = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaActividades(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaActividades(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasContenidos = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasContenidos(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasContenidos(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasEntregables = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasEntregables(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasEntregables(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaentregables = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaentregables(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaentregables(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaHerramientasMetodologia = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaHerramientasMetodologia(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(
          Query.obtenertodasListaHerramientasMetodologia(),
          (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaContenidos = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaContenidos(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaContenidos(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasEntregas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.obtenertodasEntregas(), async (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.obtenertodasEntregas(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasChats = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.obtenertodasChats(), async (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.obtenertodasChats(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasHistoriales = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasHistoriales(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasHistoriales(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaChats = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaChats(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaChats(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasProyectos = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasProyectos(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasProyectos(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasReuniones = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasReuniones(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasReuniones(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaReuniones = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaReuniones(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaReuniones(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaEntregas = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaEntregas(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaEntregas(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasEventos = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.obtenertodasEventos(), async (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.obtenertodasEventos(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaEventos = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaEventos(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaEventos(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenertodasListaIntegrantes = async () => {
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(
          Query.obtenertodasListaIntegrantes(),
          async (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          }
        );
      } else {
        sqlite.all(Query.obtenertodasListaIntegrantes(), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenerunrol = async (obj) => {
  const { id } = obj;
  return new Promise((res, rej) => {
    promesa.then(async (result) => {
      const { mariaDB, sqlite, vDB } = result;
      if (vDB) {
        await mariaDB.query(Query.obtenerunrol(id), async (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      } else {
        sqlite.all(Query.obtenerunrol(id), (err, rows) => {
          if (!err) {
            res({ API: rows });
          } else {
            rej(err);
          }
        });
      }
    });
  });
};
//---------------------------------------------------------
funcionesDB.obtenerentreactividad = async (actividad) => {
  return new Promise((res, rej) => {
    promesa
      .then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
          mariaDB.query(
            Query.obtenerentregableconactividad(actividad),
            async (err, rows) => {
              if (!err) {
                res({ API: rows });
              } else {
                rej(err);
              }
            }
          );
        } else {
          sqlite.all(
            Query.obtenerentregableconactividad(actividad),
            (err, rows) => {
              if (!err) {
                res({ API: rows });
              } else {
                rej(err);
              }
            }
          );
        }
      })
      .catch((err) => rej(err));
  });
};

funcionesDB.obtenerentreentregable = (entregable) => {
  return new Promise((res, rej) => {
    promesa
      .then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
          mariaDB.query(
            Query.obtenerentreconcotenido(entregable),
            async (err, rows) => {
              if (!err) {
                res({ API: rows });
              } else {
                rej(err);
              }
            }
          );
        } else {
          sqlite.all(Query.obtenerentreconcotenido(entregable), (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          });
        }
      })
      .catch((err) => rej(err));
  });
};

funcionesDB.obtenerentredeproyectoconconte = (proyecto) => {
  return new Promise((res, rej) => {
    promesa
      .then(async (result) => {
        const { mariaDB, sqlite, vDB } = result;
        if (vDB) {
          mariaDB.query(
            Query.obtenerentregcontinte(proyecto),
            async (err, rows) => {
              if (!err) {
                res({ API: rows });
              } else {
                rej(err);
              }
            }
          );
        } else {
          sqlite.all(Query.obtenerentregcontinte(proyecto), (err, rows) => {
            if (!err) {
              res({ API: rows });
            } else {
              rej(err);
            }
          });
        }
      })
      .catch((err) => rej(err));
  });
};

//-------------------
function rearmarProyectosescri(array) {
  var arraydef = [];
  var idproyecto = null;
  var proyectonombre = null;
  var practicas = [];
  var practicanombre = null;
  var alfas = [];
  var alfanombre = null,
    alfaestado = null;

  let proyectos = [];
  /*
  for (var i = 0; i < array.length; i++) {
    if (idproyecto != array[i].id) {
      idproyecto = array[i].id;
      proyectonombre = array[i].proyectonombre;
      arraydef.push({ idproyecto, proyectonombre, practicas });
    }
  }*/

  for (var i = 0; i < array.length; i++) {
    if (idproyecto != array[i].id) {
      idproyecto = array[i].id;
      let icon = null,
        image = null;
      if (array[i].proyectoicon !== "null" && array[i].proyectoicon !== null) {
        icon = `${env.host}/proyecto/contenido/proyecto${array[i].id}/${array[i].proyectoicon}`;
      }
      if (
        array[i].proyectobanner !== "null" &&
        array[i].proyectobanner !== null
      ) {
        image = `${env.host}/proyecto/contenido/proyecto${array[i].id}/${array[i].proyectobanner}`;
      }
      proyectos.push({
        id: array[i].id,
        title: array[i].proyectonombre,
        descripcion: array[i].proyectodescripcion,
        practicas: [],
        icon,
        image,
        updates: [],
      });
    }
  }
  proyectos = quitarduplicados(proyectos);
  //  console.log(arraydef)
  /*for (var i = 0; i < arraydef.length; i++) {
    let practicasinter = [];
    for (var j = 0; j < array.length; j++) {
      if (arraydef[i].idproyecto == array[j].id) {
        if (practicanombre != array[j].practicanombre) {
          practicanombre = array[j].practicanombre;
          practicasinter.push({ practicanombre, alfas });
        }
      }
    }
    let set = new Set(practicasinter.map(JSON.stringify));
    practicasinter = Array.from(set).map(JSON.parse);
    arraydef[i].practicas = practicasinter;
  }*/
  //console.log(arraydef[0].practicas)
  for (var i = 0; i < proyectos.length; i++) {
    for (var j = 0; j < array.length; j++) {
      if (proyectos[i].id == array[j].id) {
        proyectos[i].practicas.push({
          practica: array[j].practicanombre,
          porcentaje: 0,
        });
      }
      proyectos[i].practicas = quitarduplicados(proyectos[i].practicas);
    }
  }
  /*
  for (var i = 0; i < arraydef.length; i++) {
    for (var j = 0; j < arraydef[i].practicas.length; j++) {
      var alfastemp = [];
      for (var k = 0; k < array.length; k++) {
        if (
          arraydef[i].practicas[j].practicanombre == array[k].practicanombre
        ) {
          if (alfanombre != array[k].alfanombre) {
            // console.log("cambio");
            //  console.log(arraydef[i].practicas[j].practicanombre);
            let temp = 0;

            if (array[k].practicanombre == "Sistema Multimedia mínimo viable") {
              if (
                array[k].alfanombre == "Oportunidad" ||
                array[k].alfanombre == "Valor del sistema multimedia"
              ) {
                if (array[k].alfaestado == "iniciado") {
                  temp = 0;
                }
                if (array[k].alfaestado == "Alcanzable") {
                  temp = 25;
                }
                if (array[k].alfaestado == "Diferenciado") {
                  temp = 50;
                }
                if (array[k].alfaestado == "Visionado") {
                  temp = 75;
                }
                if (array[k].alfaestado == "Definido") {
                  temp = 100;
                }
              }
            }
            if (
              array[k].practicanombre ==
              "Concepción de la experiencia multimedia"
            ) {
              if (
                array[k].alfanombre == "Experiencia multimedia" ||
                array[k].alfanombre == "Diseño responsable"
              ) {
                if (array[k].alfaestado == "iniciado") {
                  temp = 0;
                }
                if (array[k].alfaestado == "Identificado") {
                  temp = 25;
                }
                if (array[k].alfaestado == "Comprendido") {
                  temp = 50;
                }
                if (array[k].alfaestado == "Acordado") {
                  temp = 75;
                }
                if (array[k].alfaestado == "Concebido") {
                  temp = 100;
                }
              }
            }
            alfanombre = array[k].alfanombre;
            alfaestado = array[k].alfaestado;
            alfastemp.push({ alfanombre, alfaestado, porcentaje: temp });
            // arraydef[i].practicas[j].alfas.push({ alfanombre, alfaestado })
          }
        }
      }
      let set = new Set(alfastemp.map(JSON.stringify));
      alfastemp = Array.from(set).map(JSON.parse);
      arraydef[i].practicas[j].alfas = alfastemp;
    }
  }*/
  for (var i = 0; i < proyectos.length; i++) {
    for (var j = 0; j < proyectos[i].practicas.length; j++) {
      for (var k = 0; k < array.length; k++) {
        if (proyectos[i].practicas[j].practica == array[k].practicanombre) {
          let temp = 0,
            temp1 = 0,
            por;
          if (array[k].practicanombre == "Sistema Multimedia mínimo viable") {
            if (array[k].alfanombre == "Valor del sistema multimedia") {
              if (array[k].alfaestado == "iniciado") {
                temp = 0;
              }
              if (array[k].alfaestado == "Alcanzable") {
                temp = 25;
              }
              if (array[k].alfaestado == "Diferenciado") {
                temp = 50;
              }
              if (array[k].alfaestado == "Visionado") {
                temp = 75;
              }
              if (array[k].alfaestado == "Definido") {
                temp = 100;
              }
            }
          }
          if (
            array[k].practicanombre == "Concepción de la experiencia multimedia"
          ) {
            if (array[k].alfanombre == "Diseño responsable") {
              if (array[k].alfaestado == "iniciado") {
                temp1 = 0;
              }
              if (array[k].alfaestado == "Identificado") {
                temp1 = 25;
              }
              if (array[k].alfaestado == "Comprendido") {
                temp1 = 50;
              }
              if (array[k].alfaestado == "Acordado") {
                temp1 = 75;
              }
              if (array[k].alfaestado == "Concebido") {
                temp1 = 100;
              }
            }
          }
          if (temp == 0) {
            por = temp1;
          } else if (temp1 == 0) {
            por = temp;
          } else {
            por = parseInt(temp / temp1, 10);
          }

          proyectos[i].practicas[j].porcentaje = por;
        }
      }
    }
  }

  //console.log(arraydef[0].practicas[0].alfas[0]);
  return { proyectos: proyectos };
}
function rearmas(idUser, rows) {
  //   console.log(idUser);
  //console.log(rows);

  var array = [];

  for (var i = 0; i < rows.length; i++) {
    // console.log(rows[i].id);
    if (rows[i].id !== idUser) {
      //   console.log(`${rows[i].id} || ${idUser}`)
      array.push(rows[i]);
    }
  }

  var tempid;
  var defarray = [];

  for (var i = 0; i < array.length; i++) {
    defarray.push({
      userid: array[i].id,
      nombre: array[i].nombre,
      foto: `${env.host}/proyecto/contenido/usuario${array[i].id}/${array[i].fotoperfil}`,
      descripcion: array[i].descripcion,
      herramientas: [],
      palabras: [],
    });
  }
  let setx = new Set(defarray.map(JSON.stringify));
  defarray = Array.from(setx).map(JSON.parse);
  //console.log(model)
  var herramientatemp,
    herramientemp = [];
  for (var i = 0; i < defarray.length; i++) {
    for (var j = 0; j < array.length; j++) {
      if (defarray[i].userid === array[j].id) {
        if (herramientatemp != array[j].herramientanombre) {
          herramientatemp = array[j].herramientanombre;
          herramientemp.push({
            nombre: array[j].herramientanombre,
            descripcion: array[j].herramientadescripcion,
            icono: array[j].herramientanombreIcono,
          });
        }
      }
    }

    //  defarray[i].herramientas = Array.from(new Set(herramientemp));
    let set4 = new Set(herramientemp.map(JSON.stringify));
    defarray[i].herramientas = Array.from(set4).map(JSON.parse);
    herramientemp = [];
  }
  var palabratemp;
  var palaarray = [];
  for (var i = 0; i < defarray.length; i++) {
    for (var j = 0; j < array.length; j++) {
      if (defarray[i].userid === array[j].id) {
        if (palabratemp != array[j].palabra) {
          palaarray.push(array[j].palabra);
          palabratemp = array[j].palabra;
        }
      }
    }

    defarray[i].palabras = Array.from(new Set(palaarray));
    palaarray = [];
  }
  // console.log(defarray);
  return defarray;
}
function rearmas2(idUser, rows) {
  //   console.log(idUser);
  //console.log(rows);
  var array = [];
  var cont = 0;
  for (var i = 0; i < rows.length; i++) {
    // console.log(rows[i].id);
    if (rows[i].id === idUser) {
      array[cont] = rows[i];
      cont += 1;
    }
  }
  var tempid;
  var defarray = [];
  var model = {
    userid: null,
    nombre: null,
    descripcion: null,
    herramientas: [],
    palabras: [],
  };
  for (var i = 0; i < array.length; i++) {
    if (tempid != array[i].id) {
      tempid = array[i].id;
      model.userid = tempid;
      model.nombre = array[i].nombre;
      model.descripcion = array[i].descripcion;
      defarray.push(model);
    }
  }
  var herramientatemp,
    herramientemp = [];
  for (var i = 0; i < defarray.length; i++) {
    for (var j = 0; j < array.length; j++) {
      if (defarray[i].userid === array[j].id) {
        if (herramientatemp != array[j].herramientanombre) {
          herramientatemp = array[j].herramientanombre;
          herramientemp.push({
            nombre: array[j].herramientanombre,
            descripcion: array[j].herramientadescripcion,
            icono: array[j].herramientanombreIcono,
          });
        }
      }
    }

    //  defarray[i].herramientas = Array.from(new Set(herramientemp));
    let set4 = new Set(herramientemp.map(JSON.stringify));
    defarray[i].herramientas = Array.from(set4).map(JSON.parse);
    herramientemp = [];
  }
  var palabratemp;
  var palaarray = [];
  for (var i = 0; i < defarray.length; i++) {
    for (var j = 0; j < array.length; j++) {
      if (defarray[i].userid === array[j].id) {
        if (palabratemp != array[j].palabra) {
          palaarray.push(array[j].palabra);
          palabratemp = array[j].palabra;
        }
      }
    }

    defarray[i].palabras = Array.from(new Set(palaarray));
    palaarray = [];
  }
  // console.log(defarray);
  return defarray;
}
function rearmarcontactos(array) {
  let arraydef = [];
  let iduser;
  let palabras = [];
  let herramientas = [];
  // console.log(array)
  for (var i = 0; i < array.length; i++) {
    if (iduser != array[i].id) {
      let temf = null;
      if (array[i].fotoperfil !== null && array[i].fotoperfil !== "null") {
        temf = `${env.host}/proyecto/contenido/usuario${array[i].id}/${array[i].fotoperfil}`;
      }
      arraydef.push({
        iduser: array[i].id,
        idcontac: array[i].conid,
        nombre: array[i].nombre,
        descripcion: array[i].descripcion,
        foto: temf,
        palabras,
        herramientas,
        preferencia: array[i].preferencias,
      });
      iduser = array[i].id;
    }
  }
  for (var i = 0; i < arraydef.length; i++) {
    var palabratemp;
    var temparray = [];
    for (var j = 0; j < array.length; j++) {
      if (arraydef[i].iduser == array[j].id) {
        if (palabratemp != array[j].palabra) {
          temparray.push(array[j].palabra);
          palabratemp = array[j].palabra;
        }
      }
    }
    arraydef[i].palabras = quitarduplicados(temparray);
    temparray = [];
  }
  for (let i = 0; i < arraydef.length; i++) {
    let herramientatem;
    let tempherra = [];
    for (let j = 0; j < array.length; j++) {
      if (arraydef[i].iduser == array[j].id) {
        if (herramientatem !== array[j].herrid) {
          tempherra.push({
            id: array[j].herrid,
            nombre: array[j].herramientanombre,
            descripcion: array[j].herramientadescripcion,
            icono: array[j].herramientanombreIcono,
          });
          herramientatem = array[j].herrid;
        }
      }
    }
    arraydef[i].herramientas = quitarduplicados(tempherra);
    tempherra = [];
  }

  // console.log(arraydef);
  return arraydef;
}
function obtenerproyectos(array) {
  var arraydef = [];
  var idproyecto;
  for (var i = 0; i < array.length; i++) {
    if (idproyecto != array[i].id) {
      idproyecto = array[i].id;

      let ptemf = null,
        ptemf2 = null;
      if (array[i].proyectoicon !== null && array[i].proyectoicon !== null) {
        ptemf = `${env.host}/proyecto/contenido/proyecto${array[i].id}/${array[i].proyectoicon}`;
      }
      if (
        array[i].proyectobanner !== null &&
        array[i].proyectobanner !== null
      ) {
        ptemf2 = `${env.host}//proyecto/contenido/proyecto${array[i].id}/${array[i].proyectobanner}`;
      }
      arraydef.push({
        idproyecto,
        pronombre: array[i].proyectonombre,
        prodescripcion: array[i].proyectodescripcion,
        estado: array[i].proyectoestado,
        icono: ptemf,
        banner: ptemf2,
      });
    }
  }
  return arraydef;
}
function ponercontenidoenactividades(array) {
  // console.log(array)
  var arraydef = [];
  var acttemp;
  for (var i = 0; i < array.length; i++) {
    if (acttemp != array[i].actividadtitulo) {
      arraydef.push({
        proyecto: array[i].id,
        usuario: array[i].nombre,
        actividadid: array[i].actividadid,
        actividad: array[i].actividadtitulo,
        descripcion: array[i].actividaddescripcion,
        estado: array[i].actividadestado,
        entrega: array[i].actividadfechaentrega,
        contenido: {
          nombre: array[i].contenidonombrearchivo,
          url: `${env.host}/proyecto/contenido/proyecto${array[i].id}/${array[i].contenidonombrearchivo}`,
        },
      });
    }
  }
  return arraydef;
}
function organizarcalendario(array) {
  let arraydef = [];

  for (let a = 0; a < array.length; a++) {
    let temfecha = array[a].reunionfecha.split("-");
    let strfecha = `${temfecha[0]}/${temfecha[1]}/${temfecha[2]} ${array[a].reunionhora}`;
    let date1 = new Date(strfecha);
    let fecha = `${date1.getDay()}/${date1.getDate()}/${date1.getFullYear()}`;
    let start = `${date1.getDay()}/${date1.getDate()}/${date1.getFullYear()} ${date1.getHours()}:${date1.getMinutes()}:00`;
    date1.setHours(date1.getHours() + array[a].reuniondurancion);
    let end = `${date1.getDay()}/${date1.getDate()}/${date1.getFullYear()} ${date1.getHours()}:${date1.getMinutes()}:00`;
    arraydef.push({
      proyecto: array[a].proyectoid,
      pronombre: array[a].proyectonombre,
      reunion: array[a].reunionid,
      titulo: array[a].reuniontitulo,
      fecha: fecha,
      hora: array[a].reunionhora,
      duracion: array[a].reuniondurancion,
      start: start,
      end: end,
      descripcion: array[a].reuniondescripcion,
      vigente: array[a].vigente,
    });
  }
  return arraydef;
}
function filtarinfo(array) {
  let arraydef = [];
  let userid;
  let palabraid;
  let palabras = [];
  let herramientaid;
  let herramientas = [];
  let habilidadid;
  let habilidades = [];

  for (let a = 0; a < array.length; a++) {
    if (userid != array[a].userid) {
      userid = array[a].userid;
      arraydef.push({
        id: userid,
        nombre: array[a].nombre,
        descripcion: array[a].descripcion,
        fotoperfil: array[a].fotoperfil,
        experiencia: array[a].anosdeexperiencia,
        cv: `${env.host}/proyecto/contenido/usuario${userid}/${array[a].nombrearchivohojadevida}`,
        pais: array[a].pais,
        github: array[a].github,
        gitlab: array[a].gitlab,
        bitbucket: array[a].bitbucket,
        linkedin: array[a].linkedin,
        palabras,
        herramientas,
        habilidades,
      });
    }
  }

  let tb;
  let temb = 1;
  for (let a = 0; a < arraydef.length; a++) {
    tb = temb;
    for (tb; tb < arraydef.length; tb++) {
      if (arraydef[a].id == arraydef[tb].id) {
        arraydef.palabras.splice(tb, 1);
      }
    }
    temb++;
  }

  for (let a = 0; a < arraydef.length; a++) {
    for (let b = 0; b < array.length; b++) {
      if (arraydef[a].id === array[b].userid) {
        if (palabraid != array[b].wordid) {
          palabraid = array[b].wordid;
          arraydef[a].palabras.push(array[b].palabra);
        }
      }
    }
    let set0 = new Set(arraydef[a].palabras.map(JSON.stringify));
    arraydef[a].palabras = Array.from(set0).map(JSON.parse);
  }
  for (let a = 0; a < arraydef.length; a++) {
    for (let b = 0; b < array.length; b++) {
      if (arraydef[a].id == array[b].userid) {
        if (herramientaid != array[b].toolsid) {
          herramientaid = array[b].toolsid;
          arraydef[a].herramientas.push({
            id: array[b].toolsid,
            nombre: array[b].herramientanombre,
            descripcion: array[b].herramientadescripcion,
            icono: array[b].herramientanombreIcono,
          });
        }
      }
    }
    let set1 = new Set(arraydef[a].herramientas.map(JSON.stringify));
    arraydef[a].herramientas = Array.from(set1).map(JSON.parse);
  }
  for (let a = 0; a < arraydef.length; a++) {
    for (let b = 0; b < array.length; b++) {
      if (arraydef[a].id == array[b].userid) {
        if (habilidadid != array[b].abilityid) {
          habilidadid = array[b].abilityid;
          arraydef[a].habilidades.push({
            id: array[b].abilityid,
            tipo: array[b].habilidadtipo,
            descripcion: array[b].habilidaddescripcion,
            nivel: array[b].habilidadnivel,
          });
        }
      }
    }
    let set2 = new Set(arraydef[a].habilidades.map(JSON.stringify));
    arraydef[a].habilidades = Array.from(set2).map(JSON.parse);
    let d = 1;
    let temnum = 1;
  }
  return arraydef;
}

function actividadespro(user, array, id) {
  let arraydef = [];
  for (let a = 0; a < array.length; a++) {
    // console.log(array[a].userid)
    /*  if (user.id === array[a].userid) {
      arraydef.push({
        actividadid: array[a].actid,
        titulo: array[a].actividadtitulo,
        descripcion: array[a].actividaddescripcion,
        revisiones: array[a].actividadrevision,
        nombre: array[a].nombre,
        rol: array[a].roltitulo,
        estado: array[a].actividadestado,
        fechaentrega: array[a].actividadfechaentrega,
        tecnica: array[a].tecnicatitulo,
        contenido: `${env.host}/proyecto/contenido/proyecto${id}/${array[a].contenidonombrearchivo}`,
        entregar: true,
      });
    } else {
      arraydef.push({
        actividadid: array[a].actid,
        titulo: array[a].actividadtitulo,
        descripcion: array[a].actividaddescripcion,
        revisiones: array[a].actividadrevision,
        nombre: array[a].nombre,
        rol: array[a].roltitulo,
        estado: array[a].actividadestado,
        fechaentrega: array[a].actividadfechaentrega,
        tecnica: array[a].tecnicatitulo,
        contenido: `${env.host}/proyecto/contenido/proyecto${id}/${array[a].contenidonombrearchivo}`,
        entregar: false,
      });
    }*/
    let temp = null,
      temp2 = null;
    if (array[a].contenidonombrearchivo !== "null") {
      temp = array[a].contenidonombrearchivo;
    }
    if (array[a].fotoperfil !== "null" && array[a].fotoperfil !== null) {
      temp2 = `${env.host}/proyecto/contenido/usuario${array[a].userid}/${array[a].fotoperfil}`;
    }
    let temfecha = array[a].actividadfechaentrega.split("-");
    let strfecha = `${temfecha[0]}/${temfecha[1]}/${temfecha[2]}`;
    let date1 = new Date(strfecha);
    let fecha = `${date1.getDay()}/${date1.getDate()}/${date1.getFullYear()}`;
    arraydef.push({
      actividadid: array[a].actid,
      titulo: array[a].actividadtitulo,
      descripcion: array[a].actividaddescripcion,
      revisiones: array[a].actividadrevision,
      nombre: array[a].nombre,
      foto: temp2,
      rol: array[a].roltitulo,
      estado: array[a].actividadestado,
      fechaentrega: fecha,
      tecnica: array[a].tecnicatitulo,
      namefile: temp,
      contenido: `${env.host}/proyecto/contenido/proyecto${array[a].id}/${temp}`,
    });
  }
  return arraydef;
}

function entregablepro(array) {
  let arraydef = [];
  for (let a = 0; a < array.length; a++) {
    let temp = null;
    if (array[a].contenidonombrearchivo !== "null") {
      temp = array[a].contenidonombrearchivo;
    }
    arraydef.push({
      id: array[a].entrid,
      nombre: array[a].entregatitulo,
      descripcion: array[a].entregadescripcion,
      estado: array[a].entregaestado,
      tipoactivo: array[a].entregatipoArchivo,
      fechaentrega: array[a].entregafechaEntrega,
      revisiones: array[a].entreganumeroRevisiones,
      namefile: temp,
      contenido: `${env.host}/proyecto${array[a].id}/${temp}`,
    });
  }
  return arraydef;
}
function ponerurlherramientas(array) {
  let arraydef = [];
  for (let a = 0; a < array.length; a++) {
    arraydef.push({
      id: array[a].id,
      nombre: array[a].herramientanombre,
      tipo: array[a].herramientatipo,
      descripcion: array[a].herramientadescripcion,
      icono: array[a].herramientanombreIcono,
    });
  }
  return arraydef;
}
function ordeninfoproyect(rows) {
  let objdef = {
    idproyecto: null,
    nombre: null,
    descripcion: null,
    estado: null,
    icono: null,
    banner: null,
    integrantes: [],
    actividades: [],
    entregable: [],
    practicas: [],
  };

  for (let a = 0; a < rows.length; a++) {
    objdef.idproyecto = rows[a].idproyecto;
    objdef.nombre = rows[a].proyectonombre;
    objdef.descripcion = rows[a].proyectodescripcion;
    objdef.estado = rows[a].proyectoestado;
    let temp1p = null,
      temp2p = null,
      temp3p = null;
    if (rows[a].proyectoicon !== null && rows[a].proyectoicon !== "null") {
      temp1p = `${env.host}/proyecto/contenido/proyecto${rows[a].idproyecto}/${rows[a].proyectoicon}`;
    }
    if (rows[a].proyectobanner !== null && rows[a].proyectobanner !== "null") {
      temp2p = `${env.host}/proyecto/contenido/proyecto${rows[a].idproyecto}/${rows[a].proyectobanner}`;
    }
    if (rows[a].fotoperfil !== null && rows[a].fotoperfil !== "null") {
      temp3p = `${env.host}/proyecto/contenido/usuario${rows[a].interid}/${rows[a].fotoperfil}`;
    }
    objdef.icono = temp1p;
    objdef.banner = temp2p;

    objdef.integrantes.push({
      id: rows[a].interid,
      foto: temp3p,
      nombre: rows[a].nombre,
      rol: rows[a].roltitulo,
      palabras: [],
    });
    objdef.actividades.push({
      id: rows[a].actiid,
      nombre: rows[a].actividadtitulo,
      estado: rows[a].actividadestado,
    });
    objdef.entregable.push({
      id: rows[a].entreid,
      estado: rows[a].entregaestado,
    });
    let tealfname = rows[a].alfanombre;
    if (rows[a].alfanombre === "Valor del sistema multimedia") {
      tealfname = "Valor del SM";
    }
    objdef.practicas.push({
      nombre: rows[a].practicanombre,
      descripcion: rows[a].pradescrip,
      alfa: {
        nombre: tealfname,
        estado: rows[a].alfaestado,
      },
    });
  }
  let set0 = new Set(objdef.integrantes.map(JSON.stringify));
  objdef.integrantes = Array.from(set0).map(JSON.parse);
  for (let a = 0; a < objdef.integrantes.length; a++) {
    for (let b = 0; b < rows.length; b++) {
      if (objdef.integrantes[a].id === rows[b].interid) {
        objdef.integrantes[a].palabras.push(rows[b].palabra);
      }
    }
    objdef.integrantes[a].palabras = Array.from(
      new Set(objdef.integrantes[a].palabras.map(JSON.stringify))
    ).map(JSON.parse);
  }

  let set1 = new Set(objdef.actividades.map(JSON.stringify));
  objdef.actividades = Array.from(set1).map(JSON.parse);

  let set2 = new Set(objdef.entregable.map(JSON.stringify));
  objdef.entregable = Array.from(set2).map(JSON.parse);

  let practicas = [];
  let alfas = [];
  for (let b = 0; b < objdef.practicas.length; b++) {
    practicas.push({
      nombre: objdef.practicas[b].nombre,
      descripcion: objdef.practicas[b].descripcion,
      alfas,
      tasa: 0,
    });
  }

  let set3 = new Set(practicas.map(JSON.stringify));
  practicas = Array.from(set3).map(JSON.parse);

  for (let c = 0; c < practicas.length; c++) {
    for (let b = 0; b < objdef.practicas.length; b++) {
      if (practicas[c].nombre === objdef.practicas[b].nombre) {
        practicas[c].alfas.push(objdef.practicas[b].alfa);
      }
      if (practicas[c].nombre === "Sistema Multimedia mínimo viable") {
        practicas[c].alfas.push({
          nombre: "Oportunidad",
          estado: objdef.practicas[b].alfa.estado,
        });
      }
    }
    let set4 = new Set(practicas[c].alfas.map(JSON.stringify));
    practicas[c].alfas = Array.from(set4).map(JSON.parse);
  }

  for (let c = 0; c < practicas.length; c++) {
    let tasatem = 0;
    let acti = 0;
    for (let d = 0; d < model.Practicas.length; d++) {
      if (practicas[c].nombre === model.Practicas[d].nombre) {
        acti = model.Practicas[d].Actividades.length;
        for (let e = 0; e < model.Practicas[d].Actividades.length; e++) {
          for (let f = 0; f < objdef.actividades.length; f++) {
            if (
              model.Practicas[d].Actividades[e].titulo ===
              objdef.actividades[f].nombre
            ) {
              if (objdef.actividades[f].estado !== "asignada") {
                tasatem++;
              }
            }
          }
        }
      }
    }
    practicas[c].tasa = (tasatem / acti) * 100;
  }

  objdef.practicas = practicas;

  return objdef;
}
function cambionombrealfa(obj) {}
function quitarduplicados(array) {
  return Array.from(new Set(array.map(JSON.stringify))).map(JSON.parse);
}
//-------------------
module.exports = funcionesDB;
