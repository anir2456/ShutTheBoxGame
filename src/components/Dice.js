import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Dice.css';

const Dice = ({ face, showit}) => {

    const [diceClass, setDiceClass] = useState(`dice01 fas fa-dice-${face}`);

    useEffect(() => {
        diceClass.includes('dice01') ? setDiceClass(`dice02 fa fa-dice-${face}`) : setDiceClass(`dice01 fas fa-dice-${face}`);
    }, [face]);

 return ( <i style={{visibility: showit ? 'visible' : 'hidden'}} className={diceClass} />);
}

Dice.propTypes = {
    face: PropTypes.string,
}

export default Dice;

