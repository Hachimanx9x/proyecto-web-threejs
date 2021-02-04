const jwt = require('jsonwebtoken');
const promesa = require('../database');
const Query = require('./querys');
const LLAVE = 'misecretos';
const env = require('../env');
const model = require('../models/models')
const chalk = require('chalk');
const funcionesDB = () => {
    console.log("funciones de la base de datos")
}
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
                                console.log("error en los datos ")
                                rej({ respuesta: "no encontrado" });
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
                            if (rows[0] == null || rows.length == 0) {
                                console.log("error en los datos ")
                                rej({ respuesta: "no encontrado" });
                            } else {
                                //console.log(rows); 
                                const token = jwt.sign({ rows }, LLAVE);
                                //  console.log("token enviado");           
                                res({ token });
                            }
                        }
                    });
                }
            })
        } else {
            console.log('error datos indefinidos')
        }
    });
}


funcionesDB.obtenerusuarioid = async (body) => {
    return new Promise((res, rej) => {
        const { id } = body
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.usuarioid(id), async (err, rows) => {
                    if (!err) { res(rows[0]); } else { rej({ err }) }
                })
            }
            else {
                sqlite.all(Query.usuarioid(id), (err, rows) => {
                    if (!err) { res(rows[0]); } else { rej({ err }) }
                });
            }
        })
    });

}

funcionesDB.obtenerproyectoid = async (body) => {
    return new Promise((res, rej) => {
        const { id } = body
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.proyectoid(id), async (err, rows) => {
                    if (!err) { res(rows[0]); } else { rej({ err }) }
                })
            }
            else {
                sqlite.all(Query.proyectoid(id), (err, rows) => {
                    if (!err) { res(rows[0]); } else { rej({ err }) }
                });
            }
        })
    });

}
funcionesDB.obtenerEscritorioActividades = async (body) => {
    return new Promise((res, rej) => {
        const { id } = body.rows[0];
        if (id !== undefined) {
            promesa.then(async (result) => {
                const { mariaDB, sqlite, vDB } = result;
                if (vDB) {
                    await mariaDB.query(Query.obtenerEscritorioActividades(id), async (err, rows) => {
                        if (!err) {
                            res({
                                actividades: ponercontenidoenactividades(rows)
                            });

                        } else {
                            rej({ err })
                        }

                    });
                } else {
                    sqlite.all(Query.obtenerEscritorioActividades(id), (err, rows) => {
                        if (!err) {
                            res({
                                actividades: ponercontenidoenactividades(rows)
                            });

                        } else {
                            rej({ err })
                        }
                    });
                }
            });
        }//fin del i
    })
    // console.log(body.rows[0].persona);
}
funcionesDB.obtenerEscritorioProyectos = async (body) => {
    return new Promise((res, rej) => {
        const { id } = body.rows[0];
        if (id !== undefined) {
            promesa.then(async (result) => {
                const { mariaDB, sqlite, vDB } = result;
                if (vDB) {
                    mariaDB.query(Query.obtenerEscritorioProyectos(id), async (err, rows) => {
                        if (!err) {
                            res(rearmarProyectosescri(rows));
                        } else { rej({ err }) }
                    })
                } else {
                    sqlite.all(Query.obtenerEscritorioProyectos(id), (err, rows) => {
                        if (!err) { res(rearmarProyectosescri(rows)); } else { rej({ err }) }
                    });
                }
            });
        }//fin del i
    })
    // console.log(body.rows[0].persona);
}

funcionesDB.obtenerdatosintgrantesdeproyecto = async (proyecto) => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.obteneracticontinte(proyecto), async (err, rows) => {
                    if (!err) { res({ API: rows }); } else { rej({ err }) }
                })
            }
            else {
                sqlite.all(Query.obteneracticontinte(proyecto), (err, rows) => {
                    if (!err) { res({ API: rows }); } else { rej({ err }) }
                });
            }
        })
    });

}


funcionesDB.obtenerContactosUsuario = async (body) => {
    return new Promise((res, rej) => {
        const { id } = body.rows[0];
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.buscarcontactosusuario(id), async (err, rows) => {
                    if (!err) { res({ contactos: rearmarcontactos(rows) }); } else { rej({ err }) }
                })
            }
            else {
                sqlite.all(Query.buscarcontactosusuario(id), (err, rows) => {
                    if (!err) { res({ contactos: rearmarcontactos(rows) }); } else { rej({ err }) }
                });
            }
        })
    });

}


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
                                msj: "error interno no se como paso mis if"
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
                                msj: "error interno no se como paso mis if"
                            });
                        }
                    });
                }
            });
        }
    });
}

funcionesDB.buscarProyecto = async (idp) => {

    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.buscarProyecto(idp), (err, rows) => {
                    if (!err) {
                        res({ proyectos: ordeninfoproyect(rows) });
                    } else {
                        rej({ err })
                    }
                });
            } else {
                sqlite.all(Query.buscarProyecto(idp), (err, rows) => {
                    if (!err) {
                        res({ proyectos: ordeninfoproyect(rows) });
                    } else {
                        rej({ err })
                    }
                });
            }
        });
    });
}
funcionesDB.buscartalentogeneral = async (idUser) => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.buscartalentos(), (err, rows, fields) => {
                    if (!err) {
                        const data = rearmas(idUser, rows)
                        res({ data });

                    } else { rej(err) }
                });
            } else {
                sqlite.all(Query.buscartalentos(), (err, rows) => {
                    if (!err) {

                        const data = rearmas(idUser, rows)
                        res({ data });
                    } else { rej(err) }
                });
            }
        });
    });
}

funcionesDB.buscartalentogeneral2 = async (idUser) => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.buscartalentos(), (err, rows, fields) => {
                    if (!err) {
                        const data = rearmas2(idUser, rows)
                        res({ data });

                    } else { rej(err) }
                });
            } else {
                sqlite.all(Query.buscartalentos(), (err, rows) => {
                    if (!err) {

                        const data = rearmas2(idUser, rows)
                        res({ data });
                    } else { rej(err) }
                });
            }
        });
    });
}
funcionesDB.buscarusuariocontatelento = async (idp) => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.buscarcontactosusuariotalento(idp), (err, rows) => {
                    if (!err) {
                        res(filtarinfo(rows));
                    } else {
                        rej({ err })
                    }
                });
            } else {
                sqlite.all(Query.buscarcontactosusuariotalento(idp), (err, rows) => {
                    if (!err) {
                        res(filtarinfo(rows));
                    } else {
                        rej({ err })
                    }
                });
            }
        });
    });
}
funcionesDB.buscareventoscalendario = async (idUser) => {
    return new Promise((res, rej) => {
        //console.log(idUser)
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenercalendario(idUser), (err, rows, fields) => {
                    if (!err) {
                        res(organizarcalendario(rows))

                    } else { rej(err) }
                });
            } else {
                sqlite.all(Query.obtenercalendario(idUser), (err, rows) => {
                    if (!err) {
                        res(organizarcalendario(rows))
                    } else { rej(err) }
                });
            }
        });
    });
}
funcionesDB.buscareventoscalendarioproyecto = async (proyecto) => {
    return new Promise((res, rej) => {

        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenercalendarioproyecto(proyecto), (err, rows, fields) => {
                    if (!err) {
                        res(organizarcalendario(rows))

                    } else { rej(err) }
                });
            } else {
                sqlite.all(Query.obtenercalendarioproyecto(proyecto), (err, rows) => {
                    if (!err) {
                        res(organizarcalendario(rows))
                    } else { rej(err) }
                });
            }
        });
    });
}
funcionesDB.buscaractividadesproyecto = async (user, id) => {
    return new Promise((res, rej) => {
        //console.log(idUser)
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenerproyectosactividadescompleto(id), async (err, rows) => {
                    if (!err) {

                        await mariaDB.query(Query.obtenerproyectoentregablescompleto(id), (err2, rows2) => {
                            if (!err) {
                                res({
                                    actividades: actividadespro(user, rows, id),
                                    entregables: entregablepro(rows2)
                                });

                            } else { rej(err2) }
                        });
                    } else { rej(err) }
                });
            } else {
                sqlite.all(Query.obtenerproyectosactividadescompleto(id), (err, rows) => {
                    if (!err) {
                        sqlite.all(Query.obtenerproyectoentregablescompleto(id), (err, rows2) => {
                            if (!err) {
                                res({
                                    actividades: actividadespro(user, rows, id),
                                    entregables: entregablepro(rows2)
                                })
                            } else { rej(err2) }
                        });
                    } else { rej(err) }
                });
            }
        });
    });
}
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
                await mariaDB.query(Query.obtenerintegrantyrol(integrante), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenerintegrantyrol(integrante), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//-----------------------------------------------------
funcionesDB.obtenertodasIdiomas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasIdiomas(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasIdiomas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });

}
//----------------------------------------------------------
funcionesDB.obtenertodasHabilidades = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasHabilidades(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasHabilidades(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });

}
//---------------------------------------------------------
funcionesDB.obtenertodasherramientas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasHerramientas(), async (err, rows) => {
                    if (!err) {
                        res({ API: ponerurlherramientas(rows) });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasHerramientas(), (err, rows) => {
                    if (!err) {
                        res({ API: ponerurlherramientas(rows) });
                    } else { rej(err) }
                });
            }
        })
    });

}
//---------------------------------------------------------
funcionesDB.obtenertodasUsuarios = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasUsuarios(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasUsuarios(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });

}
//---------------------------------------------------------
funcionesDB.obtenertodasPalabrasClave = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasPalabrasClave(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasPalabrasClave(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaidiomas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaidiomas(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaidiomas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasContactos = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasContactos(), async (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasContactos(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaContactos = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaContactos(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaContactos(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaHabilidades = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaHabilidades(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaHabilidades(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaHerramientas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaHerramientas(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaHerramientas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasMetodologias = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasMetodologias(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasMetodologias(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasPracticas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasPracticas(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasPracticas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListasPracticas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListasPracticas(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListasPracticas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasAlfas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasAlfas(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasAlfas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaAlfas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaAlfas(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaAlfas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasHerramientasMetodologia = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasHerramientasMetodologia(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasHerramientasMetodologia(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasTecnicas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasTecnicas(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasTecnicas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasActividades = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasActividades(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasActividades(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasRoles = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasRoles(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasRoles(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaRoles = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaRoles(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaRoles(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasIntegrantes = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasIntegrantes(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasIntegrantes(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaActividades = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaActividades(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaActividades(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasContenidos = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasContenidos(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasContenidos(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasEntregables = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasEntregables(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasEntregables(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaentregables = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaentregables(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaentregables(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaHerramientasMetodologia = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaHerramientasMetodologia(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaHerramientasMetodologia(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaContenidos = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaContenidos(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaContenidos(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasEntregas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasEntregas(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasEntregas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasChats = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasChats(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasChats(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasHistoriales = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasHistoriales(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasHistoriales(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaChats = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaChats(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaChats(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasProyectos = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasProyectos(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasProyectos(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasReuniones = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasReuniones(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasReuniones(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaReuniones = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaReuniones(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaReuniones(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaEntregas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaEntregas(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaEntregas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasEventos = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasEventos(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasEventos(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaEventos = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaEventos(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaEventos(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenertodasListaIntegrantes = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasListaIntegrantes(), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaIntegrantes(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenerunrol = async (obj) => {
    const { id } = obj
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenerunrol(id), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {

                sqlite.all(Query.obtenerunrol(id), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//---------------------------------------------------------
funcionesDB.obtenerentreactividad = async (actividad) => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.obtenerentregableconactividad(actividad), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            } else {
                sqlite.all(Query.obtenerentregableconactividad(actividad), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        }).catch(err => rej(err))
    })
}

funcionesDB.obtenerentreentregable = (entregable) => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.obtenerentreconcotenido(entregable), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenerentreconcotenido(entregable), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        }).catch(err => rej(err))
    })
}

funcionesDB.obtenerentredeproyectoconconte = (proyecto) => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.obtenerentregcontinte(proyecto), async (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenerentregcontinte(proyecto), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
        }).catch(err => rej(err))
    })
}

//-------------------
function rearmarProyectosescri(array) {

    var arraydef = [];
    var idproyecto = null
    var proyectonombre = null
    var practicas = []
    var practicanombre = null;
    var alfas = [];
    var alfanombre = null, alfaestado = null;


    for (var i = 0; i < array.length; i++) {

        if (idproyecto != array[i].id) {
            idproyecto = array[i].id;
            proyectonombre = array[i].proyectonombre;
            arraydef.push({ idproyecto, proyectonombre, practicas });
        }
    }
    //  console.log(arraydef)
    for (var i = 0; i < arraydef.length; i++) {
        let practicasinter = []
        for (var j = 0; j < array.length; j++) {
            if (arraydef[i].idproyecto == array[j].id) {
                if (practicanombre != array[j].practicanombre) {
                    practicanombre = array[j].practicanombre;
                    practicasinter.push({ practicanombre, alfas });
                }
            }
        }
        let set = new Set(practicasinter.map(JSON.stringify))
        practicasinter = Array.from(set).map(JSON.parse);
        arraydef[i].practicas = practicasinter;
    }
    //console.log(arraydef[0].practicas)

    for (var i = 0; i < arraydef.length; i++) {
        for (var j = 0; j < arraydef[i].practicas.length; j++) {
            var alfastemp = [];
            for (var k = 0; k < array.length; k++) {

                if (arraydef[i].practicas[j].practicanombre == array[k].practicanombre) {
                    if (alfanombre != array[k].alfanombre) {
                        // console.log("cambio");
                        //  console.log(arraydef[i].practicas[j].practicanombre);
                        alfanombre = array[k].alfanombre;
                        alfaestado = array[k].alfaestado;
                        alfastemp.push({ alfanombre, alfaestado });
                        // arraydef[i].practicas[j].alfas.push({ alfanombre, alfaestado })
                    }
                }
            }
            let set = new Set(alfastemp.map(JSON.stringify))
            alfastemp = Array.from(set).map(JSON.parse);
            arraydef[i].practicas[j].alfas = alfastemp;
        }
    }


    //console.log(arraydef[0].practicas[0].alfas[0]);
    return { proyectos: arraydef }
}
function rearmas(idUser, rows) {
    //   console.log(idUser);
    //console.log(rows);
    var array = [];
    var cont = 0;
    for (var i = 0; i < rows.length; i++) {
        // console.log(rows[i].id);
        if (rows[i].id !== idUser) {
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
        palabras: []
    }
    for (var i = 0; i < array.length; i++) {
        if (tempid != array[i].id) {
            tempid = array[i].id;
            model.userid = tempid
            model.nombre = array[i].nombre;
            model.descripcion = array[i].descripcion;
            defarray.push(model);
        }
    }
    var herramientatemp, herramientemp = [];
    for (var i = 0; i < defarray.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (defarray[i].userid === array[j].id) {
                if (herramientatemp != array[j].herramientanombre) {
                    herramientatemp = array[j].herramientanombre
                    herramientemp.push({
                        nombre: array[j].herramientanombre,
                        descripcion: array[j].herramientadescripcion,
                        icono: array[j].herramientanombreIcono
                    })
                }
            }
        }

        //  defarray[i].herramientas = Array.from(new Set(herramientemp));
        let set4 = new Set(herramientemp.map(JSON.stringify))
        defarray[i].herramientas = Array.from(set4).map(JSON.parse);
        herramientemp = [];
    }
    var palabratemp; var palaarray = [];
    for (var i = 0; i < defarray.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (defarray[i].userid === array[j].id) {
                if (palabratemp != array[j].palabra) {
                    palaarray.push(array[j].palabra)
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
        palabras: []
    }
    for (var i = 0; i < array.length; i++) {
        if (tempid != array[i].id) {
            tempid = array[i].id;
            model.userid = tempid
            model.nombre = array[i].nombre;
            model.descripcion = array[i].descripcion;
            defarray.push(model);
        }
    }
    var herramientatemp, herramientemp = [];
    for (var i = 0; i < defarray.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (defarray[i].userid === array[j].id) {
                if (herramientatemp != array[j].herramientanombre) {
                    herramientatemp = array[j].herramientanombre
                    herramientemp.push({
                        nombre: array[j].herramientanombre,
                        descripcion: array[j].herramientadescripcion,
                        icono: array[j].herramientanombreIcono
                    })
                }
            }
        }

        //  defarray[i].herramientas = Array.from(new Set(herramientemp));
        let set4 = new Set(herramientemp.map(JSON.stringify))
        defarray[i].herramientas = Array.from(set4).map(JSON.parse);
        herramientemp = [];
    }
    var palabratemp; var palaarray = [];
    for (var i = 0; i < defarray.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (defarray[i].userid === array[j].id) {
                if (palabratemp != array[j].palabra) {
                    palaarray.push(array[j].palabra)
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
    var arraydef = [];
    var iduser;
    var palabras = [];

    for (var i = 0; i < array.length; i++) {
        if (iduser != array[i].id) {

            arraydef.push({
                iduser: array[i].id,
                nombre: array[i].nombre,
                palabras,
                preferencia: array[i].preferencias
            })
            iduser = array[i].id
        }
    }
    for (var i = 0; i < arraydef.length; i++) {
        var palabratemp; var temparray = [];
        for (var j = 0; j < array.length; j++) {
            if (arraydef[i].iduser == array[j].id) {
                if (palabratemp != array[j].palabra) {
                    temparray.push(array[j].palabra);
                    palabratemp = array[j].palabra;
                }
            }
        }
        arraydef[i].palabras = temparray;
        temparray = [];
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
            arraydef.push({
                idproyecto,
                pronombre: array[i].proyectonombre,
                prodescripcion: array[i].proyectodescripcion,
                estado: array[i].proyectoestado,
                icono: `${env.host}/proyecto/contenido/proyecto${array[i].id}/${array[i].proyectoicon}`,
                banner: `${env.host}//proyecto/contenido/proyecto${array[i].id}/${array[i].proyectobanner}`
            })
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
                    nombre: array[i].contenidonombre,
                    url: `${env.host}/proyecto/contenido/proyecto${array[i].id}/${array[i].contenidonombrearchivo}`
                }
            })
        }
    }
    return arraydef;
}
function organizarcalendario(array) {
    let arraydef = [];

    for (let a = 0; a < array.length; a++) {
        arraydef.push({
            proyecto: array[a].proyectoid,
            pronombre: array[a].proyectonombre,
            reunion: array[a].reunionid,
            titulo: array[a].reuniontitulo,
            fecha: array[a].reunionfecha,
            hora: array[a].reunionhora,
            duracion: array[a].reuniondurancion,
            descripcion: array[a].reuniondescripcion,
            vigente: array[a].vigente

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
                habilidades
            })
        }
    }

    let tb; let temb = 1
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
        let set0 = new Set(arraydef[a].palabras.map(JSON.stringify))
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
                        icono: array[b].herramientanombreIcono
                    })
                }
            }
        }
        let set1 = new Set(arraydef[a].herramientas.map(JSON.stringify))
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
                        nivel: array[b].habilidadnivel
                    });
                }
            }
        }
        let set2 = new Set(arraydef[a].habilidades.map(JSON.stringify))
        arraydef[a].habilidades = Array.from(set2).map(JSON.parse);
        let d = 1; let temnum = 1;

    }
    return arraydef;
}

function actividadespro(user, array, id) {
    let arraydef = []
    for (let a = 0; a < array.length; a++) {
        // console.log(array[a].userid)
        if (user.id === array[a].userid) {
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
                entregar: true
            })
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
                entregar: false
            })
        }

    }
    return arraydef;
}

function entregablepro(array) {
    let arraydef = []
    for (let a = 0; a < array.length; a++) {
        arraydef.push({
            id: array[a].entrid,
            nombre: array[a].entregatitulo,
            descripcion: array[a].entregadescripcion,
            estado: array[a].entregaestado,
            tipoactivo: array[a].entregatipoArchivo,
            fechaentrega: array[a].entregafechaEntrega,
            revisiones: array[a].entreganumeroRevisiones,
            contenido: `${env.host}/proyecto/contenido/proyecto${array[a].proid}/${array[a].contenidonombrearchivo}`

        })
    }
    return arraydef;
}
function ponerurlherramientas(array) {
    let arraydef = []
    for (let a = 0; a < array.length; a++) {
        arraydef.push({
            id: array[a].id,
            nombre: array[a].herramientanombre,
            tipo: array[a].herramientatipo,
            descripcion: array[a].herramientadescripcion,
            icono: `${env.host}/proyecto/contenido/default/${array[a].herramientanombreIcono}`
        })
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
        practicas: []

    }

    for (let a = 0; a < rows.length; a++) {
        objdef.idproyecto = rows[a].idproyecto;
        objdef.nombre = rows[a].proyectonombre;
        objdef.descripcion = rows[a].proyectodescripcion;
        objdef.estado = rows[a].proyectoestado;
        objdef.icono = `${env.host}/proyecto/contenido/proyecto${rows[a].idproyecto}/${rows[a].proyectoicon}`;
        objdef.banner = `${env.host}/proyecto/contenido/proyecto${rows[a].idproyecto}/${rows[a].proyectobanner}`;
        objdef.integrantes.push({ id: rows[a].interid, nombre: rows[a].nombre, rol: rows[a].roltitulo });
        objdef.actividades.push({ id: rows[a].actiid, nombre: rows[a].actividadtitulo, estado: rows[a].actividadestado });
        objdef.entregable.push({ id: rows[a].entreid, estado: rows[a].entregaestado });
        objdef.practicas.push({
            nombre: rows[a].practicanombre, alfa: {
                nombre: rows[a].alfanombre, estado: rows[a].alfaestado
            }
        })
    }
    let set0 = new Set(objdef.integrantes.map(JSON.stringify))
    objdef.integrantes = Array.from(set0).map(JSON.parse);

    let set1 = new Set(objdef.actividades.map(JSON.stringify))
    objdef.actividades = Array.from(set1).map(JSON.parse);

    let set2 = new Set(objdef.entregable.map(JSON.stringify))
    objdef.entregable = Array.from(set2).map(JSON.parse);

    let practicas = []
    let alfas = []
    for (let b = 0; b < objdef.practicas.length; b++) {
        practicas.push({ nombre: objdef.practicas[b].nombre, alfas, tasa: 0 });
    }
    let set3 = new Set(practicas.map(JSON.stringify))
    practicas = Array.from(set3).map(JSON.parse);

    for (let c = 0; c < practicas.length; c++) {
        for (let b = 0; b < objdef.practicas.length; b++) {
            if (practicas[c].nombre === objdef.practicas[b].nombre) {
                practicas[c].alfas.push(objdef.practicas[b].alfa)
            }
            if (practicas[c].nombre === "Sistema Multimedia mínimo viable") {
                practicas[c].alfas.push({
                    nombre: "Oportunidad", estado: objdef.practicas[b].alfa.estado
                })
            }
        }
        let set4 = new Set(practicas[c].alfas.map(JSON.stringify))
        practicas[c].alfas = Array.from(set4).map(JSON.parse);
    }

    for (let c = 0; c < practicas.length; c++) {
        let tasatem = 0; let acti = 0
        for (let d = 0; d < model.Practicas.length; d++) {
            if (practicas[c].nombre === model.Practicas[d].nombre) {
                acti = model.Practicas[d].Actividades.length
                for (let e = 0; e < model.Practicas[d].Actividades.length; e++) {
                    for (let f = 0; f < objdef.actividades.length; f++) {
                        if (model.Practicas[d].Actividades[e].titulo === objdef.actividades[f].nombre) {
                            if (objdef.actividades[f].estado !== "asignada") {
                                tasatem++
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
//-------------------
module.exports = funcionesDB;