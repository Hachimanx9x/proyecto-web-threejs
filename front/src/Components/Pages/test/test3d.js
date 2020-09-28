import React, { Component } from "react";
import * as THREE from "three"; 
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"; 
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Reflector} from "three/examples/jsm/objects/Reflector"

class Test3d extends Component {
    constructor(){
        super();
        this.state ={}
    }
/*
    componentDidMount(){
        
        
        this.container = document.getElementsByClassName("div3d");;
       
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
        this.controls = new OrbitControls(  this.camera );
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
         // scene size
         this.WIDTH = window.innerWidth;
         this.HEIGHT = window.innerHeight;

         this.init(); 
    }
    

    init() {

       // container = document.createElement( 'div' );
        //document.body.appendChild( container );
       
        
        this.camera.position.set( -1.8, 0.9, 2.7 );

       
        this.controls.target.set( 0, 0, 0 );
        this.controls.update();

        // skybox
        var path = '../../../logos/img/Bridge2/';
        var format = '.jpg';
        var envMap = new THREE.CubeTextureLoader().load( [
            path + 'posx' + format, path + 'negx' + format,
            path + 'posy' + format, path + 'negy' + format,
            path + 'posz' + format, path + 'negz' + format
        ] );             
  

        
        this.scene.background = envMap ;
        
       this.light.position.set( 0, 1, 0 );
       this.scene.add( this.light );

//--------------------------------------------------------------------------------------
const objmesa = new THREE.Object3D(); 
const mesa = new GLTFLoader(); 
const urlmesa = '../../../logos/modelos3d/Mesa.gltf';
mesa.load(urlmesa, (gltf)=>{
    gltf.scene.traverse((nino)=>{
        if ( nino.isMesh ) {

            nino.material.envMap = envMap;

        }
         
    });
    objmesa.add(gltf.scene);
    //posicion al ingresar a la escena
    objmesa.position.x = 1;objmesa.position.y = -0.3;objmesa.position.z = -1.75;
    //rotacion
    objmesa.rotation.x = 0; objmesa.rotation.y = 0; objmesa.rotation.z = 0; 
    //escala
    objmesa.scale.x= 1;  objmesa.scale.y= 1; objmesa.scale.z= 1; 
    //insertar en la escena
    this.scene.add(objmesa); 
});


 
    

var sillas=[];
for(var i =0 ; i<8 ; i++){
   // sillas.push(cargarModelos.getOBJ3d(envMap,new GLTFLoader(), new THREE.Object3D(),'../../../logos/modelos3d/silla.gltf' )); 
   // sillas[i].position.y=-0.33;
   new GLTFLoader().load('../../../logos/modelos3d/silla.gltf', (gltf)=>{
    gltf.scene.traverse((nino)=>{
        if ( nino.isMesh ) {

            nino.material.envMap = envMap;

        }
         
    });
    sillas.push(new THREE.Object3D().add(gltf.scene)); 
  
});

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
    this.scene.add(sillas[i]); 
}
//----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
var geometry = new THREE.PlaneBufferGeometry( 0.65, 1.93 );
        var verticalMirror = new Reflector( geometry, {
            clipBias: 0.0005,
            textureWidth:  this.WIDTH * window.devicePixelRatio,
            textureHeight:  this.HEIGHT * window.devicePixelRatio,
            color: 0x889999,
            recursion: 1
        } );
        verticalMirror.position.y = 0.177;
        verticalMirror.position.x = 0.023;
        verticalMirror.position.z = - 0.047;
        verticalMirror.rotation.x = -Math.PI/2; 
        this.scene.add( verticalMirror );

var objectopasidad = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x0000000, opacity: 0.5 , transparent: true } ) );
objectopasidad.position.y = verticalMirror.position.y+0.001; 
objectopasidad.position.x = verticalMirror.position.x ;
objectopasidad.position.z = verticalMirror.position.z;
objectopasidad.rotation.x = verticalMirror.rotation.x ;
    this.scene.add(objectopasidad)
//-----------------------------------------------------------------------------------------


this.renderer.setPixelRatio( window.devicePixelRatio );
this.renderer.setSize( window.innerWidth, window.innerHeight );
this.renderer.gammaOutput = true;
this.container.appendChild(  this.renderer.domElement );

        window.addEventListener( 'resize',  this.onWindowResize, false );

       
        this.animate();
    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    animate() {

        requestAnimationFrame(  this.animate );

        this.renderer.render(  this.scene,  this.camera );

       

    }*/
 render(){
     return(
         <div className="div3d">

         </div>
     ); 
 }
}

export default Test3d ;