import React from 'react';
import * as Constants from '../../constants';
import * as Util from  '../../util';
import styles from './Space.module.css';

export function Space(props) {
    const id = props.id;
    const color = props.color;

    return <div id={id} className={getSpaceClass(color)} />;
}

function getSpaceClass(color) {
    switch (color) {
        case(Constants.RED): {
            return Util.makeBackgroundRed(styles.space);
        }
        case(Constants.YELLOW): {
            return Util.makeBackgroundYellow(styles.space);
        }
        default: {
            return Util.makeBackgroundEmpty(styles.space);
        }
    }
}

export default Space;