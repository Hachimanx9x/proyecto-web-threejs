const ex = require('express');
const rutas = ex.Router();



const nodemailer = require("nodemailer");

const FLR = require("filereader")
const fs = require('fs');
const path = require('path');

const ftpminio = require("../ftp/peticiones");
const buscarDB = require('../database/buscarDB');
const insertDB = require('../database/insertarDB');

const LLAVE = 'misecretos';

rutas.post('/registro', (req, res) => {
  const { nombre, correo, password } = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: true,
    auth: {
      user: 'walton64@ethereal.email',
      pass: 'KH4CURQ3h5fWMaty6W'
    }
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
rutas.post(`/create/user`, (req, res) => {

  const {

    listidiomas,
    listhabilidades,
    listherramientas,
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
  } = req.body;
  const {
    cv, foto
  } = req.file
  let bucket, fotofile, cvfile;
  if (Array.isArray(listidiomas) &&
    Array.isArray(listhabilidades) &&
    Array.isArray(listhabilidades) &&
    typeof mail === 'string' &&
    typeof password === 'string' &&
    typeof experiencia === 'string' &&
    typeof nombre === 'number' &&
    typeof descripcion === 'string' &&
    typeof pais === 'string' &&
    typeof edad === 'number' &&
    typeof github === 'string' &&
    typeof gitlab === 'string' &&
    typeof bitbucket === 'string' &&
    typeof linkedin === 'string' &&
    cv !== undefined && cv !== null &&
    foto !== undefined && foto !== null

  ) {
    buscarDB.obtenertodasUsuarios().then(result => {
      const { API } = result;
      if (comprobaremail(API, email)) {
        let ultimo = API[API.length - 1].id;

        ultimo += ultimo + 1;
        bucket = `usuario${ultimo + 1}`;
        ftpminio.creatBucket(bucket).then(result2 => {
          if (result2) {
            fotofile = `/${bucket}/${foto.name}`;
            cvfile = `/${bucket}/${cv.name}`;
            foto.mv(__dirname + '/tmp/' + foto.name, (err3) => {
              if (!err) {
                let metaData = {
                  'Content-Type': `${foto.mimetype}`,
                  'size': foto.size,
                  'X-Amz-Meta-Testing': 1234,
                  'example': 5678
                }
                ftpminio.putFile(bucket, foto.name, path.join(__dirname, `/tmp/${foto.name}`), metaData).
                  then(resul3 => {
                    const { file } = resul3
                    if (file) {
                      cv.mv(__dirname + '/tmp/' + cv.name, (err3) => {
                        if (!err) {
                          metaData = {
                            'Content-Type': `${cv.mimetype}`,
                            'size': cv.size,
                            'X-Amz-Meta-Testing': 1234,
                            'example': 5678
                          }

                          ftpminio.putFile(bucket, cv.name, path.join(__dirname, `/tmp/${cv.name}`), metaData).
                            then(resul3 => {
                              const { file } = resul5
                              if (file) {
                                insertDB.insertUser({
                                  email,
                                  contrasena: password,
                                  fotoperfil: fotofile,
                                  nombrearchivohojadevida: cvfile,
                                  anosdeexperiencia: experiencia,
                                  nombre: nombre,
                                  descripcion,
                                  pais,
                                  edad,
                                  github,
                                  gitlab,
                                  bitbucket,
                                  linkedin
                                }).then(resuluser => {
                                  for (let usera = 0; usera < listidiomas.length; usera++) {
                                    let user = ultimo;
                                    let idioma = listidiomas[usera];
                                    insertDB.insertlistlenguaje({ user, idioma }).then(
                                      resulidioma => {
                                        if (listidiomas[usera] === listidiomas[listidiomas.length - 1]) {
                                          for (let userb = 0; userb < listhabilidades.length; userb++) {
                                            let habilidad = listhabilidades[userb];
                                            insertDB.insetlistAbility({ usuario: user, habilidad }).then(resulhabi => {
                                              if (habilidad === listhabilidades[listhabilidades.length - 1]) {
                                                for (let userc = 0; userc < listherramientas.length; userc++) {
                                                  let herramienta = listherramientas[userc];
                                                  insertDB.insertlistTool({ usuario: user, herramienta }).then(resulherr => {
                                                    if (herramienta === listherramientas[listherramientas.length - 1]) {
                                                      res.json(resulherr);
                                                    }
                                                  }).catch(errherr => res.json(errherr))
                                                }
                                              }
                                            }).catch(errhabi => res.json(errhabi))
                                          }
                                        }
                                      }
                                    )
                                  }
                                }).catch(eruser => res.json(eruser));

                              }

                            }).catch(er5 => res.json(err5));
                        } else {
                          console.log(err3)
                        }
                      });

                    }

                  }).catch(err4 => res.json(err4));
              } else {
                console.log(err3)
              }
            });
          }
        }).catch(err2 => res.json(err2))
      } else {
        res.json({ msj: `error el correo ${email} ya esta registrado` })
      }


    }).catch(err => res.json(err))
  } else {
    res.json({ msj: "datos erroneos" })
  }
});






rutas.post('/create/usuario', (req, res) => {
  const {
    email,
    password,
    nombre } = req.body;
  if (
    typeof email === 'string' &&
    typeof contrasena === 'string' &&
    typeof nombre === 'string') {
    buscarDB.obtenertodasUsuarios().then(result => {
      const { API } = result;
      let ultimo = API[API.length - 1].id;
      ultimo++;
      const bucket = `usuario${ultimo}`
      if (comprobaremail(API, email)) {
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
          linkedin: null
        }
        insertDB.insertUser(model).then(result => {
          ftpminio.creatBucket(bucket).then(result2 => {
            res.json(result)
          }).catch(err2 => { res.json(err2) });

        }).catch(err => { res.json(err) });
      }
    });




  } else { res.json({ msj: "error en los datos" }) }
})


rutas.post('/create/proyecto', proToken, (req, res) => {

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
rutas.post('/insert/lenguaje', (req, res) => {
  const { nombre, nivel } = req.body;
  if (typeof nombre === 'string' && typeof nivel === 'string') {
    insertDB.insertLenguaje(req.body).then((result) => {
      res.json(result);
    });
  } else {
    res.json({ msj: "error en los datos" })
  }

});
//--------------------------------------------------
rutas.post('/insert/user', (req, res) => {

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
    linkedin } = req.body;

  if (typeof email === 'string' &&
    typeof contrasena === 'string' &&
    typeof fotoperfil === 'string' &&
    typeof nombrearchivohojadevida === 'string' &&
    typeof anosdeexperiencia === 'string' &&
    typeof nombre === 'string' &&
    typeof descripcion === 'string' &&
    typeof pais === 'string' &&
    typeof edad === 'string' &&
    typeof github === 'string' &&
    typeof gitlab === 'string' &&
    typeof bitbucket === 'string' &&
    typeof linkedin === 'string') {
    insertDB.insertUser(req.body).then(result => res.json(result));
  }

});
//---------------------------------------------------
rutas.post('/insert/Keyword', (req, res) => {

  const { user, palabra } = req.body;
  if (typeof user === 'number' && typeof palabra === 'string') {
    insertDB.insertKeyword(req.body).then(result => res.json(result));
  }
});
//---------------------------------------------------
rutas.post('/insert/listlenguaje ', (req, res) => {

  const { user, idioma } = req.body;
  if (typeof user === 'string' && typeof idioma === 'number') {
    insertDB.insertlistlenguaje(req.body).then((result) => {
      res.json(result);
    });
  }
});
//-----------------------------------------------------
rutas.post('/insert/Ability', (req, res) => {
  const { tipo, descripcion, nivel } = req.body;
  if (typeof tipo === 'string' && typeof descripcion === 'string' && typeof nivel === 'string') {
    insertDB.insertAbility(req.body).then(result => res.json(result));
  }
});
//-----------------------------------------------------
rutas.post('/insert/ListAbility', (req, res) => {
  const { usuario, habilidad } = req.body;
  if (typeof usuario === 'string' && typeof habilidad === 'number') {
    insertDB.insetlistAbility(req.body).then(resul => res.json(resul));
  }
});
//-----------------------------------------------------
rutas.post('/insert/tools', (req, res) => {
  const { nombre, tipo, descripcion, url_icono } = req.body;
  if (
    typeof nombre === 'string' &&
    typeof tipo === 'string' &&
    typeof descripcion === 'string' &&
    typeof url_icono === 'string'
  ) {
    insertDB.insertTools(req.body).then((result) => {
      res.json(result);
    });
  }

});
//--------------------------------------------------------------
rutas.post('/insert/listtools', (req, res) => {
  const { usuario, herramienta } = req.body;
  if (typeof usuario === 'string' && typeof herramienta === 'string') {
    insertDB.insertlistTool(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/metodology', (req, res) => {
  const { nombre, descripcion, consejo } = req.body;
  if (typeof nombre === 'string' && typeof descripcion === 'string' && typeof consejo === 'string') {
    insertDB.insertMethodology(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/history', (req, res) => {
  const { descripcion } = req.body;
  if (typeof descripcion === 'string') {
    insertDB.insertHistory(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/proyect', (req, res) => {
  const { nombre, descripcion, estado, icon, banner, metodologia, historia } = req.body;
  if (typeof nombre === 'string' &&
    typeof descripcion === 'string' &&
    typeof estado === 'string' &&
    typeof icon === 'string' &&
    typeof banner === 'string' &&
    typeof metodologia === 'string' &&
    typeof historia === 'string') {
    insertDB.insertHistory(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/practice', (req, res) => {
  const { nombre, descripcion } = req.body;
  if (typeof nombre === 'string' &&
    typeof descripcion === 'string') {
    insertDB.insertPractice(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/role', (req, res) => {
  const { titulo, descripcion, recomendacion } = req.body;
  if (typeof titulo === 'string' &&
    typeof descripcion === 'string' &&
    typeof recomendacion === 'string') {
    insertDB.inserRoles(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/listrole', (req, res) => {
  const { practica, rol } = req.body;
  if (typeof practica === 'number' &&
    typeof rol === 'number') {
    insertDB.insertlistRoles(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/member', (req, res) => {
  const { usuario, rol } = req.body;
  if (typeof usuario === 'number' &&
    typeof rol === 'number') {
    insertDB.insertMembers(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/listmember', (req, res) => {
  const { proyecto, integrante } = req.body;
  if (typeof proyecto === 'number' &&
    typeof integrante === 'number') {
    insertDB.insertlistMembers(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/Alpha', (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  if (typeof nombre === 'string' &&
    typeof descripcion === 'string'
    && typeof estado === 'string') {
    insertDB.insertAlpha(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/listAlpha', (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  if (typeof nombre === 'string' &&
    typeof descripcion === 'string'
    && typeof estado === 'string') {
    insertDB.insertlistAlpha(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/deliverable', (req, res) => {
  const { titulo, descripcion, estado, tipoArchivo, fechaEntrega, numeroRevisiones } = req.body;
  if (typeof titulo === 'string'
    && typeof descripcion === 'string'
    && typeof estado === 'string'
    && typeof tipoArchivo === 'string'
    && typeof fechaEntrega === 'string'
    && typeof numeroRevisiones === 'number') {
    insertDB.insertDeliverable(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/technical', (req, res) => {
  const { titulo, descripcion, bibliografia } = req.body;
  if (typeof titulo === 'string'
    && typeof descripcion === 'string'
    && typeof bibliografia === 'string'
  ) {
    insertDB.insertTechnical(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/activity', (req, res) => {
  const { titulo, estado, descripcion, fechacreacion, fechaentrega, revision, tecnica } = req.body;
  if (typeof titulo === 'string'
    && typeof descripcion === 'string'
    && typeof estado === 'string'
    && typeof fechacreacion === 'string'
    && typeof fechaentrega === 'string'
    && typeof revision === 'number'
    && typeof tecnica === 'number'

  ) {
    insertDB.insertActivity(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/listactivity', (req, res) => {
  const { integrante, actividad } = req.body;
  if (typeof integrante === 'number'
    && typeof actividad === 'number'
  ) {
    insertDB.insertTechnical(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/chat', (req, res) => {
  const { archivo, fecha } = req.body;
  if (typeof archivo === 'string'
    && typeof fecha === 'string'
  ) {
    insertDB.insertchat(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/listchat', (req, res) => {
  const { historial, chat } = req.body;
  if (typeof historial === 'number'
    && typeof chat === 'string'
  ) {
    insertDB.insertlistchat(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/event', (req, res) => {
  const { fechacreacion } = req.body;
  if (typeof fechacreacion === 'string'

  ) {
    insertDB.insertEvent(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/listevent', (req, res) => {
  const { historial, evento, integrante } = req.body;
  if (typeof historial === 'number'
    && typeof evento === 'number'
    && typeof integrante === 'number'
  ) {
    insertDB.insertListEvent(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/Meeting', (req, res) => {
  const { titulo, fecha, hora, duracion, descripcion, vigente } = req.body;
  if (typeof titulo === 'string'
    && typeof fecha === 'string'
    && typeof hora === 'string'
    && typeof duracion === 'string'
    && typeof descripcion === 'string'
    && typeof vigente === 'string'
  ) {
    insertDB.insertMeeting(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/Meeting', (req, res) => {
  const { evento, reunion } = req.body;
  if (typeof evento === 'number'
    && typeof reunion === 'number'

  ) {
    insertDB.insertListMeeting(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/delivery', (req, res) => {
  const { titulo, descripcion, nombrearchivoguardado, actividad, entragable } = req.body;
  if (typeof titulo === 'string'
    && typeof descripcion === 'string'
    && typeof nombrearchivoguardado === 'string'
    && typeof actividad === 'number'
    && typeof entragable === 'number'
  ) {
    insertDB.insertDelivery(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/contenct', (req, res) => {
  const { nombre, nombrearchivo, descripcion, bibliografia } = req.body;
  if (typeof nombre === 'string'
    && typeof nombrearchivo === 'string'
    && typeof descripcion === 'string'
    && typeof bibliografia === 'string'
  ) {
    insertDB.insertContent(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/listcontent', (req, res) => {
  const { entregable, contenido, actividad } = req.body;
  if (typeof entregable === 'number'
    && typeof contenido === 'number'
    && typeof actividad === 'number'
  ) {
    insertDB.insertlistContent(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/methodologyTool', (req, res) => {
  const { nombre, descripcion, bibliografia } = req.body;
  if (typeof nombre === 'string'
    && typeof descripcion === 'string'
    && typeof bibliografia === 'string'
  ) {
    insertDB.insertMethodologyTool(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
  }
});
//--------------------------------------------------------------
rutas.post('/insert/listmethodologyTool', (req, res) => {
  const { entregable, herramientametodologia } = req.body;
  if (typeof entregable === 'number'
    && typeof herramientametodologia === 'number'
  ) {
    insertDB.insertListMethodologyTool(req.body).then(resul => { res.json(resul) }).catch(err = res.json(err));
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
rutas.post('/api/crearbucket', (req, res) => {
  const { bucket } = req.body;
  ftpminio.creatBucket(bucket).then(r => {
    if (r) {
      res.json({ msj: "creado" })
    }
  }).catch(err => { res.json(err) });

});

rutas.post('/proyecto/insertarArchivo', (req, res) => {
  console.log(req.body);
  const { bucket } = req.body;
  const { archivo } = req.files;
  //console.log(`entro el archivo ${archivo.name}`); 
  archivo.mv(__dirname + '/tmp/' + archivo.name, (err) => {
    if (!err) {
      var metaData = {
        'Content-Type': `${archivo.mimetype}`,
        'size': archivo.size,
        'X-Amz-Meta-Testing': 1234,
        'example': 5678
      }

      ftpminio.putFile(bucket, archivo.name, path.join(__dirname, `/tmp/${archivo.name}`), metaData).then(resul => res.json({ estado: "completado" })).catch(err => res.json(err));
    } else {
      console.log(err)
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
function comprobaremail (array, email) {
  let vari = true;
  for (let a = 0; a < array.length; a++) {
    if (array[a].email == email) {
      return false;
    }
  }
  return vari;
}
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
module.exports = rutas;


/*  const transportador = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bolanosd38@gmail.com',
      pass: 'Hachiman999' // naturally, replace both with your real credentials or an application-specific password
    }
   });

   const mainoptions ={
       from: "bolanosd38@gmail.com",
       to: `"${correo}"`,
       subject: "Enviado desde Nodemailer",
       text : contenido(nombre,correo,"url")
   };

   transportador.sendMail(mainoptions, (error,info)=>{
    if(error){
        res.status(500).send(error.message);
    }else{
        console.log("Email enviado");
        res.status(200).jsonp(req.body);
    }
   }); */
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