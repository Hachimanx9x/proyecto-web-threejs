# Esto comprende las funciones de la api
----
## Funcionamieto

Para el funcionamiento en modo de desarollo se usa el comando 
```sh
$ npm run dev
```

## Explicacion de la version 0.0.1

esta solamente la conexion a una base de datos local, la acciones realizables son.

-Busqueda  (Completado).
-Actualizacion de datos.
-Agregar datos.
-eliminar datos.

```sh
Para la siguiente version de planea fragmentar las diferentes opciones 
```
## Explicacion de la version 0.0.5

En esta version se dividio las rutas en diferentes achivos para tener mas control. 

Para hacer una busqueda de un usuario a partir del correo reguistrado y de la contraseña se uso el siguiente link.

```sh
/login/"correo"/"contraseña"
```
```sh
Para la siguiente version de planea completar la parte de actualizacion de informacion 
```

## Explicacion de la version 0.1.2

En Esta version ya se agrego la libreria de socket.io de esta manera 
se lograra la comunicacion entre usuarios, ademas se crearon rutas 
para la busqueda de informacion en el apartado de proyectos y escritorio

Para las autenticaciones de manda un token por los header. 

para la informacion se usa req.body

rutas :
```sh

ruta login : 
  /login

ruta proyectos:
    /proyectos

ruta escritorio:
    /escritorios
```
## Explicacion de la version 1.0.0
En esta version se terminaron en lo mas posible los metodos vitales
para la ejecucion minima del proyecto 

Las rutas con contenido automatico

```sh
/insert/auto/roles
/insert/auto/herramientasmetodologia
/insert/auto/tecnicas
```

para la ejecucion del servidor usa el comando en la capeta back
comando
```sh
yarn run dev
```
### rutas a usar 

> rutas de busqueda de información
```sh
/login
```
esta ruta pide en el body un objeto de la siguiente estructura
{ email, password}

este devolvera un token con lo datos de ese momento del usuario
```json
"token": "llave eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsImVtYWlsIjoiY29ycm9lOEBnbWFpbC5jb20iLCJjb250cmFzZW5hIjoiMTIzNDU2Nzg5IiwiZm90b3BlcmZpbCI6Im51bGwiLCJub21icmVhcmNoaXZvaG9qYWRldmlkYSI6Im51bGwiLCJhbm9zZGVleHBlcmllbmNpYSI6bnVsbCwibm9tYnJlIjoibm9tYnJlIHRlc3QxNiIsImRlc2NyaXBjaW9uIjoibnVsbCIsInBhaXMiOiJudWxsIiwiZWRhZCI6bnVsbCwiZ2l0aHViIjoibnVsbCIsImdpdGxhYiI6Im51bGwiLCJiaXRidWNrZXQiOiJudWxsIiwibGlua2VkaW4iOiJudWxsIn1dLCJpYXQiOjE2MTExODU4NDJ9.TWId6FOMQ0_TGyngDFHJF4Uuol0dqC0sLcCo2FRTuqY "
```
```sh
/escritorio
```
este devolvera los datos de las actividades asginadas a la persona y del estado de los proyectos 
```json
{
    "actividades": [{
            "proyecto": 120,
            "usuario": "nombre test14",
            "actividadid": 503,
            "actividad": "A9",
            "descripcion": "Defina las bases del diseño de una experiencia multimedia\n                    interactiva, a partir de la historia y el (los) problema(s)\n                    identificado(s), especificando los hitos de la historia en donde\n                    el Sistema Multimedia debe producir en el usuario una\n                    influencia cognitiva, emocional y sensorial.",
            "estado": "asignada",
            "entrega": "2021-01-23",
            "contenido": {
                "url": "http://localhost:3030/proyecto/contenido/proyecto120/null"
            }
        }],
    "proyectos": [ { "idproyecto": 121,
            "proyectonombre": "proyecto test2",
            "practicas": [
                {
                    "practicanombre": "Sistema Multimedia mínimo viable",
                    "alfas": [
                        {
                            "alfanombre": "Oportunidad",
                            "alfaestado": "iniciado"
                        },
                        {
                            "alfanombre": "Valor del sistema multimedia",
                            "alfaestado": "iniciado"
                        }
                    ]
                },
                {
                    "practicanombre": "Concepción de la experiencia multimedia",
                    "alfas": [
                        {
                            "alfanombre": "Experiencia multimedia",
                            "alfaestado": "iniciado"
                        },
                        {
                            "alfanombre": "Diseño responsable",
                            "alfaestado": "iniciado"
                        }
                    ]
                }
            ]
        }],
    "datos": {
        "nombre": "nombre test16",
        "foto": "http://localhost:3030/proyecto/contenido/usuario12/null",
         "herramientas": [
            {
                "nombre": "Reactjs",
                "descripcion": "Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres. ",
                "icono": "reactjs-icon.svg"
            }
        ],
        "palabras": [
            "PErro"
        ]
    }
}
```

```sh
/talentos
```
este devuelve a todos los usuarios que posean un herramientas asociadas, asi como lapbras clave
```json
{
    "data": [
        {
            "userid": 12,
            "nombre": "nombre test16",
            "descripcion": "null",
            "herramientas": [
                {
                    "nombre": "Reactjs",
                    "descripcion": "Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres. ",
                    "icono": "reactjs-icon.svg"
                },
                {
                    "nombre": "Adobe Ilustrator",
                    "descripcion": "Es un editor de gráficos vectoriales en forma de taller de arte que trabaja sobre un tablero de dibujo, conocido como «mesa de trabajo» y está destinado a la creación artística de dibujo y pintura para ilustración, para crear y diseñar imágenes, sirve para editar entre otras cosas (ilustración como rama del arte digital aplicado a la ilustración técnica o el diseño gráfico, entre otros).",
                    "icono": "adobe-illustrator-cc.svg"
                }               
            ],
            "palabras": [
                "perro"
            ]
        }
    ]
}
```

esta ruta devuelve los datos de un usuario buscado de manera que se puede ver de una manera mas amplia cuales son las caracterisitcas del usuario
el :id es el id del usuario que se entrega en el apartado de talentos
```sh
/talentos/:id
```

```json
[
    {
        "id": 12,
        "nombre": "nombre test16",
        "descripcion": "null",
        "fotoperfil": "null",
        "experiencia": null,
        "cv": "http://localhost:3030/proyecto/contenido/usuario12/null",
        "pais": "null",
        "github": "null",
        "gitlab": "null",
        "bitbucket": "null",
        "linkedin": "null",
        "palabras": [
            "perro"
        ],
        "herramientas": [
            {
                "id": 1,
                "nombre": "Reactjs",
                "descripcion": "Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres. ",
                "icono": "reactjs-icon.svg"
            },
            {
                "id": 32,
                "nombre": "Adobe Ilustrator",
                "descripcion": "Es un editor de gráficos vectoriales en forma de taller de arte que trabaja sobre un tablero de dibujo, conocido como «mesa de trabajo» y está destinado a la creación artística de dibujo y pintura para ilustración, para crear y diseñar imágenes, sirve para editar entre otras cosas (ilustración como rama del arte digital aplicado a la ilustración técnica o el diseño gráfico, entre otros).",
                "icono": "adobe-illustrator-cc.svg"
            }
        ],
        "habilidades": [
            {
                "id": 1,
                "tipo": "Diseño",
                "descripcion": "Abstrae correctamente elementos gráficos",
                "nivel": "medio"
            }
        ]
    }
]
```


hace lo mismo que la ruta talentos pero solo con un usaurio en concreto
```sh
/usuarios/:id
```


esta ruta te traera la informacion de los proyectos a los que pertenescan de manera los mas resumida posible
```sh
/proyectos
```

```json
{
    "proyectos": [
        {
            "idproyecto": 120,
            "pronombre": "proyecto test2",
            "prodescripcion": "cualquier cosa esta bien",
            "estado": "iniciado",
            "icono": "http://localhost:3030/proyecto/contenido/proyecto120/null",
            "banner": "http://localhost:3030//proyecto/contenido/proyecto120/null"
        },
        {
            "idproyecto": 121,
            "pronombre": "proyecto test2",
            "prodescripcion": "cualquier cosa esta bien",
            "estado": "iniciado",
            "icono": "http://localhost:3030/proyecto/contenido/proyecto121/null",
            "banner": "http://localhost:3030//proyecto/contenido/proyecto121/null"
        },
        
    ]
}
```
este carga el proyecto en concreto del quel usuario pertenece
```sh
/proyectos/:id
```
```json
{
    "proyectos": {
        "idproyecto": 168,
        "nombre": "proyecto test2",
        "descripcion": "cualquier cosa esta bien",
        "estado": "iniciado",
        "icono": "http://localhost:3030/proyecto/contenido/proyecto168/null",
        "banner": "http://localhost:3030/proyecto/contenido/proyecto168/null",
        "integrantes": [
            {
                "id": 504,
                "nombre": "nombre test14",
                "rol": "Arquitecto Experiencia Multimedia"
            },
            {
                "id": 502,
                "nombre": "nombre test12",
                "rol": "Arquitecto de información"
            }
        ],
        "actividades": [
            {
                "id": 1171,
                "nombre": "A8",
                "estado": "asignada"
            },
            {
                "id": 1180,
                "nombre": "A9",
                "estado": "asignada"
            }
        ],
        "entregable": [
            {
                "id": 458,
                "estado": "asignado"
            },
            {
                "id": 459,
                "estado": "asignado"
            }
        ],
        "practicas": [
            {
                "nombre": "Concepción de la experiencia multimedia",
                "alfas": [
                    {
                        "nombre": "Experiencia multimedia",
                        "estado": "iniciado"
                    },
                    {
                        "nombre": "Diseño responsable",
                        "estado": "iniciado"
                    }
                ],
                "tasa": 0
            },
            {
                "nombre": "Sistema Multimedia mínimo viable",
                "alfas": [
                    {
                        "nombre": "Oportunidad",
                        "estado": "iniciado"
                    },
                    {
                        "nombre": "Valor del sistema multimedia",
                        "estado": "iniciado"
                    }
                ],
                "tasa": 0
            }
        ]
    }
}
```

este carga las actividades y entregables del proyecto
```sh
/proyecto/actividades/:id
```
```json
{
    "actividades": [
        {
            "actividadid": 1171,
            "titulo": "A8",
            "descripcion": "Diseñe la estructura y el flujo (narrativo, temporal, de\n                        eventos) de la historia a desarrollarse a partir del problema\n                        que desea resolverse, describiendo los acontecimientos que\n                        narra, los personajes que participan, el tiempo en el que se\n                        desarrolla y el espacio en el que suceden dichos\n                        acontecimientos.",
            "revisiones": 0,
            "nombre": "nombre test14",
            "rol": "Arquitecto Experiencia Multimedia",
            "estado": "asignada",
            "fechaentrega": "2021-01-23",
            "tecnica": "Video como apoyo a la etnografía",
            "contenido": "http://localhost:3030/proyecto/contenido/proyecto168/null",
            "entregar": false
        },
        {
            "actividadid": 1180,
            "titulo": "A9",
            "descripcion": "Defina las bases del diseño de una experiencia multimedia\n                    interactiva, a partir de la historia y el (los) problema(s)\n                    identificado(s), especificando los hitos de la historia en donde\n                    el Sistema Multimedia debe producir en el usuario una\n                    influencia cognitiva, emocional y sensorial.",
            "revisiones": 0,
            "nombre": "nombre test14",
            "rol": "Arquitecto Experiencia Multimedia",
            "estado": "asignada",
            "fechaentrega": "2021-01-23",
            "tecnica": "Producción de metáforas y analogías",
            "contenido": "http://localhost:3030/proyecto/contenido/proyecto168/null",
            "entregar": false
        }
    ],
    "entregables": [
        {
            "id": 460,
            "nombre": "Análisis de viabilidad del Sistema Multimedia",
            "descripcion": "Es un documento en donde se consigna un análisis\n                    sobre la necesidad de los diferentes tipos de recursos\n                    y de riesgos, a la luz de la aplicación de diferentes\n                    técnicas, que permiten hacer un análisis de viabilidad\n                    en torno al desarrollo del Sistema Multimedia. \n                    ",
            "estado": "asignado",
            "tipoactivo": "documento",
            "fechaentrega": "2021-01-23",
            "revisiones": 0,
            "contenido": "http://localhost:3030/proyecto/contenido/proyecto168/null"
        },
        {
            "id": 461,
            "nombre": "Proposición de valor del Sistema Multimedia",
            "descripcion": "Consiste en el documento que especifica el análisis\n                    para la proposición de valor del Sistema Multimedia.",
            "estado": "asignado",
            "tipoactivo": "documento",
            "fechaentrega": "2021-01-23",
            "revisiones": 0,
            "contenido": "http://localhost:3030/proyecto/contenido/proyecto168/null"
        }
    ]
}
```
esta ruta devuelve todos los contactos del usuario
```sh
/contactos
```
```json
{
    "contactos": [
        {
            "iduser": 5,
            "nombre": "nombre test11",
            "palabras": [
                "test"
            ],
            "preferencia": 0
        }
    ]
}
```
esta ruta trea todas las reuniones del usuario relacionadas a un proyecto en que el hace parte
```sh
/calendario
```
```json
[
    {
        "proyecto": 168,
        "pronombre": "proyecto test2",
        "reunion": 7,
        "titulo": "test titulo",
        "fecha": "02-02-2021",
        "hora": "15:00",
        "duracion": 2,
        "descripcion": "test",
        "vigente": 1
    }
]
```
esta ruta trae las reuniones de un proyecto en concreto
```sh
/calendario/:id
```
```json
[
    {
        "proyecto": 168,
        "pronombre": "proyecto test2",
        "reunion": 7,
        "titulo": "test titulo",
        "fecha": "02-02-2021",
        "hora": "15:00",
        "duracion": 2,
        "descripcion": "test",
        "vigente": 1
    }
]
```
> rutas de inserción

esta ruta permite la creacion de un usuario 
```sh
/create/usuario
```
este pide un objeto con la siguiente estructura
```json
{ "email":"email@gmail.com", "password":"123asd", "nombre": "nombretest"}
```

donde todos son de tipo string devolviendo en string que en una variable token
este se debe poner los envios y peticiones especiales del usuario la estrutura de este header es 
```json
"authorization": "llave eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsImVtYWlsIjoiY29ycm9lOEBnbWFpbC5jb20iLCJjb250cmFzZW5hIjoiMTIzNDU2Nzg5IiwiZm90b3BlcmZpbCI6Im51bGwiLCJub21icmVhcmNoaXZvaG9qYWRldmlkYSI6Im51bGwiLCJhbm9zZGVleHBlcmllbmNpYSI6bnVsbCwibm9tYnJlIjoibm9tYnJlIHRlc3QxNiIsImRlc2NyaXBjaW9uIjoibnVsbCIsInBhaXMiOiJudWxsIiwiZWRhZCI6bnVsbCwiZ2l0aHViIjoibnVsbCIsImdpdGxhYiI6Im51bGwiLCJiaXRidWNrZXQiOiJudWxsIiwibGlua2VkaW4iOiJudWxsIn1dLCJpYXQiOjE2MTExODU4NDJ9.TWId6FOMQ0_TGyngDFHJF4Uuol0dqC0sLcCo2FRTuqY "
```
```sh
/agregar/contacto
```
este pide un objeto con la siguiente estructura agregado al usaurio que 
quiere gragar y si espreferente o no 
```json
{ "usuario":1, "preferencia": true }
```

```sh
/agregar/idioma
```
esta ruta permite agregar los idiomas en tu lista de idiomas 
se requiere de token para identificar al usuario
y se manden las id de los idiomas
```json 
{ "idioma":[1,3] }
```
```sh
/agregar/palabraclave
```
esta agrega las palbras a traves de una lista de palbras que identifiquen a la persona
```json
{ "palabra":"palabra"}
```
```sh
/agregar/herramientas
```
este pide un objeto con la siguiente estructura
```json
{ "herramienta":[1,3]}
```

```sh
/create/proyecto
```
este pide un objeto con la siguiente estructura
```json
 {
          "nombre":"tes proyecto",
          "descripcion": "descripcion test",
          "practica":["nmombre practica1 ","nmombre practica2"],
          "integrantes": [ {
            "user":7,
            "rol":"Arquitecto de producción de contenidos"
        },
        {
            "user":6,
            "rol":"Arquitecto de información"
        }]
         
        }
```
```sh
/crear/reunion
```
este pide un objeto con la siguiente estructura
```json
 { "proyec":168, "fecha":"02-02-02021", "hora":"15:00", "duracion":2, "descripcion":"test descripcion", "titulo":"test titulo" }
```
```sh
/insert/auto/tecnicas
```
Esta ruta es automatic carga su contenido a travez de el archivo modelo
```sh
/insert/auto/herramientasmetodologia
```
Esta ruta es automatic carga su contenido a travez de el archivo modelo
```sh
/insert/auto/roles
```
Esta ruta es automatic carga su contenido a travez de el archivo modelo

> rutas de actualizacion de datos

```sh
/entrega/actividad
```
esta ruta resive la actividad que es la id de la actividad y un archivo
```json
{ "actividad": 1 ,"archivo":"file" }

```
```sh
/entrega/entregable
```
esta ruta resive la entregable que es la id del entregable y un archivo
```json
{ "actividad": 1,"archivo":"file"  }
```

```sh
/actualizar/usuario
```
esta es la ruta de actualizacion que usa un token de este saca el id para saber que usaurio debe actualizar
esto es dinamico y dependiendo de que parte de la estructura de datos este entrando  hara la actualizacion

```json
 { "email":"email@gmail.com",
    "password":"123456789", 
    "experiencia": 1, 
    "nombre":"nombre 2 ", 
    "descripcion":"descripcion usuario", 
    "pais":"pais usuario", 
    "edad":20, 
    "github":"link", 
    "gitlab":"link", 
    "bitbucket":"link", 
    "linkedin":"link",
     "herramienta":[1,2,3], 
     "palabra":["test1","test2"],
     "idiomas":[1,2,3],
     "foto": "file foto de perfil",
    "cv": "hoja de vida  file" }
```
 asi mismo tambien se puede resibir dos archivos en variables foto o cv en caso de rebicirlos se actualizaran los archivos del usuario

```sh
/actualizar/usuario
```
esta ruta reasigna la una actividad a un integrante en especifico

```json
 { "actividad": 1, "integrante": 12 }
```
> rutas de eliminación

```sh
/eliminar/proyecto
```
esta ruta elimina el proyecto con todos sus archivos

```json
{ "proyecto":1 }
```
```sh
/
```
esta ruta todo el contenido del a base de datos pero requiere un codigo

```json
{ "codigo":1234 }
```

### rutas a usar de la api

Esta devuelven un objeto con una array llamado API que contiene los objetos generales dentro de la base de datos, esto ayuda para el control actual de la información en todo momento siendo un método directo para la consulta de la información, esto fue usado durante la fase de testeo.

>rutas de busqueda 

```sh
/api/idiomas                              //usuda en la parte final 
/api/habilidades
/api/herramientas                         //usuda en la parte final 
/api/usuarios
/api/palabrasclave
/api/listaidiomas
/api/contactos
/api/listacontactos
/api/listahabilidades
/api/listaherramientas
/api/metodologias
/api/practicas
/api/listapracticas
/api/alfas
/api/listapracticas
/api/listaalfas
/api/herramientasmetodologia               //usuda en la parte final 
/api/tecnicas                              //usuda en la parte final 
/api/actividades
/api/roles
/api/integrantes
/api/listaactividades
/api/entregables
/api/listaentregables
/api/listaherramientasmetodologia
/api/listacontenidos
/api/entregas
/api/chats
/api/historial
/api/listachats
/api/proyectos
/api/reuniones
/api/listareuniones
/api/listaentregas
/api/listaeventos
/api/listaintegrantes
```
```json 
// /api/idiomas   
{
    "API": [
        {
            "id": 1,
            "idiomanombre": "Ingles",
            "idiomanivel": "A1 Beginner"
        },
        {
            "id": 2,
            "idiomanombre": "Ingles",
            "idiomanivel": "A2 Elementary"
        }
    ]
}

```
```json 
// /api/herramientas       
{
    "API": [
        {
            "id": 1,
            "nombre": "Reactjs",
            "tipo": "desarrollo",
            "descripcion": "Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres. ",
            "icono": "http://localhost:3030/proyecto/contenido/default/reactjs-icon.svg"
        },
        {
            "id": 2,
            "nombre": "Angularjs",
            "tipo": "desarrollo",
            "descripcion": "Es un framework de JavaScript de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página. Su objetivo es aumentar las aplicaciones basadas en navegador con capacidad de Modelo Vista Controlador (MVC), en un esfuerzo para hacer que el desarrollo y las pruebas sean más fáciles.",
            "icono": "http://localhost:3030/proyecto/contenido/default/angular-icon.svg"
        }
    ]
}

```
>rutas de eliminación

```sh
/delete/lenguaje
/delete/habilidad
/delete/herramientas
/delete/usuario
/delete/palabraclave
/delete/listalenguajeuser
/delete/contacto
/delete/listacontactos
/delete/listaherramientas
/delete/practica
/delete/listapractica
/delete/alfas
/delete/listalfas
/delete/herramientasmetodologia
/delete/actividad
/delete/listarol
/delete/integrante
/delete/listaactividades
/delete/contacto
/delete/entregable
/delete/listaerramientasmetogologia
/delete/listacontactos
/delete/historial
/delete/listachat
/delete/proyecto
/delete/reunion
/delete/listareuniones
/delete/listaentregas
/delete/listaintegrantes
/delete/metodologia
/                                             //se requiere codigo
```
>rutas de inserción

```sh
/insert/lenguaje             { nombre, nivel }
/insert/user                 {email, contrasena, fotoperfil, nombrearchivohojadevida,anosdeexperiencia,nombre,descripcion,pais,edad,github,gitlab,bitbucket,  linkedin }
/insert/Keyword              { user, palabra }
/insert/listlenguaje         { user, idioma }
/insert/Ability              { tipo, descripcion, nivel }
/insert/ListAbility          { usuario, habilidad }
/insert/tools                { nombre, tipo, descripcion, url_icono }
/insert/listtools            { usuario, herramienta }
/insert/metodology           { nombre, descripcion, consejo }
/insert/history              { descripcion }
/insert/proyect              { nombre, descripcion, estado, icon, banner, metodologia, historia }
/insert/practice             { nombre, descripcion }
/insert/role                 { titulo, descripcion, recomendacion }
/insert/listrole             { practica, rol }
/insert/member               { usuario, rol }
/insert/listmember           { proyecto, integrante }
/insert/Alpha                { nombre, descripcion, estado }
/insert/listAlpha            { nombre, descripcion, estado }
/insert/deliverable          { titulo, descripcion, estado, tipoArchivo, fechaEntrega, numeroRevisiones }
/insert/technical            { titulo, descripcion, bibliografia }
/insert/activity             { titulo, estado, descripcion, fechacreacion, fechaentrega, revision, tecnica }
/insert/listactivity         { integrante, actividad }
/insert/chat                 { archivo, fecha }
/insert/listchat             { historial, chat }
/insert/event                { fechacreacion }
/insert/listevent            { historial, evento, integrante }
/insert/Meeting              { titulo, fecha, hora, duracion, descripcion, vigente }
/insert/listMeeting          { evento, reunion }
/insert/delivery             { titulo, descripcion, nombrearchivoguardado, actividad, entragable }
/insert/contenct             { nombre, nombrearchivo, descripcion, bibliografia }
/insert/listcontent          { entregable, contenido, actividad }
/insert/methodologyTool      { nombre, descripcion, bibliografia }
/insert/listmethodologyTool  { entregable, herramientametodologia }
/api/crearbucket             { bucket }
/proyecto/insertarArchivo    { bucket }  { archivo }
```

>rutas de actualización 

```sh
/update/useremail            { email, id }
/update/userpassword         { password, id }
/update/userprofilepicture   { foto, id } 
/update/usercv               { cv, id }
/update/userexperience       { experiencia, id }
/update/username             { nombre, id }
/update/userdescription      { descripcion, id }
/update/usercountry          { pais, id }
/update/userage              { edad, id }
/update/usergithub           { github, id }
/update/userbitbucket        { bitbucket, id }
/update/usergitlab           { gitlab, id }
/update/userlinkedin         { linkedin, id }
/update/user                 {id,email,password,experiencia,fotoperfil,nombrearchivohojadevida,nombre,descripcion, pais,edad,github,gitlab,bitbucket,linkedin}
/update/activitystate        { id, estado } 
/update/activitydeliverydate { id, fecha }
/update/activityrevised      { id, revision }
/update/memberrol            { id, rol }
/update/contentfilename      { id, nombreArchivo }
/update/deliverablestate     { id, estado }
/update/history              { id, descripcion }

```