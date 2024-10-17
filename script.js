function startQuiz() {
  // Narrative prompts for the quiz
  const narration = [
    "As you step into a cozy café on a Monday evening, a rich mix of fragrances welcomes you, promising comfort after a long day.",
    "You glance around and notice the menu filled with so many unique drink options, each one more enticing than the last.",
    "Feeling a little adventurous, you decide to explore the drink choices available, wondering what flavors will excite your taste buds.",
    "You spot a group of friends laughing over their drinks, their joy infectious, and you feel a spark of excitement about connecting with others.",
    "Approaching the counter, you take a moment to decide what to order, weighing your options as you consider your mood.",
    "The barista greets you with a warm smile, ready to take your order, making you feel at home in this vibrant atmosphere.",
    "You consider how you’d like your drink prepared – something hot to warm you up or a cool refreshment for a laid-back vibe?",
    "As you wait for your drink, you take in the ambiance of the café, observing the people around you and soaking in the lively conversations.",
    "You see a couple sharing stories over steaming cups of coffee and a group animatedly discussing the latest book they read.",
    "Your drink is ready, and you can't wait to try it! The aroma teases your senses as you pick it up.",
    "As you prepare to leave, you take a moment to appreciate the café's vibe, feeling a sense of fulfillment from the experience.",
    "With your drink in hand, you step out, ready for your next adventure, excited to reflect on the choices you made today."
];

// Questions and options for each question
const questions = [
    ["How do you feel when you first enter a café?", 
        ["Excited to meet your friends and catch up ☕", 
         "Content to find a quiet spot and relax 🍵"]
    ],
    ["What kind of environment do you prefer?", 
        ["Lively and bustling, full of energy 🥤", 
         "Calm and serene, where I can think 🏡"]
    ],
    ["When choosing a drink, do you:", 
        ["Like to try new and trendy drinks, always on the lookout for the next big thing 🍹", 
         "Stick to your classic favorites; you know what you like ☕"]
    ],
    ["How do you approach making decisions?", 
        ["Analyze all the options carefully, weighing the pros and cons 🤔", 
         "Follow your instincts; you trust your gut 💡"]
    ],
    ["What is your ideal café visit?", 
        ["Chatting with friends over coffee, sharing stories ☕", 
         "Reading a book alone with tea, enjoying the solitude 🍵"]
    ],
    ["While waiting for your drink, you see someone who ordered the same drink as you:", 
        ["Engage with the customer and strike up conversation about the drink 🗣️", 
         "Enjoy your own company, and smile thinking your drink choice was good 📖"]
    ],
    ["Do you prefer your drinks:", 
        ["Hot and energizing, like a strong coffee ☕", 
         "Cool and refreshing, perfect for a sunny day 🍹"]
    ],
    ["When it comes to flavors, do you enjoy:", 
        ["Bold and intense flavors that make a statement 🍫", 
         "Light and fruity flavors that refresh 🍊"]
    ],
    ["How important is presentation to you?", 
        ["Very important; I love aesthetic drinks that look beautiful 📸", 
         "Not that important; it's all about the taste 🍹"]
    ],
    ["How do you feel about trying unusual flavors?", 
        ["I love trying new things; the more unique, the better! 🌟", 
         "I prefer to stick to what I know; familiarity is comforting 🍵"]
    ],
    ["At the café, do you usually:", 
        ["Chat with the barista to learn about new drinks ☕", 
         "Keep to yourself and enjoy the ambiance 📚"]
    ],
    ["As you leave the café, you think about:", 
        ["How soon you can return for another visit 🚶‍♂️", 
         "The next adventure you want to plan 🎉"]
    ]
];


  // Images corresponding to each question
  const images = [
    "static/images/cafe.png", // Image for question 1
    "static/images/cafe.png", // Image for question 2
    "static/images/cafe.png", // Image for question 3
    "static/images/cafe.png", // Image for question 4
    "static/images/cafe.png", // Image for question 5
    "static/images/cafe.png", // Image for question 6
    "static/images/cafe.png", // Image for question 7
    "static/images/cafe.png", // Image for question 8
    "static/images/cafe.png", // Image for question 9
    "static/images/cafe.png", // Image for question 10
    "static/images/cafe.png", // Image for question 11
    "static/images/cafe.png"  // Image for question 12
  ];

  // Initialize scores for MBTI dimensions
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  let currentQuestion = 0;

  // Function to update progress bar
  function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // Function to display the current question
  function displayQuestion() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = ''; // Clear previous content

    if (currentQuestion < questions.length) {
      // Display narrative
      quizContainer.appendChild(createElement('div', narration[currentQuestion]));

      // Display question image
      const imgElement = createElement('img');
      imgElement.src = images[currentQuestion]; // Set the image source
      imgElement.alt = `Image for question ${currentQuestion + 1}`;
      imgElement.classList.add('question-image'); // Add class for styling
      quizContainer.appendChild(imgElement);

      // Display question
      quizContainer.appendChild(createElement('div', questions[currentQuestion][0]));

      // Display options as buttons
      questions[currentQuestion][1].forEach((option, index) => {
        const button = createElement('button', option);
        button.classList.add('option');
        button.addEventListener('click', () => recordAnswer(index));
        quizContainer.appendChild(button);
      });

      // Update progress bar
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
    const properties = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']];
    const questionType = currentQuestion % 4; // Determine which MBTI dimension to update

    // Update scores based on the selected answer
    scores[properties[questionType][selectedIndex]]++;

    // Move to the next question
    currentQuestion++;
    displayQuestion();
  }

  // Function to display the results
  function showResults() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = ''; // Clear the quiz container

    // Calculate the MBTI result based on scores
    const mbti = calculateMBTI();
    
    // Display the final result
    quizContainer.appendChild(createElement('div', `Your MBTI type is: ${mbti}`));
    quizContainer.appendChild(createElement('div', `You are best matched with: ${getDrinkRecommendation(mbti)}`));

    const restartButton = createElement('button', 'Take the Quiz Again');
    restartButton.classList.add('restart');
    restartButton.addEventListener('click', restartQuiz);
    quizContainer.appendChild(restartButton);
  }

  // Helper function to calculate the MBTI type
  function calculateMBTI() {
    let mbti = '';
    mbti += scores.E > scores.I ? 'E' : 'I'; // Extraversion or Introversion
    mbti += scores.S > scores.N ? 'S' : 'N'; // Sensing or Intuition
    mbti += scores.T > scores.F ? 'T' : 'F'; // Thinking or Feeling
    mbti += scores.J > scores.P ? 'J' : 'P'; // Judging or Perceiving
    return mbti;
  }

  // Function to get drink recommendation based on MBTI type
  function getDrinkRecommendation(mbti) {
    const recommendations = {
      ESTJ: 'Coffee ☕',
      ISTJ: 'Herbal Tea 🍵',
      ENFP: 'Strawberry Smoothie 🍓',
      INFP: 'Chai ☕',
      ESFJ: 'Hot Chocolate 🍫',
      ISFJ: 'Oat Milk 🥛',
      ESTP: 'Soda 🥤',
      ISFP: 'Lemonade 🍋',
      ENTJ: 'Espresso Shot ☕',
      INTJ: 'Coconut Water 🥥',
      ENFJ: 'Orange Juice 🍊',
      INFJ: 'Bubble Tea 🧋',
      ESTP: 'Iced Tea 🍹',
      ISTP: 'Celery Juice 🥬',
      ESFP: 'Milkshake 🍦',
      ISFP: 'Water 💧',
    };
    return recommendations[mbti] || 'A refreshing drink! 🍹';
  }

  // Function to restart the quiz
  function restartQuiz() {
    currentQuestion = 0;
    Object.keys(scores).forEach(key => scores[key] = 0); // Reset scores
    displayQuestion();
  }

  // Start the quiz by displaying the first question
  displayQuestion();
}

// Initialize the quiz when the document is ready
document.addEventListener('DOMContentLoaded', startQuiz);