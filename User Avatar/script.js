let addBtn = document.getElementById('addBtn');
let submitBtn = document.getElementById('submitBtn');
let cancelBtn = document.getElementById('cancelBtn');
let closeBtn = document.getElementById('closeBtn');
let circleDiv = document.getElementById('circleDiv');

let modal = document.getElementById("myModal");



let avatarArray = [];

addBtn.onclick = function() {
  modal.style.display = "block";
}

closeBtn.onclick = function() {
  modal.style.display = "none";
}
cancelBtn.onclick = function() {
  modal.style.display = "none";
}

function createRandomColor(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`
}

window.onclick = function(event) {
    console.log("working");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


submitBtn.addEventListener('click',(e)=>{
    submitForm(e);
});

function submitForm(e){
    // console.log("i a, workimg")
    e.preventDefault();
    let name = document.getElementById('avatarName').value;
    let intialLetter = name[0];
    avatarArray.push({name,intialLetter, color:createRandomColor()});

    modal.style.display ='none'
    displayArray(avatarArray)
}

function displayArray(arr){
    circleDiv.innerHTML = '';
    arr.forEach((ele)=>{
        let circle = document.createElement('div');
        circle.style.borderRadius = '50%'; // make the div a circle
        circle.style.width = '50px'; // set the width
        circle.style.height = '50px'; // set the height
        circle.style.display = 'inline-block'; // set the display style
        circle.style.margin = '10px'; // add some margin between circles
        circle.style.cursor = 'pointer'; // change the cursor on hover
        circle.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)'; // add a subtle shadow

        let ptag = document.createElement('p');
        ptag.textContent = ele.intialLetter;
        ptag.style.fontSize = '20px';
        ptag.style.color = 'white';
        ptag.style.textAlign = 'center'; // center the text horizontally
        ptag.style.marginTop = '15px'; // adjust the vertical position of the text

        let randomColor = createRandomColor();
        circle.style.backgroundColor = ele.color;
        circle.append(ptag); // append the ptag to the circle
        circleDiv.append(circle);
    })
}