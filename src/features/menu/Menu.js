import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    changePlayerColor,
    changePlayerOrder,
    selectGameActive,
    selectPlayerColor,
    selectPlayerOrder,
    startGame,
} from '../game/gameSlice';
import * as Constants from '../../constants';
import * as Util from '../../util';
import styles from './Menu.module.css';

export function Menu() {
const gameActive = useSelector(selectGameActive);
const playerColor = useSelector(selectPlayerColor);
const playerOrder = useSelector(selectPlayerOrder);
const dispatch = useDispatch()

    return (
        <div id="gameMenu" className={getMenuClass(gameActive)}>
            <div id="color-prompt" className={styles.colorPrompt}>
                <h3 id="color-prompt-title" className={styles.promptTitle}>Select Player Color</h3>
                <div id="color-options" className={styles.choice}>
                    <div id="red-option" className={getRedClass(playerColor)} 
                         onClick={() => dispatch(changePlayerColor(Constants.RED))} />
                    <div id="yellow-option" className={getYellowClass(playerColor)} 
                         onClick={() => dispatch(changePlayerColor(Constants.YELLOW))} />
                </div>
            </div>
            <div id="order-prompt" className={styles.orderPrompt}>
                <h3 id="order-prompt-title" className={styles.promptTitle}>Do you want to play first or second?</h3>
                <div id="order-options" className={styles.choice}>
                    <div id="first-option" className={getFirstClass(playerOrder)}
                         onClick={() => dispatch(changePlayerOrder(Constants.FIRST))}>
                             1st
                    </div>
                    <div id="second-option" className={getSecondClass(playerOrder)}
                         onClick={() => dispatch(changePlayerOrder(Constants.SECOND))}>
                             2nd
                    </div>
                </div>
            </div>
            <h3 id="start-game-button" className={styles.start} onClick={() => dispatch(startGame())}>Start Game</h3>
        </div>
    );
}

function getMenuClass(gameActive) {
    if (!gameActive) {
        return styles.menu;
    }
    return Util.makeHidden(styles.menu);
}

function getRedClass(playerColor) {
    if (Constants.RED === playerColor) {
        return Util.makeSelected(styles.red);
    }
    return Util.makeClickable(styles.red);
}

function getYellowClass(playerColor) {
    if (Constants.YELLOW === playerColor) {
        return Util.makeSelected(styles.yellow);
    }
    return Util.makeClickable(styles.yellow);
}

function getFirstClass(playerOrder) {
    if (Constants.FIRST === playerOrder) {
        return Util.makeSelected(styles.order);
    }
    return Util.makeClickable(styles.order);
}

function getSecondClass(playerOrder) {
    if (Constants.SECOND === playerOrder) {
        return Util.makeSelected(styles.order);
    }
    return Util.makeClickable(styles.order);
}

export default Menu;