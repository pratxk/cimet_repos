import { data } from "./data.js";
let boardContainer = document.getElementById('board');
let form = document.querySelector("form");
let mainData = data || [];
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', (e) => {
    submitForm(e);
    console.log(mainData);
})

function getFormData() {
    boardContainer.innerHTML = "";
    arraySort(mainData);
    mainData.forEach((ele, id) => {
        createDisplayData(ele, id);
    })
}

function submitForm(e) {
    e.preventDefault();
    let first_name = document.getElementById('fname').value;
    let last_name = document.getElementById('lname').value;
    let country = document.getElementById('selectCountry').value;
    let score = document.getElementById('score').value;

    let obj = {
        first_name,
        last_name,
        country,
        score
    };
    console.log(obj);

    mainData.push(obj);
    getFormData();
    resetForm()
}

function arraySort(inputArray) {
    inputArray.sort((a, b) => {
        if(b.score > a.score)return 1;
        else return -1;
    })
}


function createDisplayData(ele, id) {

    // console.log(ele);
    // arraySort(ele);
    let parentDiv = document.createElement('div');
    parentDiv.setAttribute("class", "playerRecord");



    let name_div = document.createElement('div');
    name_div.innerText = ele.first_name + " " + ele.last_name;

    let country_div = document.createElement('div');
    country_div.innerText = ele.country;

    let score_div = document.createElement('div');
    score_div.innerText = +ele.score;

    let incrementBtn = document.createElement('button');
    incrementBtn.innerText = '+5';
    incrementBtn.addEventListener('click',()=>{
        incrementScore(id);
        getFormData();
    })
    
    let decrementBtn = document.createElement('button');
    decrementBtn.innerText = '-5';
    decrementBtn.addEventListener('click',()=>{
        decrementScore(id);
        getFormData();
    })
    
    let deleteBtn = document.createElement('button');
    // let filterId = id;
    deleteBtn.addEventListener('click', () => {
        handleDelete(id);
        // console.log({filteredData});
        // mainData = filteredData;
        getFormData()
        // getFormData(mainData);
    });
    deleteBtn.innerText = 'Del'

    parentDiv.append(name_div, country_div, score_div, incrementBtn, deleteBtn, decrementBtn);
    if (parentDiv == null) {
        parentDiv = {}
    }
    boardContainer.append(parentDiv);
}


function resetForm() {
    form.reset()
}


function handleDelete(index) {
    console.log({ index });
    console.log({ mainData });
    mainData.splice(index, 1);
}

function incrementScore(id){
        mainData[id].score =Number(mainData[id].score)+ 5;
    
}
function decrementScore(id){
    mainData[id].score =Number(mainData[id].score)- 5;

}
// getFormData();

