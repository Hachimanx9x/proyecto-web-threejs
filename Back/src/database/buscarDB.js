const jwt = require('jsonwebtoken');
const promesa = require('../database');
const Query = require('./querys');
const LLAVE = 'misecretos';
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
                                    actividades: actividadespro(user, rows),
                                    entregables: rows2
                                });

                            } else { rej(err2) }
                        });
                    } else { rej(err) }
                });
            } else {
                sqlite.all(Query.obtenerproyectosactividadescompleto(id), (err, rows) => {
                    if (!err) {
                        sqlite.all(Query.obtenerproyectosactividadescompleto(id), (err, rows2) => {
                            if (!err) {
                                res({
                                    actividades: actividadespro(user, rows),
                                    entregables: rows2
                                })
                            } else { rej(err2) }
                        });
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
                        res({ API: rows });
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
                        res({ API: rows });
                    } else { rej(err) }
                });
            }
            else {
                sqlite.all(Query.obtenertodasHerramientas(), (err, rows) => {
                    if (!err) {
                        res({ API: rows });
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
                icono: `http://localhost:3030/proyecto/contenido/proyecto${array[i].id}/${array[i].proyectoicon}`,
                banner: `http://localhost:3030/proyecto/contenido/proyecto${array[i].id}/${array[i].proyectobanner}`
            })
        }
    }
    return arraydef;
}
function ponercontenidoenactividades(array) {
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
function organizarcalendario(array) {
    let arraydef = [];
    let proyectoid;
    let reunionid;
    let actividadid;
    let entregaid;
    let reuniones = [];
    let actividades = [];
    let entregas = [];

    for (let i = 0; i < array.length; i++) {
        if (proyectoid != array[i].proyectoid) {
            proyectoid = array[i].proyectoid;
            arraydef.push({
                proyectoid,
                reuniones,
                actividades,
                entregas
            })
        }
    }
    for (let i = 0; i < arraydef.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (arraydef[i].proyectoid == array[j].proyectoid) {
                if (reunionid != array[j].reunionid) {
                    reunionid = array[j].reunionid
                    arraydef[i].reuniones.push({
                        reunionid,
                        titulo: array[j].reuniontitulo,
                        descripcion: array[j].reuniondescripcion,
                        fecha: array[j].reunionfecha,
                        hora: array[j].reunionhora,
                        duracion: array[j].reuniondurancion,
                        vigente: array[j].vigente
                    })
                }
            }
        }
    }
    for (let i = 0; i < arraydef.length; i++) {
        var temparra = []
        for (let j = 0; j < array.length; j++) {
            if (arraydef[i].proyectoid == array[j].proyectoid) {
                if (actividadid != array[j].actividadesid) {
                    actividadid = array[j].actividadesid
                    temparra.push({
                        actividadid,
                        titulo: array[j].actividadtitulo,
                        descripcion: array[j].actividaddescripcion,
                        fechaentrega: array[j].actividadfechaentrega,
                        estado: array[j].actividadestado
                    })
                }
            }
        }
        let l = 1;
        for (let k = 0; k < temparra.length; k++) {
            for (l; l < temparra.length; l++) {
                if (temparra[k].actividadid == temparra[l].actividadid) {
                    temparra.splice(l, 1);
                }
            }
            l++;
        }
        arraydef[i].actividades = temparra;
        temparra = [];
    }


    for (let i = 0; i < arraydef.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (arraydef[i].proyectoid == array[j].proyectoid) {
                if (entregaid != array[j].entregaid) {
                    entregaid = array[j].entregaid
                    arraydef[i].entregas.push({
                        entregaid,
                        titulo: array[j].entregatitulo,
                        descripcion: array[j].entregadescripcion,
                        fechaentrega: array[j].entregafechaEntrega,
                        estado: array[j].entregaestado
                    })
                }
            }
        }
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
                cv: `http://localhost:3030/default/${array[a].nombrearchivohojadevida}`,
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
        let d = 1; let temnum = 1;
        for (let c = 0; c < arraydef[a].palabras.length; c++) {
            d = temnum;
            for (d; d < arraydef[a].palabras.length; d++) {
                if (arraydef[a].palabras[c] == arraydef[a].palabras[d]) {
                    arraydef[a].palabras.splice(d, 1);
                }
            }
            temnum++;
        }
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
        let d = 1; let temnum = 1;

        for (let c = 0; c < arraydef[a].herramientas.length; c++) {
            d = temnum;
            for (d; d < arraydef[a].herramientas.length; d++) {
                if (arraydef[a].herramientas[c].id == arraydef[a].herramientas[d].id) {
                    console.log(c + " | " + d)
                    console.log(arraydef[a].herramientas[c].id + " | " + arraydef[a].herramientas[d].id);
                    arraydef[a].herramientas.splice(d, 1);

                }

            }
            temnum++;
        }
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
        let d = 1; let temnum = 1;
        for (let c = 0; c < arraydef[a].habilidades.length; c++) {
            d = temnum;
            for (d; d < arraydef[a].habilidades.length; d++) {
                if (arraydef[a].habilidades[c].id == arraydef[a].habilidades[d].id) {
                    arraydef[a].habilidades.splice(d, 1);
                }
            }
            temnum++;
        }
    }
    return arraydef;
}

function actividadespro(user, array) {
    let arraydef = [];

    for (let a = 0; a < array.length; a++) {
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
                contenido: array[a].contenidonombrearchivo,
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
                contenido: array[a].contenidonombrearchivo,
                entregar: false
            })
        }

    }
    return arraydef;
}
//-------------------
module.exports = funcionesDB;