
let myVariable = 35
let mySize = 35 
function createParagraph() {
    myVariable = myVariable + 1
    mySize = myVariable + "px"
    let para = document.createElement('p');
    para.textContent = 'Thank you! - Mario';
    document.body.appendChild(para);
  }
  
  const buttons = document.querySelectorAll('button');
  
  for(let i = 0; i < buttons.length ; i++) {
    buttons[i].addEventListener('click', createParagraph);
  }
var button ="demo";{
}
function myFunction (){
document.getElementById('demo').style.fontSize= mySize ;
document.getElementById('demo').style.fontSize= mySize;
}


