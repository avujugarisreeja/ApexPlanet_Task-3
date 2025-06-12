// Step 2: Quiz JavaScript
const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Paris", "Rome", "Madrid"],
    correct: 1
  },
  {
    question: "Which language runs in the browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    correct: 1
  }
];

let currentQuestion = 0;
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const resultEl = document.getElementById('result');
let score = 0;

function loadQuestion() {
  nextBtn.disabled = true;
  resultEl.textContent = '';
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = '';
  q.answers.forEach((answer, i) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(i);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(i) {
  nextBtn.disabled = false;
  const correctIndex = quizData[currentQuestion].correct;
  if (i === correctIndex) {
    score++;
    resultEl.textContent = "Correct!";
    resultEl.style.color = "green";
  } else {
    resultEl.textContent = `Wrong! Correct answer: ${quizData[currentQuestion].answers[correctIndex]}`;
    resultEl.style.color = "red";
  }
  [...answersEl.children].forEach(btn => btn.disabled = true);
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    questionEl.textContent = `Quiz complete! Your score: ${score} / ${quizData.length}`;
    answersEl.innerHTML = '';
    nextBtn.style.display = 'none';
    resultEl.textContent = '';
  }
});

loadQuestion();

// Step 3: Fetch Joke API JavaScript
const jokeEl = document.getElementById('joke');
const newJokeBtn = document.getElementById('newJokeBtn');

async function fetchJoke() {
  jokeEl.textContent = 'Loading joke...';
  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    jokeEl.textContent = `${data.setup} — ${data.punchline}`;
  } catch (error) {
    jokeEl.textContent = 'Failed to fetch a joke. Try again!';
  }
}

newJokeBtn.addEventListener('click', fetchJoke);

fetchJoke();
