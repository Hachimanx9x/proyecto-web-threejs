const app = require('./app');

async function inicio(){
    await app.listen(app.get('PORT') ,()=>{
        console.log(`Ejecutado en ${app.get('PORT')}`); 
    });
}

inicio(); 