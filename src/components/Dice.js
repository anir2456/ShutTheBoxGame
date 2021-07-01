import React from 'react';
import PropTypes from 'prop-types';
import './Dice.css';

const Dice = ({ face }) => {
 return <i className={`dice01 fas fa-dice-${face}`} />
}

Dice.propTypes = {
    face: PropTypes.string,
}

export default Dice;

