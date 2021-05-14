import React, { Component } from "react";
//libreria 3d
import * as THREE from "three/build/three.module";
import axios from "axios";
import MicrophoneStream from "microphone-stream";
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
import Cartarje from "./script/cardvotefi";
import Navfinavote from "./script/navresult";
import "rodal/lib/rodal.css";
import ContentCard from "./script/cardvote";
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
    //variables de la libreria threejs
    this.scene = new THREE.Scene();
    this.animate = this.animate.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.mouseEventsdown = this.mouseEventsdown.bind(this);
    this.mouseEventup = this.mouseEventup.bind(this);

    this.setupCanvasDrawing = this.setupCanvasDrawing.bind(this);
    this.makeLabelCanvas = this.makeLabelCanvas.bind(this);
    this.funcionvotacion = this.funcionvotacion.bind(this);
    this.funcionvotacionpractica = this.funcionvotacionpractica.bind(this);
    this.actualizaralfas = this.actualizaralfas.bind(this);
    this.variablerara = [];
    this.npcs = [];
    this.idsnpcs = [];
    this.numnpcs = 0;
    this.posiciones = [
      { x: 0, y: 0.3, z: -1.1 },
      { x: 0.45, y: 0.3, z: -0.7 },
      { x: 0.45, y: 0.3, z: -0.1 },
      { x: 0.45, y: 0.3, z: 0.6 },
      { x: -0.45, y: 0.3, z: -0.5 },
      { x: -0.45, y: 0.3, z: -0.1 },
      { x: -0.45, y: 0.3, z: -1.7 },
    ];
    this.escena = false;

    this.hablar = this.hablar.bind(this);
    this.state = {
      nombre: "",
      imgen: "",
      practicas: [],
      tarjepracticas: [],
      aflasactu: [],
      state: "mute",
      escuchar: false,
      namepra: "",
      myvote: null,
      final: false,
      showpra: false,
      escena: false,
      room: `sala1`,
      user: "default",
      compas: [],
      player: null,
      reunion: 1,
      votaciones: false,
      nadatpra: {
        alfa: "default",
        estado: "default",
        descripcion: "default",
      },
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
        animation: {
          duration: 0,
        },

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
  async componentDidMount() {
    const token = localStorage.getItem("login");
    const obj = JSON.parse(token);
    const tokensito = obj.token;
    const namedata = obj.data;
    console.log(namedata);
    this.setState({
      nombre: namedata.nombre,
      imgen: namedata.foto,
    });
    // console.log(this.props.match.params);
    const reunionId = this.props.match.params.id.split("ABC");

    console.log(this.props);
    this.setState({ room: `sala${reunionId[1]}` });
    try {
      axios
        .get(`http://localhost:3030/proyecto/reunion/${reunionId[0]}`, {
          headers: { authorization: `llave ${tokensito}` },
        })
        .then((response) => {
          let tem = [];
          this.setState({ practicas: [...response.data] });
          console.log(this.state.practicas);
          for (let a = 0; a < this.state.practicas; a++) {
            tem.push({
              name: this.state.practicas[a].nombre,
              description: this.state.practicas[a].descripcion,
            });
          }
          this.setState({ tarjepracticas: tem });
        });
    } catch (error) {
      console.error(error);
    }
    this.socket = io("http://localhost:3030/", {
      reconnectionDelayMax: 10000,
    });
    console.log(reunionId);
    this.socket.on("voteon", (data) => {
      console.log(data);
      if (this.state.user === data.id) {
        this.setState({ myvote: data.vote, showpra: false, final: true });

        console.log(`my voto es ${data.vote}`);
      }
      if (this.state.user !== data.id) {
        for (let a = 0; a < this.variablerara.length; a++) {
          if (this.variablerara[a].id === data.id) {
            this.variablerara[a].vote = data.vote;
          }
        }
        this.setState({
          compas: this.variablerara,
        });
        console.log(this.variablerara);
      }
    });
    this.socket.emit("entra room", {
      room: `sala${reunionId[1]},`,
      data: { nombre: namedata.nombre, img: namedata.foto },
    });
    this.socket.on("onvote", (data) => {
      console.log(`Entro ${data}`);
      if (data === "On") {
        this.setState({ votaciones: true });
      }
      if (data === "Off") {
        this.setState({ showpra: false, votaciones: false, final: false });
      }
    });
    this.socket.on("praction", (pra) => {
      this.setState({
        votaciones: false,
        namepra: pra,
        showpra: true,
        final: false,
      });
      this.state.practicas.map((ele) => {
        if (ele.nombre === pra) {
          console.log(ele);
          this.setState({
            nadatpra: {
              alfa: pra,
              estado: ele.alfas[0].estado,
              descripcion: ele.descripcion,
            },
          });
          let temal = [];
          ele.alfas.forEach((alpha) => {
            temal.push(alpha.id);
          });
          this.setState({ aflasactu: temal });
        }
      });
    });
    this.socket.on("entrar", (data) => {
      console.log("default cambiado");

      if (this.state.user === "default") {
        let com = [];
        let tempglobal = [];
        console.log(data);

        for (let a = 0; a < data.room.length; a++) {
          if (data.room[a].id === data.iserid) {
            console.log("encontrado y elminado");
            data.room.splice(a, 1);
          }
        }

        for (let a = 0; a < data.room.length; a++) {
          tempglobal.push(data.room[a].id);
        }
        data.room.forEach((element) => {
          console.log(element);

          com.push({
            id: element.id,
            buffer: [],
            vote: null,
            nombre: element.nombre,
            img: element.img,
          });
          let tempobj = new THREE.Object3D().add(
            new THREE.Mesh(
              new THREE.BoxGeometry(0.2, 0.2, 0.2),
              new THREE.MeshBasicMaterial({ color: 0x00ff00 })
            )
          );
          tempobj.name = element.id;

          if (this.numnpcs >= 7) {
            this.numnpcs = 0;
          }
          tempobj.position.set(
            this.posiciones[this.numnpcs].x,
            this.posiciones[this.numnpcs].y,
            this.posiciones[this.numnpcs].z
          );
          this.scene.add(tempobj);

          this.npcs.push(tempobj);

          this.numnpcs++;
        });
        this.idsnpcs = tempglobal;
        this.variablerara = com;
        // this.setState({ variablerara: com });
        console.log(this.variablerara);
        this.setState({
          user: data.iserid,
          compas: com,
          escena: true,
        });
        this.escena = true;
      } else {
        //en caso de reescribi el usaurio los siguientes seran los demas compañeros
        let com = [];
        let tempglobal = [];
        console.log("nuevo usuario");
        for (let a = 0; a < data.room.length; a++) {
          if (data.room[a].id === this.state.user) {
            console.log("encontrado y elminado");
            data.room.splice(a, 1);
          }
        }
        for (let a = 0; a < data.room.length; a++) {
          tempglobal.push(data.room[a].id);
        }
        console.log(`id:${this.state.user}  rom: ${data.room}`);

        data.room.forEach((element) => {
          com.push({
            id: element.id,
            buffer: [],
            vote: null,
            nombre: element.nombre,
            img: element.img,
          });
          let si = false;
          if (this.variablerara.length > 0) {
            if (this.idsnpcs.indexOf(element.id) < 0) {
              si = !si;
              console.log(` diferente ${element.id}`);
            }
          } else {
            si = !si;
          }

          if (si) {
            console.log(`objeto ${element.id}`);
            let tempobj = new THREE.Object3D().add(
              new THREE.Mesh(
                new THREE.BoxGeometry(0.2, 0.2, 0.2),
                new THREE.MeshBasicMaterial({ color: 0x00ff00 })
              )
            );
            tempobj.name = element.id;

            if (this.numnpcs >= 7) {
              this.numnpcs = 0;
            }
            tempobj.position.set(
              this.posiciones[this.numnpcs].x,
              this.posiciones[this.numnpcs].y,
              this.posiciones[this.numnpcs].z
            );
            this.scene.add(tempobj);
            console.log(this.scene);
            this.npcs.push(tempobj);
            this.numnpcs++;
            si = false;
          }
        });

        this.idsnpcs = tempglobal;
        this.variablerara = com;
        //   this.setState({ variablerara: com });
        console.log(this.variablerara);
        this.setState({ compas: com, escena: true });
        this.escena = true;
      }
    });
    this.socket.on("hablar", (data) => {
      const { id } = data;
      if (id !== this.state.user) {
        this.hablar(data);
      }
    });
    this.socket.on("chao", (data) => {
      console.log("Chao");
      for (let a = 0; a < this.variablerara.length; a++) {
        if (this.variablerara[a].id === data) {
          console.log(this.variablerara[a].id);
          this.variablerara.splice(a, 1);
        }
      }
      this.setState({ compas: this.variablerara });
      for (let a = 0; a < this.npcs.length; a++) {
        if (this.npcs[a].name === data) {
          this.scene.remove(this.npcs[a]);
          this.npcs.splice(a, 1);
        }
      }

      console.log(this.variablerara);
    });
    let micStream = new MicrophoneStream({
      stream: null,
      objectMode: false,
      bufferSize: 512,
      context: null,
    });
    await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((result) => {
        //el navegador lo ofrece y aqui es tomado por  micStream
        micStream.setStream(result);
      });
    micStream.on("data", (chunk) => {
      // esto combierte todo en  Float32Array
      // el raw son los datos del audio capturado pero pasados por un coversion
      var raw = MicrophoneStream.toRaw(chunk);
      //esto activa y desactiva el poder usar un microfono
      if (this.state.escuchar) {
        //la variable a enviar
        let temp = [];
        //re procesa para que no sea enviado como Float32Array sino como una array normal
        //esto para evitar errores
        temp = [...raw];
        //se emite la informacion a escuchar por otros usuarios
        this.socket.emit("hablar", temp);
      }
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
      microphone: [],
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
    // this.scene.add(this.objgrafico);

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

    bu.obj.position.set(0.05, 0.185, 0.93);
    bu.obj.rotation.x = -Math.PI / 2;

    let bu2 = new Button3d(
      0.005,
      0x81e219,
      1,
      true,
      { size: 32, text: " Votar " },
      { x: 0.03, y: 0.03 },
      { x: 0, y: 0, z: 0 }
    ).button;
    bu2.obj.position.set(0, 0.185, 0.93);
    bu2.obj.rotation.x = -Math.PI / 2;
    let bu3 = new Button3d(
      0.005,
      0x2f5fff,
      1,
      true,
      { size: 32, text: "  Microfono  " },
      { x: 0.03, y: 0.03 },
      { x: 0, y: 0, z: 0 }
    ).button;
    bu3.obj.position.set(-0.05, 0.185, 0.93);
    bu3.obj.rotation.x = -Math.PI / 2;
    console.log("//---------- button");

    this.menuopciones.salir = bu.Interaction;
    this.menuopciones.votacion = bu2.Interaction;
    this.menuopciones.microphone = bu3.Interaction;
    this.scene.add(bu.obj);
    this.scene.add(bu2.obj);
    this.scene.add(bu3.obj);
    //this.scene.add(this.GUIv2);
    // this.setupCanvasDrawing();
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
    console.log("control-----------");
    console.log(this.state.posicionplayer);

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
    // this.setupCanvasDrawing();
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
    /*
    if (this.escena) {
      if (this.npcs.length > 0 && this.variablerara.length > 0) {
        for (let a = 0; a < this.npcs.length; a++) {
          let x = 0;
          this.npcs[a].position.set(x, 0.3, 0);
          x = x + 0.5;
          this.scene.add(this.npcs[a]);
        }
      }
    }
*/
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
  /** ___           _                                                _          
     |_ _|  _ __   | |_    ___   _ __    ___   ___    __ _   _ __   | |_    ___ 
      | |  | '_ \  | __|  / _ \ | '__|  / _ \ / __|  / _` | | '_ \  | __|  / _ \
      | |  | | | | | |_  |  __/ | |    |  __/ \__ \ | (_| | | | | | | |_  |  __/
     |___| |_| |_|  \__|  \___| |_|     \___| |___/  \__,_| |_| |_|  \__|  \___| */
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
    let intersect6 = this.raycaster.intersectObjects(
      this.menuopciones.microphone
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
      console.log("votaron");
      if (this.state.votaciones === true) {
        this.socket.emit("votaron", "Off");
      }
      if (this.state.votaciones === false) {
        this.socket.emit("votaron", "On");
      }
    } else if (intersect6.length > 0) {
      this.setState({
        escuchar: !this.state.escuchar,
      });
      console.log(`microfono ${this.state.escuchar}`);
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
  //eventos del boto
  microphone(event) {
    //this.state.escuchar esta true
    if (this.state.escuchar) {
      //se pondra falso con una variable temporal y el letro del boton sera mute
      let temp = !this.state.escuchar;
      this.setState({
        state: "Mute",
        escuchar: temp,
      });
    } else {
      //se pondra true con una variable temporal y el letro del boton sera Ok
      let temp = !this.state.escuchar;
      this.setState({
        state: "Ok",
        escuchar: temp,
      });
    }
  }
  hablar(data) {
    console.log(`Hablando : ${data.id}`);
    // console.log(data.raw);
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    //se saca el array raw que contiene la info del audio y la id de la persona que esta hablando
    const { raw, id } = data;
    let datos = this.variablerara.find((element) => element.id === id);

    //    console.log(raw)
    //se compara si ya se tienen todas las muestras de un segundo de audio y si el
    //id de la persona es diferente se rellena 'datos' que contendra la informacion del
    // audio
    if (datos.buffer.length < 48000) {
      //re recorre raw para almacenar los datos hasta llegar a la cantindad de muestras por segundo
      for (const property in raw) {
        datos.buffer.push(raw[property]);
      }
    } else {
      console.log("reproducir");
      // re estrucutra un búfer estéreo vacío de 1 segundo a la frecuencia de muestreo de AudioContext
      // esto basicamente es crea un aundio basio de 1 canal de 48000 muestras por segundo, a 48000
      var myArrayBuffer = audioCtx.createBuffer(
        1,
        audioCtx.sampleRate,
        audioCtx.sampleRate
      );
      // Llene el búfer con ruido blanco;
      for (
        var channel = 0;
        channel < myArrayBuffer.numberOfChannels;
        channel++
      ) {
        // Esto nos da la matriz real que contiene los datos
        var nowBuffering = myArrayBuffer.getChannelData(channel);
        //esto rellena los datos de nuevo buffer
        for (var i = 0; i < myArrayBuffer.length; i++) {
          nowBuffering[i] = datos.buffer[i];
        }
      }
      //Obtenga un AudioBufferSourceNode.
      //Este es el AudioNode para usar cuando queremos reproducir un AudioBuffer
      var source = audioCtx.createBufferSource();
      // establecer el búfer en el AudioBufferSourceNode
      source.buffer = myArrayBuffer;
      // conectar el AudioBufferSourceNode a la destino para que podamos escuchar el sonido
      source.connect(audioCtx.destination);
      // reproduce el sonido
      source.start();
      //limpia los datos para u nuevo muestreo
      datos.buffer = [];
    }
  }
  funcionvotacionpractica = (pra) => {
    console.log(`emitiste para que todos votaran la practica ${pra}`);
    //this.state.practicas
    //
    this.socket.emit("praction", pra);
    this.state.practicas.map((ele) => {
      if (ele.nombre === pra) {
        console.log(ele);
        this.setState({
          nadatpra: {
            alfa: pra,
            estado: ele.alfas[0].estado,
            descripcion: ele.descripcion,
          },
        });
        let temal = [];
        ele.alfas.forEach((alpha) => {
          temal.push(alpha.id);
        });
        this.setState({ aflasactu: temal });
      }
    });
  };
  funcionvotacion = (date) => {
    this.socket.emit("voteon", date);
    if (date.id === this.state.user) {
      this.setState({ myvote: date.vote });
    }
  };

  actualizaralfas = () => {
    try {
      const token = localStorage.getItem("login");
      const obj = JSON.parse(token);
      const tokensito = obj.token;
      axios
        .put(
          `http://localhost:3030/actualizar/alfa`,
          { alfas: this.state.aflasactu },
          {
            headers: { authorization: `llave ${tokensito}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert(response.data);
          this.setState({ final: false });
        });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    let custo = {
      padding: "0",
      borderTopLeftRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
    };
    let content;
    if (this.state.practicas.length <= 0 && this.state.nombre !== "") {
      content = <div>Cargando...</div>;
    }
    if (this.state.practicas.length > 0) {
      content = (
        <div className="test3d">
          <Rodal
            width={60}
            height={35}
            animation={"fade"}
            measure="rem"
            visible={this.state.votaciones}
            onClose={() => {
              this.socket.emit("votaron", "Off");
            }}
            customStyles={custo}
            closeOnEsc={false}
            closeMaskOnClick={false}
            showMask={true}
          >
            <ContentCard
              tarjetas={this.state.practicas}
              func={this.funcionvotacionpractica}
            />
          </Rodal>
          <Rodal
            width={60}
            height={40}
            animation={"fade"}
            measure="rem"
            visible={this.state.showpra}
            onClose={() => {
              this.socket.emit("votaron", "Off");
            }}
            customStyles={custo}
            closeOnEsc={false}
            closeMaskOnClick={false}
            showMask={true}
          >
            <Cartarje
              nmapra={this.state.namepra}
              tarjetas={this.state.practicas}
              func={this.funcionvotacion}
            />
          </Rodal>
          <Rodal
            width={60}
            height={35}
            animation={"fade"}
            measure="rem"
            visible={this.state.final}
            onClose={() => {
              this.socket.emit("votaron", "Off");
            }}
            customStyles={custo}
            closeOnEsc={false}
            closeMaskOnClick={false}
            showMask={true}
          >
            <Navfinavote
              alfa={this.state.nadatpra.alfa}
              estado={this.state.nadatpra.estado}
              descripcion={this.state.nadatpra.descripcion}
              compas={this.state.compas}
              mi={{
                nombre: this.state.nombre,
                img: this.state.imgen,
                vote: this.state.myvote,
              }}
              funcdiscu={() => {
                this.socket.emit("votaron", "Off");
                this.setState({ final: false });
              }}
              nmapra={this.state.namepra}
              funcvote={this.funcionvotacionpractica}
              funcactualizar={this.actualizaralfas}
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
    return <div>{content}</div>;
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
