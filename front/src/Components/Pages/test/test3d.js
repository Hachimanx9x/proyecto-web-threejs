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

    
 render(){
     return(
         <div className="div3d">
             	<script src="../../../lib_externo/three.js"></script>
		
        <script src="../../../lib_externo/Detector.js"></script>
            <script src="../../../lib_externo/GLTFLoader.js"></script>
                <script src="../../../lib_externo/stats.min.js"></script>
                    <script src="../../../lib_externo/Reflector.js"></script>
                        <script src="../../../lib_externo/OrbitControls.js"></script>

                            <script src="./script/CargarObjGltf.js"></script>
                                <script src="./script/CargarEntorno.js"></script>
         </div>
     ); 
 }
}

export default Test3d ;