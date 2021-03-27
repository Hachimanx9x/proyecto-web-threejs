import * as THREE from "three/build/three.module";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
export default class {
    constructor(entorno, modelo, name, position, rotation, scale) {
        this.modelo = modelo
        this.entorno = entorno;
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        this.obj3d = new THREE.Object3D();
        this.obj3d.name = name
    }

    get obj() {
        this.cargarobj();
        this.obj3d.position.set(this.position.x, this.position.y, this.position.z)
        this.obj3d.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
        this.obj3d.scale.set(this.scale.x, this.scale.y, this.scale.z)
        return this.obj3d;

    }

    cargarobj() {
        new GLTFLoader()
            .setDRACOLoader(new DRACOLoader())
            .load(this.modelo, (gltf) => {
                gltf.scene.traverse((nino) => {
                    if (nino.isMesh) {
                        nino.material.envMap = this.entorno;

                    }
                });
                this.obj3d.add(gltf.scene);
            },
                (xhr) => {
                    //console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                },
                (error) => {
                    console.log(error);
                });
    }



}//fin de la clase
