const ex = require('express'); 
const rutas= ex.Router();

const mariaDB = require('../database'); 

const nodemailer = require("nodemailer"); 


rutas.post('/registro/n=:nombre&c=:correo&p=:password',(req,res)=>{
    const {nombre,correo,password} = req.params ; 
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
    const opcionescorreo ={
        from: '"Remitente', // sender address
        to: `"${correo}"`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html:`"${ htmlc}"`, // html body
    };


    transporter.sendMail(opcionescorreo, (error,info)=>{
        if(error){
            res.status(500).send(error.message);
        }else{
            console.log("Email enviado");
            res.status(200).jsonp(req.params); 
        }
    });
  

} ); 




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