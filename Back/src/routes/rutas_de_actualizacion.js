
const ex = require('express');
const rutas = ex.Router();
const jwt = require('jsonwebtoken');
const actualizarDB = require('../database/actualizarDB');
const buscarDB = require('../database/buscarDB');
const insertDB = require('../database/insertarDB');
const ftpminio = require("../ftp/peticiones");
const chalk = require('chalk');
const LLAVE = 'misecretos';
const path = require('path');


rutas.put('/entrega/actividad', proToken, (req, res) => {
    const { actividad } = req.body;
    if (req.files !== undefined || req.files !== null) {
        if (req.files.archivo !== undefined || req.files.archivo !== null) {
            const { archivo } = req.files;
            if (typeof actividad === 'string') {
                archivo.mv(__dirname + '/tmp/' + archivo.name, (err) => {
                    if (!err) {
                        var metaData = {
                            'Content-Type': `${archivo.mimetype}`,
                            'size': archivo.size,
                            'X-Amz-Meta-Testing': 1234,
                            'example': 5678
                        }
                        console.log(chalk.bgGreen("|   |") + " actualizando actividad");
                        actualizarDB.entregaractividad(actividad, archivo.name).then(result => {
                            console.log(chalk.bgGreen("|   |") + `insertando en el bocket ${result.proyecto}`);
                            ftpminio.putFile(
                                `proyecto${result.proyecto}`,
                                archivo.name,
                                path.join(__dirname, `/tmp/${archivo.name}`),
                                metaData).then(result => {
                                    res.json({ msj: `activdad ${actividad} entregada` })
                                }).catch(err2 => res.json(err2))
                        }).catch(err => res.json(err))

                    } else {
                        console.log(err)
                    }
                });
            }
        }
    }

});

rutas.put('/entrega/entregable', proToken, (req, res) => {
    const { entregable } = req.body;
    if (req.files !== undefined || req.files !== null) {
        if (req.files.archivo !== undefined || req.files.archivo !== null) {
            const { archivo } = req.files;
            if (typeof entregable === 'string') {
                archivo.mv(__dirname + '/tmp/' + archivo.name, (err) => {
                    if (!err) {
                        var metaData = {
                            'Content-Type': `${archivo.mimetype}`,
                            'size': archivo.size,
                            'X-Amz-Meta-Testing': 1234,
                            'example': 5678
                        }
                        console.log(chalk.bgGreen("|   |") + " actualizando entregable");
                        actualizarDB.entregarentregable(entregable, archivo.name).then(result => {
                            console.log(chalk.bgGreen("|   |") + `insertando en el bocket ${result.proyecto}`);
                            ftpminio.putFile(
                                `proyecto${result.proyecto}`,
                                archivo.name,
                                path.join(__dirname, `/tmp/${archivo.name}`),
                                metaData).then(result => {
                                    res.json({ msj: `entregalbe ${entregable} entregado` })
                                }).catch(err3 => res.json(err3))
                        }).catch(err2 => res.json(err2))
                    } else { res.json(err) }
                });
            }
        }
    }
});


rutas.put(`/actualizar/usuario`, proToken, (req, res) => {
    const { email,
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
        idiomas } = req.body;

    jwt.verify(req.token, LLAVE, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            if (data != {} || data !== {} || data !== null || data !== undefined) {

                buscarDB.obtenerusuarioid({ id: data.rows[0].id }).then(datos => {
                    let bucket = `usuario${data.rows[0].id}`
                    if (req.files != null || req.files != undefined) {
                        if (req.files.foto != null || req.files.foto != undefined && req.files.cv == null || req.files.cv == undefined) {
                            if (datos.fotoperfil != "null" || datos.fotoperfil != null) {
                                ftpminio.removeObject(bucket, datos.fotoperfil).then(result => {
                                    req.files.foto.mv(__dirname + '/tmp/' + req.files.foto.name, (err) => {
                                        if (!err) {
                                            var metaData = {
                                                'Content-Type': `${req.files.foto.mimetype}`,
                                                'size': req.files.foto.size,
                                                'X-Amz-Meta-Testing': 1234,
                                                'example': 5678
                                            }

                                            ftpminio.putFile(bucket, req.files.foto.name, path.join(__dirname, `/tmp/${req.files.foto.name}`), metaData)
                                                .then(resul => {
                                                    actualizarDB.actualizarusuario({
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
                                                        linkedin
                                                    }, data.rows[0].id, req.files.foto.name, null).then(result => {
                                                        let c = 0;
                                                        for (let a = 0; a < palabra.length; a++) {
                                                            insertDB.insertKeyword({ user: data.rows[0].id, palabra: palabra[a] }).then(result => {
                                                                if (c === (palabra.length - 1)) {
                                                                    insertDB.agregarherramientas({ herramientas: herramienta, id: data.rows[0].id }).then(resul => {
                                                                        let d = 0;
                                                                        for (let a = 0; a < idioma.length; a++) {
                                                                            insertDB.insertlistlenguaje({ user: data.rows[0].id, idioma: idiomas[a] }).then((result) => {
                                                                                if (d === (idiomas.length - 1)) {
                                                                                    res.json({ msj: "agregados" })
                                                                                }
                                                                                d++
                                                                            }).catch(err => res.json(err));
                                                                        }
                                                                    }).catch(err => res.json(err));
                                                                }
                                                                c++
                                                            }).catch(err => res.json(err))
                                                        }

                                                    }).catch(err2 => res.json(err2))
                                                }).catch(err => res.json(err));
                                        } else {
                                            console.log(err)
                                        }
                                    });
                                });
                            } else {
                                ftpminio.putFile(bucket, req.files.foto.name, path.join(__dirname, `/tmp/${req.files.foto.name}`), metaData)
                                    .then(resul => {
                                        actualizarDB.actualizarusuario({
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
                                            linkedin
                                        }, data.rows[0].id, req.files.foto.name, null).then(result => {
                                            let c = 0;
                                            for (let a = 0; a < palabra.length; a++) {
                                                insertDB.insertKeyword({ user: data.rows[0].id, palabra: palabra[a] }).then(result => {
                                                    if (c === (palabra.length - 1)) {
                                                        insertDB.agregarherramientas({ herramientas: herramienta, id: data.rows[0].id }).then(resul => {
                                                            let d = 0;
                                                            for (let a = 0; a < idioma.length; a++) {
                                                                insertDB.insertlistlenguaje({ user: data.rows[0].id, idioma: idiomas[a] }).then((result) => {
                                                                    if (d === (idiomas.length - 1)) {
                                                                        res.json({ msj: "agregados" })
                                                                    }
                                                                    d++
                                                                }).catch(err => res.json(err));
                                                            }
                                                        }).catch(err => res.json(err));
                                                    }
                                                    c++
                                                }).catch(err => res.json(err))
                                            }
                                        }).catch(err2 => res.json(err2))
                                    }).catch(err => res.json(err));
                            }
                        } else if (req.files.cv !== null || req.files.cv !== undefined && req.files.foto == null || req.files.foto == undefined) {
                            if (datos.nombrearchivohojadevida != "null" || datos.nombrearchivohojadevida != null) {
                                ftpminio.removeObject(bucket, datos.nombrearchivohojadevida).then(result => {
                                    req.files.cv.mv(__dirname + '/tmp/' + req.files.cv.name, (err) => {
                                        if (!err) {
                                            var metaData = {
                                                'Content-Type': `${req.files.cv.mimetype}`,
                                                'size': req.files.cv.size,
                                                'X-Amz-Meta-Testing': 1234,
                                                'example': 5678
                                            }

                                            ftpminio.putFile(bucket, req.files.cv.name, path.join(__dirname, `/tmp/${req.files.cv.name}`), metaData)
                                                .then(resul => {
                                                    actualizarDB.actualizarusuario({
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
                                                        linkedin
                                                    }, data.rows[0].id, null, req.files.cv.name).then(result => {
                                                        let c = 0;
                                                        for (let a = 0; a < palabra.length; a++) {
                                                            insertDB.insertKeyword({ user: data.rows[0].id, palabra: palabra[a] }).then(result => {
                                                                if (c === (palabra.length - 1)) {
                                                                    insertDB.agregarherramientas({ herramientas: herramienta, id: data.rows[0].id }).then(resul => {
                                                                        let d = 0;
                                                                        for (let a = 0; a < idioma.length; a++) {
                                                                            insertDB.insertlistlenguaje({ user: data.rows[0].id, idioma: idiomas[a] }).then((result) => {
                                                                                if (d === (idiomas.length - 1)) {
                                                                                    res.json({ msj: "agregados" })
                                                                                }
                                                                                d++
                                                                            }).catch(err => res.json(err));
                                                                        }
                                                                    }).catch(err => res.json(err));
                                                                }
                                                                c++
                                                            }).catch(err => res.json(err))
                                                        }
                                                    }).catch(err2 => res.json(err2))
                                                }).catch(err => res.json(err));
                                        } else {
                                            console.log(err)
                                        }
                                    });
                                }).catch(err => res.json(err));
                            } else {
                                req.files.cv.mv(__dirname + '/tmp/' + req.files.cv.name, (err) => {
                                    if (!err) {
                                        var metaData = {
                                            'Content-Type': `${req.files.cv.mimetype}`,
                                            'size': req.files.cv.size,
                                            'X-Amz-Meta-Testing': 1234,
                                            'example': 5678
                                        }

                                        ftpminio.putFile(bucket, req.files.cv.name, path.join(__dirname, `/tmp/${req.files.cv.name}`), metaData)
                                            .then(resul => {
                                                actualizarDB.actualizarusuario({
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
                                                    linkedin
                                                }, data.rows[0].id, null, req.files.cv.name).then(result => {
                                                    let c = 0;
                                                    for (let a = 0; a < palabra.length; a++) {
                                                        insertDB.insertKeyword({ user: data.rows[0].id, palabra: palabra[a] }).then(result => {
                                                            if (c === (palabra.length - 1)) {
                                                                insertDB.agregarherramientas({ herramientas: herramienta, id: data.rows[0].id }).then(resul => {
                                                                    let d = 0;
                                                                    for (let a = 0; a < idioma.length; a++) {
                                                                        insertDB.insertlistlenguaje({ user: data.rows[0].id, idioma: idiomas[a] }).then((result) => {
                                                                            if (d === (idiomas.length - 1)) {
                                                                                res.json({ msj: "agregados" })
                                                                            }
                                                                            d++
                                                                        }).catch(err => res.json(err));
                                                                    }
                                                                }).catch(err => res.json(err));
                                                            }
                                                            c++
                                                        }).catch(err => res.json(err))
                                                    }
                                                }).catch(err2 => res.json(err2))
                                            }).catch(err => res.json(err));
                                    } else {
                                        console.log(err)
                                    }
                                });
                            }

                        } else if (req.files.cv !== null || req.files.cv !== undefined && req.files.foto !== null || req.files.foto !== undefined) {
                            if (datos.fotoperfil != "null" || datos.fotoperfil != null && datos.nombrearchivohojadevida != "null" || datos.nombrearchivohojadevida != null) {
                                ftpminio.removeObject(bucket, datos.nombrearchivohojadevida).then(result => {
                                    ftpminio.removeObject(bucket, datos.fotoperfil).then(result2 => {
                                        req.files.foto.mv(__dirname + '/tmp/' + req.files.foto.name, (err) => {
                                            if (!err) {
                                                var metaData1 = {
                                                    'Content-Type': `${req.files.foto.mimetype}`,
                                                    'size': req.files.foto.size,
                                                    'X-Amz-Meta-Testing': 1234,
                                                    'example': 5678
                                                }

                                                ftpminio.putFile(bucket, req.files.foto.name, path.join(__dirname, `/tmp/${req.files.foto.name}`), metaData1)
                                                    .then(resul => {
                                                        req.files.cv.mv(__dirname + '/tmp/' + req.files.cv.name, (err) => {
                                                            if (!err) {
                                                                var metaData = {
                                                                    'Content-Type': `${req.files.cv.mimetype}`,
                                                                    'size': req.files.cv.size,
                                                                    'X-Amz-Meta-Testing': 1234,
                                                                    'example': 5678
                                                                }

                                                                ftpminio.putFile(bucket, req.files.cv.name, path.join(__dirname, `/tmp/${req.files.cv.name}`), metaData)
                                                                    .then(resul => {
                                                                        actualizarDB.actualizarusuario({
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
                                                                            linkedin
                                                                        }, data.rows[0].id, req.files.foto.name, req.files.cv.name).then(result => {
                                                                            let c = 0;
                                                                            for (let a = 0; a < palabra.length; a++) {
                                                                                insertDB.insertKeyword({ user: data.rows[0].id, palabra: palabra[a] }).then(result => {
                                                                                    if (c === (palabra.length - 1)) {
                                                                                        insertDB.agregarherramientas({ herramientas: herramienta, id: data.rows[0].id }).then(resul => {
                                                                                            let d = 0;
                                                                                            for (let a = 0; a < idioma.length; a++) {
                                                                                                insertDB.insertlistlenguaje({ user: data.rows[0].id, idioma: idiomas[a] }).then((result) => {
                                                                                                    if (d === (idiomas.length - 1)) {
                                                                                                        res.json({ msj: "agregados" })
                                                                                                    }
                                                                                                    d++
                                                                                                }).catch(err => res.json(err));
                                                                                            }
                                                                                        }).catch(err => res.json(err));
                                                                                    }
                                                                                    c++
                                                                                }).catch(err => res.json(err))
                                                                            }
                                                                        }).catch(err2 => res.json(err2))
                                                                    }).catch(err => res.json(err));
                                                            } else {
                                                                console.log(err)
                                                            }
                                                        });

                                                    }).catch(err => res.json(err));
                                            } else {
                                                console.log(err)
                                            }
                                        });
                                    }).catch(err2 => res.json(err2));
                                }).catch(err => res.json(err));
                            }
                            else {
                                req.files.foto.mv(__dirname + '/tmp/' + req.files.foto.name, (err) => {
                                    if (!err) {
                                        var metaData1 = {
                                            'Content-Type': `${req.files.foto.mimetype}`,
                                            'size': req.files.foto.size,
                                            'X-Amz-Meta-Testing': 1234,
                                            'example': 5678
                                        }

                                        ftpminio.putFile(bucket, req.files.foto.name, path.join(__dirname, `/tmp/${req.files.foto.name}`), metaData1)
                                            .then(resul => {
                                                req.files.cv.mv(__dirname + '/tmp/' + req.files.cv.name, (err) => {
                                                    if (!err) {
                                                        var metaData = {
                                                            'Content-Type': `${req.files.cv.mimetype}`,
                                                            'size': req.files.cv.size,
                                                            'X-Amz-Meta-Testing': 1234,
                                                            'example': 5678
                                                        }

                                                        ftpminio.putFile(bucket, req.files.cv.name, path.join(__dirname, `/tmp/${req.files.cv.name}`), metaData)
                                                            .then(resul => {
                                                                actualizarDB.actualizarusuario({
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
                                                                    linkedin
                                                                }, data.rows[0].id, req.files.foto.name, req.files.cv.name).then(result => {
                                                                    let c = 0;
                                                                    for (let a = 0; a < palabra.length; a++) {
                                                                        insertDB.insertKeyword({ user: data.rows[0].id, palabra: palabra[a] }).then(result => {
                                                                            if (c === (palabra.length - 1)) {
                                                                                insertDB.agregarherramientas({ herramientas: herramienta, id: data.rows[0].id }).then(resul => {
                                                                                    let d = 0;
                                                                                    for (let a = 0; a < idioma.length; a++) {
                                                                                        insertDB.insertlistlenguaje({ user: data.rows[0].id, idioma: idiomas[a] }).then((result) => {
                                                                                            if (d === (idiomas.length - 1)) {
                                                                                                res.json({ msj: "agregados" })
                                                                                            }
                                                                                            d++
                                                                                        }).catch(err => res.json(err));
                                                                                    }
                                                                                }).catch(err => res.json(err));
                                                                            }
                                                                            c++
                                                                        }).catch(err => res.json(err))
                                                                    }
                                                                }).catch(err2 => res.json(err2))
                                                            }).catch(err => res.json(err));
                                                    } else {
                                                        console.log(err)
                                                    }
                                                });

                                            }).catch(err => res.json(err));
                                    } else {
                                        console.log(err)
                                    }
                                });
                            }

                        } else {
                            req.files.cv.mv(__dirname + '/tmp/' + req.files.cv.name, (err) => {
                                if (!err) {
                                    var metaData = {
                                        'Content-Type': `${req.files.cv.mimetype}`,
                                        'size': req.files.cv.size,
                                        'X-Amz-Meta-Testing': 1234,
                                        'example': 5678
                                    }

                                    ftpminio.putFile(bucket, req.files.cv.name, path.join(__dirname, `/tmp/${req.files.cv.name}`), metaData)
                                        .then(resul => {
                                            actualizarDB.actualizarusuario({
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
                                                linkedin
                                            }, data.rows[0].id, null, req.files.cv.name).then(result => {
                                                let c = 0;
                                                for (let a = 0; a < palabra.length; a++) {
                                                    insertDB.insertKeyword({ user: data.rows[0].id, palabra: palabra[a] }).then(result => {
                                                        if (c === (palabra.length - 1)) {
                                                            insertDB.agregarherramientas({ herramientas: herramienta, id: data.rows[0].id }).then(resul => {
                                                                let d = 0;
                                                                for (let a = 0; a < idioma.length; a++) {
                                                                    insertDB.insertlistlenguaje({ user: data.rows[0].id, idioma: idiomas[a] }).then((result) => {
                                                                        if (d === (idiomas.length - 1)) {
                                                                            res.json({ msj: "agregados" })
                                                                        }
                                                                        d++
                                                                    }).catch(err => res.json(err));
                                                                }
                                                            }).catch(err => res.json(err));
                                                        }
                                                        c++
                                                    }).catch(err => res.json(err))
                                                }
                                            }).catch(err2 => res.json(err2))
                                        }).catch(err => res.json(err));
                                } else {
                                    console.log(err)
                                }
                            });
                        }
                    } else {
                        actualizarDB.actualizarusuario({
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
                            linkedin
                        }, data.rows[0].id, null, null).then(result => {
                            let c = 0;
                            for (let a = 0; a < palabra.length; a++) {
                                insertDB.insertKeyword({ user: data.rows[0].id, palabra: palabra[a] }).then(result => {
                                    if (c === (palabra.length - 1)) {
                                        insertDB.agregarherramientas({ herramientas: herramienta, id: data.rows[0].id }).then(resul => {
                                            let d = 0;
                                            for (let a = 0; a < idioma.length; a++) {
                                                insertDB.insertlistlenguaje({ user: data.rows[0].id, idioma: idiomas[a] }).then((result) => {
                                                    if (d === (idiomas.length - 1)) {
                                                        res.json({ msj: "agregados" })
                                                    }
                                                    d++
                                                }).catch(err => res.json(err));
                                            }
                                        }).catch(err => res.json(err));
                                    }
                                    c++
                                }).catch(err => res.json(err))
                            }
                        }).catch(err => res.json(err))
                    }

                }).catch(err => console.log(err))
            }
        }
    });
});

rutas.put('/reasignar/actividad', proToken, (req, res) => {
    const { actividad, integrante } = req.body;
    actualizarDB.updatelistactvity({ actividad, integrante }).then(result => {
        res.json(result);
    }).catch(err => res.json(err))
})

rutas.put('/update/lenguaje', proToken, (req, res) => {
    const { id, nombre, nivel } = req.body;
    console.log(req.body);
    buscarDB.obtenertodasIdiomas().then((resul) => {
        const { API } = resul;
        for (let a = 0; a < API.length; a++) {
            if (id == API[a].id) {
                if (nombre != API[a].idiomanombre && nivel === API[a].idiomanivel) {
                    console.log("entro nombre");
                    actualizarDB.updatelenguajename({ id, nombre })
                        .then(re => res.json(re)).catch(err => res.json(err));
                } else if (nombre === API[a].idiomanombre && nivel != API[a].idiomanivel) {
                    console.log("entro nivel");
                    actualizarDB.updatelenguajelevel({ id, nivel })
                        .then((re) => {
                            console.log("entro");
                            res.json(re)
                        }).catch((err) => { res.json(err) });
                } else if (nombre != API[a].idiomanombre && nivel != API[a].idiomanivel) {
                    console.log("entro idioma");
                    actualizarDB.updatelenguaje({ id, nombre, nivel }).then(re => res.json(re)).catch(err => res.json(err));
                }
            }
        }
    }).catch(err => res.json(err));
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



rutas.put('/update/useremail', (req, res) => {
    const { email, id } = req.body;
    if (email != undefined && id != undefined) { actualizarDB.updateuseremail(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }

});
rutas.put('/update/userpassword', (req, res) => {
    const { password, id } = req.body;
    if (password != undefined && id != undefined) { actualizarDB.updateuserpassword(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/userprofilepicture', (req, res) => {
    const { foto, id } = req.body;
    if (foto != undefined && id != undefined) { actualizarDB.updateuserprofilephoto(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/usercv', (req, res) => {
    const { cv, id } = req.body;
    if (cv != undefined && id != undefined) { actualizarDB.updateusercv(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/userexperience', (req, res) => {
    const { experiencia, id } = req.body;
    if (experiencia != undefined && id != undefined) { actualizarDB.updateuserexperience(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/username', (req, res) => {
    const { nombre, id } = req.body;
    if (nombre != undefined && id != undefined) { actualizarDB.updateusername(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/userdescription', (req, res) => {
    const { descripcion, id } = req.body;
    if (descripcion != undefined && id != undefined) { actualizarDB.updateuserdescription(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/usercountry', (req, res) => {
    const { pais, id } = req.body;
    if (pais != undefined && id != undefined) { actualizarDB.updateusercountry(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/userage', (req, res) => {
    const { edad, id } = req.body;
    if (edad != undefined && id != undefined) { actualizarDB.updateuserage(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/usergithub', (req, res) => {
    const { github, id } = req.body;
    if (github != undefined && id != undefined) { actualizarDB.updateusergithub(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/userbitbucket', (req, res) => {
    const { bitbucket, id } = req.body;
    if (bitbucket != undefined && id != undefined) { actualizarDB.updateuserbitbucket(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/usergitlab', (req, res) => {
    const { gitlab, id } = req.body;
    if (gitlab != undefined && id != undefined) { actualizarDB.updateusergitlab(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/userlinkedin', (req, res) => {
    const { linkedin, id } = req.body;
    if (linkedin != undefined && id != undefined) { actualizarDB.updateuserlinkedin(req.body).then(result => res.json(result)).catch(err => res.json(err)); }
    else { res.json({ msj: "error datos" }) }
});
rutas.put('/update/user', (req, res) => {
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
        linkedin
    } = req.body;
    if (typeof id === 'number' &&
        typeof email === 'string' &&
        typeof password === 'string' &&
        typeof experiencia === 'number' &&
        typeof fotoperfil === 'string' &&
        typeof nombrearchivohojadevida === 'string' &&
        typeof nombre === 'string' &&
        typeof descripcion === 'string' &&
        typeof pais === 'string' &&
        typeof edad === 'number' &&
        typeof github === 'string' &&
        typeof gitlab === 'string' &&
        typeof bitbucket === 'string' &&
        typeof linkedin === 'string') {
        actualizarDB.updateuser(req.body).then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err)
        })
    } else {
        res.json({ msj: "datos erroneos" })
    }


});
//-------------------------------------------------

rutas.put('/update/activitystate', (req, res) => {
    const { id, estado } = req.body;
    if (typeof id === 'number' && typeof estado === 'string') {
        actualizarDB.updateactivitystate(req.body)
            .then(resul => res.json(resul)).catch(err => res.json(err))
    }
});
rutas.put('/update/activitydeliverydate', (req, res) => {
    const { id, fecha } = req.body;
    if (typeof id === 'number' && typeof fecha === 'string') {
        actualizarDB.updateactivitydeliverydate(req.body)
            .then(resul => res.json(resul)).catch(err => res.json(err))
    }
});
rutas.put('/update/activityrevised', (req, res) => {
    const { id, revision } = req.body;
    if (typeof id === 'number' && typeof revision === 'string') {
        actualizarDB.updateactivityrevised(req.body)
            .then(resul => res.json(resul)).catch(err => res.json(err))
    }
});
rutas.put('/update/memberrol', (req, res) => {
    const { id, rol } = req.body;
    if (typeof id === 'number' && typeof rol === 'number') {
        actualizarDB.updatemember(req.body)
            .then(resul => res.json(resul)).catch(err => res.json(err))
    }
});
rutas.put('/update/contentfilename', (req, res) => {
    const { id, nombreArchivo } = req.body;
    if (typeof id === 'number' && typeof nombreArchivo === 'string') {
        actualizarDB.updatecontenidos(req.body)
            .then(resul => res.json(resul)).catch(err => res.json(err))
    }
});
rutas.put('/update/deliverablestate', (req, res) => {
    const { id, estado } = req.body;
    if (typeof id === 'number' && typeof estado === 'string') {
        actualizarDB.updatedeliverable(req.body)
            .then(resul => res.json(resul)).catch(err => res.json(err))
    }
});

rutas.put('/update/history', (req, res) => {
    const { id, descripcion } = req.body;
    if (typeof id === 'number' && typeof descripcion === 'string') {
        actualizarDB.updatehistory(req.body)
            .then(resul => res.json(resul)).catch(err => res.json(err))
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
    const header = req.headers['authorization'];
    //console.log(header); 
    if (typeof header !== 'undefined') {
        const portador = header.split(" ");
        const portadorToken = portador[1];
        req.token = portadorToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
function randomNumber() {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomNumber = 0;
    for (let i = 0; i < 6; i++) {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomNumber;
};



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