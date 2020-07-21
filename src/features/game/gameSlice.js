import { createSlice } from '@reduxjs/toolkit';
import { getNextMoveCall } from '../../api/dropTokenAPI';
import * as Constants from '../../constants';

export const gameSlice = createSlice({
   name: 'game',
   initialState: initialState(),
   reducers: {
        changePlayerColor: (state, action) => {
           state.playerColor = action.payload;
        },
        changePlayerOrder: (state, action) => {
            state.playerOrder = action.payload
        },
        dropToken: (state, action) => {
            let column = action.payload;
            state.moveHistory.push(column);
            state.gameGrid = dropIntoColumn(state.gameGrid, column, state.onTurnColor);
            if (isColumnFull(state.gameGrid, column)) {
                state.fullColumns.push(column);
            }
            var victory = checkForVictory(state.gameGrid);
            if (victory) {
                if (state.playerColor === state.onTurnColor) {
                    state.endCondition = Constants.YOU_WIN
                } else {
                    state.endCondition = Constants.YOU_LOSE
                }
            } else if (checkForDraw(state.gameGrid)) {
                state.endCondition = Constants.DRAW
            } else {
                toggleOnTurn(state);
                toggleOnTurnColor(state);
            }
        },
        startGame: state => {
            state.gameActive = true;
            if (Constants.FIRST === state.playerOrder) {
                state.onTurnColor = state.playerColor;
            } else {
                toggleOnTurn(state);
                if (Constants.RED === state.playerColor) {
                    toggleOnTurnColor(state);
                }
            }
        },
        restartGame: state => initialState(),
    },
});

function initialState() {
    return {
        endCondition: undefined,
        gameActive: false,
        gameGrid: buildEmptyGrid(),
        fullColumns: [],
        moveHistory: [],
        onTurn: Constants.PLAYER,
        onTurnColor: Constants.RED,
        playerColor: Constants.RED,
        playerOrder: Constants.FIRST,
    };
}

function buildEmptyGrid() {
    return [
        [Constants.EMPTY, Constants.EMPTY, Constants.EMPTY, Constants.EMPTY],
        [Constants.EMPTY, Constants.EMPTY, Constants.EMPTY, Constants.EMPTY],
        [Constants.EMPTY, Constants.EMPTY, Constants.EMPTY, Constants.EMPTY],
        [Constants.EMPTY, Constants.EMPTY, Constants.EMPTY, Constants.EMPTY],
    ];
}

function checkForDraw(grid) {
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
            if (Constants.EMPTY === grid[row][column]) {
                return false;
            }
        }
    }

    return true;
}

function checkForVictory(grid) {
    var victory = false;

    victory = checkForDiagonalVictory(grid)
    if (victory) {
        return victory;
    }
    victory = checkForRowVictory(grid);
    if (victory) {
        return victory;
    }
    victory = checkForColumnVictory(grid);
    if (victory) {
        return victory;
    }

    return victory;

}

function checkForColumnVictory(grid) {
    for (let column = 0; column < 4; column++) {
        let columnContents = [
            grid[0][column], 
            grid[1][column], 
            grid[2][column], 
            grid[3][column],
        ];
        if (!columnContents.includes(Constants.EMPTY) && columnContents.every(isWinningSequence)) {
            return columnContents[0];
        }
    }

    return false;
}

function checkForDiagonalVictory(grid) {
    var diagonalOne = [
        grid[0][0],
        grid[1][1],
        grid[2][2],
        grid[3][3],
    ];

    if (!diagonalOne.includes(Constants.EMPTY) && diagonalOne.every(isWinningSequence)) {
        return diagonalOne[0];
    }

    var diagonalTwo = [
        grid[0][3],
        grid[1][2],
        grid[2][1],
        grid[3][0],
    ];

    if (!diagonalTwo.includes(Constants.EMPTY) && diagonalTwo.every(isWinningSequence)) {
        return diagonalTwo[0];
    }

    return false;


}

function checkForRowVictory(grid) {
    for (let row = 3; row > -1; row--) {
        if (!grid[row].includes(Constants.EMPTY) && grid[row].every(isWinningSequence)) {
            return grid[row][0];
        }
    }
    return false;
}

function isColumnFull(grid, column) {
    for (let i = 0; i < grid.length; i++) {
        if (Constants.EMPTY === grid[i][column]) {
            return false;
        }
    }

    return true;
}

function isWinningSequence(element, index, array) {
    if (index === 0) {
        return true;
    } else {
        return (element === array[index - 1]);
    }
}

function dropIntoColumn(grid, column, color) {
    for (let row = 3; row > -1; row--) {
        if (Constants.EMPTY === grid[row][column]) {
            grid[row][column] = color;
            return grid;
        }
    }
    return grid;
}

function toggleOnTurn(state) {
    if (Constants.PLAYER === state.onTurn) {
        state.onTurn = Constants.AI;
    } else {
        state.onTurn = Constants.PLAYER;
    }
}

function toggleOnTurnColor(state) {
    if (Constants.RED === state.onTurnColor) {
        state.onTurnColor = Constants.YELLOW;
    } else {
        state.onTurnColor = Constants.RED;
    }
}

export const {
    changePlayerColor,
    changePlayerOrder,
    dropToken,
    startGame,
    restartGame
} = gameSlice.actions;

export const dropTokenAsync = (state, column) => {
    setTimeout(() => {
        dropToken(state, column);
    }, 1000);
}

export const selectEndCondition = state => state.game.endCondition;
export const selectFullColumns = state => state.game.fullColumns;
export const selectGameActive = state => state.game.gameActive;
export const selectMoveHistory = state => state.game.moveHistory;
export const selectAPICallResponse = state => state.game.apiCallResponse;
export const selectPlayerColor = state => state.game.playerColor;
export const selectPlayerOrder = state => state.game.playerOrder;
export const selectOnTurn = state => state.game.onTurn;
export const selectOnTurnColor = state => state.game.onTurnColor;
export const selectGameGrid = state => state.game.gameGrid;

export default gameSlice.reducer;

export function fetchNextMove(moveList) {
    return async function(dispatch) {
        const column = await getNextMoveCall(moveList);
        dispatch(dropToken(column));
    }   
};