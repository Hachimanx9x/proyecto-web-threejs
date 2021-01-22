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

/insert/auto/roles
/insert/auto/herramientasmetodologia
/insert/auto/tecnicas
para la ejecucion del servidor usa el comando en la capeta back
comando
```sh
yarn run dev
```
### rutas a usar 

esta ruta permite la creacion de un usuario 
```sh
/create/usuario
```
este pide un objeto con la siguiente estructura

{ email, password, nombre}

donde todos son de tipo string devolviendo en string que en una variable token
este se debe poner los envios y peticiones especiales del usuario la estrutura de este header es 
```json
"authorization": "llave eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsImVtYWlsIjoiY29ycm9lOEBnbWFpbC5jb20iLCJjb250cmFzZW5hIjoiMTIzNDU2Nzg5IiwiZm90b3BlcmZpbCI6Im51bGwiLCJub21icmVhcmNoaXZvaG9qYWRldmlkYSI6Im51bGwiLCJhbm9zZGVleHBlcmllbmNpYSI6bnVsbCwibm9tYnJlIjoibm9tYnJlIHRlc3QxNiIsImRlc2NyaXBjaW9uIjoibnVsbCIsInBhaXMiOiJudWxsIiwiZWRhZCI6bnVsbCwiZ2l0aHViIjoibnVsbCIsImdpdGxhYiI6Im51bGwiLCJiaXRidWNrZXQiOiJudWxsIiwibGlua2VkaW4iOiJudWxsIn1dLCJpYXQiOjE2MTExODU4NDJ9.TWId6FOMQ0_TGyngDFHJF4Uuol0dqC0sLcCo2FRTuqY "
```

/login

esta ruta pide en el body un objeto de la siguiente estructura
{ email, password}

este devolvera un token con lo datos de ese momento del usuario
```json
"token": "llave eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MTIsImVtYWlsIjoiY29ycm9lOEBnbWFpbC5jb20iLCJjb250cmFzZW5hIjoiMTIzNDU2Nzg5IiwiZm90b3BlcmZpbCI6Im51bGwiLCJub21icmVhcmNoaXZvaG9qYWRldmlkYSI6Im51bGwiLCJhbm9zZGVleHBlcmllbmNpYSI6bnVsbCwibm9tYnJlIjoibm9tYnJlIHRlc3QxNiIsImRlc2NyaXBjaW9uIjoibnVsbCIsInBhaXMiOiJudWxsIiwiZWRhZCI6bnVsbCwiZ2l0aHViIjoibnVsbCIsImdpdGxhYiI6Im51bGwiLCJiaXRidWNrZXQiOiJudWxsIiwibGlua2VkaW4iOiJudWxsIn1dLCJpYXQiOjE2MTExODU4NDJ9.TWId6FOMQ0_TGyngDFHJF4Uuol0dqC0sLcCo2FRTuqY "
```
/actualizar/usuario
esta es la ruta de actualizacion que usa un token de este saca el id para saber que usaurio debe actualizar
esto es dinamico y dependiendo de que parte de la estructura de datos este entrando  hara la actualizacion

 { email, password, experiencia, nombre, descripcion, pais, edad, github, gitlab, bitbucket, linkedin }

 asi mismo tambien se puede resibir dos archivos en variables foto o cv en caso de rebicirlos se actualizaran los archivos del usuario

/agregar/idioma
esta ruta permite agregar los idiomas en tu lista de idiomas 
se requiere de token para identificar al usuario

/agregar/palabraclave
esta agrega las palbras a traves de una lista de palbras que identifiquen a la persona
