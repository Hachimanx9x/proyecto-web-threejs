

const usuario ={

};
//CREATE TABLE CONTACTOS(id int PRIMARY KEY AUTO_INCREMENT, personas int, preferencias boolean, FOREIGN KEY(personas) REFERENCES PERSONAS(id));
usuario.contactos={
    
        id: {type: 'increments', nullable: false, primary: true},
        persona: {type: 'integer', nullable: true,unsigned: true },
        preferencias:{type: 'bollean', nullable: false }
    
}; 
//CREATE TABLE HABILIDADES(id int PRIMARY KEY AUTO_INCREMENT, tipo varchar(40), descripcion varchar(40), nivel varchar(20), herramientaUsada int, FOREIGN KEY (herramientaUsada) REFERENCES HERRAMIENTAS(id));
usuario.habilidades={
    
        id: {type: 'increments', nullable: false, primary: true},
        tipo:{type:'string',nullable: true, maxlength: 40 },
        descripcion:{type:'string',nullable: true, maxlength: 40 },
        herramientaUsada :{type:'integer',nullable: true ,unsigned: true},

    

}; 
//CREATE TABLE PERSONAS(id int PRIMARY KEY AUTO_INCREMENT, nombre varchar(50), descripcion varchar(200), otro varchar(100), pais varchar(20), edad i
usuario.persona={
  
        id: {type: 'increments', nullable: false, primary: true},
        nombre:{type:'string',nullable: false, maxlength: 50  },
        descripcion :{type:'string',nullable: true, maxlength: 200  },
        otro:{type:'string',nullable: true, maxlength: 100 },
        pais:{type:'string',nullable: false, maxlength: 100 }

    
}; 
//CREATE TABLE USUARIOS(id int PRIMARY KEY AUTO_INCREMENT, correoElectronico VARCHAR(50), urlHojaVida varchar(50), contrasena VARCHAR(15), experiencia int, contacto INT, persona INT , habilidad int, FOREIGN KEY(contacto) REFERENCES CONTACTOS(id),  FOREIGN KEY(persona) REFERENCES PERSONAS(id),  FOREIGN KEY(habilidad) REFERENCES HABILIDADES(id));
usuario.usuario={
   
        id: {type: 'increments', nullable: false, primary: true},
        correoElectronico:{type:'string',nullable: false, maxlength: 50  },
        urlHojaVida:{type:'string',nullable: false, maxlength: 50  },
        contrasena:{type:'string',nullable: false, maxlength: 50  },
        experiencia :{type:'integer',nullable: true }, //esto se mide en años 
        contacto: {type: 'integer', nullable: true,unsigned: true },
        persona: {type: 'integer', nullable: true,unsigned: true },
        habilidad: {type: 'integer', nullable: true,unsigned: true },
    
}; 




module.exports = usuario; 