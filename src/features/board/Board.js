import React from 'react';
import { Space } from '../space/Space';
import styles from './Board.module.css';

export function Board(props) {
    const grid = props.grid;

    return (
        <div id="board" className={styles.board}>
            {buildSpaces(grid)}
        </div>
        );
}

function buildSpaces(grid) {
    var spaces = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let id = "space-" + i + "-" + j;
            spaces.push(<Space key={id} id={id} color={grid[i][j]} />);
        }
    }

    return spaces;
}

export default Board;