
function createParagraph() {
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
  document.getElementById('demo').style.fontSize='35px'; {
}
