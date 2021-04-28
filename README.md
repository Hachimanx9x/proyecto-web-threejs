# Esto comprende las funciones de la api

---

## Funcionamieto

Para el funcionamiento en modo de desarollo se usa el comando

```sh
$ npm run dev
```

## Explicacion de la version 0.0.1

esta solamente la conexion a una base de datos local, la acciones realizables son.

-Busqueda (Completado).
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
/auto/idiomas
/auto/herramienta
/auto/habilidades
```

para la ejecucion del servidor usa el comando en la capeta back
comando

```sh
yarn run dev
```

### rutas a usar

> rutas de busqueda de información

```sh
/perfil
```

```json
{
  "id": 78,
  "email": "correotest1@gmail.com",
  "password": "123456",
  "experiencia": 0,
  "nombre": "ffff",
  "descripcion": "ffffffffffff",
  "pais": "Colombia",
  "edad": 25,
  "github": "ffff",
  "gitlab": "ffff",
  "bitbucket": "ffff",
  "linkedin": "ffff",
  "herramienta": [
    {
      "nombre": "Reactjs",
      "descripcion": "Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres. ",
      "icono": "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
    },
    {
      "nombre": "Angularjs",
      "descripcion": "Es un framework de JavaScript de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página. Su objetivo es aumentar las aplicaciones basadas en navegador con capacidad de Modelo Vista Controlador (MVC), en un esfuerzo para hacer que el desarrollo y las pruebas sean más fáciles.",
      "icono": "https://www.vectorlogo.zone/logos/angular/angular-icon.svg"
    }
  ],
  "palabra": ["dddd", "perro"],
  "idiomas": [
    {
      "id": 43,
      "idiomanombre": "Ingles",
      "idiomanivel": "A1 Beginner"
    }
  ],
  "foto": "http://localhost:3030/proyecto/contenido/usuario78/50.PNG",
  "cv": "http://localhost:3030/proyecto/contenido/usuario78/Imagen3.png"
}
```

```sh
/login
```

esta ruta pide en el body un objeto de la siguiente estructura
{ email, password}

este devolvera un token con lo datos de ese momento del usuario

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6NSwiZW1haWwiOiJjb3Jyb2VAZ21haWwuY29tIiwiY29udHJhc2VuYSI6IjEyMzQ1Njc4OSIsImZvdG9wZXJmaWwiOiJudWxsIiwibm9tYnJlYXJjaGl2b2hvamFkZXZpZGEiOiJudWxsIiwiYW5vc2RlZXhwZXJpZW5jaWEiOm51bGwsIm5vbWJyZSI6Im5vbWJyZSB0ZXN0MTEiLCJkZXNjcmlwY2lvbiI6Im51bGwiLCJwYWlzIjoibnVsbCIsImVkYWQiOm51bGwsImdpdGh1YiI6Im51bGwiLCJnaXRsYWIiOiJudWxsIiwiYml0YnVja2V0IjoibnVsbCIsImxpbmtlZGluIjoibnVsbCJ9XSwiaWF0IjoxNjE4MTcyOTQzfQ.KGFii30jmdoocv_BNZ7S-gKMq9l0n8f-UaFHPUWWLCA",
  "datos": {
    "id": 5,
    "nombre": "nombre test11",
    "foto": null,
    "herramientas": [],
    "palabras": []
  }
}
```

```sh
/perfil
```

```json
{
  "id": 78,
  "email": "correotest1@gmail.com",
  "password": "123456",
  "experiencia": 0,
  "nombre": "ffff",
  "descripcion": "ffffffffffff",
  "pais": "Colombia",
  "edad": 25,
  "github": "ffff",
  "gitlab": "ffff",
  "bitbucket": "ffff",
  "linkedin": "ffff",
  "herramienta": [
    {
      "nombre": "Reactjs",
      "descripcion": "Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres. ",
      "icono": "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
    },
    {
      "nombre": "Angularjs",
      "descripcion": "Es un framework de JavaScript de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página. Su objetivo es aumentar las aplicaciones basadas en navegador con capacidad de Modelo Vista Controlador (MVC), en un esfuerzo para hacer que el desarrollo y las pruebas sean más fáciles.",
      "icono": "https://www.vectorlogo.zone/logos/angular/angular-icon.svg"
    }
  ],
  "palabra": ["dddd", "perro"],
  "idiomas": [
    {
      "id": 43,
      "idiomanombre": "Ingles",
      "idiomanivel": "A1 Beginner"
    }
  ],
  "foto": "http://localhost:3030/proyecto/contenido/usuario78/50.PNG",
  "cv": "http://localhost:3030/proyecto/contenido/usuario78/Imagen3.png"
}
```

```sh
/escritorio
```

este devolvera los datos de las actividades asginadas a la persona y del estado de los proyectos

```json
{
  "proyectos": [
    {
      "id": 120,
      "title": "proyecto test2",
      "descripcion": "cualquier cosa esta bien",
      "practicas": [
        {
          "practica": "Concepción de la experiencia multimedia",
          "porcentaje": 0
        }
      ],
      "icon": null,
      "image": null,
      "updates": [
        {
          "userName": "nombre test14",
          "projectName": "proyecto test2",
          "activity": "A8",
          "date": "2021-01-23",
          "fileName": "Coursera 2T27CP6QW48Q.pdf",
          "fileUrl": "http://localhost:3030/proyecto/contenido/proyecto120/Coursera 2T27CP6QW48Q.pdf"
        }
      ]
    },
    {
      "id": 121,
      "title": "proyecto test2",
      "descripcion": "cualquier cosa esta bien",
      "practicas": [
        {
          "practica": "Sistema Multimedia mínimo viable",
          "porcentaje": 0
        },
        {
          "practica": "Concepción de la experiencia multimedia",
          "porcentaje": 0
        }
      ],
      "icon": null,
      "image": null,
      "updates": []
    }
  ],
  "datos": {
    "nombre": "nombre test11",
    "foto": "http://localhost:3030/proyecto/contenido/usuario5/null",
    "herramientas": [],
    "palabras": []
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
      "palabras": ["perro"]
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
    "palabras": ["perro"],
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
    }
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
      "actividadid": 497,
      "titulo": "A8",
      "descripcion": "Diseñe la estructura y el flujo (narrativo, temporal, de\n                        eventos) de la historia a desarrollarse a partir del problema\n                        que desea resolverse, describiendo los acontecimientos que\n                        narra, los personajes que participan, el tiempo en el que se\n                        desarrolla y el espacio en el que suceden dichos\n                        acontecimientos.",
      "revisiones": 1,
      "nombre": "nombre test14",
      "foto": null,
      "rol": "Arquitecto Experiencia Multimedia",
      "estado": "entregada",
      "fechaentrega": "2021-01-23",
      "tecnica": "Video como apoyo a la etnografía",
      "namefile": "Coursera 2T27CP6QW48Q.pdf",
      "contenido": "http://localhost:3030/proyecto120/Coursera 2T27CP6QW48Q.pdf"
    },
    {
      "actividadid": 503,
      "titulo": "A9",
      "descripcion": "Defina las bases del diseño de una experiencia multimedia\n                    interactiva, a partir de la historia y el (los) problema(s)\n                    identificado(s), especificando los hitos de la historia en donde\n                    el Sistema Multimedia debe producir en el usuario una\n                    influencia cognitiva, emocional y sensorial.",
      "revisiones": 0,
      "nombre": "nombre test14",
      "foto": null,
      "rol": "Arquitecto Experiencia Multimedia",
      "estado": "asignada",
      "fechaentrega": "2021-01-23",
      "tecnica": "Producción de metáforas y analogías",
      "namefile": null,
      "contenido": "http://localhost:3030/proyecto120/null"
    }
  ],
  "entregables": [
    {
      "id": 175,
      "nombre": "Propuesta de diseño de la Experiencia Multimedia",
      "descripcion": "Consiste en un documento en donde se especifica:\n                    -El universo narrativo y la historia en la cual se inscribe\n                    la experiencia multimedia. \n                    Elemento Tipo Descripción\n                    -Las metáforas y analogías que se han estimado\n                    necesarias para expresar la historia en la cual se\n                    inscribe la experiencia multimedia.\n                    -Los personajes que intervienen en la historia, así\n                    como sus atributos físicos y emocionales.\n                    -Los medios digitales que se estiman necesarios para la\n                    representación de la experiencia multimedia\n                    interactiva.",
      "estado": "asignado",
      "tipoactivo": "documento",
      "fechaentrega": "2021-01-23",
      "revisiones": 0,
      "namefile": null,
      "contenido": "http://localhost:3030/proyectoundefined/null"
    },
    {
      "id": 176,
      "nombre": "Especificaciones del diseño responsable",
      "descripcion": "Este documento especifica los siguientes factores\n                    relacionados con el diseño responsable:\n                    -La especificación de las potenciales tensiones de valor\n                    que pueden producirse entre diferentes interesados, y\n                    las posibles estrategias para su neutralización y\n                    gestión.\n                    - Un listado en donde se especifican potenciales usos\n                    de la solución, con propósitos diferentes a los\n                    concebidos por sus diseñadores, así como las posibles\n                    estrategias para reducir la probabilidad sobre este tipo\n                    de escenarios.\n                    -La especificación de las leyes y normativas con alto\n                    potencial de influir en el Sistema Multimedia y el\n                    despliegue de su experiencia multimedia, y los\n                    mecanismos para monitorear y controlar su\n                    cumplimiento. ",
      "estado": "asignado",
      "tipoactivo": "documento",
      "fechaentrega": "2021-01-23",
      "revisiones": 0,
      "namefile": null,
      "contenido": "http://localhost:3030/proyectoundefined/null"
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
      "iduser": 12,
      "idcontac": 7,
      "nombre": "nombre test16",
      "descripcion": "null",
      "foto": null,
      "palabras": ["perro"],
      "herramientas": [
        {
          "id": 1,
          "nombre": "Reactjs",
          "descripcion": "Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres. ",
          "icono": "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        },
        {
          "id": 32,
          "nombre": "Adobe Ilustrator",
          "descripcion": "Es un editor de gráficos vectoriales en forma de taller de arte que trabaja sobre un tablero de dibujo, conocido como «mesa de trabajo» y está destinado a la creación artística de dibujo y pintura para ilustración, para crear y diseñar imágenes, sirve para editar entre otras cosas (ilustración como rama del arte digital aplicado a la ilustración técnica o el diseño gráfico, entre otros).",
          "icono": "https://cdn.worldvectorlogo.com/logos/adobe-illustrator-cc.svg"
        }
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
    "start": "2/2/2021 15:0:00",
    "end": "2/2/2021 17:0:00",
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
    "start": "2/2/2021 15:0:00",
    "end": "2/2/2021 17:0:00",
    "descripcion": "test",
    "vigente": 1
  }
]
```

esta ruta trae la documentación

```sh
//metodologia/:name   //  CEM || SMMV
```

```json
{
  "nombre": "Concepción de la experiencia multimedia",
  "descripcion": "Con el uso de esta práctica se plantea el poder diseñar de una \n            manera concreta todos los elementos que hacen parte de la experiencia multimedia\n             propias del sistema así como relación todos sus elementos ",
  "alfas": [
    {
      "nombre": "Experiencia multimedia",
      "descripcion": "define los elementos de valor dentro de la experiencia a ofrecer así mismo ofrece diferentes, métodos para un concepción acertada.",
      "estados": [
        {
          "nombre": "Identificado",
          "descripcion": "Se han identificado una serie de factores\n            críticos para el diseño responsable del Sistema\n            Multimedia, que afectan a sus interesados (usuarios,\n            clientes, interesados indirectos): tensiones de valor\n            entre interesados, posibles usos mal intencionados del\n            Sistema Multimedia, patrones que afectan el Sistema\n            Multimedia, leyes y normatividades que influyen en la\n            solución, aspectos culturales, sociales y cognitivos que\n            influyen en la comunidad objeto de análisis."
        },
        {
          "nombre": "Comprendido",
          "descripcion": "El equipo de trabajo y los interesados\n            (usuarios, clientes y otros interesados) tienen un\n            entendimiento común del significado y alcance de los\n            factores clave que son críticos para el diseño\n            responsable del Sistema Multimedia, y la manera en\n            cómo influyen en la experiencia multimedia. "
        },
        {
          "nombre": "Acordado",
          "descripcion": "El equipo de trabajo y los interesados,\n            identifican de manera conjunta, la necesidad de\n            concebir ideas de diseño que mitiguen los factores\n            adversos y potencien los factores favorables que creen\n            valor en torno al diseño responsable."
        },
        {
          "nombre": "Concebido",
          "descripcion": "El equipo de trabajo y los interesados,\n                coinciden en que la concepción de la solución\n                propuesta para el diseño responsable es la adecuada\n                para atender los factores que influyen en la\n                experiencia multimedia. "
        }
      ]
    },
    {
      "nombre": "Diseño responsable",
      "descripcion": "En este apartado se estará haciendo uso de la experiencia ofrecida y los posibles efectos positivos o negativos que se puede tener sobre el usuarios.",
      "estados": [
        {
          "nombre": "Identificado",
          "descripcion": "Se han identificado una serie de factores\n            críticos para el diseño responsable del Sistema\n            Multimedia, que afectan a sus interesados (usuarios,\n            clientes, interesados indirectos): tensiones de valor\n            entre interesados, posibles usos mal intencionados del\n            Sistema Multimedia, patrones que afectan el Sistema\n            Multimedia, leyes y normatividades que influyen en la\n            solución, aspectos culturales, sociales y cognitivos que\n            influyen en la comunidad objeto de análisis."
        },
        {
          "nombre": "Comprendido",
          "descripcion": "El equipo de trabajo y los interesados\n            (usuarios, clientes y otros interesados) tienen un\n            entendimiento común del significado y alcance de los\n            factores clave que son críticos para el diseño\n            responsable del Sistema Multimedia, y la manera en\n            cómo influyen en la experiencia multimedia. "
        },
        {
          "nombre": "Acordado",
          "descripcion": "El equipo de trabajo y los interesados,\n            identifican de manera conjunta, la necesidad de\n            concebir ideas de diseño que mitiguen los factores\n            adversos y potencien los factores favorables que creen\n            valor en torno al diseño responsable."
        },
        {
          "nombre": "Concebido",
          "descripcion": "El equipo de trabajo y los interesados,\n                coinciden en que la concepción de la solución\n                propuesta para el diseño responsable es la adecuada\n                para atender los factores que influyen en la\n                experiencia multimedia. "
        }
      ]
    }
  ],
  "entregables": [
    {
      "titulo": "Propuesta de diseño de la Experiencia Multimedia",
      "descripcion": "Consiste en un documento en donde se especifica:\n                    -El universo narrativo y la historia en la cual se inscribe\n                    la experiencia multimedia. \n                    Elemento Tipo Descripción\n                    -Las metáforas y analogías que se han estimado\n                    necesarias para expresar la historia en la cual se\n                    inscribe la experiencia multimedia.\n                    -Los personajes que intervienen en la historia, así\n                    como sus atributos físicos y emocionales.\n                    -Los medios digitales que se estiman necesarios para la\n                    representación de la experiencia multimedia\n                    interactiva.",
      "herramientas": [
        {
          "titulo": "Boceto de Storyboards",
          "descripcion": "Corresponde los diferentes bocetos que recrean los\n                    Storyboards que expresan la historia en la cual se\n                    inscribe la experiencia multimedia (ver matriz 5). ",
          "bibliografia": ""
        },
        {
          "titulo": "Bosquejos de metáforas y analogías",
          "descripcion": "Son los bosquejos producidos en torno a la\n                    representación de diferentes elementos\n                    pertenecientes al universo narrativo, y con asociación\n                    a otros elementos del mundo real, en el cual tiene\n                    lugar la historia en la que se inscribe la experiencia\n                    multimedia (ver matriz 5). ",
          "bibliografia": ""
        }
      ]
    },
    {
      "titulo": "Especificaciones del diseño responsable",
      "descripcion": "Este documento especifica los siguientes factores\n                    relacionados con el diseño responsable:\n                    -La especificación de las potenciales tensiones de valor\n                    que pueden producirse entre diferentes interesados, y\n                    las posibles estrategias para su neutralización y\n                    gestión.\n                    - Un listado en donde se especifican potenciales usos\n                    de la solución, con propósitos diferentes a los\n                    concebidos por sus diseñadores, así como las posibles\n                    estrategias para reducir la probabilidad sobre este tipo\n                    de escenarios.\n                    -La especificación de las leyes y normativas con alto\n                    potencial de influir en el Sistema Multimedia y el\n                    despliegue de su experiencia multimedia, y los\n                    mecanismos para monitorear y controlar su\n                    cumplimiento. ",
      "herramientas": [
        {
          "titulo": "Kit de tarjetas de previsión",
          "descripcion": "Es un kit de tarjetas, para la realización de diferente\n                    tipo de análisis, en este caso, permite identificar\n                    tensiones de valor, posibles usos futuros del Sistema\n                    Multimedia, y usos diferentes para los cuales fue\n                    concebido (ver matriz 6). ",
          "bibliografia": ""
        },
        {
          "titulo": "Reunión lluvia de ideas leyes y normatividades",
          "descripcion": "Consiste en espacios de trabajo que facilitan el análisis,\n                    identificación y discusión sobre aspectos legales y\n                    normativos, que pueden influyen en la concepción de\n                    la experiencia multimedia, así como en el desarrollo\n                    del Sistema Multimedia (ver matriz 6). ",
          "bibliografia": ""
        }
      ]
    }
  ],
  "actividades": [
    {
      "titulo": "A8",
      "descripcion": "Diseñe la estructura y el flujo (narrativo, temporal, de\n                        eventos) de la historia a desarrollarse a partir del problema\n                        que desea resolverse, describiendo los acontecimientos que\n                        narra, los personajes que participan, el tiempo en el que se\n                        desarrolla y el espacio en el que suceden dichos\n                        acontecimientos.",
      "tecnicas": [
        {
          "titulo": "Video como apoyo a la etnografía",
          "descripcion": "-Defina aquello que debe filmarse. -Determine quién llevará a cabo la filmación. -Realice la gestión necesaria para obtener los permisos de filmación. -Realice el video. -Analice y recopile información del video.",
          "bibliografia": ""
        },
        {
          "titulo": "Definición de personas",
          "descripcion": "-Genere una lista de usuarios potenciales y sus atributos relevantes alrededor de la experiencia multimedia. -Defina un número finito y controlable de tipos de usuario. -Cree personas asociadas a los tipos de usuario, asociándole los atributos definidos con anterioridad (nombre, edad, género, profesión, gustos, intereses, etc.). -Construya un perfil visual para cadapersona, que sea altamente visual y rápido de leer, asociándole sus atributos, anécdotas y citas para cada uno.",
          "bibliografia": ""
        }
      ]
    },
    {
      "titulo": "A9",
      "descripcion": "Defina las bases del diseño de una experiencia multimedia\n                    interactiva, a partir de la historia y el (los) problema(s)\n                    identificado(s), especificando los hitos de la historia en donde\n                    el Sistema Multimedia debe producir en el usuario una\n                    influencia cognitiva, emocional y sensorial.",
      "tecnicas": [
        {
          "titulo": "Producción de metáforas y analogías",
          "descripcion": "-Determine el punto de partida para el uso de metáforas y analogías. -Identifique las mejores metáforas y analogías para el desarrollo de la historia y su implementación en la experiencia. *Analogía directa (objetos reales). *Analogía de fantasía (objetos que no existen pero que pueden ser imaginables). *Analogía simbólica (compare aspectos del concepto, con aspectos de otro diferente).  *Analogía personal (relacionarse así mismo con el concepto, poniéndose en una situación determinada). -Genere los conceptos por cada metáfora y analogía producida. -Documente, discuta y mejore los conceptos. Discuta cómo deberían ser evaluados y desarrollados a futuro. Conserve los prototipos de baja fidelidad de las metáforas y analogías producidas.",
          "bibliografia": ""
        },
        {
          "titulo": "Generación de Storyboards",
          "descripcion": "-Defina con claridad la solución que se desea ilustrar. -Cree los personajes y describa sus experiencias. -Trace el viaje a través de situaciones imaginadas y defina puntos en el mapa en donde el usuario se encontrará con contenido multimedia, percepciones sensoriales, opciones de interacción con la experiencia. -Ilustre los escenarios con un storyboard marco a marco, desarrollando las narrativas en cada uno, utilizando bocetos. -Comparta la historia con los demás interesados y utilice su retroalimentación para refinar conceptos y demás aspectos como el tipo de contenido multimedia a utilizar, así como las percepciones, cognición o posibilidades de interacción que desean influirse en cada uno de los puntos del mapa. -Conserve los prototipos de baja fidelidad del storyboard producido.",
          "bibliografia": ""
        }
      ]
    }
  ],
  "roles": [
    {
      "nombre": "Arquitecto Experiencia Multimedia",
      "descripcion": "Consiste en el rol que hace parte del equipo de\n                    Arquitectos, responsable de llevar a cabo la realización\n                    de las actividades A8, A9 y A12, A18 y A19 necesarios\n                    para la generación de la propuesta de diseño de la\n                    experiencia multimedia, y las especificaciones del\n                    diseño responsable (ver matriz 2). ",
      "perfiles": ["Ing multimedia", "Diseñador", "Diseñador UX"]
    },
    {
      "nombre": "Arquitecto de producción de contenidos",
      "descripcion": "Consiste en el rol que hace parte del equipo de\n                    Arquitectos, responsable de llevar a cabo la realización\n                    de la actividad A10, para la definición de los contenidos\n                    multimedia, su estructura y la concepción de las\n                    ambientaciones necesarias para su despliegue, como\n                    elementos clave de la propuesta de diseño de la\n                    experiencia multimedia (ver matriz 2).",
      "perfiles": ["Diseñador", "Diseñador UX", "Diseñador UI"]
    }
  ]
}
```

> rutas de inserción

esta ruta permite la creacion de un usuario

```sh
/create/usuario
```

este pide un objeto con la siguiente estructura

```json
{ "email": "email@gmail.com", "password": "123asd", "nombre": "nombretest" }
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
{ "usuario": 1, "preferencia": true }
```

```sh
/agregar/idioma
```

esta ruta permite agregar los idiomas en tu lista de idiomas
se requiere de token para identificar al usuario
y se manden las id de los idiomas

```json
{ "idioma": [1, 3] }
```

```sh
/agregar/palabraclave
```

esta agrega las palbras a traves de una lista de palbras que identifiquen a la persona

```json
{ "palabra": "palabra" }
```

```sh
/agregar/herramientas
```

este pide un objeto con la siguiente estructura

```json
{ "herramienta": [1, 3] }
```

```sh
/create/proyecto
```

este pide un objeto con la siguiente estructura

```json

//body
{
  "nombre": "tes proyecto",
  "descripcion": "descripcion test",
  "practica": ["nmombre practica1 ", "nmombre practica2"],
  "integrantes": [
    {
      "user": 7,
      "rol": "Arquitecto de producción de contenidos"
    },
    {
      "user": 6,
      "rol": "Arquitecto de información"
    }
  ]
}

//file
 { "banner":"aqui va el archivo" , "icon" :"aqui va el archivo"}
```

Roles permitidos para la creación de un proyecto segun las dos practicas

```json
{
  "CEM": [
    "Arquitecto Experiencia Multimedia",
    "Arquitecto de producción de contenidos",
    "Arquitecto de información",
    "Arquitecto de pruebas"
  ],
  "SMMV": [
    "Arquitecto Experiencia Multimedia",
    "Arquitecto de Hardware/Software",
    "Arquitecto de información",
    "Diseñador Audiovisual",
    "Diseñador de Concepto y Storyboard"
  ]
}
```

```sh
/crear/reunion
```

este pide un objeto con la siguiente estructura

```json
{
  "proyec": 168,
  "fecha": "02-02-2021",
  "inicio": "15:00",
  "fin": "17:23",
  "descripcion": "test descripcion",
  "titulo": "test titulo"
}
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
{ "actividad": 1, "archivo": "file" }
```

```sh
/entrega/entregable
```

esta ruta resive la entregable que es la id del entregable y un archivo

```json
{ "actividad": 1, "archivo": "file" }
```

```sh
/actualizar/usuario
```

esta es la ruta de actualizacion que usa un token de este saca el id para saber que usaurio debe actualizar
esto es dinamico y dependiendo de que parte de la estructura de datos este entrando hara la actualizacion

```json
{
  "email": "email@gmail.com",
  "password": "123456789",
  "experiencia": 1,
  "nombre": "nombre 2 ",
  "descripcion": "descripcion usuario",
  "pais": "pais usuario",
  "edad": 20,
  "github": "link",
  "gitlab": "link",
  "bitbucket": "link",
  "linkedin": "link",
  "herramienta": [1, 2, 3],
  "palabra": ["test1", "test2"],
  "idiomas": [1, 2, 3],
  "foto": "file foto de perfil",
  "cv": "hoja de vida  file"
}
```

asi mismo tambien se puede resibir dos archivos en variables foto o cv en caso de rebicirlos se actualizaran los archivos del usuario

```sh
/update/contacto
```

esla id del contacto a a gregar

```json
{ "preferences": true, "id": 2 }
```

```sh
/reasignar/actividad
```

esta ruta reasigna la una actividad a un integrante en especifico

```json
{ "actividad": 1, "fecha": "2021-12-31", "tecnica": "titulo_tecnica" }
```

```sh
put
/comiquieras/actividad
```

```json
//req.body
{
   "actividad": 1, "fecha": "2021-12-31", "tecnica": "titulo_tecnica"
}
//req.files
{
  "archivo":"aqui va el archivo"
}
```

> rutas de eliminación

```sh
/eliminar/proyecto
```

esta ruta elimina el proyecto con todos sus archivos

```json
{ "proyecto": 1 }
```

```sh
/
```

esta ruta todo el contenido del a base de datos pero requiere un codigo

```json
{ "codigo": 1234 }
```

### rutas a usar de la api

Esta devuelven un objeto con una array llamado API que contiene los objetos generales dentro de la base de datos, esto ayuda para el control actual de la información en todo momento siendo un método directo para la consulta de la información, esto fue usado durante la fase de testeo.

> rutas de busqueda

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
      "icono": "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
    },
    {
      "id": 2,
      "nombre": "Angularjs",
      "tipo": "desarrollo",
      "descripcion": "Es un framework de JavaScript de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página. Su objetivo es aumentar las aplicaciones basadas en navegador con capacidad de Modelo Vista Controlador (MVC), en un esfuerzo para hacer que el desarrollo y las pruebas sean más fáciles.",
      "icono": "https://www.vectorlogo.zone/logos/angular/angular-icon.svg"
    }
  ]
}
```

> rutas de eliminación

````sh
/delete/lenguaje
/delete/habilidad
/delete/herramientas
/delete/usuario
/delete/palabraclave
/delete/listalenguajeuser
/delete/contacto
este es el id de contacto no de usuario
```json
{"id": 1}
````

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
/ //se requiere codigo

````

> rutas de inserción

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
````

> rutas de actualización

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
