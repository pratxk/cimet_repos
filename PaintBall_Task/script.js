let resetBtn = document.getElementById('resetBtn');
let redoBtn = document.getElementById('redoBtn');
let undoBtn = document.getElementById('undoBtn');

let inputArea = document.getElementById('input-area');

let randomColor = ["red", 'blue', 'green', 'yellow', 'pink', 'black'];
let circleHistory = []; 
let redoHistory = []; 

function generateRandomNumberArray(max) {
    return Math.floor(Math.random() * max);
}

function createCircle(top, colorCode, left) {
    let circleBox = document.createElement('div');
    circleBox.style.backgroundColor = colorCode;
    circleBox.style.borderRadius = '50%';
    circleBox.style.width = '20px';
    circleBox.style.height = '20px';
    circleBox.style.position = 'absolute';
    circleBox.style.top = top + 'px';
    circleBox.style.left = left + 'px'

    inputArea.appendChild(circleBox);
    circleHistory.push(circleBox); 
    resetBtn.disabled = false;
    undoBtn.disabled = false;
    redoBtn.disabled = true; // initially disable redo button

    return circleBox;
}

inputArea.addEventListener('click', (event) => {
    let randomColorIndex = generateRandomNumberArray(randomColor.length);
    let topVal = event.clientY;
    let leftVal = event.clientX;
    createCircle(topVal, randomColor[randomColorIndex], leftVal);
});

undoBtn.addEventListener('click', () => {
    if (circleHistory.length > 0) {
        let lastCircle = circleHistory.pop(); 
        inputArea.removeChild(lastCircle); 
        redoHistory.push(lastCircle); 
        redoBtn.disabled = false; // enable redo button when undo is clicked
    }else{
        undoBtn.disabled = true;
        redoBtn.disabled = true;
        resetBtn.disabled = true;
    }
});

redoBtn.addEventListener('click', () => {
    if (redoHistory.length > 0) {
        let lastRemovedCircle = redoHistory.pop(); 
        inputArea.appendChild(lastRemovedCircle);
        circleHistory.push(lastRemovedCircle); 
        if(redoHistory.length === 0) {
            redoBtn.disabled = true; // disable redo button when all circles are added
        }
    }
});

resetBtn.addEventListener('click',()=>{
    inputArea.innerHTML = '';
    circleHistory = [];
    redoHistory = [];
    resetBtn.disabled = true;
    undoBtn.disabled = true;
    redoBtn.disabled = true;
});

// initially disable all buttons
resetBtn.disabled = true;
undoBtn.disabled = true;
redoBtn.disabled = true;