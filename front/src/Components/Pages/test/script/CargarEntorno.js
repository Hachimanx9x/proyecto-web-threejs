
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container, stats, controls;
			var camera, scene, renderer, light;
			 // scene size
			 var WIDTH = window.innerWidth;
			 var HEIGHT = window.innerHeight;


			init();
			

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
				camera.position.set( -1.8, 0.9, 2.7 );

				controls = new THREE.OrbitControls( camera );
				controls.target.set( 0, 0, 0 );
				controls.update();

				// skybox
				var path = '../../../../Logos/img/Bridge2/';
				var format = '.jpg';
				var envMap = new THREE.CubeTextureLoader().load( [
					path + 'posx' + format, path + 'negx' + format,
					path + 'posy' + format, path + 'negy' + format,
					path + 'posz' + format, path + 'negz' + format
				] );             
          

                scene = new THREE.Scene();
                scene.background = envMap ;
				light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
				light.position.set( 0, 1, 0 );
				scene.add( light );

        //--------------------------------------------------------------------------------------
        const cargarModelos = new CargarObjGltf(); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(), 
         '../../../../Logos/models3d/Mesa.gltf',//url del modelo
         scene,
        1,-0.3,-1.75, //x y z posicion
        0,0,0,//x y z rotacion
        1,1,1//x y z escala
            ); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),   '../../../../Logos/models3d/floor.gltf',scene, -2.72,-0.3,-1.75, 0,0,0, 1,1,1); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),   '../../../../Logos/models3d/lights.gltf',scene, 1,-0.3,-1.75, 0,0,0, 1,1,1); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),   '../../../../Logos/models3d/mueble_2.gltf',scene, -0.3,-0.1 ,-0.7, 0,0,0, 1,1,1); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),   '../../../../Logos/models3d/paredes_1.gltf',scene, 1,-0.25,-2, 0,0,0, 1,1,1); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),   '../../../../Logos/models3d/paredes_2.gltf',scene, 1,6.04 ,-2, 0,0,0, 1,1,1); 

        var sillas=[];
        for(var i =0 ; i<8 ; i++){
            sillas.push(cargarModelos.getOBJ3d(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),'../../../../Logos/models3d/silla.gltf' )); 
            sillas[i].position.y=-0.33;
        }  

        sillas[0].position.z=-1.7; sillas[0].position.x=1.32;
        sillas[1].rotation.y= Math.PI; sillas[1].position.x=-1.28; sillas[1].position.z=1.5;

      
        sillas[3].rotation.y= Math.PI/2;sillas[3].position.x=-2.28;sillas[3].position.z=-0.7;
        sillas[4].rotation.y= Math.PI/2;sillas[4].position.x=-2.28;sillas[4].position.z=-2;

        sillas[5].rotation.y = - Math.PI/2; sillas[5].position.x=2.28;sillas[5].position.z=1.2;
        sillas[6].rotation.y = - Math.PI/2; sillas[6].position.x=2.28;sillas[6].position.z=0.65;
        sillas[7].rotation.y = - Math.PI/2; sillas[7].position.x=2.28;sillas[7].position.z=1.8;


        for(var i =0 ; i<8 ; i++){
           scene.add(sillas[i]); 
        }
        //----------------------------------------------------------------------------------------
		//-----------------------------------------------------------------------------------------
		var geometry = new THREE.PlaneBufferGeometry( 0.65, 1.93 );
				var verticalMirror = new THREE.Reflector( geometry, {
					clipBias: 0.0005,
					textureWidth: WIDTH * window.devicePixelRatio,
					textureHeight: HEIGHT * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );
				verticalMirror.position.y = 0.177;
				verticalMirror.position.x = 0.023;
				verticalMirror.position.z = - 0.047;
				verticalMirror.rotation.x = -Math.PI/2; 
				scene.add( verticalMirror );

		var objectopasidad = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x0000000, opacity: 0.5 , transparent: true } ) );
		objectopasidad.position.y = verticalMirror.position.y+0.001; 
		objectopasidad.position.x = verticalMirror.position.x ;
		objectopasidad.position.z = verticalMirror.position.z;
		objectopasidad.rotation.x = verticalMirror.rotation.x ;
			scene.add(objectopasidad)
		//-----------------------------------------------------------------------------------------

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.gammaOutput = true;
				container.appendChild( renderer.domElement );
				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.BasicShadowMap;

				window.addEventListener( 'resize', onWindowResize, false );

				// stats
				stats = new Stats();
				container.appendChild( stats.dom );
			animate();
			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				renderer.render( scene, camera );

				stats.update();

			}