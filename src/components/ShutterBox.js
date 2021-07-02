import React from 'react';
import {Badge} from "react-bootstrap";

import './ShutterBox.css';

const SHutterBox = ({ remainingOnes }) => {
    return (
       <div className="keyContainer" style={{marginTop: '2em'}}>
           { [1,2,3,4,5,6,7,8,9].map(item => {
               return (
                   <div>
                   {remainingOnes.includes(item) &&
                           <div className="cardContainer02_front">
                   <span className="badger01 dark" >{item}</span>
                           </div>}
                   {!remainingOnes.includes(item) &&
                   <div className="cardContainer02_back">
                        <span className="badger01 light" />
                   </div>}
               </div> );
           })
           }
       </div>
    )
};

export default SHutterBox;