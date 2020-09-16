
const ex = require('express'); 
const rutas= ex.Router();

const mariaDB = require('../database'); 

rutas.put('/:id', (req,res)=>{
    const {name,contraseña} = req.body ; 
    const {id} = req.params ; 
    const query =` CALL usuarioAgregarOEditar( ?, ?, ?); `;
    mariaDB.query(query, [id,name,contraseña] ,(err,rows , fields)=>{
        if(!err){
            res.json({Status: 'usuario actualizado'}); 
        }else{
            console.log(err);
        }
    });

});
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