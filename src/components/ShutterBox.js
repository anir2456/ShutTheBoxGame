import React from 'react';
import {Badge} from "react-bootstrap";

import './ShutterBox.css';

const SHutterBox = ({ remainingOnes }) => {
    return (
       <div className="keyContainer" style={{marginTop: '2em'}}>
           { [1,2,3,4,5,6,7,8,9].map(item => {
               return (
               <div className="cardContainer02">
                <span className={`badger01 ${remainingOnes.includes(item) ? "dark" : "light"}`} >{remainingOnes.includes(item) ? item : ' '}</span>
               </div> );
           })}
       </div>
    )
};

export default SHutterBox;