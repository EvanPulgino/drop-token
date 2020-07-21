import React from 'react';
import { useDispatch } from 'react-redux';
import { dropToken } from '../game/gameSlice';
import * as Constants from '../../constants';
import * as Util from  '../../util';
import styles from './DropZone.module.css';

export function DropZone(props) {
    const color = props.color;
    const column = props.column;
    const fullColumns = props.fullColumns;
    const onTurn = props.onTurn;
    const dispatch = useDispatch();

    var id = 'dropzone-' + column;

    return <div id={id} className={getDropZoneClass(color, column, fullColumns, onTurn)} onClick={() => dispatch(dropToken(column))} />
}

function getDropZoneClass(color, column, fullColumns, onTurn) {
    if (fullColumns.includes(column)) {
        return Util.makeUnclickable(Util.makeBackgroundEmpty(styles.dropZone));
    }

    var dropZoneClass = styles.dropZone;

    if (Constants.AI === onTurn) {
        dropZoneClass = Util.makeUnclickable(dropZoneClass);
    } else {
        dropZoneClass = Util.makeClickable(dropZoneClass);
    }

    switch (color) {
        case(Constants.RED): {
            return Util.makeBackgroundRed(dropZoneClass);
        }
        case(Constants.YELLOW): {
            return Util.makeBackgroundYellow(dropZoneClass);
        }
        default: {
            return Util.makeBackgroundEmpty(dropZoneClass);
        }
    }
}

export default DropZone;