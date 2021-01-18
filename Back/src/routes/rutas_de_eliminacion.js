const ex = require('express');
const rutas = ex.Router();


const deleteDB = require('../database/eliminacion');



/**
      db      `7MM"""Mq. `7MMF'                                 mm    `7MM                       `7MM          
     ;MM:       MM   `MM.  MM                                   MM      MM                         MM          
    ,V^MM.      MM   ,M9   MM      `7MMpMMMb.pMMMb.   .gP"Ya  mmMMmm    MMpMMMb.   ,pW"Wq.    ,M""bMM  ,pP"Ybd 
   ,M  `MM      MMmmdM9    MM        MM    MM    MM  ,M'   Yb   MM      MM    MM  6W'   `Wb ,AP    MM  8I   `" 
   AbmmmqMA     MM         MM        MM    MM    MM  8M""""""   MM      MM    MM  8M     M8 8MI    MM  `YMMMa. 
  A'     VML    MM         MM        MM    MM    MM  YM.    ,   MM      MM    MM  YA.   ,A9 `Mb    MM  L.   I8 
.AMA.   .AMMA..JMML.     .JMML.    .JMML  JMML  JMML. `Mbmmd'   `Mbmo .JMML  JMML. `Ybmd9'   `Wbmd"MML.M9mmmP' 
 */
rutas.delete('/delete/tabla', (req, res) => {
    const { tabla } = req.body;
    if (typeof tabla === 'string') {
        deleteDB.deletetabla(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/lenguaje', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deletelenguaje(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/habilidad', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteability(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/herramientas', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteledeletetoolsnguaje(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/usuario', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteUser(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/palabraclave', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteKeyword(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listalenguajeuser', (req, res) => {
    const { userid } = req.body;
    if (typeof userid === 'number') {
        deleteDB.deleteListLenguaje(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/contacto', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteContact(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listacontactos', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListContact(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listaherramientas', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListTools(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/practica', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deletePractice(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listapractica', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListPractice(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/alfas', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteAlpha(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listalfas', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListAlpha(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/herramientasmetodologia', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteToolsMetodology(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/herramientasmetodologia', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteToolsMetodology(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/actividad', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteActivity(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listarol', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListRole(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/integrante', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteMember(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listaactividades', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListActivity(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/contacto', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteContent(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/entregable', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteDeliverable(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listaerramientasmetogologia', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListToolsMetodology(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listacontactos', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListContect(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/historial', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteHistory(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listachat', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListChat(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/proyecto', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteProject(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/proyecto', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteProject(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/reunion', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteMeeting(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listareuniones', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListMeeting(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listaentregas', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListDelivery(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/listaintegrantes', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteListMember(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    }
});
//-------------------------------------------------------
rutas.delete('/delete/metodologia', (req, res) => {
    const { id } = req.body;
    if (typeof id === 'number') {
        deleteDB.deleteMetology(req.body).then(re => { res.json(re) }).catch(err => res.json(err));
    } else {
        console.log(id)
    }
});


rutas.delete('/', (req, res) => {
    const { codigo } = req.body
    if (typeof codigo === 'number' && codigo === 666) {
        deleteDB.deletealllenguaje().then((result) => {
            deleteDB.deleteaallbility().then((result) => {
                deleteDB.deletealltools().then((result) => {
                    deleteDB.deleteallUser().then((result) => {
                        deleteDB.deleteallKeyword().then((result) => {
                            deleteDB.deleteallListLenguaje().then((result) => {
                                deleteDB.deleteallContact().then((result) => {
                                    deleteDB.deleteallListContact().then((result) => {
                                        deleteDB.deleteallListAbility().then((result) => {
                                            deleteDB.deleteListTools().then((result) => {
                                                deleteDB.deleteallMetology().then((result) => {
                                                    deleteDB.deleteallPractice().then((result) => {
                                                        deleteDB.deleteallListPractice().then((result) => {
                                                            deleteDB.deleteallAlpha().then((result) => {
                                                                deleteDB.deleteallListAlpha().then((result) => {
                                                                    deleteDB.deleteallToolsMetodology().then((result) => {
                                                                        deleteDB.deleteallTechnical().then((result) => {
                                                                            deleteDB.deleteallActivity().then((result) => {
                                                                                deleteDB.deleteallRole().then((result) => {
                                                                                    deleteDB.deleteallListRole().then((result) => {
                                                                                        deleteDB.deleteallMember().then((result) => {
                                                                                            deleteDB.deleteallListActivity().then((result) => {
                                                                                                deleteDB.deleteallContent().then((result) => {
                                                                                                    deleteDB.deleteallDeliverable().then((result) => {
                                                                                                        deleteDB.deleteallDeliverable().then((result) => {
                                                                                                            deleteDB.deleteallListDeliverable().then((result) => {
                                                                                                                deleteDB.deleteallListToolsMetodology().then((result) => {
                                                                                                                    deleteDB.deleteallListContect().then((result) => {
                                                                                                                        deleteDB.deleteallDelivery().then((result) => {
                                                                                                                            deleteDB.deleteallChat().then((result) => {
                                                                                                                                deleteDB.deleteallHistory().then((result) => {
                                                                                                                                    deleteDB.deleteallListChat().then((result) => {
                                                                                                                                        deleteDB.deleteallProject().then((result) => {
                                                                                                                                            deleteDB.deleteallMeeting().then((result) => {
                                                                                                                                                deleteDB.deleteallListMeeting().then((result) => {
                                                                                                                                                    deleteDB.deleteallListDelivery().then((result) => {
                                                                                                                                                        deleteDB.deleteallEvent().then((result) => {
                                                                                                                                                            deleteDB.deleteallEvent().then((result) => {
                                                                                                                                                                deleteDB.deleteallListMember().then((result) => {
                                                                                                                                                                    res.json({ msj: "echo monstruo" })
                                                                                                                                                                }).catch(err => res.json(err))
                                                                                                                                                            }).catch(err => res.json(err))
                                                                                                                                                        }).catch(err => res.json(err))
                                                                                                                                                    }).catch(err => res.json(err))
                                                                                                                                                }).catch(err => res.json(err))
                                                                                                                                            }).catch(err => res.json(err))
                                                                                                                                        }).catch(err => res.json(err))
                                                                                                                                    }).catch(err => res.json(err))
                                                                                                                                }).catch(err => res.json(err))
                                                                                                                            }).catch(err => res.json(err))
                                                                                                                        }).catch(err => res.json(err))
                                                                                                                    }).catch(err => res.json(err))
                                                                                                                }).catch(err => res.json(err))
                                                                                                            }).catch(err => res.json(err))
                                                                                                        }).catch(err => res.json(err))
                                                                                                    }).catch(err => res.json(err))
                                                                                                }).catch(err => res.json(err))
                                                                                            }).catch(err => res.json(err))
                                                                                        }).catch(err => res.json(err))
                                                                                    }).catch(err => res.json(err))
                                                                                }).catch(err => res.json(err))
                                                                            }).catch(err => res.json(err))
                                                                        }).catch(err => res.json(err))
                                                                    }).catch(err => res.json(err))
                                                                }).catch(err => res.json(err))
                                                            }).catch(err => res.json(err))
                                                        }).catch(err => res.json(err))
                                                    }).catch(err => res.json(err))
                                                }).catch(err => res.json(err))
                                            }).catch(err => res.json(err))
                                        }).catch(err => res.json(err))
                                    }).catch(err => res.json(err))
                                }).catch(err => res.json(err))
                            }).catch(err => res.json(err))
                        }).catch(err => res.json(err))
                    }).catch(err => res.json(err))
                }).catch(err => res.json(err))
            }).catch(err => res.json(err))
        }).catch(err => res.json(err))

    } else {
        res.json("salvado por un error")
    }
});
module.exports = rutas;
/*                                    `\\  \\     !||
                                    \  \\\\\\\\,  !||
                                 \,,.\\\,\ ,\ |\\/!||
                                 \\V\ ,\ V \\| |//!||
                                 \\VVVV\\\V/ |/  //||
                                    VVVV\\((-\\./ /||
                                    \VVV_\\==- ''/|FF|
                                     \V( \   .,  ,|JL|
                                      \_\|     (( \||/
                                      .  |      / ,|| \
                                   __;__ `. `--' ( LJ )\
                                  [""""""""`._/  |)  /".)
                                  )``    """'-"")(   "./
                            _,-,-"'-.__  __,--;""-,-,_ (
                       _.-"( (         ""       / (  "._
                      / |  |o(                 /o/    ,""
                     (  |  '-"                 \/  /(   )
                     |\ :                         /    (
                    ["  \                        ".   _ |
                     `--.\                         "." ""
                     /_  :                         \   //.
                    [==--,\   ,-.           ,-.    )    ;
                    /  ``/`\  \O \   ,-.   / O/   /     ;
                    :   |  :   \  \." | ",/  /   ;     ;
                   [====]   \  ,\  \  |("`_,/.  /.     ;
                   }   "/    \/  ) (__{/  \____\/ \    ;
                   "__ |         \_,_ / O/      "-.\__/
                  ,'  `.        __|  /" !,\______,'_
                  :    ;]      (  ,--' _"  `.    "_,".
                   ;--'(       / /  _,'  ;   `.    / (
                   [===]'    _;-' ,'  |   `.   \   (  |.
                   '    ;  .' o_,'    |     \ o `.__|_.';
                    :   ;  \o,'       |      `._  o  o /
                    [ctr]   \(        |         `-----/
                     [===]   ;        \             | |
                     ;   \   |         \            | |
                     )   ,\  ;         |            | :
                     |  /((  |         |            : |
                     \\ ;_,  |         |            | |
                     ``---`  ;         |            | :
                            ;'         |            : `:
                            |          ;            `: |
                            |       :  ;           __|_|
                            ;        :;'          [o_|o/
                           ;' :      ::            ` :``:
                           |  :       :              :  |
                          ;  .:       \         :    `: |
                          | .:   ;    `;.       :     : |
                          | :    ;      :       :     : |
                          | :    ;      |       |     : '.
                          ; :   ,;      |       :.    :  :
                         ;' :   ;       :        :    '. '.
                         |      |       \        :     \  :
                        /|      ;       `\       |     || |
                       ; |      |        `|      :.    || |
                       | :      |         |       |    || |
                       | |      |         |       :    ||.'.
                       ; ;      ;         ;       :    ':| |
                      /  /      |   ___   |       :     || :
                      ;' |      ;"-"!!8"",;       :     || |
                      | /|      \ !,##/!8!/,      |     || |
                      |/#'._     )!#[]#!88\|      :     ||  \
                      \|    `-,-' !#==#!88|`      :,-.__||,-'
                       `          ,####.""""7"",---'
                                  #====#   ;___ (,_._
                                  ######   [_____/o/==._
                                  `#==#'   \     ""__ __)
                                   `##'    |####|-###### */