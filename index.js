const imageWrapper = document.querySelector('.image-wrapper');
let position = 0
imageWrapper.dataset.prevPosition = "0"
imageWrapper.dataset.currentPosition = '0'

function onClick(e) {
    var x = e.clientX;
    var y = e.clientY;
    imageWrapper.dataset.currentPosition = e.clientX
 
}

function handleSlide(e) {
    const currentPosition = imageWrapper.dataset.currentPosition;
    const prevPosition = imageWrapper.dataset.prevPosition;
    if(currentPosition == 0) return;

    const movePercentage = ((((parseFloat(e.clientX) - parseFloat(currentPosition)) / +window.innerWidth) * -100) + parseFloat(prevPosition))
    const finalPercentage =  Math.max(Math.min(movePercentage, 0), -100) || 0
    imageWrapper.dataset.percentage = finalPercentage
    imageWrapper.animate({
        transform: `translate(${finalPercentage}%, -50%)`
    }, {duration:1200, fill: "forwards"})

    for(const image of imageWrapper.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + finalPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

 function onRelease(e) {
    imageWrapper.dataset.currentPosition = 0 ;
    imageWrapper.dataset.prevPosition = imageWrapper.dataset.percentage;
}

window.onmousemove = handleSlide

window.onmousedown = onClick

window.onmouseup = onRelease


window.ontouchstart = e => onClick(e.touches[0]);

// window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => onRelease(e.touches[0]);

// window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleSlide(e.touches[0]);