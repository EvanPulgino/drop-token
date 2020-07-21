import React from 'react';
import { useDispatch } from 'react-redux';
import { restartGame } from '../game/gameSlice';
import * as Util from '../../util';
import styles from './GameEndAlert.module.css';

export function GameEndAlert(props) {
    const endCondition = props.endCondition;
    const dispatch = useDispatch();

    return (
        <div id="game-end-alert" className={getGameEndAlertClass(endCondition)}>
            <div id="alert-box" className={styles.alertBox}>
                <div id="message" className={styles.alertMessage}>
                    <h1 id="messsage-title" className={styles.messageTitle}>{endCondition}</h1>
                </div>
                <button id="alert-button" className={styles.alertButton}>
                    <h1 id="button-text" className={styles.buttonText} onClick={() => dispatch(restartGame())}>Play Again</h1>
                </button>
            </div>
        </div>
    );
}

function getGameEndAlertClass(endCondition) {
    if (!endCondition) {
        return Util.makeHidden(styles.gameEndAlert);
    }
    return styles.gameEndAlert;
}