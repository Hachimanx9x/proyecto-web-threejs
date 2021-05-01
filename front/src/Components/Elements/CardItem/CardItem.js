import React, { useEffect, useState } from "react";
import "./CardItem.css";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

export default function CardItem({ item, category, icon, alpha }) {
  const [modal, setModal] = useState(false);
  const [tabs, setTabs] = useState([
    { tab: true },
    { tab: false },
    { tab: false },
  ]);
  useEffect(() => {
    function createTabs() {
      const tools = item.herramientas;
      const tab = [];
      for (let i = 0; i < tools.length; i++) {
        i === 0
          ? tab.push({
              tab: true,
              name: tools[i].nombre,
              description: tools[i].descripcion,
            })
          : tab.push({
              tab: false,
              name: tools[i].nombre,
              description: tools[i].descripcion,
            });
      }
      setTabs([...tab]);
    }
    createTabs();
  }, []);
  function show(index) {
    const tab = tabs;
    for (let i = 0; i < tabs.length; i++) {
      i === index ? (tab[i].tab = true) : (tab[i].tab = false);
    }
    setTabs([...tab]);
  }
  return (
    <div>
      <Rodal
        width={700}
        height={420}
        animation={"fade"}
        visible={modal}
        onClose={() => setModal(!modal)}
      >
        <div className="o-modal-show">
          <div>
            <p>{item.nombre}</p>{" "}
            <div className="o-modal-description o-scroll-y">
              <small className="text-secondary">{item.descripcion}</small>
            </div>
          </div>
          <div>
            {" "}
            <p>
              {category === "Activity"
                ? "Técnicas"
                : category === "Alpha"
                ? "Estados"
                : "Herramientas"}
            </p>
            <div className={"tab" + (alpha === "CEM" ? " o-bg-cem" : "")}>
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  className={
                    (tabs[i].tab ? "active " : "") +
                    "tablinks" +
                    (alpha === "CEM" ? " o-bg-cem" : "")
                  }
                  onClick={() => show(i)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p>Descripción</p>
            {tabs.map((tab, i) => (
              <div
                key={i}
                className={
                  (tabs[i].tab
                    ? "tabcontent o-scroll-y display-block text-secondary"
                    : "d-none invisible") +
                  (alpha === "CEM" ? " o-border-cem" : "")
                }
              >
                <small>{tab.description}</small>
              </div>
            ))}
          </div>
        </div>
      </Rodal>
      {category === "Activity" ? (
        <div className="o-card-activity card">
          <div
            className={
              "o-card-activity-title" + (alpha === "CEM" ? " o-bg-cem" : "")
            }
          >
            {item.nombre}

            <img
              className="card-img o-card-activity-image"
              src={icon}
              alt="Imagen del proyecto"
            />
          </div>
          <div className="card-body o-card-activity-description">
            <p className="o-card-activity-text pt-1 pb-1">{item.descripcion}</p>
          </div>
          <div className="card-footer bg-transparent border-0">
            <button
              onClick={() => setModal(true)}
              className={
                "btn border-0 z-depth-0 btn-sm o-card-item-button mr-4 " +
                (alpha === "CEM" ? "o-bg-cem" : "")
              }
            >
              Ver
            </button>
          </div>
        </div>
      ) : (
        <div className="o-card-item card">
          <div className="card-header bg-transparent o-card-item-title">
            {item.nombre}
          </div>
          <img
            className={
              "card-img o-card-item-image" +
              (alpha === "CEM" ? " o-bg-cem" : "")
            }
            src={icon}
            alt="Imagen del proyecto"
          />
          <div className="card-body o-card-item-body o-card-description">
            <p className="o-card-description-text pt-1 pb-1">
              {item.descripcion}
            </p>
          </div>
          <div className="card-footer bg-transparent border-0">
            <button
              onClick={() => setModal(true)}
              className={
                "btn border-0 z-depth-0 btn-sm o-card-item-button mr-4" +
                (alpha === "CEM" ? " o-bg-cem" : "")
              }
            >
              Ver
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
