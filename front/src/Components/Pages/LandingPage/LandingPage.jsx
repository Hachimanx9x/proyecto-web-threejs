import React, { useEffect, useState } from "react";
import Navbar from "../../Elements/Navbar/Navbar";
import "./LandingPage.css";
import Landing1 from "../../../Logos/landing_1.svg";
import Mision from "../../../Logos/2.svg";
import Vision from "../../../Logos/landing_3.svg";
import Value from "../../../Logos/landing_4.svg";
import Practice1 from "../../../Logos/landing_5.svg";
import Practice2 from "../../../Logos/landing_6.svg";
import Practice3 from "../../../Logos/landing_7.svg";
import Practice4 from "../../../Logos/landing_8.svg";
import Bars from "../../../Logos/landing_9.svg";

export default function LandingPage() {
  const [Sections, setSections] = useState([
    { Section: false },
    { Section: false },
    { Section: false },
  ]);

  useEffect(() => {
    function reveal() {
      const reveals = document.querySelectorAll(".reveal");
      const sect = Sections;

      for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let revealtop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealtop < windowHeight - revealPoint && !sect[i].Section) {
          sect[i].Section = true;

          setSections([...sect]);
        }
      }
    }
    let interval = setInterval(() => {
      window.addEventListener("scroll", reveal, { passive: true });
      reveal();
      console.log("uwu");
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, [Sections]);
  const infoPage = [
    {
      title: "Misión",
      description:
        "El sistema cuenta con una serie de funcionalidades que permiten la planeación, diseño, maquetación y desarrollo de un sistema multimedia, esto apoyado con una metodología de desarrollo sugerida por el sistema que se adapta con facilidad a los distintos proyectos.",
      icon: Mision,
    },
    {
      title: "Visión",
      description:
        "El sistema cuenta con una serie de funcionalidades que permiten la planeación, diseño, maquetación y desarrollo de un sistema multimedia, esto apoyado con una metodología de desarrollo sugerida por el sistema que se adapta con facilidad a los distintos proyectos.",
      icon: Vision,
    },
    {
      title: "Valor",
      description:
        "El sistema cuenta con una serie de funcionalidades que permiten la planeación, diseño, maquetación y desarrollo de un sistema multimedia, esto apoyado con una metodología de desarrollo sugerida por el sistema que se adapta con facilidad a los distintos proyectos.",
      icon: Value,
    },
  ];
  const practices = [
    {
      title: "Interesados del sistema multimedia",

      description:
        "Saber cuáles serán nuestros usuarios y del mismo saber cuales son sus oportunidades en el mercado, pero también la concepción de un sistema multimedia tiene que tener en cuenta criterios que protejan a los usuarios y esta práctica las tiene en cuenta.",
      icon: Practice1,
    },
    {
      title: "Concebir la experiencia multimedia",
      description:
        "Saber cuáles serán nuestros usuarios y del mismo saber cuales son sus oportunidades en el mercado, pero también la concepción de un sistema multimedia tiene que tener en cuenta criterios que protejan a los usuarios y esta práctica las tiene en cuenta.",
      icon: Practice2,
    },
    {
      title: "Sistema multimedia mínimo viable",
      description:
        "Saber cuáles serán nuestros usuarios y del mismo saber cuales son sus oportunidades en el mercado, pero también la concepción de un sistema multimedia tiene que tener en cuenta criterios que protejan a los usuarios y esta práctica las tiene en cuenta.",
      icon: Practice3,
    },
    {
      title: "Sistema multimedia mínimo viable",
      description:
        "Saber cuáles serán nuestros usuarios y del mismo saber cuales son sus oportunidades en el mercado, pero también la concepción de un sistema multimedia tiene que tener en cuenta criterios que protejan a los usuarios y esta práctica las tiene en cuenta.",
      icon: Practice4,
    },
  ];
  return (
    <div className="o-landing">
      <Navbar />
      <header className="m-0 mb-3">
        <div className="o-landing-title">
          <h1 className="text-white m-0 ">
            El mejor sitio para diseñar tu sistema multimedia
          </h1>
          <p className="text-white text-justify mt-2">
            Diseña sistemas multimedia apoyándote con guías ágiles para
            desarrollo que se adapten a tus necesidades. Coordina actividades de
            diseño y procesos de retrolimentación grupal.
          </p>
          <a
            className=" float-right blue accent-4 text-capitalize  z-depth-0 text-light ml-0 mr-0 mt-2 font-weight-bold o-button"
            href="/Signin"
          >
            Registrarse
          </a>
        </div>
        <div className="reveal active"></div>
        <div className=" o-header-card card ">
          <div className="o-landing-card-title ">
            <h3>
              Construye el mejor sistema multimedia apoyándote con guías y
              consejos.
            </h3>
            <p>
              El sistema cuenta con una serie de funcionalidades que permiten la
              planeación, diseño, maquetación y desarrollo de un sistema
              multimedia, esto apoyado con una metodología de desarrollo que se
              adapta con facilidad a los distintos proyectos.
            </p>
          </div>
          <div>
            <img src={Landing1} alt="Estadísticas" />
          </div>
        </div>
      </header>
      {/*
      className={
            "reveal " +
            (Sections[0].Section ? "active o-header-card card " : "")
          }
      */}
      <section
        className={
          "reveal" + (Sections[1].Section ? " active o-card-section" : "")
        }
      >
        {infoPage.map((info, i) => (
          <div className="card" key={i}>
            <img src={info.icon} alt="Information" />
            <h3>{info.title}</h3>
            <p>{info.description}</p>
          </div>
        ))}
      </section>
      <section
        id="third-section"
        className={"reveal" + (Sections[2].Section ? " active" : "")}
      >
        <h3 className="font-weight-bol">Metodología empleada en Softmedia</h3>
        <div className="d-flex ">
          <p>
            Para la elaboración y desarrollo de proyectos se tomó como base los
            estudios de gestión de proyectos, desarrollo de entornos virtuales y
            movimientos del mercado del profesor Carlos Alberto Peláez Ayala
            junto con su último trabajo llamado “Propuesta Metodológica para el
            Desarrollo de Sistemas Multimedia” que se encuentra en proceso de
            evaluación y que son exclusivos de este sistema. Esto implicó que
            gran parte de la etapa de pre-producción del sistema estuviera
            influenciada por la metodología por ende se decidió usar las rutas
            de desarrollo proporcionadas en la materia de diseño multimedia, que
            componen las prácticas de interesados del sistema multimedia,
            concepción de la experiencia multimedia, sistema multimedia mínimo
            viable y historias de usuarios del sistema multimedia.
          </p>

          <img src={Bars} alt="Chart Bars" />
        </div>
        <div className="o-practices-info-cards">
          {practices.map((practice, i) => (
            <div className="card" key={i}>
              <img src={practice.icon} alt="Information" />
              <h6>{practice.title}</h6>
              <p>{practice.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
