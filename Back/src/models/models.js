module.exports = {
    nombre: "Metodologia para la preproduccion de un sistema multiemdia",
    descripcion: "ayuda a cencebir ssitema multimedia",
    consejo: "No sacar la información de wikipedia, hace uso de fuentes confiables",
    Practicas: [
        {
            Estados: [
                {
                    nombre: "Identificado",
                    descripcion: `Se han identificado una serie de factores
            críticos para el diseño responsable del Sistema
            Multimedia, que afectan a sus interesados (usuarios,
            clientes, interesados indirectos): tensiones de valor
            entre interesados, posibles usos mal intencionados del
            Sistema Multimedia, patrones que afectan el Sistema
            Multimedia, leyes y normatividades que influyen en la
            solución, aspectos culturales, sociales y cognitivos que
            influyen en la comunidad objeto de análisis.`
                },
                {
                    nombre: "Comprendido",
                    descripcion: `El equipo de trabajo y los interesados
            (usuarios, clientes y otros interesados) tienen un
            entendimiento común del significado y alcance de los
            factores clave que son críticos para el diseño
            responsable del Sistema Multimedia, y la manera en
            cómo influyen en la experiencia multimedia. `
                },
                {
                    nombre: "Acordado",
                    descripcion: `El equipo de trabajo y los interesados,
            identifican de manera conjunta, la necesidad de
            concebir ideas de diseño que mitiguen los factores
            adversos y potencien los factores favorables que creen
            valor en torno al diseño responsable.`
                },
                {
                    nombre: "Concebido",
                    descripcion: `El equipo de trabajo y los interesados,
                coinciden en que la concepción de la solución
                propuesta para el diseño responsable es la adecuada
                para atender los factores que influyen en la
                experiencia multimedia. `
                }
            ],
            nombre: "Concepción de la experiencia multimedia",
            descripcion: `Con el uso de esta práctica se plantea el poder diseñar de una 
            manera concreta todos los elementos que hacen parte de la experiencia multimedia
             propias del sistema así como relación todos sus elementos `,
            alfas: [
                {
                    nombre: "Experiencia multimedia",
                    descripcion: "define los elementos de valor dentro de la experiencia a ofrecer así mismo ofrece diferentes, métodos para un concepción acertada.",
                    estado: "iniciado",
                    entregable: [
                        "Propuesta de diseño de la Experiencia Multimedia"
                    ]
                },
                {
                    nombre: "Diseño responsable",
                    descripcion: "En este apartado se estará haciendo uso de la experiencia ofrecida y los posibles efectos positivos o negativos que se puede tener sobre el usuarios.",
                    estado: "iniciado",
                    entregable: [
                        "Especificaciones del diseño responsable"
                    ]
                }
            ],
            Entregables: [
                {
                    entregatitulo: "Propuesta de diseño de la Experiencia Multimedia",
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
                    entregatitulo: "Especificaciones del diseño responsable",
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
                    nombre: "Arquitecto Experiencia Multimedia",
                    descripcion: `Consiste en el rol que hace parte del equipo de
                    Arquitectos, responsable de llevar a cabo la realización
                    de las actividades A8, A9 y A12, A18 y A19 necesarios
                    para la generación de la propuesta de diseño de la
                    experiencia multimedia, y las especificaciones del
                    diseño responsable (ver matriz 2). `,
                    actividades: ["A8", "A9", "A11", "A18", "A19"]
                },
                {
                    nombre: "Arquitecto de producción de contenidos",
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
                    nombre: "Arquitecto de información",
                    descripcion: `Es el rol responsable porque se cumplan las actividades
                    A12 y A17, necesarias para generar el producto de
                    trabajo de la propuesta de diseño de la experiencia
                    multimedia, y las especificaciones del diseño
                    responsable (ver matriz 2). `,
                    actividades: ["A12", "A17"]
                },
                {
                    nombre: "Arquitecto de pruebas",
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
            Tecnicas: [
                {
                    titulo: "Video como apoyo a la etnografía",
                    descripcion: "-Defina aquello que debe filmarse. -Determine quién llevará a cabo la filmación. -Realice la gestión necesaria para obtener los permisos de filmación. -Realice el video. -Analice y recopile información del video.",
                    bibliografia: ""
                },
                {
                    titulo: "Definición de personas",
                    descripcion: "-Genere una lista de usuarios potenciales y sus atributos relevantes alrededor de la experiencia multimedia. -Defina un número finito y controlable de tipos de usuario. -Cree personas asociadas a los tipos de usuario, asociándole los atributos definidos con anterioridad (nombre, edad, género, profesión, gustos, intereses, etc.). -Construya un perfil visual para cadapersona, que sea altamente visual y rápido de leer, asociándole sus atributos, anécdotas y citas para cada uno.",
                    bibliografia: ""
                },
                {
                    titulo: "Producción de metáforas y analogías",
                    descripcion: "-Determine el punto de partida para el uso de metáforas y analogías. -Identifique las mejores metáforas y analogías para el desarrollo de la historia y su implementación en la experiencia. *Analogía directa (objetos reales). *Analogía de fantasía (objetos que no existen pero que pueden ser imaginables). *Analogía simbólica (compare aspectos del concepto, con aspectos de otro diferente).  *Analogía personal (relacionarse así mismo con el concepto, poniéndose en una situación determinada). -Genere los conceptos por cada metáfora y analogía producida. -Documente, discuta y mejore los conceptos. Discuta cómo deberían ser evaluados y desarrollados a futuro. Conserve los prototipos de baja fidelidad de las metáforas y analogías producidas.",
                    bibliografia: ""
                },
                {
                    titulo: "Generación de Storyboards",
                    descripcion: "-Defina con claridad la solución que se desea ilustrar. -Cree los personajes y describa sus experiencias. -Trace el viaje a través de situaciones imaginadas y defina puntos en el mapa en donde el usuario se encontrará con contenido multimedia, percepciones sensoriales, opciones de interacción con la experiencia. -Ilustre los escenarios con un storyboard marco a marco, desarrollando las narrativas en cada uno, utilizando bocetos. -Comparta la historia con los demás interesados y utilice su retroalimentación para refinar conceptos y demás aspectos como el tipo de contenido multimedia a utilizar, así como las percepciones, cognición o posibilidades de interacción que desean influirse en cada uno de los puntos del mapa. -Conserve los prototipos de baja fidelidad del storyboard producido.",
                    bibliografia: ""
                },
                {
                    titulo: "Mapa de experiencias convincentes",
                    descripcion: "-Seleccione una experiencia narrada que desea analizar y cree una hoja de trabajo que referencie los siguientes aspectos: atracción, entrada, compromiso, salida y extensión. -Describa la etapa de atracción, pensando en las diferentes interacciones previas que pueden generar interés. Describa todas las acciones que puede llevar a cabo para este propósito. -Describa la etapa de entrada, considerando lo que ocurre cuando el usuario llega a la experiencia y lo que esto influye en el propósito final. -Describa la etapa de compromiso, que consiste en el núcleo o esencia de la experiencia para el usuario. -Describa la etapa de salida, cuando el usuario se prepara para retirarse de la experiencia. -Describa la etapa de extensión, describiendo todo lo que debe sucederle al usuario después de la experiencia para mantenerlo comprometido.",
                    bibliografia: ""
                },
                {
                    titulo: "Matriz para la definición preliminar del tipo de medios digitales.",
                    descripcion: "-En el eje horizontal defina los diferentes tipos de medios digitales y en el eje vertical relacione los puntos definidos en la historia de la experiencia, en donde se desplegará contenido multimedia.  -En los puntos de intersección de la matriz defina conceptos favorables y desfavorables para el uso de cada medio digital, en cada uno de los hitos definidos en la historia. Defina para cada medio digital y cada hito un peso de 1 a 100. -Selección de los medios digitales para la potencial producción del contenido multimedia",
                    bibliografia: ""
                },
                {
                    titulo: "Análisis clasificación de información",
                    descripcion: "-Defina el conjunto de participantes en la prueba y las categorías de información para la experiencia. -Permita la realización de agrupaciones de categorías de información por parte de los participantes, en los conjuntos que consideren necesarios para el enfoque abierto. -Defina los conjuntos de agrupación para las categorías en el enfoque cerrado. -Realice análisis cualitativo y cuantitativo de los resultados, según se requiera.",
                    bibliografia: ""
                },
                {
                    titulo: "Diseño para la estructura de contenidos e información",
                    descripcion: "-Produzca una lista de componentes de información para la experiencia y clasifíquelos con etiquetas por: título, autor, imágenes, audio, video y documentos, entre otros.  -Diseñe la estructura y los esquemas que representan el flujo de información a lo largo de la experiencia. -Defina los sistemas de organización, etiquetado, navegación y búsqueda que debería ofrecerse a través de la experiencia. -Establezca los potenciales puntos de interacción del contenido con el usuario. -Socialice esta estructura y los esquemas con los demás arquitectos y realice sus ajustes.",
                    bibliografia: ""
                },
                {
                    titulo: "Wireframes",
                    descripcion: "-Construya representaciones de las potenciales interfaces de usuario en función de la experiencia. -Defina los elementos que deben ser interactivos con el usuario a través del boceto de las interfaces. -Asocie los contenidos digitales para cada componente del wireframe. -Vincule potenciales percepciones sensoriales y modalidades de interacción y vincúlelas a cada elemento del wireframe. -Socialice la propuesta y realice ajustes. -Conserve los prototipos de baja fidelidad de los wireframes producidos.",
                    bibliografia: ""
                },
                {
                    titulo: "Matriz de agrupamiento asimétrico entre percepciones sensoriales,modalidades de interacción y medios digitales.",
                    descripcion: "-Defina las percepciones sensoriales y las modalidades de interacción que va a analizar frente a los medios digitales seleccionados para la producción de contenido multimedia. -Defina la relación entre la percepción sensorial – modalidad de interacción –medio digital más adecuada, para la experiencia multimedia. -Cree la matriz asimétrica con las tres dimensiones descritas. -Defina un puntaje para cada relación que va entre 1 y 3. 1 representa una relación poco adecuada, 2 una relación medianamente adecuada y 3 una relación muy adecuada. -Construya la matriz asimétrica con los parámetros y asigne los puntajes en cada una de las relaciones. -Capture ideas y compártalas para abrir discusiones con el equipo de trabajo.",
                    bibliografia: ""
                },
                {
                    titulo: "Diseñe el journey map para la experiencia",
                    descripcion: "-Genere una lista de todas las actividades específicas que llevará a cabo el usuario en la experiencia. -Relacione las actividades específicas con actividades de alto nivel dentro de la experiencia. -Genere una lista de los medios digitales y asocie su despliegue a cada una de las actividades específicas en donde debe utilizarse.",
                    bibliografia: ""
                },
                {
                    titulo: "Prototipos de comportamiento",
                    descripcion: "-Identifique la actividad específica del journey map que desea simular y planifique la simulación de la situación, incluyendo los elementos necesarios, actores, objetos que se involucran en la actividad a simular. - Prepare el entorno para la simulación, encontrando o produciendo un entorno físico o virtual y exponga los comportamientos clave que desea entender (físico, cognitivo, social, cultural o emocional). Utilice accesorios para representar los conceptos y apoye a los participantes para que puedan interactuar con ellos.",
                    bibliografia: ""
                },
                {
                    titulo: "Prototipos de conceptos",
                    descripcion: "-Identifique el concepto o idea relacionada con la experiencia que desea probar y evalúe si es susceptible de prototiparse alguno o varios aspectos en una forma tangible y cuál sería su utilidad. - Defina un espacio en donde pueda llevarse a cabo la construcción del prototipo y su prueba. -Revise el prototipo que se asocia con la experiencia, pruébelo con su equipo de trabajo y con un grupo de usuarios y discuta sobre el mismo, a partir de los principios del diseño de la experiencia inicial, las necesidades de usuario, sus intereses y expectativas.",
                    bibliografia: ""
                },
                {
                    titulo: "Simulación de experiencia",
                    descripcion: "-Identificación de la pregunta de investigación. -Selección de la experiencia específica que desea simularse. -Diseñe la simulación y represente los recursos por medio de objetos con significado para los participantes, construya el entorno, produzca los mensajes necesarios para guiar a los participantes a través del servicio. -Ejecución de la simulación.",
                    bibliografia: ""
                },
                {
                    titulo: "Identificación de políticas y normativas",
                    descripcion: "-Realice una reunión de lluvia de ideas con expertos en la materia, que ayuden a identificar: *Políticas y normativas de la(s) organización(es) involucrada(s) representada(s) por patrocinador(es) y cliente(s). *Políticas de estado que deben considerarse y potencialmente restringen el diseño de la solución. *Políticas y normativas que potencialmente afectan el diseño de la experiencia, dada su influencia en el usuario. -Discuta y analice los resultados obtenidos con el equipo de trabajo.",
                    bibliografia: ""
                },
                {
                    titulo: "Uso no dirigido",
                    descripcion: "-Identifique otros posibles usos que pueden darle al Sistema Multimedia, diferentes a los concebidos originalmente por sus diseñadores. -Analice que tipo de interesados indirectos pueden llegar a hacer un uso diferente del Sistema y estime sus posibles motivos. -Identifique si estos motivos pueden influir en aspectos éticos, morales y de seguridad que pueden afectar a las personas.",
                    bibliografia: ""
                },
                {
                    titulo: "Análisis de respuestas de usuarios",
                    descripcion: "-Identifique otros posibles usos que pueden darle al Sistema Multimedia, diferentes a los concebidos originalmente por sus diseñadores. -Analice que tipo de interesados indirectos pueden llegar a hacer un uso diferente del Sistema y estime sus posibles motivos. -Identifique si estos motivos pueden influir en aspectos éticos, morales y de seguridad que pueden afectar a las personas.",
                    bibliografia: ""
                },
                {
                    titulo: "Identificación de patrones",
                    descripcion: "-Asegúrese de entender el contexto en donde se llevará cabo el despliegue de la experiencia multimedia. -Estudie el panorama e identifique patrones en el nivel de abstracción del contexto. -Identifique los patrones de “panorama” que establezcan el contexto. Para esto, aborde el problema en su mayor nivel de abstracción identificando patrones que respondan a su necesidad.  -Trabaje dentro del contexto con el fin de identificar patrones a un nivel más bajo de abstracción que ayuden posteriormente al diseño de la solución. Para esto, intente subdividir el problema, en problemas más concretos e intente identificar patrones en dicho nivel.",
                    bibliografia: ""
                },
                {
                    titulo: "Base de datos de observaciones del usuario",
                    descripcion: "-Identifique la información que debe ser ingresada en la base de datos, desde las diferentes técnicas aplicadas. -Registre los datos con información relevante relacionada con su captura: nombre de quien captura la información, dato, locación, título de la observación, descripción y cualquier otra información considerada como relevante para el equipo de trabajo. -Etiquete los datos con marcos simples con significado útil para el equipo. -Realice búsquedas y comparte los hallazgos con proyectos de Sistemas Multimedia desarrollados con anterioridad e identifique patrones y nuevas perspectivas para el actual proyecto.",
                    bibliografia: ""
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

        {
            Estados: [
                {
                    nombre: "Identificado",
                    descripcion: `Se han identificado una serie de factores
        críticos para el diseño responsable del Sistema
        Multimedia, que afectan a sus interesados (usuarios,
        clientes, interesados indirectos): tensiones de valor
        entre interesados, posibles usos mal intencionados del
        Sistema Multimedia, patrones que afectan el Sistema
        Multimedia, leyes y normatividades que influyen en la
        solución, aspectos culturales, sociales y cognitivos que
        influyen en la comunidad objeto de análisis.`
                },
                {
                    nombre: "Comprendido",
                    descripcion: `El equipo de trabajo y los interesados
        (usuarios, clientes y otros interesados) tienen un
        entendimiento común del significado y alcance de los
        factores clave que son críticos para el diseño
        responsable del Sistema Multimedia, y la manera en
        cómo influyen en la experiencia multimedia. `
                },
                {
                    nombre: "Acordado",
                    descripcion: `El equipo de trabajo y los interesados,
        identifican de manera conjunta, la necesidad de
        concebir ideas de diseño que mitiguen los factores
        adversos y potencien los factores favorables que creen
        valor en torno al diseño responsable.`
                },
                {
                    nombre: "Concebido",
                    descripcion: `El equipo de trabajo y los interesados,
            coinciden en que la concepción de la solución
            propuesta para el diseño responsable es la adecuada
            para atender los factores que influyen en la
            experiencia multimedia. `
                }
            ],
            nombre: "Sistema Multimedia mínimo viable",
            descripcion: `Define el minimo producto viable para la entrega ante el cliente`,
            alfas: [
                {
                    nombre: "Oportunidad",
                    descripcion: "define la oportunidad dentro del mercado, asi como sus posibles amenazas y oportunidades",
                    estado: "iniciado",
                    entregable: [

                    ]
                },
                {
                    nombre: "Valor del sistema multimedia",
                    descripcion: "Define las propuestas de valor claves para hacer destacar al producto",
                    estado: "iniciado",
                    entregable: [
                        "Análisis de viabilidad del Sistema Multimedia",
                        "Proposición de valor del Sistema Multimedia",
                        "Visión del Sistema Multimedia Minimo Viable",
                        "Modelo Canvas del Sistema Multimedia Minimo Viable"
                    ]
                }
            ],
            Entregables: [
                {
                    entregatitulo: "Análisis de viabilidad del Sistema Multimedia",
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
                    nombre: "Arquitecto Experiencia Multimedia",
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
                    nombre: "Arquitecto de información",
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
                    nombre: "Diseñador de Concepto y Storyboard",
                    descripcion: `Se trata de un miembro del equipo de diseño, que
                    apoya el análisis frente a la definición del Sistema
                    Multimedia mínimo viable, atendiendo a su alineación
                    frente al universo narrativo y la historia que han sido
                    concebidas para la experiencia multimedia interactiva.
                    `,
                    actividades: ["A16", "A22"]
                }
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
            Tecnicas: [
                {
                    titulo: "Análisis DOFA",
                    descripcion: "",
                    bibliografia: ""
                },
                {
                    titulo: "Análisis de desglose de riesgos asociada al desarrollo del Sistema Multimedia",
                    descripcion: "-Identifique riesgos internos, relacionados con la iniciativa propia que motiva el desarrollo del Sistema Multimedia y las organizaciones patrocinadoras y clientes en su realización. Se sugiere analizar factores como el financiero, tecnológico, de recursos disponibles, base de capital intelectual y de conocimiento, entre otros. -Identifique riesgos externos que se encuentran en el entorno y con alto potencial de influir en la iniciativa. Se sugiere analizar factores sociales, económicos, físicos, políticos y de cambio en la tecnología.",
                    bibliografia: ""
                },
                {
                    titulo: "Análisis para la identificación de riesgos",
                    descripcion: "-Genere espacios para la realización de talleres con expertos en la identificación de riesgos tanto a nivel general, relacionados con el desarrollo de soluciones basadas en Sistemas Multimedia, así como las específicas que desencadenan las motivaciones y necesidades del proyecto.",
                    bibliografia: ""
                },
                {
                    titulo: "Identificación análoga de los recursos",
                    descripcion: "-Efectúe una estimación análoga de recursos, basándose en experiencias e iniciativas similares que se hayan llevado a cabo, para revisar sus datos históricos de las actividades, relacionados con los recursos utilizados para su realización. Indague sobre: *Presupuestos asignados. *Recursos adquiridos. *Conformación del equipo de trabajo. *Tiempos estimados para el desarrollo de la solución. -Realice un análisis sobre los resultados obtenidos en la estimación análoga.",
                    bibliografia: ""
                },
                {
                    titulo: "Identificación ascendente de recursos",
                    descripcion: "-Efectúe una Estructura de Desglose de Trabajo preliminar, que permita identificar los paquetes preliminares de trabajo, necesarios para la realización de la experiencia y relacionados con el desarrollo de la solución. -Efectúe de manera ascendente, un análisis de los recursos necesarios (tecnológico, humano, materiales, espacios físicos, entre otros) para llevar a cabo la realización de cada paquete de trabajo. -Analice los resultados de esta estimación ascendente de recursos con la estimación análoga, con su equipo de trabajo y valide su viabilidad junto con los patrocinadores.",
                    bibliografia: ""
                },
                {
                    titulo: "Identificación análoga de los recursos",
                    descripcion: "",
                    bibliografia: ""
                },
                {
                    titulo: "Identificación ascendente de recursos",
                    descripcion: "",
                    bibliografia: ""
                },
                {
                    titulo: "Generación de Canvas",
                    descripcion: "Defina el segmento de clientes/usuarios de la experiencia multimedia. Piense en: *Para quién estará creando valor la experiencia multimedia. *Quiénes serían los clientes/usuarios más importantes. -Defina la propuesta o hipótesis de valor. Si aplicó la técnica Análisis de Valor , ya cuenta con la hipótesis de valor definida. En caso contrario, piense en: *El valor que la experiencia multimedia le estará entregando a sus clientes. *El problema que se resolverá. *La necesidad que va a satisfacerse. *El tipo de experiencia que se ofrece. -Defina los canales en cómo se va a llevar y a distribuir la experiencia multimedia a sus clientes/usuarios. *Mediante qué canales puede llegarse a clientes/usuarios. *Qué canal funciona mejor para la experiencia multimedia a ofrecerse. *Cuáles serían los canales más rentables.",
                    bibliografia: ""
                },
                {
                    titulo: "Análisis para la definición preliminar de tecnologías Software",
                    descripcion: "-En el eje horizontal estime en el mayor nivel de abstracción, la naturaleza y los componentes software que potencialmente se requieren para la generación de la experiencia: *Naturaleza de la aplicación (móvil, basada en pc tradicional, nube, otro tipo de dispositivo). *Recursos software (motor gráfico, entorno para modelado/animación, edición de audio/video, diseño gráfico, librerías especializadas, prototipado, bases de datos, entorno de programación). -En el eje vertical relacione las diferentes actividades específicas que llevará a cabo al usuario, durante la experiencia (puede apoyarse en la realización de un Journey Map).",
                    bibliografia: ""
                },
                {
                    titulo: "Análisis para la definición preliminar de tecnologías Hardware",
                    descripcion: "-En el eje horizontal estime en el mayor nivel de abstracción, la naturaleza y los componentes hardware que potencialmente se requieren para la generación de la experiencia: *Naturaleza del componente hardware(basado en sistema o subsistema embebido, basado en PC tradicional, consola de videojuego, otro dispositivo). *Recursos hardware (sensores, actuadores, proyectores, interfaces, periféricos, objetos físicos fabricados). -En el eje vertical relacione las diferentes actividades específicas que llevará a cabo al usuario, durante la experiencia (puede apoyarse en la realización de un Journey Map).",
                    bibliografia: ""
                },
                {
                    titulo: "Uso no dirigido",
                    descripcion: "-Identifique otros posibles usos que pueden darle al Sistema Multimedia, diferentes a los concebidos originalmente por sus diseñadores. -Analice que tipo de interesados indirectos pueden llegar a hacer un uso diferente del Sistema y estime sus posibles motivos. -Identifique si estos motivos pueden influir en aspectos éticos, morales y de seguridad que pueden afectar a las personas. -Identifique tensiones de valor entre los interesados. -Reúnase y discuta los resultados del análisis con su equipo de trabajo.",
                    bibliografia: ""
                },
                {
                    titulo: "Identificación de los métodos, motivaciones y recursos del adversario e impacto del sistema en las personas.",
                    descripcion: "-Realice una reunión de lluvia de ideas, en donde el equipo de trabajo discuta sobre: *Posibles métodos que un adversario puede utilizar para vulnerar el sistema y afectar la experiencia multimedia. *Motivaciones que tiene para llevar a cabo un ataque que exponga la seguridad del Sistema Multimedia. *Recursos que potencialmente podría utilizar para vulnerar el Sistema Multimedia. *Analice sobre el impacto directo o indirecto que podría tener el Sistema Multimedia en el bienestar emocional o mental de las personas y el impacto que puede producir en los individuos, la vulneración de su seguridad. -Consulte sobre otros métodos, motivaciones y recursos que puedan existir, con otros interesados, así como usuarios clave, clientes potenciales e interesados indirectos. -Discuta los resultados obtenidos con el equipo de trabajo.",
                    bibliografia: ""
                },
                {
                    titulo: "Matriz de proposición de valor",
                    descripcion: `Corresponde a la matriz que permite llevar a cabo, la
                    realización del análisis de proposición de valor del
                    Sistema Multimedia mínimo viable (ver matriz 11).  `,
                    bibliografia: ``
                },
                {
                    titulo: "Estructura para la formulación de la visión del SMMV",
                    descripcion: `Corresponde al modelo de estructura gramatical que
                    se sugiere, para llevar a cabo la realización de la
                    formulación de la visión del Sistema Multimedia
                    mínimo viable (ver tabla 14).`,
                    bibliografia: ``
                },
                {
                    titulo: "Canvas de SMMV",
                    descripcion: `Se trata de la estructura adaptada para la realización
                    del modelo Canvas para el Sistema Multimedia
                    mínimo viable (ver figura 12) y la descripción de sus
                    diferentes componentes constitutivos (ver tabla 15). `,
                    bibliografia: ``
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
    ]

};


