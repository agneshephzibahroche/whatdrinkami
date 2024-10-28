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
    "With your drink in hand, you step out, excited about the flavors you've chosen and the connections you might have made."
  ];

  // Questions and options for each question
  const questions = [
    ["How do you feel when you first enter a café?", 
        ["Eager to catch up with friends and share stories ☕", 
         "Content to find a cozy corner to relax and people watch 🍵"]
    ],
    ["What kind of environment do you thrive in?", 
        ["A vibrant café buzzing with chatter and laughter 🥤", 
         "A peaceful library or a quiet café corner 🏡"]
    ],
    ["When browsing the drink menu, do you:", 
        ["Experiment with unique and trendy drinks 🍹", 
         "Stick with your reliable favorites ☕"]
    ],
    ["How would you approach new people at the café?", 
        ["I confidently start conversations and make connections 🤝", 
         "I prefer to observe and engage only if I feel comfortable 👀"]
    ],
    ["What’s your ideal café experience?", 
        ["Engaging in lively discussions with friends ☕", 
         "Reading quietly and enjoying my drink alone 🍵"]
    ],
    ["The barista makes small talk with you, what do you do?", 
        ["Entertain the conversation and chat, maybe make a new friend 🗣️", 
         "Respond politely and focus on ordering my drink 📖"]
    ],
    ["Do you prefer your drinks:", 
        ["Strong and bold to keep you energized ☕", 
         "Light and refreshing to relax you 🍹"]
    ],
    ["When it comes to trying new flavors, do you:", 
        ["Seek out unique combinations that intrigue you 🌟", 
         "Prefer to stick to familiar and safe choices 🍵"]
    ],
    ["How significant is the presentation of your drink to you?", 
        ["Crucial; I love taking photos of beautiful drinks 📸", 
         "Not a priority; I'm more concerned with taste 🍹"]
    ],
    ["How do you feel about trying unexpected flavor combinations?", 
        ["Excited to explore new tastes and surprises! 🎉", 
         "Cautious; I prefer to know what I'm getting into 🍵"]
    ],
    ["When leaving the café, would you:", 
        ["Wish the staff farewell and express your gratitude ☕", 
         "Plan a silent escape without engaging ❌"]
    ],
    ["As you leave the café, your thoughts are focused on:", 
        ["Planning your next cafe-hop with friends 🚶‍♂️", 
         "Reflecting on your experience and the next cafe visit 🎉"]
    ]
  ];

  // Images corresponding to each question
  const images = [
    "static/images/cafe.png", // Image for question 1
    "static/images/table.png", // Image for question 2
    "static/images/drink.png", // Image for question 3
    "static/images/buddy.png", // Image for question 4
    "static/images/thinking.png", // Image for question 5
    "static/images/barista.png", // Image for question 6
    "static/images/temperatures.png", // Image for question 7
    "static/images/flavour.png", // Image for question 8
    "static/images/latte-art.png", // Image for question 9
    "static/images/aroma.png", // Image for question 10
    "static/images/goodbye.png", // Image for question 11
    "static/images/sign.png"  // Image for question 12
  ];

  // Initialize scores for MBTI dimensions
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  let currentQuestion = 0;

  // Function to update progress bar
  function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestion + 1) / questions.length) * 100; // Update to reflect the next question
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
  const resultDiv = createElement('div', `Your MBTI type is: ${mbti}`);
  quizContainer.appendChild(resultDiv);

  const drinkRecommendation = createElement('div', `You are best matched with: ${getDrinkRecommendation(mbti)}`);
  quizContainer.appendChild(drinkRecommendation);

  // Set image URL based on MBTI type (ensure these paths match your file locations)
  const imageUrls = {
      ESTJ: 'static/images/intj-image.png',
      ISTJ: 'static/images/intj-image.png',
      ENTJ: 'static/images/intj-image.png',
      INTJ: 'static/images/intj-image.png',
      ENTP: 'static/images/intj-image.png',
      INTP: 'static/images/intj-image.png',
      ENFJ: 'static/images/intj-image.png',
      INFJ: 'static/images/intj-image.png',
      ENFP: 'static/images/intj-image.png',
      INFP: 'static/images/intj-image.png',
      ESFP: 'static/images/intj-image.png',
      ISFP: 'static/images/intj-image.png',
      ESTP: 'static/images/intj-image.png',
      ISTP: 'static/images/intj-image.png',
      ESFJ: 'static/images/intj-image.png',
      ISFJ: 'static/images/intj-image.png',
  };

  // Create an image element for the MBTI type
  const resultImage = createElement('img');
  resultImage.src = imageUrls[mbti];
  resultImage.alt = `${mbti} Drink Recommendation`;
  resultImage.classList.add('result-image');
  quizContainer.appendChild(resultImage);

  // Create a container for buttons
  const buttonsContainer = createElement('div');
  buttonsContainer.classList.add('buttons-container');
  quizContainer.appendChild(buttonsContainer);

  // Create a download button
  const downloadButton = createElement('button', 'Download');
  downloadButton.classList.add('option');
  downloadButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = imageUrls[mbti];
  link.download = `${mbti}-drink.png`;
  link.click();
  });
  buttonsContainer.appendChild(downloadButton);

  // Create a restart button
  const restartButton = createElement('button', 'Take the Quiz Again');
  restartButton.classList.add('option');
  restartButton.addEventListener('click', restartQuiz);
  buttonsContainer.appendChild(restartButton);

  // Create an about button that leads to the about page
  const homeButton = createElement('button', 'Home');
  homeButton.classList.add('option');
  homeButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Link to your about page
  });
  buttonsContainer.appendChild(homeButton);
}

// Helper function to create an HTML element
function createElement(tag, textContent, classList = []) {
  const element = document.createElement(tag);
  element.textContent = textContent;
  if (classList.length) element.classList.add(...classList);
  return element;
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
      INTJ: 'Espresso Shot ☕',
      ENTJ: 'Double Espresso ☕',
      INTP: 'Iced Americano ☕',
      ENTP: 'Nitro Cold Brew 🍻',
      INFJ: 'Matcha Latte 🍵',
      INFP: 'Chai Tea Latte 🍂',
      ENFJ: 'Caramel Macchiato 🍮',
      ENFP: 'Strawberry Smoothie 🍓',
      ISTJ: 'Herbal Tea 🍵',
      ESTJ: 'Black Coffee ☕',
      ISFJ: 'Milk 🥛',
      ISTP: 'Cold Brew Coffee ☕',
      ISFP: 'Fruit Smoothie 🥭',
      ESTP: 'Iced Mocha ☕🍫',
      ESFP: 'Milkshake 🍦'
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