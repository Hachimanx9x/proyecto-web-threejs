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
  console.log(req.files);
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

      ftpminio.putFile('default', archivo.name, path.join(__dirname, `/tmp/${archivo.name}`), metaData);
    } else {
      console.log(err)
    }
  });
  res.json({ msj: "terminado" })
});

rutas.post('/insert/user', (req, res) => {

  const { email, contrasena, fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion, pais, edad, github, gitlab, bitbucket, linkedin } = req.body;
  insertDB.insertUser(email, contrasena, fotoperfil, nombrearchivohojadevida, anosdeexperiencia, nombre, descripcion, pais, edad, github, gitlab, bitbucket, linkedin, res);
});
rutas.post('/insert/person', (req, res) => {
  const { nombre, descripcion, otro, pais, edad } = req.body;
  insertDB.insertPerson({ nombre, descripcion, otro, pais, edad }, res);
});

rutas.post('/insert/tools', (req, res) => {
  const { nombre, tipo, descripcion, url_icono } = req.body;
  insertDB.insertTools({ nombre, tipo, descripcion, url_icono }, res);
});
rutas.post('/insert/hability', (req, res) => {
  const { tipo, descripcion, nivel, herramientaUsada } = req.body;

  insertDB.insertAbility(tipo, descripcion, nivel, herramientaUsada, res);

});
rutas.post('/insert/lenguaje', (req, res) => {
  const { nombre, nivel } = req.body;
  insertDB.insertLenguaje({ nombre, nivel }, res);
});


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