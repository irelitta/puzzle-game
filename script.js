let imgUrl = [];
function putImagePartIntoImg(context, imgDivId, x, y, width, height) {
    let imageData = context.getImageData(x, y, width, height);
    let canvasPart = document.createElement('canvas');
    let contextPart = canvasPart.getContext('2d');
    canvasPart.width = width;
    canvasPart.height = height;
    contextPart.putImageData(imageData, 0, 0);
    canvasPart.toBlob(function (blob) {
        var newImg = document.createElement('img'),
            url = URL.createObjectURL(blob);
    /*
        newImg.onload = function () {
            // больше не нужно читать blob, поэтому он отменён
            URL.revokeObjectURL(url);
        };
        */
        newImg.src = url;        
        imgUrl.push(url);
        console.log('dhifdhdvbjskj');
        //console.log(imgUrl);
        //console.log(imgUrl[2]);
        
        //document.querySelector('#container').appendChild(newImg);
    });
    //document.getElementById(imgDivId).src = canvasPart.toDataURL();
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
    putImagePartIntoImg(context, 'left', 0, 0, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, 'right', image.width / 3, 0, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, 'right', image.width * 2 / 3, 0, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, 'left', 0, image.height / 3, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, 'right', image.width / 3, image.height / 3, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, 'right', image.width * 2 / 3, image.height / 3, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, 'left', 0, image.height *2 / 3, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, 'right', image.width / 3, image.height *2 / 3, image.width / 3, image.height / 3);
    putImagePartIntoImg(context, 'right', image.width * 2 / 3, image.height *2 / 3, image.width / 3, image.height / 3);
    setTimeout(() => {
        console.log(imgUrl);
    }, 500 );
    console.log(imgUrl);
    console.log(imgUrl[2]);    

}
image.src = 'white-ship.jpg';

function drawImage() {
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('li');
        document.querySelector('#container').appendChild(cell);
        cell.classList.add(`class${i}`);
        cell.style = 'width: 214px; height: 120px; background-color: aqua;'
        let image = document.createElement('img');
        image.src = imgUrl[i];
        console.log(imgUrl[2]);
        cell.appendChild(image);
    };
}
setTimeout(drawImage, 1000);


/*

let canvas = document.getElementById('c1');
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(140, 140, 140)';
ctx.fillRect(0, 0, 300, 300);
canvas.toBlob(function (blob) {
    var newImg = document.createElement('img'),
        url = URL.createObjectURL(blob);

    newImg.onload = function () {
        // больше не нужно читать blob, поэтому он отменён
        URL.revokeObjectURL(url);
    };
    newImg.src = url;
    
    document.body.appendChild(newImg);
});

*/