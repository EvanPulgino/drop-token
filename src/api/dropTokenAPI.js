export async function getNextMoveCall(moveList) {
    if (!moveList) {
        moveList = '';
    }
    const url = 'https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=[' + moveList + ']';

    return await fetch(url)
        .then(response => {return response.text()})
        .then(data => {return getLastElementOfMoveList(data)});
}

function getLastElementOfMoveList(moveList) {
    var moveListArray = JSON.parse(moveList);
    return moveListArray[moveListArray.length - 1];
}
