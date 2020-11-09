funcion smoothScroll (target,duration){
    let target = document.querySelector(target);
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;
  
    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed,startPosition,distance,duration);
        window.scrollTo(0,run);
        if(timeElapsed < duration) requestAnimationFrame(animtation);
        console.log('timeElapsed: ' + timeElapsed + 'duration: ' + duration);
    }
   
    funtion ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t --;
        return -c / 2 *(t * (t-2) - 1) + b;
    }

    requestAnimationFrame(animation);
    }
}

smoothScroll('.section1 , 1000');
let section1 = document.querySelector('.section1');
section1.addEventListener(run);


