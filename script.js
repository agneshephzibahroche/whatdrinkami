function startQuiz() {
  // Narrative prompts for the quiz
  const narration = [
    "As you step into a cozy café, the inviting aroma of freshly brewed coffee wraps around you, promising comfort.",
    "You glance around and notice the atmosphere of the cafe.",
    "Feeling a bit adventurous, you decide to explore the drink choices available, wondering which flavors will excite you.",
    "In the café, you notice someone engrossed in the same book as you. The prospect of connecting sparks your curiosity.",
    "Approaching the counter, you take a moment, considering your mood and what drink would make you feel just right.",
    "The barista greets you with a warm smile, creating a welcoming atmosphere that makes you feel at home in this vibrant space.",
    "You ponder how you'd like your drink prepared – something hot to energize you or a cool refreshment for a laid-back vibe?",
    "While waiting for your drink, you soak in the ambiance, observing the lively conversations and the mix of people around.",
    "Your order is called up at the counter and you eye the drink the barista hands to you.",
    "Your drink is ready, and the delightful aroma captivates you as you pick it up, eager to take your first sip.",
    "As you prepare to leave, you take a moment to appreciate the café's cozy vibe, feeling a sense of fulfillment.",
    "With your drink in hand, you step out, excited about the flavors you've chosen and the connections you might have made.",
  ];

  // Questions and options for each question
  const questions = [
    [
      "How do you feel when you first enter the café?",
      [
        "Eager to catch up with friends and share stories ☕",
        "Content to find a cozy corner to relax and people watch 🍵",
      ],
    ],
    [
      "What kind of café environment do you thrive in?",
      [
        "A vibrant café buzzing with chatter and laughter 🥤",
        "A peaceful and quiet café corner 🏡",
      ],
    ],
    [
      "When browsing the drink menu, do you:",
      [
        "Experiment with unique and trendy drinks 🍹",
        "Stick with your reliable favorites ☕",
      ],
    ],
    [
      "How would you approach new people at the café?",
      [
        "I confidently start conversations and make connections 🤝",
        "I prefer to observe and engage only if I feel comfortable 👀",
      ],
    ],
    [
      "What’s your ideal café experience?",
      [
        "Engaging in lively discussions with friends ☕",
        "Reading quietly and enjoying my drink alone 🍵",
      ],
    ],
    [
      "The barista makes small talk with you, what do you do?",
      [
        "Entertain the conversation and chat, maybe make a new friend 🗣️",
        "Respond politely and focus on ordering my drink 📖",
      ],
    ],
    [
      "Do you prefer your drinks:",
      [
        "Strong and bold to keep you energized ☕",
        "Light and refreshing to relax you 🍹",
      ],
    ],
    [
      "When it comes to trying new flavors, do you:",
      [
        "Seek out unique combinations that intrigue you 🌟",
        "Prefer to stick to familiar and safe choices 🍵",
      ],
    ],
    [
      "How significant is the presentation of your drink to you?",
      [
        "Crucial; I love taking photos of beautiful drinks 📸",
        "Not a priority; I'm more concerned with taste 🍹",
      ],
    ],
    [
      "How do you feel about trying unexpected flavor combinations?",
      [
        "Excited to explore new tastes and surprises! 🎉",
        "Cautious; I prefer to know what I'm getting into 🍵",
      ],
    ],
    [
      "When leaving the café, would you:",
      [
        "Wish the staff farewell and express your gratitude ☕",
        "Plan a silent escape without engaging ❌",
      ],
    ],
    [
      "As you leave the café, your thoughts are focused on:",
      [
        "Planning your next cafe-hop with friends 🚶‍♂️",
        "Reflecting on your experience and the next cafe visit 🎉",
      ],
    ],
  ];

  // Images corresponding to each question
  const images = [
    "static/images/cafe.png",
    "static/images/table.png",
    "static/images/drink.png",
    "static/images/buddy.png",
    "static/images/thinking.png",
    "static/images/barista.png",
    "static/images/temperatures.png",
    "static/images/flavour.png",
    "static/images/latte-art.png",
    "static/images/aroma.png",
    "static/images/goodbye.png",
    "static/images/sign.png",
  ];

  // Initialize scores for MBTI dimensions
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  let currentQuestion = 0;

  // Define which MBTI dimension each question relates to
  const mbtiMap = [
    ["E", "I"], // Q1: Extraversion vs Introversion
    ["E", "I"], // Q2: Extraversion vs Introversion
    ["S", "N"], // Q3: Sensing vs Intuition
    ["E", "I"], // Q4: Extraversion vs Introversion
    ["E", "I"], // Q5: Extraversion vs Introversion
    ["T", "F"], // Q6: Thinking vs Feeling
    ["T", "F"], // Q7: Thinking vs Feeling
    ["S", "N"], // Q8: Sensing vs Intuition
    ["T", "F"], // Q9: Thinking vs Feeling
    ["S", "N"], // Q10: Sensing vs Intuition
    ["J", "P"], // Q11: Judging vs Perceiving
    ["J", "P"], // Q12: Judging vs Perceiving
  ];

  // Function to update progress bar
  function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // Function to display the current question
  function displayQuestion() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    if (currentQuestion < questions.length) {
      quizContainer.appendChild(
        createElement("div", narration[currentQuestion])
      );
      const imgElement = createElement("img");
      imgElement.src = images[currentQuestion];
      imgElement.alt = `Image for question ${currentQuestion + 1}`;
      imgElement.classList.add("question-image");
      quizContainer.appendChild(imgElement);

      quizContainer.appendChild(
        createElement("div", questions[currentQuestion][0])
      );

      questions[currentQuestion][1].forEach((option, index) => {
        const button = createElement("button", option);
        button.classList.add("option");
        button.addEventListener("click", () => recordAnswer(index));
        quizContainer.appendChild(button);
      });

      updateProgressBar();
    } else {
      showResults();
    }
  }

  // Helper function to create an HTML element
  function createElement(tag, textContent, classList = []) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    if (classList.length) element.classList.add(...classList);
    return element;
  }

  // Function to record the user's answer
  function recordAnswer(selectedIndex) {
    const mbtiDimension = mbtiMap[currentQuestion];
    scores[mbtiDimension[selectedIndex]]++;
    currentQuestion++;
    displayQuestion();
  }

  // Function to display the results
  function showResults() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    const mbti = calculateMBTI();
    quizContainer.appendChild(
      createElement("div", `Your MBTI type is: ${mbti}`)
    );
    quizContainer.appendChild(
      createElement(
        "div",
        `You are best matched with: ${getDrinkRecommendation(mbti)}`
      )
    );

    const resultImage = createElement("img");
    resultImage.src = `static/images/mbti/${mbti}.png`;
    resultImage.alt = `${mbti} Drink Recommendation`;
    resultImage.classList.add("result-image");
    quizContainer.appendChild(resultImage);

    const buttonsContainer = createElement("div");
    buttonsContainer.classList.add("buttons-container");
    quizContainer.appendChild(buttonsContainer);

    // Create an about button that leads to the about page
    const homeButton = createElement("button", "Home");
    homeButton.classList.add("option");
    homeButton.addEventListener("click", () => {
      window.location.href = "index.html"; // Link to your about page
    });
    buttonsContainer.appendChild(homeButton);

    const downloadButton = createElement("button", "Download");
    downloadButton.classList.add("option");
    downloadButton.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = `static/images/mbti/${mbti}.png`;
      link.download = `${mbti}-drink.png`;
      link.click();
    });
    buttonsContainer.appendChild(downloadButton);

    const restartButton = createElement("button", "Take the Quiz Again");
    restartButton.classList.add("option");
    restartButton.addEventListener("click", restartQuiz);
    buttonsContainer.appendChild(restartButton);
  }

  // Helper function to calculate the MBTI type
  function calculateMBTI() {
    let mbti = "";
    mbti += scores.E > scores.I ? "E" : "I";
    mbti += scores.S > scores.N ? "S" : "N";
    mbti += scores.T > scores.F ? "T" : "F";
    mbti += scores.J > scores.P ? "J" : "P";
    return mbti;
  }

  // Function to get drink recommendation based on MBTI type
  function getDrinkRecommendation(mbti) {
    const recommendations = {
      INTJ: "Espresso Shot ☕",
      ENTJ: "Double Espresso ☕",
      INTP: "Iced Americano ☕",
      ENTP: "Cappuccino ☕",
      INFJ: "Matcha Latte 🍵",
      ENFJ: "Latte ☕",
      INFP: "Chai 🍂",
      ENFP: "Strawberry Smoothie 🍓",
      ISTJ: "Herbal Tea 🍵",
      ESTJ: "Lemonade 🍋",
      ISFJ: "Milk 🥛",
      ESFJ: "Hot Chocolate 🍫",
      ISTP: "Coconut Water 🥥",
      ESTP: "Soda 🥤",
      ISFP: "Banana Smoothie 🍌",
      ESFP: "Bubble Tea 🧋",
    };
    return recommendations[mbti];
  }

  // Function to restart the quiz
  function restartQuiz() {
    currentQuestion = 0;
    Object.keys(scores).forEach((key) => (scores[key] = 0));
    displayQuestion();
  }

  // Start the quiz by displaying the first question
  displayQuestion();
}

// Initialize the quiz when the document is ready
document.addEventListener("DOMContentLoaded", startQuiz);
