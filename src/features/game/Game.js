import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchNextMove,
    selectEndCondition,
    selectFullColumns,
    selectGameActive,
    selectGameGrid,
    selectMoveHistory,
    selectOnTurn,
    selectOnTurnColor,
} from './gameSlice';
import { Menu } from '../menu/Menu';
import { DropZone } from '../dropzone/DropZone';
import { Board } from '../board/Board';
import { GameEndAlert } from '../gameEndAlert/GameEndAlert';
import * as Util from '../../util'
import * as Constants from '../../constants';
import styles from './Game.module.css';

export function Game() {
    const endCondition = useSelector(selectEndCondition);
    const fullColumns = useSelector(selectFullColumns);
    const gameActive = useSelector(selectGameActive);
    const gameGrid = useSelector(selectGameGrid);
    const moveHistory = useSelector(selectMoveHistory);
    const onTurn = useSelector(selectOnTurn);
    const onTurnColor = useSelector(selectOnTurnColor);
    const dispatch = useDispatch();

    return (
        <div>
            <h1 id="gameTitle" className={getTitleClass(gameActive)}>Drop Token</h1>
            <Menu />
            <div id="playArea" className={getPlayAreaClass(gameActive)}>
                <button
                    className={getAIButtonClass(onTurn)}
                    onClick={() => dispatch(fetchNextMove(moveHistory))}>
                        Trigger AI Move
                </button>
                <div id="dropZones" className={styles.dropZones}>
                    <DropZone column={0} color={onTurnColor} fullColumns={fullColumns} onTurn={onTurn} />
                    <DropZone column={1} color={onTurnColor} fullColumns={fullColumns} onTurn={onTurn} />
                    <DropZone column={2} color={onTurnColor} fullColumns={fullColumns} onTurn={onTurn} />
                    <DropZone column={3} color={onTurnColor} fullColumns={fullColumns} onTurn={onTurn} />
                </div>
                <Board grid={gameGrid} />
            </div>
            <GameEndAlert endCondition={endCondition} />
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

function getAIButtonClass(onTurn) {
    if (Constants.AI === onTurn) {
        return styles.aiMoveButton;
    }
    else return Util.makeInivisble(styles.aiMoveButton);
}

export default Game;

