import React, { Component } from "react";
//import { render } from "react-three-fiber";
import * as THREE from "three/build/three.module";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls" ;
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import Detector from "../../../lib_externo/Detector"; 
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper"

//imagenes
import posx from "../../../Logos/img/Bridge2/posx.jpg"
import negx from "../../../Logos/img/Bridge2/negx.jpg"
import posy from "../../../Logos/img/Bridge2/posy.jpg"
import negy from "../../../Logos/img/Bridge2/negy.jpg"
import posz from "../../../Logos/img/Bridge2/posz.jpg"
import negz from "../../../Logos/img/Bridge2/negz.jpg"

//modelos
import modeloMesaurl    from "../../../Logos/models3d/Mesa.gltf"; 
import modelopiso       from "../../../Logos/models3d/floor.gltf";
import modelluz         from "../../../Logos/models3d/lights.gltf";
import modelomueble1    from "../../../Logos/models3d/mueble_2.gltf";
import modelopared      from "../../../Logos/models3d/paredes_1.gltf";
import modelopared2     from "../../../Logos/models3d/paredes_2.gltf";
import modelosilla      from "../../../Logos/models3d/silla.gltf";

class Test3d extends Component{
    constructor(props){
        super(props); 
        this.animate = this.animate.bind(this); 
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    componentDidMount(){
      if(! Detector.webgl) Detector.addGetWebGLMessage(); 
      window.addEventListener("resize", this.updateDimensions);
      
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,50 );
      this.camera.position.set( 0, 0.9, 2.7 );
      
     
      //skybox

     
      var entorno = new THREE.CubeTextureLoader().load([ posx, negx, posy, negy, posz, negz ]);
     

      this.scene = new THREE.Scene(); 
      this.scene.background =entorno ; 
      

      this.light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
      this.light.position.set( 0, 1, 0 );
      this.scene.add(this.light); 
      console.log(this.scene); 
//---------------------------------------------------- // rendering
        this.renderer = new THREE.WebGLRenderer({ antialias: true});
        this.renderer.gamaOutput=true; 
        this.renderer.outputEncoding = THREE.sRGBEncoding;
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
        this.controls = new OrbitControls(this.camera,this.renderer.domElement); 
        this.controls.target.set(0,0,0); 
        this.controls.update(); 
       
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
      objmueble.position.set(1,-0.3,-1.75);
      objmueble.rotation.set(0,0,0); 
      objmueble.scale.set(1,1,1); 
      this.scene.add(objmueble); 

      var objpared1 =  new THREE.Object3D();
      new GLTFLoader().load(modelopared, (gltf)=>{
        gltf.scene.traverse((nino)=>{ if(nino.isMesh){    nino.material.envMap = this.entorno;  } }); 
        objpared1.add(gltf.scene);        
      }); 
      //1,-0.25,-2, 0,0,0, 1,1,1
      objpared1.position.set(1,-0.25,-2);
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
    
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
        this.mount.removeChild(this.renderer.domElement);
      }//fin del componentWillUnmount

    animate() {
      requestAnimationFrame(this.animate);

        this.renderer.render(this.scene, this.camera);
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
      render(){
          return(
              <div className="test3d">
                  <div
          style={{ width: "100vw", height: "50vw" }}
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
