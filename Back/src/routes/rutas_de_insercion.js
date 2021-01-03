const ex = require('express');
const rutas = ex.Router();



const nodemailer = require("nodemailer");

const FLR = require("filereader")
const fs = require('fs');
const path = require('path');

const ftpminio = require("../ftp/peticiones");
const buscarDB = require('../database/buscarDB');
const insertDB = require('../database/insertarDB');
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
        bucket = `usuaruio${ultimo + 1}`;
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


rutas.post('/proyecto/insertarArchivo', (req, res) => {
  // res.json({msx:"hola"});
  /*
   if(buscarDB.buscarProyecto(req.params)){
       
   }*//*
console.log(req.params);
const {id} = req.params; 
ftpminio.listObjects(id);
*/
  if (req.body !== null || req.body !== {}) {
    const { id, name, file } = req.body;
    //convertir a archivo
    // Remove header
    let base64Image = file.split(';base64,').pop();

    fs.writeFile(path.join(__dirname, `./tmp/${name}`), base64Image, { encoding: 'base64' }, function (err) {
      console.log('File created');
    });

    const dir = path.join(__dirname, `./tmp/${name}`)

    fs.stat(dir, function (err, stats) {
      if (err) {
        return console.log(err)
      }
      ftpminio.putFile(id, name, dir, stats);
    });

  }

});


rutas.post('/proyecto/insertarArchivo2', (req, res) => {
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
rutas.post('/api/crearbucket', (req, res) => {
  const { bucket } = req.body;
  ftpminio.creatBucket(bucket).then(r => {
    if (r) {
      res.json({ msj: "creado" })
    }
  }).catch(err => { res.json(err) });

});


//-------------------

function comprobaremail (array, email) {
  let vari = true;
  for (let a = 0; a < array.length; a++) {
    if (array[a] == email) {
      return false;
    }
  }
  return vari;
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