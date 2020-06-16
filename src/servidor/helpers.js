const moment = require('moment'); 
moment.locale('es');
const helper ={}; 

helper.tiempoMin= fechaSubido =>{
   return moment(fechaSubido).startOf('minute').fromNow(); 
};

module.exports=helper; 