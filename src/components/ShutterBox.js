import React from 'react';
import {Badge} from "react-bootstrap";

import './ShutterBox.css';

const SHutterBox = ({ remainingOnes }) => {
    return (
       <div style={{marginTop: '1em'}}>
           { [1,2,3,4,5,6,7,8,9].map(item => {
               return <Badge className='badger01' variant={remainingOnes.includes(item) ? "dark" : "light"}>{item}</Badge>
           })}
       </div>
    )
};

export default SHutterBox;