import React, { Component } from "react";
import "./SearchTalents.css";
import CardTalents from "../../Elements/CardTalents/CardTalents";
import User from "../../../Logos/user-icon.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class SearchTalents extends Component {

    constructor(props) {
        super(props);
        this.selectFilter = this.selectFilter.bind(this);
        this.state = {
            keyWord: "", modal: false, filter: "", talents: [{
                id: "1",
                name: "Juan Carlos Hurtado",
                description: "Ingeniero multimedia. Desarrollador FullStack con experiencia en desarrollo de aplicaciones web y móviles",
                job: "Desarrollador FullStack",
                img: User,
                skills: [
                    { skill: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" },
                    { skill: "https://gblobscdn.gitbook.com/assets%2F-LW1Rd6Lo-WMisT20MSI%2F-LfkebmAD7Zk3UmVHVbS%2F-LfkljcRh5HU0rsYOki1%2Fangular.png?alt=media&token=9071f895-7d9f-4af2-beaf-460b033feada" },
                    { skill: "https://assets.stickpng.com/images/58482acecef1014c0b5e4a1e.png" },
                    { skill: "https://ayudawp.com/wp-content/uploads/2017/01/javascript-logo-escudo.png" }, 
                    { skill: "https://icon-library.com/images/html-icon-png/html-icon-png-4.jpg" }, 
                    { skill: "https://markuslista.es/wp-content/uploads/2020/12/css.png" }, 
                    { skill: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1280px-PHP-logo.svg.png" }, 
                    { skill: "https://plugins.jetbrains.com/files/13666/100004/icon/pluginIcon.png" },
                    { skill: "https://download.logo.wine/logo/MySQL/MySQL-Logo.wine.png" }
                ]
            },
                {
                    id: "1",
                    name: "Andrés David Londoño",
                    description: "Ingeniero multimedia. Desarrollador web. Senior en tecnologías para desarrollo fronend y backend con experiencia en desarrollo de aplicaciones web y móviles",
                    job: "Desarrollador Web",
                    img: User,
                    skills: [
                        { skill: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" },
                        { skill: "https://gblobscdn.gitbook.com/assets%2F-LW1Rd6Lo-WMisT20MSI%2F-LfkebmAD7Zk3UmVHVbS%2F-LfkljcRh5HU0rsYOki1%2Fangular.png?alt=media&token=9071f895-7d9f-4af2-beaf-460b033feada" },
                        { skill: "https://assets.stickpng.com/images/58482acecef1014c0b5e4a1e.png" },
                        { skill: "https://markuslista.es/wp-content/uploads/2020/12/css.png" },
                        { skill: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1280px-PHP-logo.svg.png" },
                        { skill: "https://plugins.jetbrains.com/files/13666/100004/icon/pluginIcon.png" },
                        { skill: "https://download.logo.wine/logo/MySQL/MySQL-Logo.wine.png" }
                    ]
                }]
        }
    }

   

    selectFilter = (filter) => {
        this.setState({ filter: filter });
        console.log(this.state.filter);
    };

    render() {

        return (
            <div className="p-2 mt-3">
                <div className="row">
                    <div className="col-12 h4">Buscar talentos</div>
                    <div className="col-12  mt-3">
                        <div className="input-group mb-3 d-flex justify-content-center">
                            <div className="input-group-prepend ">
                                <label className="btn btn-primary text-white font-weight-bold m-0 z-depth-0 o-label-select p-0 o-filter-btn border-0 ">
                                    <select className="text-white o-filter-btn o-select-filter  font-weight-bold">
                                        <option value="Nombre" defaultValue="selected">Nombre</option>
                                        <option value="Herramienta">Herramienta</option>
                                        <option value="Ocupación">Ocupación</option>
                                    </select>
                                </label>
                            </div>
                            <input type="text" className="form-control m-0 o-talents-search-input" placeholder="Buscar.."  aria-label="Palabra clave" />
                            <div className="input-group-append">
                                <button className="btn btn-primary text-white m-0 z-depth-0 o-talent-search-btn border-0" type="button"><FontAwesomeIcon icon={faSearch} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="o-card-talents-container w-100">
                        {this.state.talents.map((talent) => (
                            <CardTalents key={talent.id} id={talent.id} job={talent.job} name={talent.name} description={talent.description} picture={talent.img} skills={talent.skills} />
                        ))}
                    </div>


                </div>

            </div>
        )
    }

}

export default SearchTalents;