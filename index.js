const imageWrapper = document.querySelector('.image-wrapper');
let position = 0
imageWrapper.dataset.prevPosition = "0"
imageWrapper.dataset.currentPosition = '0'

window.onmousedown = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    imageWrapper.dataset.currentPosition = e.clientX
 
}

window.onmousemove = function(e) {
    const currentPosition = imageWrapper.dataset.currentPosition;
    const prevPosition = imageWrapper.dataset.prevPosition;
    if(currentPosition == 0) return;

    const movePercentage = ((((parseFloat(e.clientX) - parseFloat(currentPosition)) / +window.innerWidth) * -100) + parseFloat(prevPosition))
    const finalPercentage =  Math.max(Math.min(movePercentage, 0), -100) || 0
    // const finalPercentage = movePercentage
    imageWrapper.dataset.percentage = finalPercentage
    imageWrapper.animate({
        transform: `translate(${finalPercentage}%, -50%)`
    }, {duration:1200, fill: "forwards"})
    // const translateValue = `translate(${finalPercentage}%, -50%)`
    console.log(finalPercentage)
    // imageWrapper.style.transform = translateValue

    for(const image of imageWrapper.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + finalPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
      }
}

window.onmouseup = function(e) {
    imageWrapper.dataset.currentPosition = 0 ;
    imageWrapper.dataset.prevPosition = imageWrapper.dataset.percentage;
}