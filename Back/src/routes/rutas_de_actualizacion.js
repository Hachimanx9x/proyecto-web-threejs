
const ex = require('express');
const rutas = ex.Router();
const jwt = require('jsonwebtoken');
const actualizarDB = require('../database/actualizarDB');
const buscarDB = require('../database/buscarDB');
const ftpminio = require("../ftp/peticiones");
const LLAVE = 'misecretos';
const path = require('path');
const { then } = require('../database');

rutas.put('/entrega/actividad', proToken, (req, res) => {
    const { estado, actividad } = req.body;
    const { archivo } = req.files;
    if (typeof estado === 'string' && typeof actividad === 'string') {
        archivo.mv(__dirname + '/tmp/' + archivo.name, (err) => {
            if (!err) {
                var metaData = {
                    'Content-Type': `${archivo.mimetype}`,
                    'size': archivo.size,
                    'X-Amz-Meta-Testing': 1234,
                    'example': 5678
                }

                ftpminio.putFile('default', archivo.name, path.join(__dirname, `/tmp/${archivo.name}`), metaData);
            } else {
                console.log(err)
            }
        });
    }
});
/*
 {
      id: 2,
      email: 'micorreo@uao.edu.co',
      contrasena: 'contraseña123',
      fotoperfil: 'fotodefault1.jpg',
      nombrearchivohojadevida: 'asdqdqsdwqds.txt',
      anosdeexperiencia: 0,
      nombre: 'diego fernando bolaños',
      descripcion: 'Soy una persona que le gusta la programacion y aprender cosas',
      pais: 'Colombia',
      edad: 26,
      github: 'https://github.com/Hachimanx9x',
      gitlab: null,
      bitbucket: null,
      linkedin: null
    }
*/
rutas.put(`/actualizar/usuario`, proToken, (req, res) => {
    const { email,
        password,
        experiencia,
        nombrearchivohojadevida,
        nombre,
        descripcion,
        pais,
        edad,
        github,
        gitlab,
        bitbucket,
        linkedin } = req.body;
    const { cv, foto } = req.files;
    let model = {
        email: null,
        password: null,
        experiencia: null,
        fotoperfil: null,
        nombrearchivohojadevida: null,
        nombre: null,
        descripcion: null,
        pais: null,
        edad: null,
        github: null,
        gitlab: null,
        bitbucket: null,
        linkedin: null
    }
    jwt.verify(req.token, LLAVE, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            if (data != {} || data !== {} || data !== null || data !== undefined) {
                let datos = data.rows[0];
                if (email != datos.email) { model.email = email; } else { model.email = datos.email; }
                if (password != datos.contrasena) { model.email = password; } else { model.email = datos.contrasena; }
                if (experiencia != datos.anosdeexperiencia) { model.email = experiencia; } else { model.email = datos.anosdeexperiencia; }
                if (foto != null || foto != undefined) {
                    foto.mv(__dirname + '/tmp/' + foto.name, (err) => {
                        if (!err) {
                            var metaData = {
                                'Content-Type': `${foto.mimetype}`,
                                'size': foto.size,
                                'X-Amz-Meta-Testing': 1234,
                                'example': 5678
                            }

                            ftpminio.putFile(bucket, foto.name, path.join(__dirname, `/tmp/${foto.name}`), metaData).then(resul => {

                            }).catch(err => res.json(err));
                        } else {
                            console.log(err)
                        }
                    });

                } else {
                    model.fotoperfil = datos.fotoperfil;

                }
                if (cv != null || cv != undefined) {
                    cv.mv(__dirname + '/tmp/' + cv.name, (err) => {
                        if (!err) {
                            var metaData = {
                                'Content-Type': `${cv.mimetype}`,
                                'size': cv.size,
                                'X-Amz-Meta-Testing': 1234,
                                'example': 5678
                            }

                            ftpminio.putFile(bucket, cv.name, path.join(__dirname, `/tmp/${cv.name}`), metaData).then(resul => { model.fotoperfil = `/usuario${datos.id}/${cv.name}`; }).catch(err => res.json(err));
                        } else {
                            console.log(err)
                        }
                    });
                } else { model.email = datos.nombrearchivohojadevida; }
                if (email != datos.email) { model.email = email; } else { model.email = datos.email; }
                if (email != datos.email) { model.email = email; } else { model.email = datos.email; }
                if (email != datos.email) { model.email = email; } else { model.email = datos.email; }
                if (email != datos.email) { model.email = email; } else { model.email = datos.email; }
                if (email != datos.email) { model.email = email; } else { model.email = datos.email; }
                if (email != datos.email) { model.email = email; } else { model.email = datos.email; }
                if (email != datos.email) { model.email = email; } else { model.email = datos.email; }
                if (email != datos.email) { model.email = email; } else { model.email = datos.email; }

            }
        }
    });
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

rutas.put('/update/user', proToken, (req, res) => {
    const { id, nombre, nivel } = req.body;
    console.log(req.body);

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
function proToken (req, res, next) {
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
function randomNumber () {
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