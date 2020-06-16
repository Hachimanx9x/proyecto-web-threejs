const mon = require('mongoose');
const {baseDatos} = require('./llaves');
mon.connect(baseDatos.URI,{
    useNewUrlParser : true,
    useUnifiedTopology: true
})
    .then(db=>{console.log('Se conecto a mongo Atlas')})
    .catch(err =>{ console.error(err)}); 