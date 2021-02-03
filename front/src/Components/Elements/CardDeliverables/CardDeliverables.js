import React from "react";

export default function CardDeliverables() {
  return (
    <div
      className="text-center m-1 mt-2 mb-2 p-2"
      style={{ background: "#4fa77b", width: "16rem" }}
    >
      <p className="text-white">Análisis de viabilidad del SM</p>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Estado: </small>
        <small>Iniciado</small>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Tipo de entrega</small>
        <small>Documento</small>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Descargar</small>
        <small>Documento</small>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Subir</small>
        <small>Documento</small>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Revisiones</small>
        <small>Documento</small>
      </div>
    </div>
  );
}
