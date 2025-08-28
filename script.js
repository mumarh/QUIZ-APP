const quizQuestions = [
  {
    question: "Capital of Pakistan?",
    options: ["Islamabad", "Karachi", "Lahore", "Multan"],
    answer: "Islamabad",
  },
  {
    question: "Old capital of Pakistan?",
    options: ["Islamabad", "Karachi", "Lahore", "Multan"],
    answer: "Karachi",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Pacific", "Indian", "Arctic"],
    answer: "Pacific",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Pablo Picasso", "Leonardo da Vinci", "Van Gogh", "Michelangelo"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    answer: "Canberra",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "What is the currency of Japan?",
    options: ["Won", "Yuan", "Yen", "Dollar"],
    answer: "Yen",
  },
  {
    question: "Which country is famous for the Eiffel Tower?",
    options: ["Germany", "Spain", "Italy", "France"],
    answer: "France",
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Sahara", "Gobi", "Arctic", "Kalahari"],
    answer: "Sahara",
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "In which year did World War II end?",
    options: ["1940", "1942", "1945", "1950"],
    answer: "1945",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: "William Shakespeare",
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Lion", "Elephant", "Cheetah"],
    answer: "Lion",
  },
  {
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    answer: "Saturn",
  },
  {
    question: "Where is the Great Wall located?",
    options: ["India", "China", "Japan", "Thailand"],
    answer: "China",
  },
  {
    question: "Which country invented tea?",
    options: ["India", "China", "UK", "Sri Lanka"],
    answer: "China",
  },
  {
    question: "Who discovered gravity?",
    options: ["Einstein", "Newton", "Galileo", "Tesla"],
    answer: "Newton",
  },
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    answer: "Ottawa",
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    answer: "Nile",
  }
];


let quizIndex = 0;
let userAnswers = [];
let quizTimer;
let timeRemaining = 10;





const startScreen = document.getElementById("quiz-start-screen");
const startBtn = document.getElementById("quiz-start-btn");
const quizScreen = document.getElementById("quiz-main-screen");
const questionText = document.getElementById("quiz-question-text");
const optionsContainer = document.getElementById("quiz-options-container");
const timeLeftDisplay = document.getElementById("quiz-time-left");
const nextBtn = document.getElementById("quiz-next-btn");
const resultScreen = document.getElementById("quiz-result-screen");
const resultOutput = document.getElementById("quiz-results-output");








startBtn.addEventListener("click", (evt) => {
  evt.preventDefault();

  const filledInputs = document.getElementsByClassName("filled");
  const username = filledInputs[0].value.trim();
  const email = filledInputs[1].value.trim();

  if (!username || !email) {
    alert("Please fill in username and email.");
    return;
  }

  const isUsernameValid =
    username.length >= 3 &&
    (/[@_.\-]/.test(username));

  if (!isUsernameValid) {
    alert("Invalid username. Use at least 3 characters and include one of @ _ - .");
    return;
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isEmailValid) {
    alert("Invalid email format.");
    return;
  }

  const stored = sessionStorage.getItem("userData");
  if (stored) {
    const { storedName, storedEmail } = JSON.parse(stored);
    if (storedName === username && storedEmail === email) {
      alert("This username and email have already started the quiz.");
      return;
    }
  }

  // ✅ Passed validation
  sessionStorage.setItem(
    "userData",
    JSON.stringify({ storedName: username, storedEmail: email })
  );

  startScreen.style.display = "none";
  quizScreen.style.display = "flex";
  loadQuestion();
});





function loadQuestion() {
  clearInterval(quizTimer);
  timeRemaining = 10;
  updateTimer();

  const q = quizQuestions[quizIndex];
  questionText.innerText = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.classList.add("quiz-option-btn");
    btn.innerText = option;

    btn.addEventListener("click", () => {
      selectOption(btn, option);
    });

    optionsContainer.appendChild(btn);
  });

  startTimer();
  nextBtn.disabled = true;
}






function selectOption(button, selectedOption) {
  const buttons = document.querySelectorAll(".quiz-option-btn");
  buttons.forEach((btn) => {
    btn.classList.add("disabled");
    btn.disabled = true;
  });

  button.classList.add("selected");

  userAnswers[quizIndex] = selectedOption;
  nextBtn.disabled = false;
  clearInterval(quizTimer);
}






function startTimer() {
  quizTimer = setInterval(() => {
    timeRemaining--;
    updateTimer();

    if (timeRemaining <= 0) {
      clearInterval(quizTimer);
      autoSelect();
    }
  }, 1000);
}





function updateTimer() {
  timeLeftDisplay.innerText = timeRemaining;
}





function autoSelect() {
  if (!userAnswers[quizIndex]) {
    userAnswers[quizIndex] = "No answer";

    const buttons = document.querySelectorAll(".quiz-option-btn");
    buttons.forEach((btn) => {
      btn.classList.add("disabled");
      btn.disabled = true;
    });

    nextBtn.disabled = false;
  }
}





nextBtn.addEventListener("click", () => {
  quizIndex++;
  if (quizIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});





function showResults() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";

  let score = 0;

  resultOutput.innerHTML = quizQuestions.map((q, i) => {
    const userAns = userAnswers[i];
    const correct = q.answer;
    const isCorrect = userAns?.toLowerCase() === correct.toLowerCase();

    if (isCorrect) score++;

    return `
      <div style="margin-bottom: 20px;">
        <strong>Q${i + 1}: ${q.question}</strong><br />
        Your Answer: <span style="color: ${isCorrect ? 'green' : 'red'}">${userAns}</span><br />
        Correct Answer: <span style="color: green">${correct}</span>
      </div>
    `;
  }).join("");

  resultOutput.innerHTML += `<h3>Your Score: ${score} / ${quizQuestions.length}</h3>`;
}
