
			import * as THREE from '/librerias/threejs/three.module';

			import { GUI } from '/librerias/dat.gui.module.js';
			import { OrbitControls } from '/librerias/OrbitControls.js';
			import { GLTFLoader } from '/librerias/GLTFLoader.js';
			import { RGBELoader } from '/librerias/RGBELoader.js';

			var mesh, renderer, scene, camera, controls;
			var gui,
				guiWhitePoint = null,
				guiExposure = null;

			var params = {
				exposure: 0.8,
				whitePoint: 1.0, // applies to Uncharted2 only
				toneMapping: 'ACESFilmic'
			};

			var toneMappingOptions = {
				None: THREE.NoToneMapping,
				Linear: THREE.LinearToneMapping,
				Reinhard: THREE.ReinhardToneMapping,
				Uncharted2: THREE.Uncharted2ToneMapping,
				Cineon: THREE.CineonToneMapping,
				ACESFilmic: THREE.ACESFilmicToneMapping
			};

			init().catch( function ( err ) {

				console.error( err );

			} );

			async function init() {

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				renderer.toneMapping = toneMappingOptions[ params.toneMapping ];
				renderer.toneMappingWhitePoint = params.whitePoint;
				renderer.toneMappingExposure = params.exposure;

				renderer.outputEncoding = THREE.sRGBEncoding;

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
				camera.position.set( - 1.8, 0.6, 2.7 );

				controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.enableZoom = false;
				controls.enablePan = false;
				controls.target.set( 0, 0, - 0.2 );
				controls.update();

				var pmremGenerator = new THREE.PMREMGenerator( renderer );
				pmremGenerator.compileEquirectangularShader();

				var rgbeLoader = new RGBELoader()
					.setDataType( THREE.UnsignedByteType )
					.setPath( '/publico/texturas/' );

				var gltfLoader = new GLTFLoader().setPath( '/publico/modelos/' );

				var [ texture, gltf ] = await Promise.all( [
					rgbeLoader.loadAsync( 'venice_sunset_1k.hdr' ),
					gltfLoader.loadAsync( 'Mesa.gltf' ),
				] );

				// environment

				var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

				scene.background = envMap;
				scene.environment = envMap;

				texture.dispose();
				pmremGenerator.dispose();

				// model

				gltf.scene.traverse( function ( child ) {

					if ( child.isMesh ) {

						mesh = child;
						scene.add( mesh );

					}

				} );

				render();

				window.addEventListener( 'resize', onWindowResize, false );

				gui = new GUI();

				gui.add( params, 'toneMapping', Object.keys( toneMappingOptions ) )

					.onChange( function () {

						updateGUI();

						renderer.toneMapping = toneMappingOptions[ params.toneMapping ];
						mesh.material.needsUpdate = true;
						render();

					} );

				updateGUI();

				gui.open();

			}

			function updateGUI() {

				if ( guiWhitePoint !== null ) {

					gui.remove( guiWhitePoint );
					guiWhitePoint = null;

				}

				if ( guiExposure !== null ) {

					gui.remove( guiExposure );
					guiExposure = null;

				}

				if ( params.toneMapping !== 'None' ) {

					guiExposure = gui.add( params, 'exposure', 0, 2 )

						.onChange( function () {

							renderer.toneMappingExposure = params.exposure;
							render();

						} );

				}

				if ( params.toneMapping === 'Uncharted2' ) {

					guiWhitePoint = gui.add( params, 'whitePoint', 0, 2 )

						.onChange( function () {

							renderer.toneMappingWhitePoint = params.whitePoint;
							render();

						} );

				}

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;

				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}