
import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import {Button,Badge, Jumbotron, Card, ListGroup, Dropdown, DropdownButton } from "react-bootstrap";
import SHutterBox from "./ShutterBox";
import ConfettiComponent from './Confetti';

import './RollDice.css';

// let numArray = [1,2,3,4,5,6,7,8,9];

const getRecCombinationSums = (givenArray, targetNum, index, mainReturnedArray, indArray) => {

    if(targetNum === 0){
        mainReturnedArray.push([...indArray]);
        return;
    }

    if(targetNum < 0){
        return;
    }

     for(let i=index; i< givenArray.length; i++){
             indArray.push(givenArray[i]);
             getRecCombinationSums(givenArray, targetNum - givenArray[i], i+1, mainReturnedArray, indArray);
             indArray.splice(indArray.length - 1,1);
     }
}

const getCombinations = (candidates, targetNum) => {
    let resultList = [];
    getRecCombinationSums(candidates, targetNum, 0, resultList, []);

    return resultList;
}

const nmbrToLetter = (number) => {
    switch (number) {
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'three';
        case 4:
            return 'four';
        case 5:
            return 'five';
        default:
            return 'six';
    }
}

const RollDice = () => {

    const [stateArray, setStateArray] = useState([nmbrToLetter(1),nmbrToLetter(2)]);
    const [ numberDrawn, setNumberDrawn ] = useState(0);
    const [turnFirstPlayer, setTurnFirstPlayer] = useState(true);
    const [gameCounter, setGameCounter] = useState(0);
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);
    const [combos, setCombos] = useState([]);
    const [showOptions,setShowOptions] = useState(false);
    const [numArray, setNumArray] = useState([1,2,3,4,5,6,7,8,9]);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // if(gameCounter === 4) {
        //     setTimeout(() => {
        //         setPlayerTwoScore(0);
        //         setPlayerOneScore(0);
        //         setGameCounter(0);
        //     }, 4000);
        // }
        setNumArray([1,2,3,4,5,6,7,8,9]);
        setGameCounter(gameCounter + 1);
    }, [ turnFirstPlayer ]);

    useEffect(() => {
        if(gameCounter === 3) {
            setTimeout(() => {
                setPlayerTwoScore(0);
                setPlayerOneScore(0);
                setGameCounter(1);
                setNumArray([1,2,3,4,5,6,7,8,9]);
                setTurnFirstPlayer(true);

            }, 6000);
        }

    }, [ gameCounter ]);

    const handleClick = (playerNumber) => {
        const face1 = (Math.floor(Math.random() * 6) + 1);
        const face2 = (Math.floor(Math.random() * 6) + 1);
        setStateArray([nmbrToLetter(face1), nmbrToLetter(face2)]);
        setNumberDrawn(face2 + face1);
        // setTurnFirstPlayer(!turnFirstPlayer);

        let combos = getCombinations(numArray, (face1 + face2));

        if(combos.length > 0) {
            setCombos(combos);
            setShowOptions(true);
        } else {
            setShowOptions(false);
            // setGameCounter(gameCounter + 1);
            setTurnFirstPlayer(!turnFirstPlayer);

            const score = numArray.reduce((accumulator, item) => {
                return accumulator + item;
            }, 0);

            if(turnFirstPlayer) {
                setPlayerOneScore(score);
            } else {
                setPlayerTwoScore(score);
                // setNumArray([1,2,3,4,5,6,7,8,9]);
            }
        }

        // playerNumber === 1 ? setPlayerOneScore(playerOneScore + face1 + face2) : setPlayerTwoScore(playerTwoScore + face1 + face2)
    }

    const onDropDownClick = (selectedValue) => {

        let values = [];

        if(selectedValue.includes(",")) {
            values = selectedValue.split(",");
        }else {

            values.push(selectedValue);
        }

        let theArray = numArray.filter(item => {
            return !values.includes(item.toString());
        });

        setNumArray(theArray);

       // console.log(numArray);
        setShowOptions(false);
    }


    return (
        <div>
          <Jumbotron>
              {/*{(playerOneScore === 0 && playerTwoScore === 0) && 'Game starting....'}*/}
              {(playerOneScore === 0 || playerTwoScore === 0) && <span className="spannedTitle">Lets see who can shut the box!!!!</span>}
              {(playerOneScore > 0 && playerTwoScore > 0) && playerOneScore > playerTwoScore && <span className="spannedTitle">Congrats -- Player Two has won</span>}
              {(playerOneScore > 0 && playerTwoScore > 0) && playerOneScore < playerTwoScore && <span className="spannedTitle">Congrats -- Player One has won</span>}
              {(playerOneScore > 0 && playerTwoScore > 0) && playerOneScore === playerTwoScore && <span className="spannedTitle">Its a draw, sweet!</span>}
              {(playerOneScore > 0 && playerTwoScore > 0) && <ConfettiComponent />}
          </Jumbotron>
            <div className="d-flex justify-content-around">
                <Button variant='primary' className='btn01' onClick={() => handleClick(1)}
                disabled={!turnFirstPlayer}>Player 1</Button>
                <Button onClick={() => handleClick(2)} variant='primary' className='btn01' disabled={turnFirstPlayer}>Player 2</Button>
            </div>
            { combos.length > 0 && showOptions && <div className="d-flex justify-content-around">
                    <DropdownButton id="dropdown-basic-button" title={`Player ${turnFirstPlayer? '1' : '2'} Options`}>
                        {
                            combos.map(combo => {
                                return <Dropdown.Item title={combo.toString()} onClick={
                                    e => {
                                        // console.log(e.currentTarget.title);
                                        onDropDownClick(e.currentTarget.title);
                                    }}>{combo.toString()}</Dropdown.Item>
                            })
                        }
                    </DropdownButton>
            </div>
            }
            <br/>
            <Dice face={stateArray[0]}/>

            <Dice face={stateArray[1]} />
            <br/>
            <div className="d-flex justify-content-around">
                <Button style={{ margin: '2em 0 0 3em'}} variant="primary">
                    Player one has scored:  <Badge variant="light">{playerOneScore}</Badge>
                </Button>
                <Button style={{ margin: '2em 0 0 3em'}} variant="primary">
                    Player two has scored:  <Badge variant="light">{playerTwoScore}</Badge>
                </Button>
            </div>
            <br/>
            <SHutterBox remainingOnes={numArray}/>
        </div>
    );
};

export default RollDice;