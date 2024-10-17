function startQuiz() {
  // Narrative prompts for the quiz
  const narration = [
    "As you step into the cozy café, the rich aroma of freshly brewed coffee welcomes you.",
    "You glance around and notice the inviting menu filled with unique drink options.",
    "Feeling a little adventurous, you decide to explore the drink choices available.",
    "You spot a group of friends laughing over their drinks and feel a spark of excitement.",
    "Approaching the counter, you take a moment to decide what to order.",
    "The barista greets you with a smile, ready to take your order.",
    "You consider how you’d like your drink prepared - something hot or cold?",
    "As you wait for your drink, you take in the ambiance of the café.",
    "You see people enjoying their drinks and engaging in lively conversations.",
    "Your drink is ready, and you can't wait to try it!",
    "As you prepare to leave, you take a moment to appreciate the café's vibe.",
    "With your to-go drink in hand, you step out, ready for your next adventure."
  ];

  // Questions and options for each question
  const questions = [
    ["How do you feel when you first enter a café?", ["Excited to meet new people ☕", "Content to find a quiet spot 🍵"]],
    ["What kind of environment do you prefer?", ["Lively and bustling 🥤", "Calm and serene 🏡"]],
    ["When choosing a drink, do you:", ["Like to try new and trendy drinks 🍹", "Stick to your classic favorites ☕"]],
    ["How do you approach making decisions?", ["Analyze all the options carefully 🤔", "Follow your instincts 💡"]],
    ["What is your ideal café visit?", ["Chatting with friends over coffee ☕", "Reading a book alone with tea 🍵"]],
    ["While waiting for your drink, you:", ["Engage with other customers 🗣️", "Enjoy your own company 📖"]],
    ["Do you prefer your drinks:", ["Hot and energizing ☕", "Cool and refreshing 🍹"]],
    ["When it comes to flavors, do you enjoy:", ["Bold and intense 🍫", "Light and fruity 🍊"]],
    ["How important is presentation to you?", ["Very important; I love aesthetic drinks 📸", "Not that important; it's all about taste 🍹"]],
    ["How do you feel about trying unusual flavors?", ["I love trying new things! 🌟", "I prefer to stick to what I know 🍵"]],
    ["At the café, do you usually:", ["Chat with the barista and learn about the drinks ☕", "Keep to yourself and enjoy the ambiance 📚"]],
    ["As you leave the café, you think about:", ["How soon you can return for another visit 🚶‍♂️", "The next adventure you want to plan 🎉"]]
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