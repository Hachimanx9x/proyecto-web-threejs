import React, { Component } from "react";
import io from "socket.io-client";
var MicrophoneStream = require('microphone-stream');

class Test extends Component {
    constructor() {
        super();
        this.state = { mensajes: [], reunion: 2, datos: null, escuchar: false, audios: [] }
    }
    async componentDidMount() {

        this.socket = io('http://localhost:3030/', {
            reconnectionDelayMax: 10000,
            auth: {
                token: "123"
            },
            query: {
                reunion: this.state.reunion
            }
        });
        this.socket.on('chat message', msj => {
            this.setState({ mensajes: [msj, ...this.state.mensajes] });
        });
        this.socket.on('inicio', obj => {
            console.log(obj)
            this.setState({ datos: obj });
        });


        let datos = [];
        let d = {
            channels: 1,
            bitDepth: 32,
            sampleRate: 48000,
            signed: true,
            float: true
        }
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.socket.on('hablar', audio => {
            const referencia = 48000 / 4096;

            if (datos.length < 48000) {
                for (const property in audio) {
                    datos.push(audio[property])
                }
            } else {

                // reentuyó un búfer estéreo vacío de tres segundos a la frecuencia de muestreo de AudioContext

                var myArrayBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate, audioCtx.sampleRate);

                // Llene el búfer con ruido blanco;
                for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
                    // This gives us the actual array that contains the data
                    var nowBuffering = myArrayBuffer.getChannelData(channel);
                    for (var i = 0; i < myArrayBuffer.length; i++) {
                        // Math.random() is in [0; 1.0]
                        // audio needs to be in [-1.0; 1.0]
                        nowBuffering[i] = datos[i]
                    }

                }

                // Get an AudioBufferSourceNode.
                // This is the AudioNode to use when we want to play an AudioBuffer
                var source = audioCtx.createBufferSource();

                // set the buffer in the AudioBufferSourceNode
                source.buffer = myArrayBuffer;

                // connect the AudioBufferSourceNode to the
                // destination so we can hear the sound
                source.connect(audioCtx.destination);

                // start the source playing
                source.start();

                datos = []
            }
        });

        var micStream = new MicrophoneStream({
            stream: null,
            objectMode: false,
            bufferSize: 4096,
            context: null
        });
        await navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            micStream.setStream(stream);
        }).catch(function (error) {
            console.log(error);
        });

        micStream.on('data', (chunk) => {
            // Optionally convert the Buffer back into a Float32Array
            // (This actually just creates a new DataView - the underlying audio data is not copied or modified.)
            var raw = MicrophoneStream.toRaw(chunk);
            if (this.state.escuchar) {

                this.socket.emit('audio', raw)
            }

            //...

            // Nota: si establece options.objectMode-true, el evento 'data' emitirá AudioBuffers en lugar de Buffers
        });
        micStream.on('format', function (format) {
            console.log(format);
        });

    }
    enviar(event) {
        //console.log(event.targe.value);
        const body = event.target.value;
        if (event.keyCode === 13 && body) {
            const msj = { body, from: 'me' };
            this.socket.emit('chat message', msj);
            event.target.value = '';
        }

    }
    async micro(event) {
        console.log("hola")
        let temp = this.state.escuchar
        this.setState({ escuchar: !temp })


    }

    render() {
        const mesanjes = this.state.mensajes.map((msj, index) => {
            console.log(msj);
            return (<li key={index}>
                <b>{msj.from}  :   {msj.body} : {msj.rooms} </b>
            </li>);
        });
        return (
            <div>
                <h1>Intento de chat 1 sin canales solo hilos </h1>
                <input type="button" value="microfono" onClick={this.micro.bind(this)} />
                <input
                    type="text"
                    placeholder="inserte el mesnaje "
                    onKeyUp={this.enviar.bind(this)}
                ></input>
                <ul>
                    {mesanjes}
                </ul>

            </div>
        );
    }
}



export default Test;

//https://stackoverflow.com/questions/50431236/use-getusermedia-media-devices-in-reactjs-to-record-audio