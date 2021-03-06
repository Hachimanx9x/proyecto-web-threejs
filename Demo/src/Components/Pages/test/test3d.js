import React, { Component } from "react";
//libreria 3d
import * as THREE from "three/build/three.module";
//libreria para los controles
//import {OrbitControls} from "three/examples/jsm/controls/OrbitControls" ;
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
//libreria para detectar compatibilidad
import Detector from "../../../lib_externo/Detector";
//charjs
import { Chart } from "react-chartjs-2";
//socket
import io from "socket.io-client";
import Button3d from "./script/buttons";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import ContentCard from "./script/cardvote";
import User from "../../../Logos/user-icon.png";
import Navvote from "./script/navresult";
import CargarObj from "./script/CargarObjGltf";
import Mirror from "./script/mirror";
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
    this.funcionvotacion = this.funcionvotacion.bind(this);
    this.funcdis = this.funcdis.bind(this);
    this.funcvolvervoto = this.funcvolvervoto.bind(this);
    this.funcalert = this.funcalert.bind(this);
    this.state = {
      player: null,
      reunion: 1,
      votaciones: false,
      resultados: false,
      results: [
        { name: "nombre 1 ", img: User, voto: true },
        { name: "nombre 1 ", img: User, voto: false },
        { name: "nombre 1 ", img: User, voto: true },
        { name: "nombre 1 ", img: User, voto: true },
        { name: "nombre 1 ", img: User, voto: false },
        { name: "nombre 1 ", img: User, voto: true },
      ],
      practica: {
        nombre: "practica 1 ",
        estadoActual: "iniciado",
        estaoevaluar: "identificado",
        preguntas: [
          {
            texto: "se a identificado tensiones de valor entre interesados",
            estado: false,
          },
          {
            texto:
              "se a identificado posibles usos mal intencionados del Sistema Multimedia",
            estado: false,
          },
          {
            texto:
              "se a identificado patrones que afectan el Sistema Multimedia",
            estado: false,
          },
          {
            texto:
              "se a identificado leyes y normatividades que influyen en la solución",
            estado: false,
          },
          {
            texto:
              "se a identificado aspectos culturales, sociales y cognitivos que influyen en la comunidad objeto de análisis",
            estado: false,
          },
        ],
      },
      posicionplayer: { x: 0, y: 0.3, z: 1 },
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
    //   console.log(this.state)
    this.socket = io("http://localhost:3030/", {
      reconnectionDelayMax: 10000,
      auth: {
        token: "123",
      },
      query: {
        reunion: this.state.reunion,
      },
    });

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
    this.menuopciones = {
      salir: [],
      votacion: [],
    };
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
        color: 0x4ff20e,
        opacity: 0.5,
        transparent: true,
      })
    );

    var objectI2 = new THREE.Mesh(
      geocaja,
      new THREE.MeshBasicMaterial({
        color: 0xf2380e,
        opacity: 0.5,
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
      fondo0: new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        new THREE.MeshBasicMaterial({
          color: 0x2e9afe,
          opacity: 0.5,
          transparent: true,
        })
      ),
      fondo1: new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        new THREE.MeshBasicMaterial({
          color: 0x2e9afe,
          opacity: 0.5,
          transparent: true,
        })
      ),
    };
    this.btn_inter = {
      inter0: new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
          color: 0x61f20e,
          opacity: 0.5,
          transparent: true,
        })
      ),
      inter1: new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
          color: 0x4ff20e,
          opacity: 0.5,
          transparent: true,
        })
      ),
      inter2: new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
          color: 0xf2380e,
          opacity: 0.5,
          transparent: true,
        })
      ),
    };
    this.pantallas = {
      pantalla0: new THREE.Object3D(),
      pantalla1: new THREE.Object3D(),
    };
    this.letreros_Labels = {
      titulo_pantalla1: this.makeLabelCanvas(32, "Pantalla1"),
      titulo_pantalla2: this.makeLabelCanvas(32, "Pantalla2"),
      boton_p1_r1: this.makeLabelCanvas(24, "Genesis"),
      boton0_p2_r1: this.makeLabelCanvas(24, "video"),
      boton1_p2_r1: this.makeLabelCanvas(24, "grafico"),
    };
    this.letrerostexture = {
      titulo_pantalla1: new THREE.CanvasTexture(
        this.letreros_Labels.titulo_pantalla1
      ),
      titulo_pantalla2: new THREE.CanvasTexture(
        this.letreros_Labels.titulo_pantalla2
      ),
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
      titulo_pantalla1: new THREE.MeshBasicMaterial({
        map: this.letrerostexture.titulo_pantalla1,
        side: THREE.DoubleSide,
        transparent: true,
      }),
      titulo_pantalla2: new THREE.MeshBasicMaterial({
        map: this.letrerostexture.titulo_pantalla2,
        side: THREE.DoubleSide,
        transparent: true,
      }),
      boton_p1_r1: new THREE.MeshBasicMaterial({
        map: this.letrerostexture.boton_p1_r1,
        side: THREE.DoubleSide,
        transparent: true,
      }),
      boton0_p2_r1: new THREE.MeshBasicMaterial({
        map: this.letrerostexture.boton0_p2_r1,
        side: THREE.DoubleSide,
        transparent: true,
      }),
      boton1_p2_r1: new THREE.MeshBasicMaterial({
        map: this.letrerostexture.boton1_p2_r1,
        side: THREE.DoubleSide,
        transparent: true,
      }),
    };
    this.labelGeo = {
      titulo_pantalla1: new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        this.labelmaterials.titulo_pantalla1
      ),
      titulo_pantalla2: new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        this.labelmaterials.titulo_pantalla2
      ),
      boton_p1_r1: new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        this.labelmaterials.boton_p1_r1
      ),
      boton0_p2_r1: new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        this.labelmaterials.boton0_p2_r1
      ),
      boton1_p2_r1: new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        this.labelmaterials.boton1_p2_r1
      ),
    };
    for (const property in this.labelGeo) {
      this.labelGeo[property].scale.x =
        this.letreros_Labels[property].width * 0.001;
      this.labelGeo[property].scale.y =
        this.letreros_Labels[property].height * 0.001;
    }

    var i0 = 0;
    for (const property in this.pantallas) {
      var i1 = 0;
      for (const property1 in this.fondos) {
        if (i1 === 0 && i0 === 0) {
          this.labelGeo.boton_p1_r1.position.set(
            this.labelGeo.titulo_pantalla1.position.x,
            this.labelGeo.titulo_pantalla1.position.y - 0.05,
            this.labelGeo.titulo_pantalla1.position.z
          );
          this.objInteraccion.push(this.btn_inter.inter0);
          this.btn_inter.inter0.scale.set(
            this.labelGeo.boton_p1_r1.scale.x,
            this.labelGeo.boton_p1_r1.scale.y,
            0.005
          );
          this.btn_inter.inter0.position.set(
            this.labelGeo.boton_p1_r1.position.x,
            this.labelGeo.boton_p1_r1.position.y,
            -0.005
          );
          this.fondos[property1].scale.set(
            this.labelGeo.titulo_pantalla1.scale.x + 0.1,
            this.labelGeo.titulo_pantalla1.scale.x + 0.05
          );
          this.fondos[property1].position.set(
            this.labelGeo.titulo_pantalla1.position.x + 0.05,
            this.labelGeo.titulo_pantalla1.position.y - 0.007,
            -0.1
          );
          this.pantallas[property].add(this.labelGeo.titulo_pantalla1);
          this.pantallas[property].add(this.labelGeo.boton_p1_r1);
          this.pantallas[property].add(this.btn_inter.inter0);
          this.pantallas[property].add(this.fondos[property1]);
        } else if (i1 === 1 && i0 === 1) {
          this.labelGeo.boton0_p2_r1.position.set(
            this.labelGeo.titulo_pantalla2.position.x - 0.05,
            this.labelGeo.titulo_pantalla2.position.y - 0.05,
            this.labelGeo.titulo_pantalla2.position.z
          );
          this.labelGeo.boton1_p2_r1.position.set(
            this.labelGeo.titulo_pantalla2.position.x + 0.05,
            this.labelGeo.titulo_pantalla2.position.y - 0.05,
            this.labelGeo.titulo_pantalla2.position.z
          );
          this.objInteraccion0.push(this.labelGeo.boton0_p2_r1);
          this.objInteraccion3.push(this.labelGeo.boton1_p2_r1);
          /****************/
          this.btn_inter.inter1.scale.set(
            this.labelGeo.boton0_p2_r1.scale.x,
            this.labelGeo.boton0_p2_r1.scale.y,
            0.005
          );
          this.btn_inter.inter1.position.set(
            this.labelGeo.boton0_p2_r1.position.x,
            this.labelGeo.boton0_p2_r1.position.y,
            -0.005
          );
          this.btn_inter.inter2.scale.set(
            this.labelGeo.boton1_p2_r1.scale.x,
            this.labelGeo.boton1_p2_r1.scale.y,
            0.005
          );
          this.btn_inter.inter2.position.set(
            this.labelGeo.boton1_p2_r1.position.x,
            this.labelGeo.boton1_p2_r1.position.y,
            -0.005
          );
          /****** */
          this.fondos[property1].scale.set(
            this.labelGeo.titulo_pantalla2.scale.x + 0.2,
            this.labelGeo.titulo_pantalla2.scale.x + 0.05
          );
          this.fondos[property1].position.set(
            this.labelGeo.titulo_pantalla2.position.x + 0.05,
            this.labelGeo.titulo_pantalla2.position.y - 0.007,
            -0.1
          );
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
    this.GUIv2.position.set(0.3, 0.33, 0.9);
    this.GUIv2.rotation.set(0, -Math.PI / 4, 0);
    console.log("gui2");
    console.log(this.GUIv2);

    let bu = new Button3d(
      0.005,
      0xf2380e,
      1,
      true,
      { size: 32, text: " Salir " },
      { x: 0.03, y: 0.03 },
      { x: 0, y: 0, z: 0 }
    ).button;
    let bu2 = new Button3d(
      0.005,
      0x81e219,
      1,
      true,
      { size: 32, text: " votar " },
      { x: 0.03, y: 0.03 },
      { x: 0, y: 0, z: 0 }
    ).button;
    console.log("//---------- button");
    bu.obj.position.set(0.1, 0.185, 0.93);
    bu.obj.rotation.x = -Math.PI / 2;
    bu2.obj.position.set(0, 0.185, 0.93);
    bu2.obj.rotation.x = -Math.PI / 2;
    this.menuopciones.salir = bu.Interaction;
    this.menuopciones.votacion = bu2.Interaction;

    this.scene.add(bu.obj);
    this.scene.add(bu2.obj);
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
    //  console.log(this.controls.getObject());

    this.scene.add(this.controls.getObject());
    //---------

    this.scene.add(
      new CargarObj(
        this.entorno, //se carga el entorno por los reflejos
        modeloMesaurl, //le mando el modelo en gltf
        "mesa", //el nombre del objeto
        { x: 1, y: -0.3, z: -1.75 }, // posicion
        { x: 0, y: 0, z: 0 }, // rotacion
        { x: 1, y: 1, z: 1 }
      ).obj //escala
    );

    this.scene.add(
      new CargarObj(
        this.entorno,
        modelopiso,
        "piso",
        { x: -2.72, y: -0.3, z: -1.75 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelluz,
        "luz",
        { x: 1, y: -0.3, z: -1.75 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelomueble1,
        "muble",
        { x: -0.33, y: -0.07, z: -0.9 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelopared,
        "pared1",
        { x: 1, y: -0.27, z: -2 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelopared2,
        "pared2",
        { x: 1, y: 6.04, z: -2 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelosilla,
        "silla1",
        { x: 1.32, y: -0.33, z: -1.7 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelosilla,
        "silla2",
        { x: -1.28, y: -0.33, z: 1.5 },
        { x: 0, y: Math.PI, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelosilla,
        "silla3",
        { x: -2.28, y: -0.33, z: -1.4 },
        { x: 0, y: Math.PI / 2, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelosilla,
        "silla4",
        { x: -2.28, y: -0.33, z: -2 },
        { x: 0, y: Math.PI / 2, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelosilla,
        "silla5",
        { x: 2.28, y: -0.33, z: 1.2 },
        { x: 0, y: -Math.PI / 2, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelosilla,
        "silla6",
        { x: 2.28, y: -0.33, z: 0.65 },
        { x: 0, y: -Math.PI / 2, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelosilla,
        "silla7",
        { x: 2.28, y: -0.33, z: 1.8 },
        { x: 0, y: -Math.PI / 2, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );
    this.scene.add(
      new CargarObj(
        this.entorno,
        modelosilla,
        "silla8",
        { x: -2.28, y: -0.33, z: -0.7 },
        { x: 0, y: Math.PI / 2, z: 0 },
        { x: 1, y: 1, z: 1 }
      ).obj
    );

    //-------------------------------------------------------- espejo
    //0.177 0.023 -0.047
    let espejo = new Mirror(
      0.65,
      1.93,
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio,
      0x0000000,
      0.9,
      { x: 0.023, y: 0.177, z: -0.047 },
      { x: -Math.PI / 2, y: 0, z: 0 }
    ).obj;
    this.scene.add(espejo.mirror);
    this.scene.add(espejo.filter);

    this.mount.appendChild(this.renderer.domElement);
    this.animate();
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
    this.controls
      .getObject()
      .position.set(
        this.state.posicionplayer.x,
        this.state.posicionplayer.y,
        this.state.posicionplayer.z
      );
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

  mouseEventsdown = (event) => {
    /*    this.setState({
          x: event.clientX,
          y: event.clientY
        }); */
    // console.log(event);
    event.preventDefault();
    console.log("clic");

    this.mouse.x =
      (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    this.mouse.y =
      -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    var intersectsplay = this.raycaster.intersectObjects(this.objInteraccion1);
    var intersectspause = this.raycaster.intersectObjects(this.objInteraccion2);
    var intersect = this.raycaster.intersectObjects(this.objInteraccion);
    var intersect0 = this.raycaster.intersectObjects(this.objInteraccion0);
    let intersect4 = this.raycaster.intersectObjects(this.menuopciones.salir);
    let intersect5 = this.raycaster.intersectObjects(
      this.menuopciones.votacion
    );
    var intersect3 = this.raycaster.intersectObjects(this.objInteraccion3);
    if (intersectsplay.length > 0) {
      // this.video.play();
      //this.meshvideo.visible = true;
    } else if (intersectspause.length > 0) {
      //this.video.pause();
      //   this.meshvideo.visible = false;
      //    this.setupCanvasDrawing();
    } else if (intersect0.length > 0 && this.estados_pantalla.p1) {
      console.log("video play");
      this.video.play();
      this.meshvideo.visible = true;
    } else if (intersect.length > 0 && this.estados_pantalla.p0) {
      console.log("primera pantalal fuera");
      this.estados_pantalla.p0 = false;
      this.pantallas.pantalla0.visible = this.estados_pantalla.p0;
      this.estados_pantalla.p1 = true;
      this.pantallas.pantalla1.visible = this.estados_pantalla.p1;
    } else if (intersect3.length > 0 && this.estados_pantalla.p1) {
      console.log("video pausado");
      this.video.pause();
      this.meshvideo.visible = false;
      this.setupCanvasDrawing();
    } else if (intersect4.length > 0 && !this.state.votaciones) {
      console.log("salir");
      window.location.href = "/Dashboard/Desktop";
    } else if (intersect5.length > 0 && !this.state.votaciones) {
      this.setState({ votaciones: true });
      console.log("votacion");
    }

    this.estado = true;
  };
  mouseEventup = (event) => {
    // console.log(event);
    this.estado = false;
    // this.video.pause();
    console.log("no clic");
  };

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

  makeLabelCanvas = (size, name) => {
    const borderSize = 2;
    const ctx = document.createElement("canvas").getContext("2d");
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
    ctx.textBaseline = "top";
    //color : white , blue, black
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.fillText(name, borderSize, borderSize);

    return ctx.canvas;
  };

  funcionvotacion = () => {
    this.setState({ votaciones: false, resultados: true });
  };
  funcdis = () => {
    this.setState({ votaciones: false, resultados: false });
  };
  funcvolvervoto = () => {
    console.log("000000000");
    this.setState({ votaciones: true, resultados: false });
  };
  funcalert = (texto) => {
    this.setState({ votaciones: false, resultados: false });
    alert(`Se actualizo la alfa ${texto}`);
  };
  render() {
    let custo = {
      padding: "0",
      borderTopLeftRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
    };
    return (
      <div className="test3d">
        <Rodal
          width={300}
          height={420}
          animation={"fade"}
          visible={this.state.votaciones}
          customStyles={custo}
        >
          <ContentCard obj={this.state.practica} voto={this.funcionvotacion} />
        </Rodal>
        <Rodal
          width={900}
          height={600}
          visible={this.state.resultados}
          customStyles={custo}
        >
          <Navvote
            alfa="EXPERIENCIA MULTIMEDIA"
            estado="inciada"
            descripcion="descripcion"
            obj={this.state.results}
            funccer={this.funcdis}
            funvolver={this.funcvolvervoto}
            alert={this.funcalert}
          />
        </Rodal>
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
