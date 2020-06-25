
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container, stats, controls;
			var camera, scene, renderer, light;

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
				var path = '/publico/texturas/Bridge2/';
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
         '/publico/modelos/Mesa.gltf',//url del modelo
         scene,
        1,-0.3,-1.75, //x y z posicion
        0,0,0,//x y z rotacion
        1,1,1//x y z escala
            ); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),   '/publico/modelos/floor.gltf',scene, -2.72,-0.3,-1.75, 0,0,0, 1,1,1); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),   '/publico/modelos/lights.gltf',scene, 1,-0.3,-1.75, 0,0,0, 1,1,1); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),   '/publico/modelos/mueble_2.gltf',scene, -0.3,-0.1 ,-0.7, 0,0,0, 1,1,1); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),   '/publico/modelos/paredes_1.gltf',scene, 1,-0.25,-2, 0,0,0, 1,1,1); 
        cargarModelos.insertarEscena(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),   '/publico/modelos/paredes_2.gltf',scene, 1,6.04 ,-2, 0,0,0, 1,1,1); 

        var sillas=[];
        for(var i =0 ; i<8 ; i++){
            sillas.push(cargarModelos.getOBJ3d(envMap,new THREE.GLTFLoader(), new THREE.Object3D(),'/publico/modelos/silla.gltf' )); 
            sillas[i].position.y=-0.33;
        }  

        sillas[0].position.z=-1.7; sillas[0].position.x=1.32;
        sillas[1].rotation.y= Math.PI; sillas[1].position.x=-1.28; sillas[1].position.z=1.5;

        sillas[2].rotation.y= Math.PI/2;sillas[2].position.x=-2.28;sillas[2].position.z=-1.4;
        sillas[3].rotation.y= Math.PI/2;sillas[3].position.x=-2.28;sillas[3].position.z=-0.7;
        sillas[4].rotation.y= Math.PI/2;sillas[4].position.x=-2.28;sillas[4].position.z=-2;

        sillas[5].rotation.y = - Math.PI/2; sillas[5].position.x=2.28;sillas[5].position.z=1.2;
        sillas[6].rotation.y = - Math.PI/2; sillas[6].position.x=2.28;sillas[6].position.z=0.65;
        sillas[7].rotation.y = - Math.PI/2; sillas[7].position.x=2.28;sillas[7].position.z=1.8;


        for(var i =0 ; i<8 ; i++){
           scene.add(sillas[i]); 
        }
        //----------------------------------------------------------------------------------------


				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.gammaOutput = true;
				container.appendChild( renderer.domElement );

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