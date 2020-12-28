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

funcionesDB.obtenerEscritorio = async (body) => {
    return new Promise((res, rej) => {
        const { id } = body.rows[0];
        if (id !== undefined) {
            promesa.then(async (result) => {
                const { mariaDB, sqlite, vDB } = result;
                if (vDB) {
                    await mariaDB.query(Query.obtenerEscritorioActividades(id), async (err, rows) => {
                        if (!err) {
                            await mariaDB.query(Query.obtenerEscritorioProyectos(id), async (err2, rows2) => {
                                if (!err2) {
                                    res({
                                        actividades: rows,
                                        proyectos: rows2

                                    });
                                } else { rej({ err }) }
                            })

                        } else { rej({ err }) }

                    });
                } else {
                    sqlite.all(Query.obtenerEscritorioActividades(id), (err, rows) => {
                        if (!err) {
                            sqlite.all(Query.obtenerEscritorioProyectos(id), (err2, rows2) => {
                                if (!err2) {
                                    res({
                                        actividades: rows,
                                        proyectos: rows2

                                    });
                                } else { rej({ err }) }
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

funcionesDB.obtenertalentosGeneral = async () => {
    return new Promise((res, rej) => {
        promesa.then(async (result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {

            }
            else {

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
                            res({ proyectos: rows });
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
                            res({ proyectos: rows });
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
                        console.log(rows);
                        for (var i = 0; i < rows.length; i++) {
                            // console.log(rows[i].id);
                            if (rows[i].id == idUser) {
                                console.log("entro");
                                rows.splice(i, 1);
                            }
                        }
                        res({ rows });
                    } else { rej(err) }
                });
            } else {
                sqlite.all(Query.buscartalentos(), (err, rows) => {
                    if (!err) {
                        console.log(idUser);
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
                        res({ array });
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
module.exports = funcionesDB;

/*
const {correo, password}= req.params;
//console.log(`correo => ${correo} y la contraseña es => ${password}`);
const query=`
SELECT * FROM usuarios
WHERE
correoElectronico = "${correo}"
AND
contrasena = "${password}"
`;
 mariaDB.query(query,(err,rows , fields)=>{
    if(!err){
      // res.json(rows);
        const token = jwt.sign({rows},LLAVE);
        res.json({token});

    }else{
        res.json("Usuairo no encontrado");
        console.log(err);
    }
 });
//  console.log(`id : ${id} ,`)



*/