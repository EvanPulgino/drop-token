import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import gameReducer from '../features/game/gameSlice';


export default configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: [thunk],
});