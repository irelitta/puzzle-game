let isWin = false;
let imgUrl = [];
let isOnload = false;
function putImagePartIntoImg(context, x, y, width, height) {
    let imageData = context.getImageData(x, y, width, height);
    let canvasPart = document.createElement('canvas');
    let contextPart = canvasPart.getContext('2d');
    canvasPart.width = width;
    canvasPart.height = height;
    contextPart.putImageData(imageData, 0, 0);
    canvasPart.toBlob(function (blob) {
        let newImg = document.createElement('img');        
        let url = URL.createObjectURL(blob);   
        newImg.src = url;        
        imgUrl.push(url);
    });
}

let image = new Image();

image.onload = function () {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    image.width = image.width/3;
    image.height = image.height/3;
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);
    document.getElementById('source').src = canvas.toDataURL();    
    putImagePartIntoImg(context, 0, 0, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, image.width / 3, 0, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, image.width * 2 / 3, 0, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, 0, image.height / 3, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, image.width / 3, image.height / 3, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, image.width * 2 / 3, image.height / 3, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, 0, image.height *2 / 3, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, image.width / 3, image.height *2 / 3, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, image.width * 2 / 3, image.height *2 / 3, image.width / 3, image.height / 3);
}
image.src = 'yellow-ship.jpg';
const src = []
function drawImage() {
    for (let i = 0; i < 9; i++) {        
        let imageSmall = document.createElement('img');
        imageSmall.setAttribute("draggable", "true");        
        imageSmall.src = imgUrl[i];
        imageSmall.style = 'cursor: move;';
        document.getElementById('container').appendChild(imageSmall);
        imageSmall.classList.add(`img${i}`);
        imageSmall.classList.add('img');
        imageSmall.classList.add('hide');               
    };
    isOnload = true;
}
setTimeout(drawImage, 2500);

let grats = document.createElement('p');
grats.innerHTML = 'Congratulations! You solved the puzzle';
document.body.insertBefore(grats, document.getElementById('container'));
grats.classList.add('hide');

if (isOnload) {
    shufflePuzzle();
}
setTimeout(shufflePuzzle, 3500);

function shufflePuzzle() {
    let currentItem = document.querySelector('.list');    
    let items = [...document.querySelectorAll('.img')];
    let newItem = currentItem;
    newItem.innerHTML = '';
    items.sort((a, b) => Math.random() > 0.5 ? 1 : -1).slice(0, 9);    
    for(let i = 0; i < 9; i++) {
        newItem.appendChild(items[i]);
        items[i].classList.remove('hide');
    };
}

const tasksListElement = document.querySelector('.list');
const taskElements = tasksListElement.querySelectorAll('.img');

tasksListElement.addEventListener('dragstart', (evt) => {
    evt.target.classList.add('selected');
});

tasksListElement.addEventListener('dragend', (evt) => {
    const hoveredElement = tasksListElement.querySelector('.hovered');
    const targetElement = evt.target;
    
    if (hoveredElement) {
        let items = [...document.querySelectorAll('.img')];    
        let hoveredIndex = items.findIndex((elem) => elem.classList.contains('hovered'));
        let targetIndex = items.findIndex((elem) => elem.classList.contains('selected'));
        changeCurrentItem(hoveredIndex, targetIndex);

        targetElement.classList.remove('selected');
        hoveredElement.classList.remove('hovered');
        
        checkPuzzle();
        setTimeout(checkPuzzle, 2500);
        if (isWin) {
            grats.classList.remove('hide');
        }
    }
    targetElement.classList.remove('selected');
});

function changeCurrentItem(firstIndex, secondIndex) {
    let currentItem = document.querySelector('.list');    
    let items = [...document.querySelectorAll('.img')];
    let newItem = currentItem;
    newItem.innerHTML = '';
    temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
    for(let i = 0; i < 9; i++) {
        newItem.appendChild(items[i]);
    };
}

tasksListElement.addEventListener('dragover', (evt) => {
    evt.preventDefault();    
    const activeElement = tasksListElement.querySelector('.selected');
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement &&
       currentElement.classList.contains('img');
    if (!isMoveable) {
        return;
    }
    evt.target.classList.add('hovered');
});

tasksListElement.addEventListener('dragleave', (evt) => {
    evt.preventDefault();
    evt.target.classList.remove('hovered');
});

function checkPuzzle() {
    let items = [...document.querySelectorAll('.img')];
    for (let i = 0; i < 9; i++) {
        let index = items.findIndex((elem) => elem.classList.contains(`img${i}`));        
        if (index != i) {            
            return;
        }
    }
    isWin = true;
    items.forEach((elem) => {
        elem.setAttribute("draggable", "false");
        elem.style = 'cursor: default;';
    });
}













