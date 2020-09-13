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

