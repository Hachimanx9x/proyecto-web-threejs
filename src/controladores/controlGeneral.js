
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

module.exports = controlador; 