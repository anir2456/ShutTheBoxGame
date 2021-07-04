import React, { useState, useEffect } from "react";
import Dice from "./Dice";
import {
    Button,
    Badge,
    Jumbotron,
    Card,
    ListGroup,
    Dropdown,
    DropdownButton
} from "react-bootstrap";
import SHutterBox from "./ShutterBox";
import ConfettiComponent from "./Confetti";

import "./RollDice.css";

const getRecCombinationSums = (
    givenArray,
    targetNum,
    index,
    mainReturnedArray,
    indArray
) => {
    if (targetNum === 0) {
        mainReturnedArray.push([...indArray]);
        return;
    }

    if (targetNum < 0) {
        return;
    }

    for (let i = index; i < givenArray.length; i++) {
        indArray.push(givenArray[i]);
        getRecCombinationSums(
            givenArray,
            targetNum - givenArray[i],
            i + 1,
            mainReturnedArray,
            indArray
        );
        indArray.splice(indArray.length - 1, 1);
    }
};

const getCombinations = (candidates, targetNum) => {
    let resultList = [];
    getRecCombinationSums(candidates, targetNum, 0, resultList, []);

    return resultList;
};

const nmbrToLetter = (number) => {
    switch (number) {
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        default:
            return "six";
    }
};

const letterToNumber = (letter) => {
    switch (letter) {
        case "one":
            return 1;
        case "two":
            return 2;
        case "three":
            return 3;
        case "four":
            return 4;
        case "five":
            return 5;
        default:
            return 6;
    }
};

const RollDice = () => {
    const [stateArray, setStateArray] = useState([
        nmbrToLetter(1),
        nmbrToLetter(2)
    ]);
    const [numberDrawn, setNumberDrawn] = useState(0);
    const [turnFirstPlayer, setTurnFirstPlayer] = useState(true);
    const [gameCounter, setGameCounter] = useState(0);
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);
    const [combos, setCombos] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [numArray, setNumArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [shuttingBox, setShuttingBox] = useState(false);

    const resetGame = () => {
        setTimeout(() => {
            setPlayerTwoScore(0);
            setPlayerOneScore(0);
            setGameCounter(1);
            setNumArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            setTurnFirstPlayer(true);
            setShuttingBox(false);
        }, 1100);
    };

    useEffect(() => {
        setNumArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        setGameCounter(gameCounter + 1);
    }, [turnFirstPlayer]);

    useEffect(() => {
        if (gameCounter === 3) {
            setTimeout(() => {
                resetGame();
            }, 10000);
        }
    }, [gameCounter]);

    useEffect(() => {
        if (shuttingBox) {
            setTimeout(() => {
                resetGame();
            }, 10000);
        }
    }, [shuttingBox]);

    const getFaces = () => {
        let faces = [];
        faces[0] = Math.floor(Math.random() * 6) + 1;
        faces[1] = Math.floor(Math.random() * 6) + 1;

        return faces;
    };

    const handleClick = (playerNumber) => {
        setTimeout(() => {
            let face1 = 0;
            let face2 = 0;

            do {
                const faceArr = getFaces();
                face1 = faceArr[0];
                face2 = faceArr[1];
            } while (
                face2 === letterToNumber(stateArray[1]) ||
                face1 === letterToNumber(stateArray[0])
                );

            setStateArray([nmbrToLetter(face1), nmbrToLetter(face2)]);

            const sum = face1 + face2;

            setNumberDrawn(sum);
            // setTurnFirstPlayer(!turnFirstPlayer);

            let combos = getCombinations(numArray, sum);

            if (combos.length > 0) {
                setCombos(combos);
                setShowOptions(true);
            } else {
                setShowOptions(false);
                // setGameCounter(gameCounter + 1);

                const score = numArray.reduce((accumulator, item) => {
                    return accumulator + item;
                }, 0);

                if (turnFirstPlayer) {
                    setPlayerOneScore(score);
                } else {
                    setPlayerTwoScore(score);
                    // setNumArray([1,2,3,4,5,6,7,8,9]);
                }

                setCombos([]);
                setTurnFirstPlayer(!turnFirstPlayer);
            }
            // }
        }, 200);
    };

    const onDropDownClick = (selectedValue) => {
        let values = [];

        if (selectedValue.includes(",")) {
            values = selectedValue.split(",");
        } else {
            values.push(selectedValue);
        }

        let theArray = numArray.filter((item) => {
            return !values.includes(item.toString());
        });

        setNumArray(theArray);

        // this is the straight up shutting the box logic
        if (theArray.length === 0) {
            setShuttingBox(true);
        }

        // console.log(numArray);
        setShowOptions(false);
    };

    const showingConfetti = () => {
        if ((playerOneScore > 0 && playerTwoScore > 0) || shuttingBox) {
            return <ConfettiComponent />;
        }
    };

    return (
        <div>
            <Jumbotron className="outerJumbo">
                {/*{(playerOneScore === 0 && playerTwoScore === 0) && 'Game starting....'}*/}
                {((playerOneScore > 0 && playerTwoScore > 0) || shuttingBox) && (
                    <div className="restarting01">
                        Game will be restarting in a few seconds....
                    </div>
                )}
                {(playerOneScore === 0 || playerTwoScore === 0) && !shuttingBox && (
                    <span className="spannedTitle">
            Lets see who can shut the box!!!!
          </span>
                )}
                {shuttingBox && turnFirstPlayer && (
                    <span className="spannedTitle decision01">
            Congrats -- Player One has shut the box!!!!!!!!
          </span>
                )}
                {shuttingBox && !turnFirstPlayer && (
                    <span className="spannedTitle decision01">
            Congrats -- Player Two has shut the box!!!!!!!!
          </span>
                )}
                {playerOneScore > 0 &&
                playerTwoScore > 0 &&
                playerOneScore > playerTwoScore && (
                    <span className="spannedTitle decision01">
              Congrats -- Player Two has won
            </span>
                )}
                {playerOneScore > 0 &&
                playerTwoScore > 0 &&
                playerOneScore < playerTwoScore && (
                    <span className="spannedTitle decision01">
              Congrats -- Player One has won
            </span>
                )}
                {playerOneScore > 0 &&
                playerTwoScore > 0 &&
                playerOneScore === playerTwoScore && (
                    <span className="spannedTitle decision01">Its a draw, sweet!</span>
                )}
                {showingConfetti()}

                {!(playerOneScore > 0 && playerTwoScore > 0) &&
                !shuttingBox &&
                turnFirstPlayer && (
                    <div className="turn01">Player 1 - it's your turn mate!</div>
                )}
                {!(playerOneScore > 0 && playerTwoScore > 0) &&
                !shuttingBox &&
                !turnFirstPlayer && (
                    <div className="turn01">Player 2 - it's your turn mate!</div>
                )}
            </Jumbotron>
            <div className="outerContainer">
                <div className="d-flex justify-content-around">
                    <Button
                        variant="primary"
                        className="btn01"
                        onClick={() => handleClick(1)}
                        disabled={!turnFirstPlayer || showOptions}
                    >
                        Player 1, roll the dice
                    </Button>
                    <Button
                        onClick={() => handleClick(2)}
                        variant="primary"
                        className="btn01"
                        disabled={turnFirstPlayer || showOptions}
                    >
                        Player 2, roll the dice
                    </Button>
                </div>
                <br />
                {combos.length > 0 && showOptions && (
                    <div className="d-flex justify-content-around">
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={`Player ${
                                turnFirstPlayer ? "1" : "2"
                            } - Please select your key combo`}
                        >
                            {combos.map((combo) => {
                                return (
                                    <Dropdown.Item
                                        title={combo.toString()}
                                        onClick={(e) => {
                                            // console.log(e.currentTarget.title);
                                            onDropDownClick(e.currentTarget.title);
                                        }}
                                    >
                                        {combo.toString()}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                    </div>
                )}
                {combos.length === 0 &&
                !showOptions &&
                gameCounter !== 0 &&
                !(playerOneScore === 0 && playerTwoScore === 0) && (
                    <div className="sorryMessage01">
                        No combination was found, switching players/ round over.
                    </div>
                )}
                <br />
                <Dice face={stateArray[0]} />

                <Dice face={stateArray[1]} />
                <br />
                <div className="d-flex justify-content-around">
                    <Button style={{ margin: "2em 0 0 3em" }} variant="primary">
                        Player one has scored:{" "}
                        <Badge variant="light">{playerOneScore}</Badge>
                    </Button>
                    <Button style={{ margin: "2em 2em 0 3em" }} variant="primary">
                        Player two has scored:{" "}
                        <Badge variant="light">{playerTwoScore}</Badge>
                    </Button>
                </div>
                <br />
                <SHutterBox remainingOnes={numArray} />
            </div>
        </div>
    );
};

export default RollDice;
