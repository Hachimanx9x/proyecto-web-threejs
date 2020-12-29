
const ex = require('express');
const rutas = ex.Router();

const actualizarDB = require('../database/actualizarDB');
const ftpminio = require("../ftp/peticiones");
const LLAVE = 'misecretos';
const path = require('path');

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
function randomNumber  {
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