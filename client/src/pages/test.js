getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


const boxPosList = [{'id':0, 'x': 0, 'y': 3, 'z': -3}, {'id':1, 'x': -3, 'y': 3, 'z': 0}, {'id':2, 'x': 0, 'y': 3, 'z': 3}, {'id':3, 'x': 3, 'y': 3, 'z': 0}]
const boxPosition = {'id':1, 'x': 0, 'y': 3, 'z': -3}

edgeCase = (boxList, boxPos) =>  {
    if (boxPos["id"] === 0) {
        return boxList.length-1
    }
    else if (boxPos["id"] === boxList.length-1) {
        return 0
    }
    else if (boxPos["id"] === 1) {
        return boxList.length-2
    }
    else {
        return boxPos['id'] - 1
    }
}

const boxSurround = boxPosList.filter(object => object["id"] !== boxPosition["id"])
const forbidden = edgeCase(boxPosList, boxPosition)
const nextBox = boxSurround.filter(object => object["id"] !== forbidden) 
// const boxListMinusCurr = boxPosList.filter(object => object["id"] !== boxPosition["id"])
const index = getRandomInt(0, boxPosList.length)

console.log(nextBox)