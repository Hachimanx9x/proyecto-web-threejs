module.exports = {
    nombre: "Metodologia para la preproduccion de un sistema multiemdia",
    descripcion: "ayuda a cencebir ssitema multimedia",
    consejo: "No sacar la información de wikipedia, hace uso de fuentes confiables",

    CEM: {
        nombre: "Concepción de la experiencia multimedia",
        descripcion: `Con el uso de esta práctica se plantea el poder diseñar de una 
        manera concreta todos los elementos que hacen parte de la experiencia multimedia
         propias del sistema así como relación todos sus elementos `,
        alfas: [
            {
                nombre: "Experiencia multimedia",
                descripcion: "define los elementos de valor dentro de la experiencia a ofrecer así mismo ofrece diferentes, métodos para un concepción acertada.",
                estado: "iniciado"
            },
            {
                nombre: "Diseño responsable",
                descripcion: "En este apartado se estará haciendo uso de la experiencia ofrecida y los posibles efectos positivos o negativos que se puede tener sobre el usuarios.",
                estado: "iniciado"
            }
        ],
        entregables: [
            {
                entregatitulo: "Propuesta de diseño de la Experiencia Multimedia ",
                entregadescripcion: `Consiste en un documento en donde se especifica:
                -El universo narrativo y la historia en la cual se inscribe
                la experiencia multimedia. 
                Elemento Tipo Descripción
                -Las metáforas y analogías que se han estimado
                necesarias para expresar la historia en la cual se
                inscribe la experiencia multimedia.
                -Los personajes que intervienen en la historia, así
                como sus atributos físicos y emocionales.
                -Los medios digitales que se estiman necesarios para la
                representación de la experiencia multimedia
                interactiva.`,
                entregaestado: "asignado",
                entregatipoArchivo: "documento",
                entregafechaEntrega: "2021-01-23",
                entreganumeroRevisiones: 0,
                Herramientas: [
                    "Boceto de Storyboards",
                    "Bosquejos de metáforas y analogías",
                    "Registro de vídeos",
                    "Metada de personas",
                    "Matriz de medios digitales/PS/MI",
                    "Tarjetas de clasificación de información",
                    "Generación de prototipos físicos/digitales",
                    "Journey Map"
                ]
            },
            {
                entregatitulo: "Especificaciones del diseño responsable ",
                entregadescripcion: `Este documento especifica los siguientes factores
                relacionados con el diseño responsable:
                -La especificación de las potenciales tensiones de valor
                que pueden producirse entre diferentes interesados, y
                las posibles estrategias para su neutralización y
                gestión.
                - Un listado en donde se especifican potenciales usos
                de la solución, con propósitos diferentes a los
                concebidos por sus diseñadores, así como las posibles
                estrategias para reducir la probabilidad sobre este tipo
                de escenarios.
                -La especificación de las leyes y normativas con alto
                potencial de influir en el Sistema Multimedia y el
                despliegue de su experiencia multimedia, y los
                mecanismos para monitorear y controlar su
                cumplimiento. `,
                entregaestado: "asignado",
                entregatipoArchivo: "documento",
                entregafechaEntrega: "2021-01-23",
                entreganumeroRevisiones: 0,
                Herramientas: [
                    "Kit de tarjetas de previsión",
                    "Reunión lluvia de ideas leyes y normatividades",
                    "Matriz de patrones"
                ]
            }
        ],
        Roles: [
            {
                nombre: "Arquitecto Experiencia Multimedia ",
                descripcion: `Consiste en el rol que hace parte del equipo de
                Arquitectos, responsable de llevar a cabo la realización
                de las actividades A8, A9 y A12, A18 y A19 necesarios
                para la generación de la propuesta de diseño de la
                experiencia multimedia, y las especificaciones del
                diseño responsable (ver matriz 2). `,
                actividades: ["A8", "A9", "A12", "A18", "A19"]
            },
            {
                nombre: "Arquitecto de producción de contenidos ",
                descripcion: `Consiste en el rol que hace parte del equipo de
                Arquitectos, responsable de llevar a cabo la realización
                de la actividad A10, para la definición de los contenidos
                multimedia, su estructura y la concepción de las
                ambientaciones necesarias para su despliegue, como
                elementos clave de la propuesta de diseño de la
                experiencia multimedia (ver matriz 2).`,
                actividades: ["A10"]
            },
            {
                nombre: "Arquitecto de información ",
                descripcion: `Es el rol responsable porque se cumplan las actividades
                A12 y A17, necesarias para generar el producto de
                trabajo de la propuesta de diseño de la experiencia
                multimedia, y las especificaciones del diseño
                responsable (ver matriz 2). `,
                actividades: ["A12", "A17"]
            },
            {
                nombre: "Arquitecto de pruebas ",
                descripcion: `Es el rol responsable de llevar a cabo la actividad A14,
                que consiste en planificar y realizar las diferentes
                pruebas que se estimen necesarias, para verificar la
                concepción del diseño de la experiencia multimedia, y
                sus diferentes elementos constitutivos, como parte
                fundamental de la propuesta de diseño de la
                experiencia multimedia interactiva (ver matriz 2). `,
                actividades: ["A14"]
            },
        ],
        Herramientas: [
            {
                nombre: "Boceto de Storyboards",
                descripcion: `Corresponde los diferentes bocetos que recrean los
                Storyboards que expresan la historia en la cual se
                inscribe la experiencia multimedia (ver matriz 5). `,
                bibliografia: ``
            },
            {
                nombre: "Bosquejos de metáforas y analogías",
                descripcion: `Son los bosquejos producidos en torno a la
                representación de diferentes elementos
                pertenecientes al universo narrativo, y con asociación
                a otros elementos del mundo real, en el cual tiene
                lugar la historia en la que se inscribe la experiencia
                multimedia (ver matriz 5). `,
                bibliografia: ``
            },
            {
                nombre: "Registro de vídeos",
                descripcion: `Se trata del registro de diferentes espacios de trabajo
                registrados digitalmente y con el permiso de sus
                participantes, en los diferentes espacios de ideación y
                creatividad del equipo de trabajo con los interesados
                (ver matriz 5).`,
                bibliografia: ``
            },
            {
                nombre: "Matriz de medios digitales/PS/MI",
                descripcion: `Facilita la organización y asociación de los medios
                digitales, percepciones sensoriales y modalidades de
                interacción más indicadas, para el despliegue de la
                experiencia multimedia (ver matriz 5). `,
                bibliografia: ``
            },
            {
                nombre: "Metada de personas",
                descripcion: `Ayuda a representar a las personas y a sus intereses en
                el contexto de la experiencia multimedia interactiva
                (ver matriz 5).`,
                bibliografia: ``
            },
            {
                nombre: "Tarjetas de clasificación de información",
                descripcion: `Permite la clasificación de la información y su relación
                con los demás elementos que componen la
                experiencia multimedia interactiva. Sirve además para
                la realización del trabajo en etapas posteriores como
                la producción, para la definición de una arquitectura
                de información (ver matriz 5). `,
                bibliografia: ``
            },
            {
                nombre: "Generación de prototipos físicos/digitales",
                descripcion: `Se trata de una representación mediante la cual se
                acuerda y se concreta la ideación y la creatividad,
                llevada a cabo bajo una mirada colectiva de los
                interesados, sobre los diferentes elementos que
                componen la experiencia multimedia interactiva, y que
                es útil a lo largo de todo el ciclo de vida del desarrollo
                de un Sistema Multimedia (ver matriz 5).`,
                bibliografia: ``
            },
            {
                nombre: "Journey Map",
                descripcion: `Permite expresar la historia de la experiencia
                multimedia, los elementos que componen su universo
                narrativo, y el contenido multimedia, mediante una
                representación visual, en un orden cronológico y/o por
                eventos, que facilita su entendimiento y alcance, por
                parte de los interesados (ver matriz 5). `,
                bibliografia: ``
            },
            {
                nombre: "Kit de tarjetas de previsión",
                descripcion: `Es un kit de tarjetas, para la realización de diferente
                tipo de análisis, en este caso, permite identificar
                tensiones de valor, posibles usos futuros del Sistema
                Multimedia, y usos diferentes para los cuales fue
                concebido (ver matriz 6). `,
                bibliografia: ``
            },
            {
                nombre: "Reunión lluvia de ideas leyes y normatividades",
                descripcion: `Consiste en espacios de trabajo que facilitan el análisis,
                identificación y discusión sobre aspectos legales y
                normativos, que pueden influyen en la concepción de
                la experiencia multimedia, así como en el desarrollo
                del Sistema Multimedia (ver matriz 6). `,
                bibliografia: ``
            },
            {
                nombre: "Matriz de patrones",
                descripcion: `Facilita la clasificación y documentación de los
                patrones identificados, que influyen en la concepción
                de la experiencia multimedia, y que pueden ser
                reutilizados para el desarrollo del Sistema Multimedia
                (ver matriz 6). `,
                bibliografia: ``
            }
        ],
        Actividades: [
            {
                titulo: "A8",
                estado: "asignada",
                descripcion: `Diseñe la estructura y el flujo (narrativo, temporal, de
                    eventos) de la historia a desarrollarse a partir del problema
                    que desea resolverse, describiendo los acontecimientos que
                    narra, los personajes que participan, el tiempo en el que se
                    desarrolla y el espacio en el que suceden dichos
                    acontecimientos.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A9",
                estado: "asignada",
                descripcion: `Defina las bases del diseño de una experiencia multimedia
                interactiva, a partir de la historia y el (los) problema(s)
                identificado(s), especificando los hitos de la historia en donde
                el Sistema Multimedia debe producir en el usuario una
                influencia cognitiva, emocional y sensorial.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A10",
                estado: "asignada",
                descripcion: `Defina los tipos de medios digitales a partir de los cuales se
                llevará a cabo la producción de los contenidos multimedia,
                así como la estimación de las ambientaciones del entorno
                físico necesarias, que involucren al usuario en el continuo de
                la experiencia, antes, durante y después de interactuar con
                los contenidos multimedia.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A11",
                estado: "asignada",
                descripcion: `Identifique las diferentes fuentes y procesos de
                transformación de la información que se producen como
                resultado de la experiencia multimedia, antes, durante y
                después de la interacción del usuario con la solución.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A12",
                estado: "asignada",
                descripcion: `Defina las diferentes percepciones sensoriales, así como las
                distintas modalidades de interacción guiadas por el diseño de
                la experiencia multimedia y los tipos de medios digitales, que
                son necesarios para asegurar la influencia psicológica,
                cognitiva y sensorial en el usuario.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A14",
                estado: "asignada",
                descripcion: `Efectúe la realización preliminar de la verificación del diseño de la experiencia multimedia.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A17",
                estado: "asignada",
                descripcion: `Identifique cuáles son las leyes y normatividades vigentes a
                nivel global, nacional y regional, que pueden influir en el
                diseño de la solución.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A18",
                estado: "asignada",
                descripcion: `Identifique factores relacionados con los efectos indirectos y
                de largo plazo, que pueden producirse como resultado del
                uso del Sistema Multimedia.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A19",
                estado: "asignada",
                descripcion: `Identifique posibles patrones que respondan a la concepción
                del contexto de desarrollo del Sistema Multimedia y de otras
                soluciones existentes, así como patrones de comportamiento
                en las personas.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            }
        ],
        contenidos: [
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" }
        ]
    },

    SMMV: {
        nombre: "Sistema Multimedia mínimo viable",
        descripcion: `Define el minimo producto viable para la entrega ante el cliente`,
        alfas: [
            {
                nombre: "Oportunidad",
                descripcion: "define la oportunidad dentro del mercado, asi como sus posibles amenazas y oportunidades",
                estado: "iniciado"
            },
            {
                nombre: "Valor del sistema multimedia",
                descripcion: "Define las propuestas de valor claves para hacer destacar al producto",
                estado: "iniciado"
            }
        ],
        entregables: [
            {
                entregatitulo: "Análisis de viabilidad del Sistema Multiemdia ",
                entregadescripcion: `Es un documento en donde se consigna un análisis
                sobre la necesidad de los diferentes tipos de recursos
                y de riesgos, a la luz de la aplicación de diferentes
                técnicas, que permiten hacer un análisis de viabilidad
                en torno al desarrollo del Sistema Multimedia. 
                `,
                entregaestado: "asignado",
                entregatipoArchivo: "documento",
                entregafechaEntrega: "2021-01-23",
                entreganumeroRevisiones: 0,
                Herramientas: [
                    "Modelo Canvas",
                    "Matriz de clasificación de recursos",
                    "Matriz DOFA",
                    "Estructura de desglose de riesgos del SM ",
                    "Kit tarjetas de previsión",
                    "Matriz de riesgos",
                    "Matriz para la clasificación de recursos Hardware/Software",
                    "Lluvia de ideas posibles métodos de ataque"
                ]
            },
            {
                entregatitulo: "Proposición de valor del Sistema Multimedia",
                entregadescripcion: `Consiste en el documento que especifica el análisis
                para la proposición de valor del Sistema Multimedia.`,
                entregaestado: "asignado",
                entregatipoArchivo: "documento",
                entregafechaEntrega: "2021-01-23",
                entreganumeroRevisiones: 0,
                Herramientas: [
                    "Matriz de proposición de valor"
                ]
            },
            {
                entregatitulo: "Visión del Sistema Multimedia Minimo Viable",
                entregadescripcion: `Se trata del documento en el cual se consigna el
                enunciado de la visión del Sistema Multimedia mínimo
                viable.`,
                entregaestado: "asignado",
                entregatipoArchivo: "documento",
                entregafechaEntrega: "2021-01-23",
                entreganumeroRevisiones: 0,
                Herramientas: [
                    "Estructura para la formulación de la visión del SMMV"
                ]
            },
            {
                entregatitulo: "Modelo Canvas del Sistema Multimedia Minimo Viable",
                entregadescripcion: `Consiste del documento o conjunto de documentos,
                en los cuales se inscribe el análisis del modelo Canvas
                del Sistema Multimedia mínimo viable. `,
                entregaestado: "asignado",
                entregatipoArchivo: "documento",
                entregafechaEntrega: "2021-01-23",
                entreganumeroRevisiones: 0,
                Herramientas: [
                    "Modelo Canvas adaptado"
                ]
            }
        ],
        Roles: [
            {
                nombre: "Arquitecto Experiencia Multimedia ",
                descripcion: `Consiste en el rol que hace parte del equipo de
                Arquitectos, responsable de llevar a cabo la realización
                de un conjunto de productos de trabajo de la práctica.`,
                actividades: ["A6"]
            },
            {
                nombre: "Arquitecto de Hardware/Software",
                descripcion: `Responsable de llevar a cabo, una serie de esfuerzos
                relacionados principalmente, con el análisis de
                viabilidad del Sistema Multimedia. `,
                actividades: ["A5", "A13"]
            },
            {
                nombre: "Arquitecto de información ",
                descripcion: `Es el rol responsable dentro del análisis de viabilidad,
                de analizar a la luz de la información y estructura, que
                sustenta el contenido multimedia, realizar una
                concepción inicial acerca de las posibles motivaciones
                que tengan potenciales adversarios para atacar el
                Sistema Multimedia, así como las consecuencias que
                esto podría traer a sus usuarios. `,
                actividades: ["A4"]
            },
            {
                nombre: "Diseñador Audiovisual",
                descripcion: `Es un miembro del equipo de diseño, cuya
                participación como apoyo en el análisis para la
                proposición de valor, visión y modelo Canvas del
                Sistema Multimedia mínimo viable, resulta crucial,
                dada la relevancia que deben cumplir los medios
                audiovisuales en la creación de Valor del Sistema
                Multimedia mínimo viable.`,
                actividades: ["A20", "A21"]
            },
            {
                nombre: "Diseñador de Concepto y Storyboard ",
                descripcion: `Se trata de un miembro del equipo de diseño, que
                apoya el análisis frente a la definición del Sistema
                Multimedia mínimo viable, atendiendo a su alineación
                frente al universo narrativo y la historia que han sido
                concebidas para la experiencia multimedia interactiva.
                `,
                actividades: ["A16", "A22"]
            },
        ],
        Herramientas: [
            {
                nombre: "Modelo Canvas",
                descripcion: `Permite concretar la hipótesis de valor, identificando
                para quiénes se persigue generar la creación de valor como resultado del desarrollo del Sistema
                Multimedia, expresando el problema que desea
                resolverse, la necesidad que busca satisfacerse, y la
                experiencia que pretende ofrecerse (ver matriz 4). `,
                bibliografia: ``
            },
            {
                nombre: "Matriz de clasificación de recursos",
                descripcion: `Por medio de la realización del análisis de estimación
                análoga y ascendente de recursos, se produce una
                matriz que estime los recursos necesarios y
                disponibles, para el desarrollo del Sistema Multimedia
                (ver matriz 4).`,
                bibliografia: ``
            },
            {
                nombre: "Matriz DOFA",
                descripcion: `Se trata de una matriz la cual no solamente puede
                aportar a la práctica sobre conocer mejor las
                motivaciones y necesidades que tienen clientes y
                patrocinadores, sino también, a las limitaciones que se
                tienen para alcanzarlas, como parte del análisis de
                viabilidad en el desarrollo del Sistema Multimedia (ver
                matriz 4).`,
                bibliografia: ``
            },
            {
                nombre: "Estructura de desglose de riesgos del SM ",
                descripcion: `A partir del análisis del desglose de riesgos, se lleva a
                cabo una estimación de los riesgos internos y
                externos, efectuando una jerarquía de riesgos
                asociados a la realización del Sistema Multimedia,
                relacionados con aspectos financieros, tecnológicos,
                políticos, normativos, entre otros (ver matriz 4).`,
                bibliografia: ``
            },
            {
                nombre: "Kit tarjetas de previsión",
                descripcion: `Ofrece la posibilidad para que los interesados y el
                equipo de trabajo, realicen una actividad encaminada
                hacia el análisis de las posibles motivaciones que
                pueden tener interesados indirectos, en atacar el
                Sistema Multimedia, entre otros factores (ver matriz
                6). `,
                bibliografia: ``
            },
            {
                nombre: "Matriz de riesgos",
                descripcion: `Se produce a partir de la identificación de riesgos por
                parte del equipo de trabajo, valiéndose de la
                realización de entrevistas y posible encuestan en
                campo, a diferentes interesados relacionados con el
                Sistema Multimedia (ver matriz 4). `,
                bibliografia: ``
            },
            {
                nombre: "Matriz para la clasificación de recursos Hardware/Software",
                descripcion: `Se trata de un instrumento que permite recopilar la
                información concebida, relacionada con los recursos
                específicos de hardware y software estimados para el
                desarrollo del Sistema Multimedia (ver matriz 5). `,
                bibliografia: ``
            },
            {
                nombre: "Lluvia de ideas posibles métodos de ataque",
                descripcion: `Apertura de espacios de trabajo colaborativo entre
                interesados y equipo de trabajo, con el fin de analizar
                las motivaciones, así como los posibles métodos de
                ataque al Sistema Multimedia, por parte de
                interesados indirectos. `,
                bibliografia: ``
            },
            {
                nombre: "Matriz de proposición de valor",
                descripcion: `Corresponde a la matriz que permite llevar a cabo, la
                realización del análisis de proposición de valor del
                Sistema Multimedia mínimo viable (ver matriz 11).  `,
                bibliografia: ``
            },
            {
                nombre: "Estructura para la formulación de la visión del SMMV",
                descripcion: `Corresponde al modelo de estructura gramatical que
                se sugiere, para llevar a cabo la realización de la
                formulación de la visión del Sistema Multimedia
                mínimo viable (ver tabla 14).`,
                bibliografia: ``
            },
            {
                nombre: "Modelo Canvas adaptado",
                descripcion: `Se trata de la estructura adaptada para la realización
                del modelo Canvas para el Sistema Multimedia
                mínimo viable (ver figura 12) y la descripción de sus
                diferentes componentes constitutivos (ver tabla 15). `,
                bibliografia: ``
            }
        ],
        Actividades: [
            {
                titulo: "A4",
                estado: "asignada",
                descripcion: `Identifique y clasifique cuáles son los riesgos asociados con el desarrollo del Sistema Multimedia.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A5",
                estado: "asignada",
                descripcion: `Defina una estimación de los recursos necesarios para el
                desarrollo del Sistema Multimedia y analice sobre su
                condición, disponibilidad o necesidad de adquisición.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A6",
                estado: "asignada",
                descripcion: `Analice la viabilidad para el desarrollo del Sistema
                Multimedia y contrástela con las oportunidades de
                innovación que genera para sus clientes y patrocinadores.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A13",
                estado: "asignada",
                descripcion: `Defina en un alto nivel de abstracción, las tecnologías
                hardware software, así como los objetos físicos necesarios
                que aseguren una calidad de la experiencia, alineados a las
                bases de su diseño.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A16",
                estado: "asignada",
                descripcion: `Identifique las motivaciones, recursos y métodos de
                potenciales adversarios que pueden decidir atacar el
                Sistema Multimedia y el impacto que esto puede causar en
                las personas que son usuarios de la solución.`,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A20",
                estado: "asignada",
                descripcion: `Definición de la proposición de valor del Sistema Multimedia.
                -Identifique los aportes de valor de la solución que se concibe, en el Plan para el Desarrollo del Sistema Multimedia.
                -Identifique al menos, dos soluciones existentes similares a la solución que actualmente se concibe (no necesariamente deben ser sistemas multimedia), y que sean utilizadas en el sector objetivo.
                `,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A21",
                estado: "asignada",
                descripcion: `Formulación de la visión para el Sistema Multimedia Mínimo Viable.
                -A partir de la proposición de valor, genere un espacio para lluvia de ideas con los interesados.
-Escoja diferentes ideas y estructúrelas a partir
de una serie de conectores y conceptos,
asegurándose hacer explícita la diferenciación
de valor en torno a la propuesta que se
concibe, en contraste con las existentes.
-Analice los resultados obtenidos, junto a los
interesados y realice los ajustes acordados.                
                `,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            },
            {
                titulo: "A22",
                estado: "asignada",
                descripcion: `Generación del modelo Canvas para el Sistema Multimedia Mínimo Viable.
                -Realice un análisis en cada uno de los elementos anteriormente descritos,
                comenzando con los de la parte superior y
luego hacia los de la parte inferior.
-Para la realización del análisis, utilice el PDSM
y la proposición de valor del Sistema
Multimedia, a partir de los cuales se
fundamenta el modelo Canvas para el SMMV.
-Evalúe el resultado del modelo Canvas para el
SMMV y discútalo con los interesados.
-Realice los ajustes al modelo Canvas del
SMMV en función de la retroalimentación de
los interesados.
                `,
                fechacreacion: "2021-01-11",
                fechaentrega: "2021-01-23",
                revision: 0,
                tecnica: 1
            }
        ],
        contenidos: [
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" },
            { nombre: "", nombrearchivo: "", descripcion: "", bibliografia: "" }
        ]
    }
};