import { createSlice } from '@reduxjs/toolkit';
import * as Constants from '../../constants';

export const gameSlice = createSlice({
   name: 'game',
   initialState: {
       gameActive: false,
       gameGrid: buildEmptyGrid(),
       moveHistory: [],
       onTurn: Constants.PLAYER,
       onTurnColor: Constants.RED,
       playerColor: Constants.RED,
       playerOrder: Constants.FIRST,
   },
   reducers: {
        changePlayerColor: (state, action) => {
           state.playerColor = action.payload;
        },
        changePlayerOrder: (state, action) => {
            state.playerOrder = action.payload
        },
        dropToken: (state, action) => {
            state.moveHistory.push(action.payload);
            state.gameGrid = dropIntoColumn(state.gameGrid, action.payload, state.onTurnColor);
            var victory = checkForVictory(state.gameGrid);
            if (victory) {
                // End game here
            } else if (checkForDraw(state.gameGrid)) {
                // End game here
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
                toggleOnTurnColor(state);
            }
        },
    },
});

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

export const {changePlayerColor, changePlayerOrder, dropToken, startGame } = gameSlice.actions;

export const selectGameActive = state => state.game.gameActive;
export const selectPlayerColor = state => state.game.playerColor;
export const selectPlayerOrder = state => state.game.playerOrder;
export const selectOnTurn = state => state.game.onTurn;
export const selectOnTurnColor = state => state.game.onTurnColor;
export const selectGameGrid = state => state.game.gameGrid;

export default gameSlice.reducer;