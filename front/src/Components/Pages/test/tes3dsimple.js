import React, { Component } from "react";
import * as THREE from "three/build/three.module";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import io from "socket.io-client";
class Test3d extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    render() {
        console.log("HOla")
        return (
            <div className="test3d">

                hoa
            </div>
        );
    }
}

export default Test3d;

/*
 <div
                    style={{ width: "100vw", height: "50.1vw" }}
                    id="boardCanvas"
                    ref={(mount) => {
                        this.mount = mount;
                    }}
                /> */