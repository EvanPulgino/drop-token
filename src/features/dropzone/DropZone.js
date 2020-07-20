import React from 'react';
import { useDispatch } from 'react-redux';
import { dropToken } from '../game/gameSlice';
import * as Constants from '../../constants';
import * as Util from  '../../util';
import styles from './DropZone.module.css';

export function DropZone(props) {
    const color = props.color;
    const column = props.column;
    const dispatch = useDispatch();

    var id = 'dropzone-' + column;

    return <div id={id} className={getDropZoneClass(color)} onClick={() => dispatch(dropToken(column))} />
}

function getDropZoneClass(color) {
    switch (color) {
        case(Constants.RED): {
            return Util.makeBackgroundRed(styles.dropZone);
        }
        case(Constants.YELLOW): {
            return Util.makeBackgroundYellow(styles.dropZone);
        }
        default: {
            return Util.makeBackgroundEmpty(styles.dropZone);
        }
    }
}

export default DropZone;