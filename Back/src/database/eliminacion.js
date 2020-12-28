const jwt = require('jsonwebtoken');
const promesa = require('../database');
const Query = require('./querys');
//const LLAVE = 'misecretos';
const funcionesDB = () => {
    console.log("funciones de la base de datos")
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
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaidiomas(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaidiomas(id), (err) => {
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
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteProyectos(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
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
        const { id } = obj;
        promesa.then((result) => {
            const { mariaDB, sqlite, vDB } = result;
            if (vDB) {
                mariaDB.query(Query.deleteListaIntegrantes(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
            else {
                sqlite.all(Query.deleteListaIntegrantes(id), (err) => {
                    if (!err) {
                        res({ msj: "success" });
                    } else { rej({ msj: "error" }); }
                });
            }
        });
    });
}
module.exports = funcionesDB;