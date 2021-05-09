import React from "react";
export default function Tarjetas({ nmapra, tarjetas, func }) {
  console.log(func);
  return (
    <div>
      <div>{nmapra}</div>
      <div>
        {tarjetas.map((practicas, ipra) => {
          let alfas = [];
          if (practicas.nombre === nmapra) {
            practicas.alfas.map((alfa, ialfa) => {
              alfas.push(
                <div key={ialfa}>
                  <h4>{alfa.nombre}</h4>
                  {alfa.estado}
                </div>
              );
            });
          }
          return alfas;
        })}
      </div>
      <div>
        {tarjetas.map((practicas, ipra) => {
          let tarjetas = [];
          if (practicas.nombre === nmapra) {
            practicas.alfas.map((alfa, ialfa) => {
              alfa.tarjeta.map((tar, idta) => {
                tarjetas.push(
                  <div key={idta}>
                    <h4>{tar.nombre}</h4>
                    {tar.descripcion.map((des, ids) => (
                      <p key={ids}>{des}</p>
                    ))}
                  </div>
                );
              });
            });
          }
          return tarjetas;
        })}
      </div>
      <div>
        <button
          onClick={() => {
            func(true);
          }}
        >
          si
        </button>
        <button
          onClick={() => {
            func(false);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
/**
 * let condiciones = [],
    alfas = [];

  tarjetas.forEach((elemento) => {
    if (elemento.nombre === nmapra) {
      elemento.alfas.forEach((elealfa) => {
        alfas.push({
          id: elealfa.id,
          nombre: elealfa.nombre,
          estado: elealfa.estado,
        });
        condiciones.push(elealfa.tarjeta);
      });
    }
  });

  condiciones = Array.from(new Set(condiciones.map(JSON.stringify))).map(
    JSON.parse
  )[0];
  console.log(alfas);
  console.log(condiciones);
  return (
    <div>
      <div>{nmapra}</div>
      <div>
        {alfas.map((ele, id) => (
          <div key={id}>{ele.nombre}</div>
        ))}
      </div>
      hola
      <div>
        {condiciones.map((elex, i) => {
          return (
            <div key={i + "d"}>
              {elex.nombre}
              {elex.descripcion.map((pe, ip) => (
                <p key={ip}>{pe}</p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
 */
