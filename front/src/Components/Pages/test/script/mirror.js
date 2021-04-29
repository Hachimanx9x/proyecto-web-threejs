import { Reflector } from "three/examples/jsm/objects/Reflector";
import * as THREE from "three/build/three.module";
export default class {
  constructor(x, y, width, height, color, opacity, position, rotation, name) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.opacity = opacity;
    this.position = position;
    this.rotation = rotation;
    this.width = width;
    this.height = height;
    this.geometry = new THREE.PlaneBufferGeometry(this.x, this.y);
  }

  get obj() {
    let espejo = this.crear_espejo();
    espejo.position.x = this.position.x;
    espejo.position.y = this.position.y;
    espejo.position.z = this.position.z;
    espejo.rotation.x = this.rotation.x;
    espejo.rotation.y = this.rotation.y;
    espejo.rotation.z = this.rotation.z;
    let filtro = this.filtro();
    filtro.position.x = this.position.x;
    filtro.position.y = this.position.y + 0.001;
    filtro.position.z = this.position.z;
    filtro.rotation.x = this.rotation.x;
    filtro.rotation.y = this.rotation.y;
    filtro.rotation.z = this.rotation.z;

    return { mirror: espejo, filter: filtro };
  }

  crear_espejo() {
    return new Reflector(this.geometry, {
      clipBias: 0.005,
      textureWidth: this.width,
      textureHeight: this.height,
      color: 0x889999,
      recursion: 1,
    });
  }

  filtro() {
    return new THREE.Mesh(
      this.geometry,
      new THREE.MeshBasicMaterial({
        color: this.color,
        opacity: this.opacity,
        transparent: true,
      })
    );
  }
}
