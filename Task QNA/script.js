import { questions } from "./questions.js";
console.log(questions);
let score = 0;
let btn = document.querySelectorAll("button");
let list = document.getElementById("List");

function checkAnswer(questionId, value) {
  let is = score;
  questions[questionId].Answer === value;
  score++;
  return score != is;
}
function genereateRandomNumberArray(sz) {
  let questionNumbers = [];
  while (questionNumbers.length < sz) {
    let randomNum = getRandomIndex(0, sz);
    while (questionNumbers.includes(randomNum)) {
      randomNum = getRandomIndex(0, sz);
    }
    questionNumbers.push(randomNum);
  }
  return questionNumbers;
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function questionSequence() {
  let i = 0;
  let questionNumSequence = genereateRandomNumberArray(5);
  getQuestions(questionNumSequence[i++])


  const timer = setInterval(() => {
    console.log(i);
    if (i > 4) {
      window.clearInterval(timer);
      list.innerHTML = "";
      let scoreDiv = document.createElement('h2');
      let restartBtn = document.createElement('button');
      restartBtn.setAttribute('class', "optionButtons");
      restartBtn.addEventListener("click", () => {
        location.reload();
      })
      restartBtn.innerText = 'Restart Quiz';
      scoreDiv.innerText = `Your Score is ${score}/5`;
      list.append(scoreDiv, restartBtn);
      return;
    }
    list.innerHTML = ""
    getQuestions(questionNumSequence[i]);
    i++;
  }, 6000);
}


function getQuestions(id) {
  let questionDiv = document.createElement("div");
  questionDiv.innerText = `Question : ${id+1} `;

  let questionHead = document.createElement("h2");

  questionHead.innerText = questions[id].Question;
  questionHead.setAttribute('id', id);

  let questionTimer = document.createElement('h5');
  let mainTimer = 5;
  questionTimer.innerText = `Time remaining: ${mainTimer}`

  const secondsTimer = setInterval(() => {
    mainTimer--;
    if (mainTimer <= 1) {
      window.clearInterval(secondsTimer);
    }
    questionTimer.innerText = `Time remaining: ${mainTimer}`
  }, 1000);
  questionDiv.append(questionHead, questionTimer);

  let clicked = false;

  let answersDiv = document.createElement("div");

  function grayOut(id, text) {
    answersDiv.childNodes.forEach((ele) => {
      if (ele.innerText != text) ele.classList.add("gray")

    })

  }



  let questionNumSequence = genereateRandomNumberArray(4);
  for (let i = 0; i < 4; i++) {
    let ele = questions[id].Options[questionNumSequence[i]];
    let anserBtn = document.createElement("button");
    anserBtn.setAttribute("id", `option${ele[i]}`);
    anserBtn.setAttribute("class", `optionButtons`);
    anserBtn.innerText = ele;
    let answerVal = ele[i];
    anserBtn.value = ele[i];
    anserBtn.addEventListener('click', () => {
      if (clicked) return;
      clicked = true;

      setTimeout(() => {
        let check = checkAnswer(id, answerVal);
        if (check) {
          grayOut(id, anserBtn.innerText);
          anserBtn.classList.add('green')

        } else {

          grayOut(id, "DontChange");
          anserBtn.classList.add('red')
        }

        // greenOut();
      }, 1000)

    })

    answersDiv.append(anserBtn);

    list.append(questionDiv, answersDiv);

  }

}




questionSequence();

