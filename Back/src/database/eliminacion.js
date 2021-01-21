const jwt = require('jsonwebtoken');
const promesa = require('../database');
const buscarDB = require('./buscarDB')
const Query = require('./querys');
const chalk = require('chalk');
//const LLAVE = 'misecretos';
const funcionesDB = () => {
    console.log("funciones de la base de datos")
}
// esto basicamente bloquea el proyecto para todos sus integrantes
funcionesDB.eliminarproyecto = (proyecto) => {
    return new Promise((res, rej) => {
        buscarDB.obtenerdatosintgrantesdeproyecto(proyecto).then(result => {
            let integrantes = reorganizarintegrantes(result.API);

            buscarDB.obtenerentredeproyectoconconte(proyecto).then(info => {
                let entregalbes = filtrarinfopraeleminacioentregalbe(info.API)
                eliminaciondelistaintegrantes(integrantes, proyecto).then(result2 => {
                    console.log(chalk.bgRed("|   |") + " lista integrantes eliminada");
                    eleminarintegrantes(integrantes).then(result3 => {
                        console.log(chalk.bgRed("|   |") + " integrantes eliminada");
                        funcionesDB.deleteProject({ id: proyecto }).then(result4 => {
                            console.log(chalk.bgRed("|   |") + " proyecto eliminada");
                            let archivos = archivosaeliminar(result.API);
                            let listaarchivos = archivos.concat(entregalbes.contenidos)

                            let set = new Set(listaarchivos.map(JSON.stringify))
                            let arrSinDuplicaciones = Array.from(set).map(JSON.parse);


                            res({ proyecto: proyecto, archivos: arrSinDuplicaciones })
                        }).catch(err4 => rej(err4))
                    }).catch(err3 => rej(err3))
                }).catch(err2 => rej(err2))
            }).catch(err5 => rej(err5))
        }).catch(err => rej(err))
    })
}

//---------------------------------------------------------------------
funcionesDB.deletetabla = (obj) => {
    return new Promise((res, rej) => {
        const { tabla } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteTabla(tabla), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteTabla(tabla), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deletelenguaje = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteIdiomas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteIdiomas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteability = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteHabilidades(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteHabilidades(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deletetools = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteHerramientas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteHerramientas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteUser = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteUsuarios(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteUsuarios(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteKeyword = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deletePalabrasClave(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deletePalabrasClave(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListLenguaje = (obj) => {
    return new Promise((res, rej) => {
        const { userid } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaidiomas(userid), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaidiomas(userid), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteContact = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteContactos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteContactos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListContact = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaContactos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaContactos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListAbility = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaHabilidades(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaHabilidades(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListTools = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaHerramientas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaHerramientas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteMetology = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteMetodologias(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteMetodologias(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deletePractice = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deletePracticas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deletePracticas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListPractice = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListasPracticas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListasPracticas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteAlpha = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteAlfas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteAlfas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListAlpha = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaAlfas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaAlfas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteToolsMetodology = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteHerramientasMetodologia(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteHerramientasMetodologia(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteTechnical = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteTecnicas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteTecnicas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteActivity = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteActividades(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteActividades(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteRole = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteRoles(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteRoles(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListRole = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaRoles(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaRoles(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteMember = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteIntegrantes(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteIntegrantes(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListActivity = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaActividades(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaActividades(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteContent = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteContenidos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteContenidos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteDeliverable = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteEntregables(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteEntregables(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListDeliverable = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaentregables(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaentregables(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListToolsMetodology = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaHerramientasMetodologia(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaHerramientasMetodologia(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListContect = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaContenidos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaContenidos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}

funcionesDB.deleteDelivery = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteEntregas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteEntregas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteChat = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteChats(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteChats(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteHistory = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteHistoriales(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteHistoriales(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListChat = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaChats(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaChats(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteProject = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteProyectos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.deleteProyectos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteMeeting = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteReuniones(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteReuniones(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListMeeting = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaReuniones(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaReuniones(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListDelivery = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaEntregas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaEntregas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteEvent = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteEventos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteEventos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListEvent = (obj) => {
    return new Promise((res, rej) => {
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaEventos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaEventos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListMember = (obj) => {
    return new Promise((res, rej) => {
        const { integrante, proyecto } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaIntegrantes(integrante, proyecto), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaIntegrantes(integrante, proyecto), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: err }); }
                });
            }
        });
    });
}

//---------------------------------
//---------------------------------
//---------------------------------
//---------------------------------------------------------------------
funcionesDB.deletealllenguaje = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallIdiomas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallIdiomas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deletealllenguaje" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteaallbility = () => {
    return new Promise((res, rej) => {
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallHabilidades(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteaallbility" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallHabilidades(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteaallbility" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deletealltools = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallHerramientas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallHerramientas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deletealltools" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallUser = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallUsuarios(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallUsuarios(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallUser" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallKeyword = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallPalabrasClave(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallPalabrasClave(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallKeyword" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListLenguaje = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaidiomas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaidiomas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListLenguaje" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallContact = () => {
    return new Promise((res, rej) => {
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallContactos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallContactos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallContact" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListContact = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaContactos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaContactos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListContact" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListAbility = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaHabilidades(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaHabilidades(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListAbility" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteListTools = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaHerramientas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaHerramientas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteListTools" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallMetology = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallMetodologias(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallMetodologias(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallMetology" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallPractice = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallPracticas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallPracticas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallPractice" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListPractice = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListasPracticas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListasPracticas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListPractice" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallAlpha = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallAlfas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallAlfas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallAlpha" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListAlpha = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaAlfas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaAlfas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListAlpha" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallToolsMetodology = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallHerramientasMetodologia(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallHerramientasMetodologia(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallToolsMetodology" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallTechnical = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallTecnicas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallTecnicas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallTechnical" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallActivity = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallActividades(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallActividades(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallActivity" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallRole = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallRoles(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallRoles(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallRole" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListRole = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaRoles(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaRoles(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListRole" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallMember = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallIntegrantes(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallIntegrantes(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallMember" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListActivity = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaActividades(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaActividades(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListActivity" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallContent = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallContenidos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallContenidos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallContent" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallDeliverable = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallEntregables(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallEntregables(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallDeliverable" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListDeliverable = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaentregables(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaentregables(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListDeliverable" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListToolsMetodology = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaHerramientasMetodologia(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaHerramientasMetodologia(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListToolsMetodology" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListContect = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaContenidos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaContenidos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListContect" }); }
                });
            }
        });
    });
}
//--------------------------------------------------------------------
funcionesDB.deleteallDelivery = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallEntregas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallEntregas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallDelivery" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallChat = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallChats(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallChats(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallChat" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallHistory = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallHistoriales(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallHistoriales(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallHistory" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListChat = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaChats(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaChats(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListChat" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallProject = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallProyectos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallProyectos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallProject" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallMeeting = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallReuniones(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallMeeting" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallReuniones(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallMeeting" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListMeeting = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaReuniones(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListMeeting" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaReuniones(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListMeeting" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListDelivery = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaEntregas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaEntregas(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListDelivery" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallEvent = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallEventos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallEventos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallEvent" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallEvent = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaEventos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaEventos(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallEvent" }); }
                });
            }
        });
    });
}
//---------------------------------------------------------------------
funcionesDB.deleteallListMember = () => {
    return new Promise((res, rej) => {

        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteallListaIntegrantes(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteallListaIntegrantes(), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "deleteallListMember" }); }
                });
            }
        });
    });
}

//funciones

function eliminaciondelistaintegrantes(array, proyecto) {
    return new Promise((res, rej) => {
        let cont = 0;
        for (let a = 0; a < array.length; a++) {
            funcionesDB.deleteListMember({
                integrante: array[a],
                proyecto: proyecto
            }).then(result => {
                if (cont == (array.length - 1)) { res(true); console.log("salio ") };
                cont++;
            }).catch(err => { rej(err); })
        }
    })
}

function eleminarintegrantes(array) {
    return new Promise((res, rej) => {
        let cont = 0;
        for (let a = 0; a < array.length; a++) {
            funcionesDB.deleteMember({ id: array[a] }).then(result => {
                if (cont === (array.length - 1)) res(true)
                cont++;
            }).catch(err => rej(err))
        }
    })
}


//operaciones logicas
function reorganizarintegrantes(array) {
    let arraydef = []

    for (let c = 0; c < array.length; c++) {
        arraydef.push(array[c].integraid)
    }
    return Array.from(new Set(arraydef))

}

function archivosaeliminar(array) {
    let arraydef = [];
    let arraydef2 = [];

    for (let a = 0; a < array.length; a++) {
        arraydef.push(array[a].archivos);
    }

    arraydef = Array.from(new Set(arraydef))

    for (let a = 0; a < arraydef.length; a++) {
        if (arraydef[a] !== null || arraydef[a] !== "null") {
            arraydef2.push(arraydef[a]);
        }
    }

    return arraydef2;
}
function filtrarinfopraeleminacioentregalbe(array) {
    let obj = {}
    let practicas = []
    let alfas = []
    let entregable = []
    let entregas = []
    let contenidos = []

    for (let a = 0; a < array.length; a++) {
        practicas.push(array[a].practicaid)
    }
    let set0 = new Set(practicas.map(JSON.stringify))
    practicas = Array.from(set0).map(JSON.parse);
    for (let b = 0; b < array.length; b++) {
        alfas.push(array[b].alfaid)
    }
    let set1 = new Set(alfas.map(JSON.stringify))
    alfas = Array.from(set1).map(JSON.parse);
    for (let c = 0; c < array.length; c++) {
        entregable.push(array[c].entregableid)
    }
    let set2 = new Set(entregable.map(JSON.stringify))
    entregable = Array.from(set2).map(JSON.parse);
    for (let d = 0; d < array.length; d++) {
        entregas.push(array[d].entregaid)
    }
    let set3 = new Set(entregas.map(JSON.stringify))
    entregas = Array.from(set3).map(JSON.parse);
    for (let e = 0; e < array.length; e++) {
        if (array[e].contenidoid !== null || array[e].contenidoid !== "null") {
            contenidos.push(array[e].contenidoid)
        }
    }
    let set4 = new Set(contenidos.map(JSON.stringify))
    contenidos = Array.from(set4).map(JSON.parse);

    obj.practicas = practicas;
    obj.alfas = alfas;
    obj.entregable = entregable;
    obj.entregas = entregas;
    obj.contenidos = contenidos;
    return obj;


}


module.exports = funcionesDB;


/**
 *
 */