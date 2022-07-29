var arrowUp = document.getElementById('up');
var arrowDown = document.getElementById('down');
var arrowLeft = document.getElementById('left');
var arrowRight = document.getElementById('right');

var spaceKey = document.getElementById('space');

document.addEventListener('keydown',(evt) => {
    if(evt.key == 'ArrowUp'){
        arrowUp.style.backgroundColor = 'red'
    }
    if(evt.key == 'ArrowDown'){
        arrowDown.style.backgroundColor = 'red'
    }
    if(evt.key == 'ArrowLeft'){
        arrowLeft.style.backgroundColor = 'red'
    }
    if(evt.key == 'ArrowRight'){
        arrowRight.style.backgroundColor = 'red'
    }
    if(evt.code == 'Space'){
        spaceKey.style.backgroundColor = 'red'
    }
})

document.addEventListener('keyup', (evt) => {
    if(evt.key == 'ArrowUp'){
        arrowUp.style.backgroundColor = 'white'   
    }
    if(evt.key == 'ArrowDown'){
        arrowDown.style.backgroundColor = 'white'
    }
    if(evt.key == 'ArrowLeft'){
        arrowLeft.style.backgroundColor = 'white'
    }
    if(evt.key == 'ArrowRight'){
        arrowRight.style.backgroundColor = 'white'
    }
    if(evt.code == 'Space'){
        spaceKey.style.backgroundColor = 'white'
    }
})