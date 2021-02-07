import * as THREE from "three/build/three.module";
export default class  {
  constructor(size,color, opacity, transparent, datalebel,scalelebel,position) {
    /*
    size : 0.005 // ancho del boton
    color: 0xf2380e // colores hexadecimales
    opacity: 0 ~ 1 // el valor de la opacidad
    transparent: true or false //si quieres o no tener transpariencias
    datalebel: {size : 14 ,text: "texto" }  //objetos de datos del texto
    scalelebel: {x:0.03 , y : 0.03 } //alto y acho del letreros_Labels
    position: {x:1, y:1, z :1} // posición del label
    */
    this.size = size;
    this.color = color;
    this.opacity = opacity;
    this.transparent = transparent;
    this.datalebel = datalebel;
    this.scalelebel = scalelebel;
    this.position = position;
    this.buttonobj = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: this.color , opacity: this.opacity , transparent: this.transparent }))
    this.buttonobj.name = `boton ${this.datalebel.text}`
    this.arrabutton=[];
    console.log("Hola desde la clase exportada ")

  }
  get button(){

    let textpantalla = this.makeLabelCanvas(this.datalebel.size,   this.datalebel.text) ;
    let canvasTexture = new THREE.CanvasTexture(textpantalla);
    canvasTexture.minFilter = THREE.LinearFilter; canvasTexture.wrapS = THREE.ClampToEdgeWrapping;canvasTexture.wrapT = THREE.ClampToEdgeWrapping;
    let labelmaterials =  new THREE.MeshBasicMaterial({map:canvasTexture,side: THREE.DoubleSide, transparent: true });
    let labelgeo = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1),labelmaterials );
    labelgeo.scale.x =   this.scalelebel.x ; labelgeo.scale.y =   this.scalelebel.y ;
    labelgeo.position.set(  this.position.x , this.position.y,  this.position.z );
    this.buttonobj.scale.set(labelgeo.scale.x, labelgeo.scale.y , this.size);
    this.buttonobj.position.set(labelgeo.position.x , labelgeo.position.y ,this.position.z   -0.005);
    let obj = new THREE.Object3D();
    obj.add(labelgeo);  obj.add(this.buttonobj);
    this.arrabutton.push(this.buttonobj)
    return {Interaction: this.arrabutton , obj: obj};
  }

    makeLabelCanvas(size, name) {
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

}
