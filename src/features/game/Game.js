import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectGameActive,
    selectGameGrid,
    selectOnTurnColor,
} from './gameSlice';
import { Menu } from '../menu/Menu';
import { DropZone } from '../dropzone/DropZone';
import { Board } from '../board/Board';
import * as Util from '../../util'
import styles from './Game.module.css';

export function Game() {
    const gameActive = useSelector(selectGameActive);
    const gameGrid = useSelector(selectGameGrid);
    const onTurnColor = useSelector(selectOnTurnColor);

    return (
        <div>
            <h1 id="gameTitle" className={getTitleClass(gameActive)}>Drop Token</h1>
            <Menu />
            <div id="playArea" className={getPlayAreaClass(gameActive)}>
                <div id="dropZones" className={styles.dropZones}>
                    <DropZone column={0} color={onTurnColor} />
                    <DropZone column={1} color={onTurnColor} />
                    <DropZone column={2} color={onTurnColor} />
                    <DropZone column={3} color={onTurnColor} />
                </div>
                <Board grid={gameGrid} />
            </div>
        </div>
    );
}

function getTitleClass(gameActive) {
    if (gameActive) {
        return Util.makeHidden(styles.title);
    }
    return styles.title;
}

function getPlayAreaClass(gameActive) {
    if (gameActive) {
        return styles.playArea;
    }
    return Util.makeHidden(styles.playArea)
}

export default Game;

