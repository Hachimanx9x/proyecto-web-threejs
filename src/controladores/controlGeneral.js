
const controlador ={

};

controlador.index = (req, res)=>{
    res.render('index'); 
}
controlador.entorno = (req, res)=>{
    res.render('entorno'); 
}
controlador.interaccion = (req, res)=>{
    res.render('interaccion'); 
}
controlador.controles = (req, res)=>{
    res.render('controlCamara'); 
}
controlador.espejos = (req, res)=>{
    res.render('espejos'); 
}
controlador.chat = (req, res)=>{
    res.render('chat'); 
}
controlador.camaraWeb = (req, res)=>{
    res.render('camaraWeb'); 
}
controlador.video = (req, res)=>{
    res.render('video'); 
}
controlador.streamVideo = (req, res)=>{
    res.render('streamVideo'); 
}
controlador.grafico = (req, res)=>{
    res.render('grafico'); 
}

module.exports = controlador; 