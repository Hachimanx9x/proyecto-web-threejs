import React from "react";
import "./CardContacts.css";
import PropTypes from "prop-types";

const CardContacts = (name, description, picture, job, favorite) => (
    <div>

    </div>
);

CardTalent.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
};

export default CardContacts;
