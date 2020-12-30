const jwt = require('jsonwebtoken');
const promesa = require('../database');
const Query = require('./querys');
const LLAVE = 'misecretos';
const minio = require('../ftp/peticiones')
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
                        res({ data: rows });
                    } else {
                        rej({ err })
                    }
                });
            } else {
                sqlite.all(Query.obtenerProyecto(idp), (err, rows) => {
                    if (!err) {
                        res({ proyectos: rows });
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

//-----------------------------------------------------
funcionesDB.obtenertodasIdiomas = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                await mariaDB.query(Query.obtenertodasIdiomas(), async (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasIdiomas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasHabilidades(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasHerramientas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasUsuarios(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasPalabrasClave(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaidiomas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaContactos(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaHabilidades(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaHerramientas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasMetodologias(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasPracticas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListasPracticas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasAlfas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaAlfas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasHerramientasMetodologia(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasTecnicas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasActividades(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasRoles(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaRoles(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasIntegrantes(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaActividades(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasContenidos(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasEntregables(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaentregables(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaHerramientasMetodologia(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaContenidos(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasEntregas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasChats(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasHistoriales(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaChats(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasProyectos(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasReuniones(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaReuniones(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaEntregas(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaEventos(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
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
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasListaIntegrantes(), (err, rows) => {
                    if (!err) {
                        res({ herramientas: rows });
                    } else { rej(err) }
                });
            }
        })
    });
}
//-------------------
function rearmarProyectosescri (array) {
    var arraydef = [];


    var idproyecto = null
    var proyectonombre = null
    var practicas = []
    var practicanombre = null;
    var alfas = [];
    var alfanombre = null, alfaestado = null;

    for (var i = 0; i < array.length; i++) {
        console.log
        if (idproyecto != array[i].id) {
            idproyecto = array[i].id;
            proyectonombre = array[i].proyectonombre;
            arraydef.push({ idproyecto, proyectonombre, practicas });
        }
    }
    //console.log(arraydef)
    for (var i = 0; i < arraydef.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (arraydef[i].idproyecto == array[j].id) {
                if (practicanombre != array[j].practicanombre) {
                    practicanombre = array[j].practicanombre;
                    arraydef[i].practicas.push({ practicanombre, alfas });
                }
            }
        }

    }
    //console.log(arraydef[0].practicas)
    var alfastemp = [];
    for (var i = 0; i < arraydef.length; i++) {
        for (var j = 0; j < arraydef[i].practicas.length; j++) {
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
            arraydef[i].practicas[j].alfas = alfastemp
            alfastemp = [];
        }
    }


    //console.log(arraydef[0].practicas[0].alfas[0]);
    return { proyectos: arraydef }
}

function rearmas (idUser, rows) {
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
        defarray[i].herramientas = Array.from(new Set(herramientemp));
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

function rearmarcontactos (array) {
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


function obtenerproyectos (array) {
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
                icono: `http://localhost:3030/proyecto/contenido/proyecto${array[i].id}/${array[i].proyectoicon}`,
                banner: `http://localhost:3030/proyecto/contenido/proyecto${array[i].id}/${array[i].proyectobanner}`
            })
        }
    }
    return arraydef;
}

function ponercontenidoenactividades (array) {
    var arraydef = [];
    var acttemp;
    for (var i = 0; i < array.length; i++) {
        if (acttemp != array[i].actividadtitulo) {
            arraydef.push({
                proyecto: array[i].id,
                usuario: array[i].nombre,
                actividad: array[i].actividadtitulo,
                descripcion: array[i].actividaddescripcion,
                estado: array[i].actividadestado,
                entrega: array[i].actividadfechaentrega,
                contenido: {
                    nombre: array[i].contenidonombre,
                    url: `http://localhost:3030/proyecto/contenido/proyecto${array[i].id}/${array[i].contenidonombrearchivo}`
                }
            })
        }
    }
    return arraydef;

}


//-------------------
module.exports = funcionesDB;

