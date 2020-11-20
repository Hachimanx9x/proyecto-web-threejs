import React, { Component } from "react";
//libreria 3d
import * as THREE from "three/build/three.module";
//libreria para cargar modelos 3d
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
//libreria para efectos de entorno
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper";
import { Reflector } from "three/examples/jsm/objects/Reflector";
//libreria para los controles
//import {OrbitControls} from "three/examples/jsm/controls/OrbitControls" ;
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
//libreria para detectar compatibilidad
import Detector from "../../../lib_externo/Detector";
//charjs
import { Chart } from "react-chartjs-2";


//imagenes
import posx from "../../../Logos/img/Bridge2/posx.jpg";
import negx from "../../../Logos/img/Bridge2/negx.jpg";
import posy from "../../../Logos/img/Bridge2/posy.jpg";
import negy from "../../../Logos/img/Bridge2/negy.jpg";
import posz from "../../../Logos/img/Bridge2/posz.jpg";
import negz from "../../../Logos/img/Bridge2/negz.jpg";

//modelos 3d
import modeloMesaurl from "../../../Logos/models3d/Mesa.gltf";
import modelopiso from "../../../Logos/models3d/floor.gltf";
import modelluz from "../../../Logos/models3d/lights2.gltf";
import modelomueble1 from "../../../Logos/models3d/mueble_2.gltf";
import modelopared from "../../../Logos/models3d/paredes_1.gltf";
import modelopared2 from "../../../Logos/models3d/paredes_2.gltf";
import modelosilla from "../../../Logos/models3d/silla.gltf";

//videos
import video1 from "../../../Logos/videos/gumdang.mp4";

class Test3d extends Component {
  constructor(props) {
    super(props);

    this.animate = this.animate.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.mouseEventsdown = this.mouseEventsdown.bind(this);
    this.mouseEventup = this.mouseEventup.bind(this);

    this.setupCanvasDrawing = this.setupCanvasDrawing.bind(this);
    this.makeLabelCanvas = this.makeLabelCanvas.bind(this);

    this.state = {
      marksData: {
        labels: ["ruta1", "ruta2", "ruta3", "ruta4"],
        animation: false,

        datasets: [
          {
            label: "Student A",
            backgroundColor: "rgba(200,0,0,0.2)",
            data: [65, 75, 70, 80],
          },
          {
            label: "Student B",
            backgroundColor: "rgba(0,0,200,0.2)",
            data: [54, 65, 60, 70],
          },
        ],
      },
    };
  }
  componentDidMount() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    //eventos
    window.addEventListener("resize", this.updateDimensions);
    document.addEventListener("mousedown", this.mouseEventsdown);
    document.addEventListener("mouseup", this.mouseEventup);
    //variables de entorno
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    );
    this.camera.position.set(0, 0.9, 1.7);
    this.velocity = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.prevTime = performance.now();
    this.estado = false;
    this.estados_pantalla = { p0: true, p1: false };
    this.objInteraccion = [];
    this.objInteraccion0 = [];
    this.objInteraccion1 = [];
    this.objInteraccion2 = [];
    this.objInteraccion3 = [];
    //skybox
    var entorno = new THREE.CubeTextureLoader().load([
      posx,
      negx,
      posy,
      negy,
      posz,
      negz,
    ]);

    this.scene = new THREE.Scene();
    this.scene.background = entorno;
    this.scene.environment = entorno;

    this.light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
    this.light.position.set(0, 1, 0);
    this.scene.add(this.light);
    //console.log(this.scene);
    //video
    this.video = document.createElement("video");
    var source = document.createElement("source");
    source.type = "video/mp4";
    source.src = video1;
    this.video.appendChild(source);
    var texvideo = new THREE.VideoTexture(this.video);
    var geovideo = new THREE.PlaneBufferGeometry(16, 9);
    geovideo.scale(0.05, 0.05, 0.05);

    var materialvideo = new THREE.MeshBasicMaterial({ map: texvideo });
    this.meshvideo = new THREE.Mesh(geovideo, materialvideo);
    this.meshvideo.position.set(0.7, 0.5, 0);
    this.meshvideo.rotation.set(0, -Math.PI / 2, 0);
    this.meshvideo.visible = false;
    console.log(this.meshvideo);
    this.scene.add(this.meshvideo);
    // controles del video

    var geocaja = new THREE.BoxBufferGeometry(1, 1, 1);
    var objectI1 = new THREE.Mesh(
      geocaja,
      new THREE.MeshBasicMaterial({
        color: 0x4ff20e, opacity: 0.5,
        transparent: true,
      })
    );

    var objectI2 = new THREE.Mesh(
      geocaja,
      new THREE.MeshBasicMaterial({
        color: 0xf2380e, opacity: 0.5,
        transparent: true,
      })
    );

    this.objInteraccion1.push(objectI1);
    this.objInteraccion2.push(objectI2);
    // ejemplo de grafica
    this.canvasG = document.createElement("canvas");
    this.canvasG.height = 1;
    this.canvasG.width = 1;
    this.canvasG.id = "cfeo";

    document.body.appendChild(this.canvasG);
    this.materialC = new THREE.MeshBasicMaterial();
    this.objgrafico = new THREE.Object3D();
    var mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1, 1),
      this.materialC
    );
    var mesh2 = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1, 1),
      new THREE.MeshBasicMaterial({ color: 0xfffffff })
    );
    this.objgrafico.add(mesh);
    this.objgrafico.add(mesh2);
    this.objgrafico.rotation.set(-Math.PI / 2.25, 0, Math.PI / 18);
    this.objgrafico.position.set(-0.1, 0.22, 0.8);
    this.objgrafico.scale.set(0.2, 0.2, 0.2);
    console.log("grafico");
    console.log(this.objgrafico);
    this.scene.add(this.objgrafico);

    /*
    
▄▀▀ █░░█ ▀█▀
█░█ █░░█ ░█░
░▀▀ ░▀▀░ ▀▀▀
    */
    this.GUIv2 = new THREE.Object3D(); ///const guiv2 = new THREE.Object3D();

    this.fondos = {
      fondo0: new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x2E9AFE, opacity: 0.5, transparent: true, })),
      fondo1: new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x2E9AFE, opacity: 0.5, transparent: true, }))
    }
    this.btn_inter = {
      inter0: new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x61f20e, opacity: 0.5, transparent: true, })),
      inter1: new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x4ff20e, opacity: 0.5, transparent: true, })),
      inter2: new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xf2380e, opacity: 0.5, transparent: true, }))
    }
    this.pantallas = {
      pantalla0: new THREE.Object3D(),
      pantalla1: new THREE.Object3D()
    }
    this.letreros_Labels = {
      titulo_pantalla1: this.makeLabelCanvas(32, "Pantalla1"),
      titulo_pantalla2: this.makeLabelCanvas(32, "Pantalla2"),
      boton_p1_r1: this.makeLabelCanvas(24, "Genesis"),
      boton0_p2_r1: this.makeLabelCanvas(24, "video"),
      boton1_p2_r1: this.makeLabelCanvas(24, "grafico"),
    };
    this.letrerostexture = {
      titulo_pantalla1: new THREE.CanvasTexture(this.letreros_Labels.titulo_pantalla1),
      titulo_pantalla2: new THREE.CanvasTexture(this.letreros_Labels.titulo_pantalla2),
      boton_p1_r1: new THREE.CanvasTexture(this.letreros_Labels.boton_p1_r1),
      boton0_p2_r1: new THREE.CanvasTexture(this.letreros_Labels.boton0_p2_r1),
      boton1_p2_r1: new THREE.CanvasTexture(this.letreros_Labels.boton1_p2_r1),
    };

    //metodo poderoso encontrado por nestor :D
    for (const property in this.letrerostexture) {
      this.letrerostexture[property].minFilter = THREE.LinearFilter;
      this.letrerostexture[property].wrapS = THREE.ClampToEdgeWrapping;
      this.letrerostexture[property].wrapT = THREE.ClampToEdgeWrapping;
    }
    this.labelmaterials = {
      titulo_pantalla1: new THREE.MeshBasicMaterial({ map: this.letrerostexture.titulo_pantalla1, side: THREE.DoubleSide, transparent: true, }),
      titulo_pantalla2: new THREE.MeshBasicMaterial({ map: this.letrerostexture.titulo_pantalla2, side: THREE.DoubleSide, transparent: true }),
      boton_p1_r1: new THREE.MeshBasicMaterial({ map: this.letrerostexture.boton_p1_r1, side: THREE.DoubleSide, transparent: true }),
      boton0_p2_r1: new THREE.MeshBasicMaterial({ map: this.letrerostexture.boton0_p2_r1, side: THREE.DoubleSide, transparent: true }),
      boton1_p2_r1: new THREE.MeshBasicMaterial({ map: this.letrerostexture.boton1_p2_r1, side: THREE.DoubleSide, transparent: true }),
    }
    this.labelGeo = {
      titulo_pantalla1: new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), this.labelmaterials.titulo_pantalla1),
      titulo_pantalla2: new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), this.labelmaterials.titulo_pantalla2),
      boton_p1_r1: new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), this.labelmaterials.boton_p1_r1),
      boton0_p2_r1: new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), this.labelmaterials.boton0_p2_r1),
      boton1_p2_r1: new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), this.labelmaterials.boton1_p2_r1),
    }
    for (const property in this.labelGeo) {
      this.labelGeo[property].scale.x = this.letreros_Labels[property].width * 0.001;
      this.labelGeo[property].scale.y = this.letreros_Labels[property].height * 0.001;
    }

    var i0 = 0;
    for (const property in this.pantallas) {
      var i1 = 0;
      for (const property1 in this.fondos) {
        if (i1 === 0 && i0 === 0) {

          this.labelGeo.boton_p1_r1.position.set(this.labelGeo.titulo_pantalla1.position.x, this.labelGeo.titulo_pantalla1.position.y - 0.05, this.labelGeo.titulo_pantalla1.position.z)
          this.objInteraccion.push(this.btn_inter.inter0);
          this.btn_inter.inter0.scale.set(this.labelGeo.boton_p1_r1.scale.x, this.labelGeo.boton_p1_r1.scale.y, 0.005);
          this.btn_inter.inter0.position.set(this.labelGeo.boton_p1_r1.position.x, this.labelGeo.boton_p1_r1.position.y, -0.005);
          this.fondos[property1].scale.set(this.labelGeo.titulo_pantalla1.scale.x + 0.1, this.labelGeo.titulo_pantalla1.scale.x + 0.05);
          this.fondos[property1].position.set(this.labelGeo.titulo_pantalla1.position.x + 0.05, this.labelGeo.titulo_pantalla1.position.y - 0.007, -0.1);
          this.pantallas[property].add(this.labelGeo.titulo_pantalla1);
          this.pantallas[property].add(this.labelGeo.boton_p1_r1);
          this.pantallas[property].add(this.btn_inter.inter0);
          this.pantallas[property].add(this.fondos[property1]);
        } else if (i1 === 1 && i0 === 1) {

          this.labelGeo.boton0_p2_r1.position.set(this.labelGeo.titulo_pantalla2.position.x - 0.05, this.labelGeo.titulo_pantalla2.position.y - 0.05, this.labelGeo.titulo_pantalla2.position.z)
          this.labelGeo.boton1_p2_r1.position.set(this.labelGeo.titulo_pantalla2.position.x + 0.05, this.labelGeo.titulo_pantalla2.position.y - 0.05, this.labelGeo.titulo_pantalla2.position.z)
          this.objInteraccion0.push(this.labelGeo.boton0_p2_r1);
          this.objInteraccion3.push(this.labelGeo.boton1_p2_r1);
          /****************/
          this.btn_inter.inter1.scale.set(this.labelGeo.boton0_p2_r1.scale.x, this.labelGeo.boton0_p2_r1.scale.y, 0.005);
          this.btn_inter.inter1.position.set(this.labelGeo.boton0_p2_r1.position.x, this.labelGeo.boton0_p2_r1.position.y, -0.005)
          this.btn_inter.inter2.scale.set(this.labelGeo.boton1_p2_r1.scale.x, this.labelGeo.boton1_p2_r1.scale.y, 0.005);
          this.btn_inter.inter2.position.set(this.labelGeo.boton1_p2_r1.position.x, this.labelGeo.boton1_p2_r1.position.y, -0.005)
          /****** */
          this.fondos[property1].scale.set(this.labelGeo.titulo_pantalla2.scale.x + 0.2, this.labelGeo.titulo_pantalla2.scale.x + 0.05);
          this.fondos[property1].position.set(this.labelGeo.titulo_pantalla2.position.x + 0.05, this.labelGeo.titulo_pantalla2.position.y - 0.007, -0.1);
          this.pantallas[property].add(this.labelGeo.titulo_pantalla2);
          this.pantallas[property].add(this.labelGeo.boton0_p2_r1);
          this.pantallas[property].add(this.labelGeo.boton1_p2_r1);
          this.pantallas[property].add(this.btn_inter.inter1);
          this.pantallas[property].add(this.btn_inter.inter2);
          this.pantallas[property].add(this.fondos[property1]);
        }
        i1 += 1;
      }

      i0 += 1;
    }

    for (const property in this.pantallas) {
      this.GUIv2.add(this.pantallas[property]);
    }
    this.GUIv2.position.set(0.3, 0.33, 0.9); this.GUIv2.rotation.set(0, - Math.PI / 4, 0);
    console.log("gui2");
    console.log(this.GUIv2);
    this.scene.add(this.GUIv2);
    this.pantallas.pantalla0.visible = this.estados_pantalla.p0;
    this.pantallas.pantalla1.visible = this.estados_pantalla.p1;


  


    /*
   ▄▀▀ █░░█ ▀█▀ . █▀▀ █▄░█ █▀▄
   █░█ █░░█ ░█░ . █▀▀ █▀██ █░█
   ░▀▀ ░▀▀░ ▀▀▀ . ▀▀▀ ▀░░▀ ▀▀░
   
       */

    //---------------default------------------------
    var geopiso = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
    geopiso.rotateX(-Math.PI / 2);

    var pisodefault = new THREE.Mesh(
      geopiso,
      new THREE.MeshBasicMaterial({
        vertexColors: true,
        color: 0xfffffff,
        opacity: 0.9,
        transparent: true,
      })
    );
    pisodefault.position.set(0, -0.3, 0);
    this.scene.add(pisodefault);
    //---------------------------------------------------- // rendering
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.gamaOutput = true;
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
    this.controls = new PointerLockControls(this.camera, document.body);
    // this.controls.lock();
    //  this.controls.connect();

    // this.controls.isLocked = true ;
    console.log(this.controls.getObject());

    this.controls.getObject().position.set(0, 0.3, 1);

    this.scene.add(this.controls.getObject());
    //---------
    var roughnessMipmapper = new RoughnessMipmapper(this.renderer);
    //--------------------------------------------------------
    var objmesa = new THREE.Object3D();
    new GLTFLoader()
      .setDRACOLoader(new DRACOLoader())
      .load(modeloMesaurl, (gltf) => {
        gltf.scene.traverse((nino) => {
          if (nino.isMesh) {
            nino.material.envMap = this.entorno;
            roughnessMipmapper.generateMipmaps(nino.material);
          }
        });
        objmesa.add(gltf.scene);
      });
    objmesa.position.set(1, -0.3, -1.75);
    objmesa.rotation.set(0, 0, 0);
    objmesa.scale.set(1, 1, 1);
    objmesa.castShadow = true;
    objmesa.receiveShadow = true;
    this.scene.add(objmesa);

    var objpiso = new THREE.Object3D();
    new GLTFLoader().load(modelopiso, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objpiso.add(gltf.scene);
    });
    //-2.72,-0.3,-1.75, 0,0,0, 1,1,1)
    objpiso.position.set(-2.72, -0.3, -1.75);
    objpiso.rotation.set(0, 0, 0);
    objpiso.scale.set(1, 1, 1);
    this.scene.add(objpiso);

    var objluz = new THREE.Object3D();
    new GLTFLoader().load(
      modelluz,
      (gltf) => {
        gltf.scene.traverse((nino) => {
          if (nino.isMesh) {
            nino.material.envMap = this.entorno;
          }
        });
        objluz.add(gltf.scene);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log("An error happened");
      }
    );
    //1,-0.3,-1.75, 0,0,0, 1,1,1
    objluz.position.set(1, -0.3, -1.75);
    objluz.rotation.set(0, 0, 0);
    objluz.scale.set(1, 1, 1);
    this.scene.add(objluz);

    var objmueble = new THREE.Object3D();
    new GLTFLoader().load(modelomueble1, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objmueble.add(gltf.scene);
    });
    //1,-0.3,-1.75, 0,0,0, 1,1,1
    objmueble.position.set(-0.33, -0.07, -0.9);
    objmueble.rotation.set(0, 0, 0);
    objmueble.scale.set(1, 1, 1);
    objmueble.castShadow = true;
    objmueble.receiveShadow = true;
    console.log(objmueble);
    this.scene.add(objmueble);

    var objpared1 = new THREE.Object3D();
    new GLTFLoader().load(modelopared, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objpared1.add(gltf.scene);
    });
    //1,-0.25,-2, 0,0,0, 1,1,1
    objpared1.position.set(1, -0.27, -2);
    objpared1.rotation.set(0, 0, 0);
    objpared1.scale.set(1, 1, 1);

    this.scene.add(objpared1);

    var objpared2 = new THREE.Object3D();
    new GLTFLoader().load(modelopared2, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objpared2.add(gltf.scene);
    });
    //1,6.04 ,-2, 0,0,0, 1,1,1
    objpared2.position.set(1, 6.04, -2);
    objpared2.rotation.set(0, 0, 0);
    objpared2.scale.set(1, 1, 1);
    this.scene.add(objpared2);

    var objsilla1 = new THREE.Object3D();
    new GLTFLoader().load(modelosilla, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objsilla1.add(gltf.scene);
    });
    objsilla1.position.set(1.32, -0.33, -1.7);
    objsilla1.rotation.set(0, 0, 0);
    objsilla1.scale.set(1, 1, 1);
    this.scene.add(objsilla1);

    var objsilla2 = new THREE.Object3D();
    new GLTFLoader().load(modelosilla, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objsilla2.add(gltf.scene);
    });
    //sillas[1].rotation.y= Math.PI; sillas[1].position.x=-1.28; sillas[1].position.z=1.5;
    objsilla2.position.set(-1.28, -0.33, 1.5);
    objsilla2.rotation.set(0, Math.PI, 0);
    objsilla2.scale.set(1, 1, 1);
    this.scene.add(objsilla2);

    var objsilla3 = new THREE.Object3D();
    new GLTFLoader().load(modelosilla, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objsilla3.add(gltf.scene);
    });
    //  sillas[2].rotation.y= Math.PI/2;sillas[2].position.x=-2.28;sillas[2].position.z=-1.4;
    objsilla3.position.set(-2.28, -0.33, -1.4);
    objsilla3.rotation.set(0, Math.PI / 2, 0);
    objsilla3.scale.set(1, 1, 1);
    this.scene.add(objsilla3);

    var objsilla4 = new THREE.Object3D();
    new GLTFLoader().load(modelosilla, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objsilla4.add(gltf.scene);
    });
    //  illas[4].rotation.y= Math.PI/2;sillas[4].position.x=-2.28;sillas[4].position.z=-2;
    objsilla4.position.set(-2.28, -0.33, -2);
    objsilla4.rotation.set(0, Math.PI / 2, 0);
    objsilla4.scale.set(1, 1, 1);
    this.scene.add(objsilla4);

    var objsilla5 = new THREE.Object3D();
    new GLTFLoader().load(modelosilla, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objsilla5.add(gltf.scene);
    });
    // sillas[5].rotation.y = - Math.PI/2; sillas[5].position.x=2.28;sillas[5].position.z=1.2;
    objsilla5.position.set(2.28, -0.33, 1.2);
    objsilla5.rotation.set(0, -Math.PI / 2, 0);
    objsilla5.scale.set(1, 1, 1);
    this.scene.add(objsilla5);

    var objsilla6 = new THREE.Object3D();
    new GLTFLoader().load(modelosilla, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objsilla6.add(gltf.scene);
    });
    //sillas[6].rotation.y = - Math.PI/2; sillas[6].position.x=2.28;sillas[6].position.z=0.65;
    objsilla6.position.set(2.28, -0.33, 0.65);
    objsilla6.rotation.set(0, -Math.PI / 2, 0);
    objsilla6.scale.set(1, 1, 1);
    this.scene.add(objsilla6);

    var objsilla7 = new THREE.Object3D();
    new GLTFLoader().load(modelosilla, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objsilla7.add(gltf.scene);
    });
    //sillas[7].rotation.y = - Math.PI/2; sillas[7].position.x=2.28;sillas[7].position.z=1.8;
    objsilla7.position.set(2.28, -0.33, 1.8);
    objsilla7.rotation.set(0, -Math.PI / 2, 0);
    objsilla7.scale.set(1, 1, 1);
    this.scene.add(objsilla7);

    var objsilla8 = new THREE.Object3D();
    new GLTFLoader().load(modelosilla, (gltf) => {
      gltf.scene.traverse((nino) => {
        if (nino.isMesh) {
          nino.material.envMap = this.entorno;
        }
      });
      objsilla8.add(gltf.scene);
    });
    //sillas[3].rotation.y= Math.PI/2;sillas[3].position.x=-2.28;sillas[3].position.z=-0.7;
    objsilla8.position.set(-2.28, -0.33, -0.7);
    objsilla8.rotation.set(0, Math.PI / 2, 0);
    objsilla8.scale.set(1, 1, 1);
    this.scene.add(objsilla8);

    //-------------------------------------------------------- espejo
    var geometry = new THREE.PlaneBufferGeometry(0.65, 1.93);
    var verticalMirror = new Reflector(geometry, {
      clipBias: 0.0005,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: 0x889999,
      recursion: 1,
    });
    verticalMirror.position.y = 0.177;
    verticalMirror.position.x = 0.023;
    verticalMirror.position.z = -0.047;
    verticalMirror.rotation.x = -Math.PI / 2;
    this.scene.add(verticalMirror);
    var objectopasidad = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: 0x0000000,
        opacity: 0.9,
        transparent: true,
      })
    );
    objectopasidad.position.y = verticalMirror.position.y + 0.001;
    objectopasidad.position.x = verticalMirror.position.x;
    objectopasidad.position.z = verticalMirror.position.z;
    objectopasidad.rotation.x = verticalMirror.rotation.x;
    this.scene.add(objectopasidad);

    this.mount.appendChild(this.renderer.domElement);
    this.animate();

    //zona de impresiones para pruevas
    // console.log(this.materialC);
  } // fin del componentdidmount
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
    document.removeEventListener("mousedown", this.mouseEventsdown);
    document.removeEventListener("mouseup", this.mouseEventup);
    this.mount.removeChild(this.renderer.domElement);
  } //fin del componentWillUnmount
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

    var delta = (time - this.prevTime) / 1000;

    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;
    this.controls.moveRight(-this.velocity.x * delta);
    this.controls.moveForward(-this.velocity.z * delta);

    this.controls.isLocked = this.estado;

    this.materialC.needsUpdate = true;
    this.prevTime = time;
    this.renderer.render(this.scene, this.camera);

    //   console.log(this.camera.position);
    // console.log("renderizando ando");
  } //fin animate
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
  mouseEventsdown = (event) => {
    /*    this.setState({
          x: event.clientX,
          y: event.clientY
        }); */
    // console.log(event);
    event.preventDefault();
    console.log("clic");
    // this.video.play();
    this.mouse.x =
      (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    this.mouse.y =
      -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    var intersectsplay = this.raycaster.intersectObjects(this.objInteraccion1);
    var intersectspause = this.raycaster.intersectObjects(this.objInteraccion2);
    var intersect = this.raycaster.intersectObjects(this.objInteraccion);
    var intersect0 = this.raycaster.intersectObjects(this.objInteraccion0);
    var intersect3 = this.raycaster.intersectObjects(this.objInteraccion3);
    if (intersectsplay.length > 0) {
      // this.video.play();
      //this.meshvideo.visible = true;
    } else
      if (intersectspause.length > 0) {
        //this.video.pause();
        //   this.meshvideo.visible = false;
        //    this.setupCanvasDrawing();
      } else
        if (intersect0.length > 0 && this.estados_pantalla.p1) {
          console.log("video play")
          this.video.play();
          this.meshvideo.visible = true;
        } else
          if (intersect.length > 0 && this.estados_pantalla.p0) {
            console.log("primera pantalal fuera")
            this.estados_pantalla.p0 = false;
            this.pantallas.pantalla0.visible = this.estados_pantalla.p0;
            this.estados_pantalla.p1 = true;
            this.pantallas.pantalla1.visible = this.estados_pantalla.p1;
          }
          else
            if (intersect3.length > 0 && this.estados_pantalla.p1) {
              console.log("video pausado")
              this.video.pause();
              this.meshvideo.visible = false;
              this.setupCanvasDrawing();
            }

    this.estado = true;
  };
  mouseEventup = (event) => {
    /*    this.setState({
        x: event.clientX,
        y: event.clientY
      }); */
    // console.log(event);
    this.estado = false;
    // this.video.pause();
    console.log("no clic");
  };
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
  setupCanvasDrawing = () => {
    console.log("nuevo material");
    var drawingCanvas = this.canvasG;
    new Chart(drawingCanvas, {
      type: "radar",
      data: this.state.marksData,
    });
    this.materialC.map = new THREE.CanvasTexture(drawingCanvas);

    this.materialC.transparent = true;
  };
  /*
    *
    *
    * *
    * 
    * *
    * *
    * 
    fin del metodo setupCanvasDrawing
    *
    *
    * *
    * 
    * *
    * 
    *  */
  makeLabelCanvas = (size, name) => {
    const borderSize = 2;
    const ctx = document.createElement('canvas').getContext('2d');
    const font = `${size}px bold sans-serif`;
    ctx.font = font;
    // medir cuánto tiempo el nombre será
    const doubleBorderSize = borderSize * 2;
    const width = ctx.measureText(name).width + doubleBorderSize;
    const height = size + doubleBorderSize;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    // necesidad de establecer la fuente de nuevo después de cambiar el tamaño del lienzo
    ctx.font = font;
    ctx.textBaseline = 'top';
    //color : white , blue, black 
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    ctx.fillText(name, borderSize, borderSize);

    return ctx.canvas;
  }
  render() {
    return (
      <div className="test3d">
        <div
          style={{ width: "100vw", height: "50.1vw" }}
          id="boardCanvas"
          ref={(mount) => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}

export default Test3d;

/*
                                  ,;;;;;;,
                                ,;;;'""`;;\
                              ,;;;/  .'`',;\
                            ,;;;;/   |    \|_
                           /;;;;;    \    / .\
                         ,;;;;;;|     '.  \/_/
                        /;;;;;;;|       \
             _,.---._  /;;;;;;;;|        ;   _.---.,_
           .;;/      `.;;;;;;;;;|         ;'      \;;,
         .;;;/         `;;;;;;;;;.._    .'         \;;;.
        /;;;;|          _;-"`       `"-;_          |;;;;\
       |;;;;;|.---.   .'  __.-"```"-.__  '.   .---.|;;;;;|
       |;;;;;|     `\/  .'/__\     /__\'.  \/`     |;;;;;|
       |;;;;;|       |_/ //  \\   //  \\ \_|       |;;;;;|
       |;;;;;|       |/ |/    || ||    \| \|       |;;;;;|
        \;;;;|    __ || _  .-.\| |/.-.  _ || __    |;;;;/
         \jgs|   / _\|/ = /_o_\   /_o_\ = \|/_ \   |;;;/
          \;;/   |`.-     `   `   `   `     -.`|   \;;/
         _|;'    \ |    _     _   _     _    | /    ';|_
        / .\      \\_  ( '--'(     )'--' )  _//      /. \
        \/_/       \_/|  /_   |   |   _\  |\_/       \_\/
                      | /|\\  \   /  //|\ |
                      |  | \'._'-'_.'/ |  |
                      |  ;  '-.```.-'  ;  |
                      |   \    ```    /   |
    __                ;    '.-"""""-.'    ;                __
   /\ \_         __..--\     `-----'     /--..__         _/ /\
   \_'/\`''---''`..;;;;.'.__,       ,__.',;;;;..`''---''`/\'_/
        '-.__'';;;;;;;;;;;,,'._   _.',,;;;;;;;;;;;''__.-'
             ``''--; ;;;;;;;;..`"`..;;;;;;;; ;--''``   _
        .-.       /,;;;;;;;';;;;;;;;;';;;;;;;,\    _.-' `\
      .'  /_     /,;;;;;;'/| ;;;;;;; |\';;;;;;,\  `\     '-'|
     /      )   /,;;;;;',' | ;;;;;;; | ',';;;;;,\   \   .'-./
     `'-..-'   /,;;;;','   | ;;;;;;; |   ',';;;;,\   `"`
              | ;;;','     | ;;;;;;; |  ,  ', ;;;'|
             _\__.-'  .-.  ; ;;;;;;; ;  |'-. '-.__/_
            / .\     (   )  \';;;;;'/   |   |    /. \
            \/_/   (`     `) \';;;'/    '-._|    \_\/
                    '-/ \-'   '._.'         `
                      """      /.`\
                               \|_/
*/
