class CargarObjGltf{
    constructor(){
    
    }

    insertarEscena(entorno,cargador,obj3d, url ,escena ,x,y,z,rx,ry,rz,sx,sy,sz){
        cargador.load(url, (gltf)=>{
            gltf.scene.traverse((nino)=>{
                if ( nino.isMesh ) {

                    nino.material.envMap = entorno;

                }
                 
            });
            obj3d.add(gltf.scene);
        });
        //posicion al ingresar a la escena
        obj3d.position.x = x;obj3d.position.y = y;obj3d.position.z = z;
        //rotacion
        obj3d.rotation.x = rx; obj3d.rotation.y = ry; obj3d.rotation.z = rz; 
        //escala
        obj3d.scale.x= sx; obj3d.scale.y= sy; obj3d.scale.z= sz; 
        //insertar en la escena
        escena.add(obj3d); 

    }//fin de inicio

    getOBJ3d(entorno,cargador,obj3d, url){
        cargador.load(url, (gltf)=>{
            gltf.scene.traverse((nino)=>{
                if ( nino.isMesh ) {

                    nino.material.envMap = entorno;

                }
            });
            obj3d.add(gltf.scene);
          
        });
       return obj3d;
    }


}//fin de la clase

/*loader.load( '/publico/modelos/Mesa.gltf', function ( gltf ) {

					gltf.scene.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.material.envMap = envMap;

						}

					} );
					
					obj3d1.add(gltf.scene)
					

				} ); */