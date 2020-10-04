import React, { Component } from "react";
//libreria 3d 
import * as THREE from "three/build/three.module";
//libreria para cargar modelos 3d
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
//libreria para efectos de entorno
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper"
import { Reflector } from "three/examples/jsm/objects/Reflector";
//libreria para los controles
//import {OrbitControls} from "three/examples/jsm/controls/OrbitControls" ;
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
//libreria para detectar compatibilidad
import Detector from "../../../lib_externo/Detector"; 


//imagenes
import posx from "../../../Logos/img/Bridge2/posx.jpg"
import negx from "../../../Logos/img/Bridge2/negx.jpg"
import posy from "../../../Logos/img/Bridge2/posy.jpg"
import negy from "../../../Logos/img/Bridge2/negy.jpg"
import posz from "../../../Logos/img/Bridge2/posz.jpg"
import negz from "../../../Logos/img/Bridge2/negz.jpg"

//modelos 3d 
import modeloMesaurl    from "../../../Logos/models3d/Mesa.gltf"; 
import modelopiso       from "../../../Logos/models3d/floor.gltf";
import modelluz         from "../../../Logos/models3d/lights.gltf";
import modelomueble1    from "../../../Logos/models3d/mueble_2.gltf";
import modelopared      from "../../../Logos/models3d/paredes_1.gltf";
import modelopared2     from "../../../Logos/models3d/paredes_2.gltf";
import modelosilla      from "../../../Logos/models3d/silla.gltf";


//videos
import video1 from "../../../Logos/videos/gumdang.mp4";
import { object } from "prop-types";

class Test3d extends Component{
    constructor(props){
        super(props); 
        this.animate = this.animate.bind(this); 
        this.updateDimensions = this.updateDimensions.bind(this);
        this.mouseEventsdown = this.mouseEventsdown.bind(this);
        this.mouseEventup= this.mouseEventup.bind(this); 
        this.state = { mouse:false };

    }
    componentDidMount(){
      if(! Detector.webgl) Detector.addGetWebGLMessage(); 
      //eventos
      window.addEventListener("resize", this.updateDimensions);
      document.addEventListener("mousedown", this.mouseEventsdown); 
      document.addEventListener("mouseup", this.mouseEventup); 
      //variables de entorno 
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,50 );
      this.camera.position.set( 0, 0.9, 1.7 );
      this.velocity = new THREE.Vector3();
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      this.prevTime = performance.now();
      this.estado = false; 

      this.objInteraccion1 = [];
      this.objInteraccion2 = [];
     
      //skybox     
      var entorno = new THREE.CubeTextureLoader().load([ posx, negx, posy, negy, posz, negz ]);   

      this.scene = new THREE.Scene(); 
      this.scene.background =entorno ; 
      this.scene.environment = entorno; 

      this.light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
      this.light.position.set( 0, 1, 0 );
      this.scene.add(this.light); 
      //console.log(this.scene); 
      //video
      this.video = document.createElement( 'video' );
      var source = document.createElement("source"); 
      source.type= "video/mp4";
      source.src=video1; 
      this.video.appendChild(source); 
      var texvideo = new THREE.VideoTexture( this.video );
      var geovideo= new THREE.PlaneBufferGeometry( 16, 9 );
       geovideo.scale( 0.05, 0.05, 0.05 );
       
       var materialvideo = new THREE.MeshBasicMaterial( { map: texvideo } );
       var meshvideo = new THREE.Mesh( geovideo, materialvideo );  meshvideo.position.set(0.7,0.5,0);  meshvideo.rotation.set(0,-Math.PI/2 ,0);
       console.log(meshvideo) ; 
       this.scene.add(meshvideo); 
// controles del video
/*
var geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );
                   
                    object1.position.x = 100; 
                     var object2 = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 1 } ) );
                    object2.position.x = -100; 
                    scene.add( object1 );scene.add( object2 );
                    objects.push( object1 );objects.push( object2 ); 

 */
var geocaja = new THREE.BoxBufferGeometry( 1,1,1 );
var objectI1 = new THREE.Mesh( geocaja , new THREE.MeshBasicMaterial( { color: 0x4ff20e } ) ); objectI1.scale.set(0.2,0.2,0.2);  objectI1.position.set(0.2,0.33,0);
var objectI2 = new THREE.Mesh( geocaja , new THREE.MeshBasicMaterial( { color: 0xf2380e  } ) ); objectI2.scale.set(0.2,0.2,0.2); objectI2.position.set(-0.2,0.33,0);

this.scene.add(objectI1); this.scene.add(objectI2); 
this.objInteraccion1.push(objectI1);  this.objInteraccion2.push(objectI2);

//---------------default------------------------
var geopiso = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 ); geopiso.rotateX( - Math.PI / 2 );

var pisodefault = new THREE.Mesh( geopiso, new THREE.MeshBasicMaterial( { vertexColors: true,color: 0xfffffff, opacity: 0.9 , transparent: true } ) );
pisodefault .position.set(0,-0.3,0);
this.scene.add(pisodefault); 
//---------------------------------------------------- // rendering
        this.renderer = new THREE.WebGLRenderer({ antialias: true});
        this.renderer.gamaOutput=true; 
       // this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
				this.renderer.shadowMap.type = THREE.BasicShadowMap;
        this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
				this.renderer.toneMappingExposure = 1;


        this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
        this.camera.updateProjectionMatrix();
        //----------
        //this.controls = new OrbitControls(this.camera,this.renderer.domElement); 
        //this.controls.target.set(0,0,0); 
        //this.controls.update(); 
        this.controls = new PointerLockControls( this.camera, document.body );
       // this.controls.lock();
      //  this.controls.connect(); 
       
      // this.controls.isLocked = true ; 
        console.log(this.controls.getObject()); 
        
        this.controls.getObject().position.set(0,0.3,1); 
       

        this.scene.add( this.controls.getObject() );
        //---------
        var roughnessMipmapper = new RoughnessMipmapper( this.renderer )      
//--------------------------------------------------------
      var objmesa = new THREE.Object3D(); 
      new GLTFLoader().setDRACOLoader(new DRACOLoader).load(modeloMesaurl,(gltf)=>{
        gltf.scene.traverse((nino)=>{
          if(nino.isMesh){
            nino.material.envMap = this.entorno; 
            roughnessMipmapper.generateMipmaps( nino.material );
          }
        }); 
        objmesa.add(gltf.scene); 
      });
      objmesa.position.set(1,-0.3,-1.75);
      objmesa.rotation.set(0,0,0); 
      objmesa.scale.set(1,1,1); 
      objmesa.castShadow = true;
      objmesa.receiveShadow = true; 
      this.scene.add(objmesa); 
    
      var objpiso =  new THREE.Object3D();
      new GLTFLoader().load(modelopiso, (gltf)=>{
        gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } }); 
        objpiso.add(gltf.scene);        
      }); 
      //-2.72,-0.3,-1.75, 0,0,0, 1,1,1)
      objpiso.position.set(-2.72,-0.3,-1.75);
      objpiso.rotation.set(0,0,0); 
      objpiso.scale.set(1,1,1); 
      this.scene.add(objpiso); 

      var objluz =  new THREE.Object3D();
      new GLTFLoader().load(modelluz, (gltf)=>{
        gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } }); 
        objluz.add(gltf.scene);        
      },( xhr ) =>{console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );},
      ( error )=> { console.log( 'An error happened' );}
      ); 
      //1,-0.3,-1.75, 0,0,0, 1,1,1
      objluz.position.set(1,-0.3,-1.75);
      objluz.rotation.set(0,0,0); 
      objluz.scale.set(1,1,1); 
      this.scene.add(objluz); 

      var objmueble =  new THREE.Object3D();
      new GLTFLoader().load(modelomueble1, (gltf)=>{
        gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } }); 
        objmueble.add(gltf.scene);        
      }); 
      //1,-0.3,-1.75, 0,0,0, 1,1,1
      objmueble.position.set(-0.33,-0.07,-0.9);
      objmueble.rotation.set(0,0,0); 
      objmueble.scale.set(1,1,1);
      objmueble.castShadow = true;
      objmueble.receiveShadow = true; 
      console.log(objmueble); 
      this.scene.add(objmueble); 

      var objpared1 =  new THREE.Object3D();
      new GLTFLoader().load(modelopared, (gltf)=>{
        gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } }); 
        objpared1.add(gltf.scene);        
      }); 
      //1,-0.25,-2, 0,0,0, 1,1,1
      objpared1.position.set(1,-0.27,-2);
      objpared1.rotation.set(0,0,0); 
      objpared1.scale.set(1,1,1); 
      
      this.scene.add(objpared1); 

      var objpared2 =  new THREE.Object3D();
      new GLTFLoader().load(modelopared2, (gltf)=>{
        gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } }); 
        objpared2.add(gltf.scene);        
      }); 
      //1,6.04 ,-2, 0,0,0, 1,1,1
      objpared2.position.set(1,6.04 ,-2,);
      objpared2.rotation.set(0,0,0); 
      objpared2.scale.set(1,1,1); 
      this.scene.add(objpared2); 

     
      var objsilla1 =  new THREE.Object3D();  
      new GLTFLoader().load(modelosilla , (gltf)=>{ gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } });   objsilla1.add(gltf.scene);     });     
      objsilla1.position.set(1.32 ,-0.33 ,-1.7);   objsilla1.rotation.set(0,0,0);     objsilla1.scale.set(1,1,1);         this.scene.add(objsilla1); 

      var objsilla2 =  new THREE.Object3D();  
      new GLTFLoader().load(modelosilla , (gltf)=>{ gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } });   objsilla2.add(gltf.scene);   });   
      //sillas[1].rotation.y= Math.PI; sillas[1].position.x=-1.28; sillas[1].position.z=1.5;  
      objsilla2.position.set(-1.28 ,-0.33 ,1.5);   objsilla2.rotation.set(0,Math.PI,0);     objsilla2.scale.set(1,1,1);       this.scene.add(objsilla2); 

      var objsilla3 =  new THREE.Object3D();  
      new GLTFLoader().load(modelosilla , (gltf)=>{ gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } }); 
        objsilla3.add(gltf.scene); 
      });   
      //  sillas[2].rotation.y= Math.PI/2;sillas[2].position.x=-2.28;sillas[2].position.z=-1.4;
      objsilla3.position.set(-2.28 ,-0.33 ,-1.4);   objsilla3.rotation.set(0,Math.PI/2,0);     objsilla3.scale.set(1,1,1);      this.scene.add(objsilla3); 

      var objsilla4 =  new THREE.Object3D();  
      new GLTFLoader().load(modelosilla , (gltf)=>{ gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } });   objsilla4.add(gltf.scene); });   
      //  illas[4].rotation.y= Math.PI/2;sillas[4].position.x=-2.28;sillas[4].position.z=-2;
      objsilla4.position.set(-2.28 ,-0.33 ,-2);   objsilla4.rotation.set(0,Math.PI/2,0);     objsilla4.scale.set(1,1,1);  this.scene.add(objsilla4); 

      var objsilla5 =  new THREE.Object3D();  
      new GLTFLoader().load(modelosilla , (gltf)=>{ gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } });   objsilla5.add(gltf.scene); });   
      // sillas[5].rotation.y = - Math.PI/2; sillas[5].position.x=2.28;sillas[5].position.z=1.2;
      objsilla5.position.set(2.28 ,-0.33 ,1.2);   objsilla5.rotation.set(0,- Math.PI/2,0);     objsilla5.scale.set(1,1,1);    this.scene.add(objsilla5); 

      var objsilla6 =  new THREE.Object3D();  
      new GLTFLoader().load(modelosilla , (gltf)=>{ gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } });   objsilla6.add(gltf.scene); });   
      //sillas[6].rotation.y = - Math.PI/2; sillas[6].position.x=2.28;sillas[6].position.z=0.65;
      objsilla6.position.set(2.28 ,-0.33 ,0.65);   objsilla6.rotation.set(0,- Math.PI/2,0);     objsilla6.scale.set(1,1,1);   this.scene.add(objsilla6); 

      var objsilla7 =  new THREE.Object3D();  
      new GLTFLoader().load(modelosilla , (gltf)=>{ gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } });   objsilla7.add(gltf.scene); });   
      //sillas[7].rotation.y = - Math.PI/2; sillas[7].position.x=2.28;sillas[7].position.z=1.8;
      objsilla7.position.set(2.28 ,-0.33 ,1.8);   objsilla7.rotation.set(0,- Math.PI/2,0);     objsilla7.scale.set(1,1,1);   this.scene.add(objsilla7); 

      var objsilla8 =  new THREE.Object3D();  
      new GLTFLoader().load(modelosilla , (gltf)=>{ gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } });   objsilla8.add(gltf.scene); });   
      //sillas[3].rotation.y= Math.PI/2;sillas[3].position.x=-2.28;sillas[3].position.z=-0.7;
      objsilla8.position.set(-2.28 ,-0.33 ,-0.7);   objsilla8.rotation.set(0,Math.PI/2,0);     objsilla8.scale.set(1,1,1);   this.scene.add(objsilla8); 

  
//--------------------------------------------------------
        var geometry = new THREE.PlaneBufferGeometry( 0.65, 1.93 );
				var verticalMirror = new Reflector( geometry, {
					clipBias: 0.0005,
					textureWidth: window.innerWidth * window.devicePixelRatio,
					textureHeight: window.innerHeight * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );
				verticalMirror.position.y = 0.177;
				verticalMirror.position.x = 0.023;
				verticalMirror.position.z = - 0.047;
				verticalMirror.rotation.x = -Math.PI/2; 
      this.scene.add( verticalMirror );
        var objectopasidad = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x0000000, opacity: 0.9 , transparent: true } ) );
        objectopasidad.position.y = verticalMirror.position.y+0.001; 
	    	objectopasidad.position.x = verticalMirror.position.x ;
    		objectopasidad.position.z = verticalMirror.position.z;
    		objectopasidad.rotation.x = verticalMirror.rotation.x ;
  		this.scene.add(objectopasidad)


       
    
        this.mount.appendChild(this.renderer.domElement);
        this.animate(); 
        }// fin del componentdidmount
    /*
    *
    *
    * *
    * 
    * *
    * *
    * 
    fin del metodo componentdidmount
    *
    *
    * *
    * 
    * *
    * 
    *     
    */
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
      document.removeEventListener("mousedown", this.mouseEventsdown)
      document.removeEventListener("mouseup", this.mouseEventup)
        this.mount.removeChild(this.renderer.domElement);
      }//fin del componentWillUnmount
    /*
    *
    *
    * *
    * 
    * *
    * *
    * 
    fin del metodo componentWillUnmount
    *
    *
    * *
    * 
    * *
    * 
    *     
    */
    animate() {
      requestAnimationFrame(this.animate);

      var time = performance.now();
     
      var delta = ( time - this.prevTime ) / 1000;

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;
      this.controls.moveRight( - this.velocity.x * delta );
      this.controls.moveForward( - this.velocity.z * delta );
      
      this.controls.isLocked = this.estado; 

      this.prevTime = time;
      this.renderer.render(this.scene, this.camera);
     //   console.log(this.camera.position); 
       // console.log("renderizando ando"); 
      }//fin animate
    updateDimensions() {
        if (this.mount !== null) {
          this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
          this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
          this.camera.updateProjectionMatrix();
    
          this.renderer.render(this.scene, this.camera);
        }
      }
          /*
    *
    *
    * *
    * 
    * *
    * *
    * 
    fin del metodo componentWillUnmount
    *
    *
    * *
    * 
    * *
    * 
    *     
    */
      mouseEventsdown = (event) =>{
        /*    this.setState({
          x: event.clientX,
          y: event.clientY
        }); */
       // console.log(event); 
       event.preventDefault();
       console.log("clic");
      // this.video.play(); 
      this.mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;

      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersectsplay = this.raycaster.intersectObjects( this.objInteraccion1);
      var intersectspause = this.raycaster.intersectObjects( this.objInteraccion2);
      if ( intersectsplay.length > 0 ) {   this.video.play();   }
      if ( intersectspause.length > 0 ) {   this.video.pause();   }

       this.estado= true;
    
    }
    mouseEventup = (event) =>{
      /*    this.setState({
        x: event.clientX,
        y: event.clientY
      }); */
     // console.log(event); 
     this.estado = false; 
    // this.video.pause();
     console.log("no clic"); 
  
  }
        /*
    *
    *
    * *
    * 
    * *
    * *
    * 
    fin del metodo componentWillUnmount
    *
    *
    * *
    * 
    * *
    * 
    *     
    */
      render(){
          return(
              <div className="test3d">
                  <div
          style={{ width: "100vw", height: "50.1vw"   }}
          id="boardCanvas"
          ref={mount => {
            this.mount = mount;
          }}
        />
        
              </div>
          );
      }
}

export default Test3d ;
