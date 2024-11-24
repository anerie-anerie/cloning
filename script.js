// Global game state
let currentScreen = "DORM";  // Starting screen
let aura = 0;
let degree = 0;
let touchGrassTimer; // Store reference to the timer for stopping it
let isTouchingGrass = false; // Track if the player is touching grass

// Get HTML elements
const auraValueElement = document.getElementById("aura-value");
const degreeValueElement = document.getElementById("degree-value");
const auraProgressElement = document.getElementById("aura-progress");
const degreeProgressElement = document.getElementById("degree-progress");
const gameScreenElement = document.getElementById("game-screen");
const introTextElement = document.getElementById("intro-text");
const controlsElement = document.getElementById("controls");
const statBarElement = document.getElementById("stat-bar");

// Initialize game
function initGame() {
  updateScreen();
  hideControls();  // Hide controls initially
  statBarElement.style.display = "none";  // Hide stats bar initially
}

// Update the stat bars (aura and degree)
function updateStatBars() {
  auraValueElement.textContent = aura;
  degreeValueElement.textContent = degree;
  auraProgressElement.value = aura;
  degreeProgressElement.value = degree;
}

// Function to check the player's answer
function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    correctAnswers++;  // Increment score for a correct answer
  }
}

// Update the game screen based on the current screen
function updateScreen() {
  console.log(currentScreen)
  console.log(degree)

  switch (currentScreen) {
    case "DORM":
      document.body.style.backgroundImage = "desk.jpg"
      document.getElementById("good-line").style.display = "none";
      document.getElementById("bad-line").style.display = "none";
      if (degree <= 0) {
        introTextElement.style.display = "block"; // Show intro text initially
        setTimeout(() => {
          introTextElement.style.display = "none"; // Hide after 10 seconds
          controlsElement.style.display = "flex"; // Show controls (buttons) after intro text disappears
        }, 3000); // 10 seconds
      } else if (degree > 0 && degree < 100) {
        introTextElement.style.display = "block"; // Show intro text initially
        setTimeout(() => {
          introTextElement.style.display = "none"; // Hide after 10 seconds
          controlsElement.style.display = "flex"; // Show controls (buttons) after intro text disappears
        }, 3000); // 10 seconds
      } else if (degree > 100) {
        currentScreen = "EXAM_PASS";
        updateScreen();
      }
      break; 


      case "TALK_TO_GIRL":
        console.log("going into girl phase");
    
        // Set the background image for the "Talk to Girl" phase
        document.body.style.backgroundImage = "url('talkinggirl.png')";

    
        // Show pickup options message
        const pickupMessage = document.createElement("div");
        pickupMessage.textContent = "Here are two pickup options to approach this girl:";  
        pickupMessage.style.position = "absolute";
        pickupMessage.style.top = "20px"; // Position at the top of the screen
        pickupMessage.style.left = "50%";
        pickupMessage.style.transform = "translateX(-50%)";
        pickupMessage.style.fontSize = "24px";
        pickupMessage.style.fontWeight = "bold";
        pickupMessage.style.color = "white";
        pickupMessage.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent background
        pickupMessage.style.padding = "10px 20px";
        pickupMessage.style.borderRadius = "5px";
        document.body.appendChild(pickupMessage);
    
        // Get the pickup line buttons
        const goodLineButton = document.getElementById("good-line");
        const badLineButton = document.getElementById("bad-line");
    
        // Set the pickup lines on the buttons
        goodLineButton.textContent = "Are you a git merge conflict? because I don't know you where you end and I begin! 😏";
        badLineButton.textContent = "h-hey, hey girl.... can I have your um .. number?";
    
        // Show both buttons
        goodLineButton.style.display = "block";
        badLineButton.style.display = "block";
    
        // Add event listeners for the bad and good lines
        badLineButton.addEventListener("click", function() {
            console.log("Bad pickup line chosen, returning to dorm");
    
            // Transition to DORM screen after choosing the bad pickup line
            currentScreen = "DORM";
            updateScreen();
    
            // Hide all buttons (as per your request)
            document.getElementById("touch-grass").style.display = "none";
            document.getElementById("start-exam").style.display = "none";
            document.getElementById("talk-to-girl").style.display = "none";
            document.getElementById("good-line").style.display = "none";
            document.getElementById("bad-line").style.display = "none";
            
            // Set the background to the dorm
            currentScreen = "DORM";
            updateScreen();
        });
    
        break;
    
    
    case "SHOWER":
      document.body.style.backgroundImage = "url('shower.png')";
      document.getElementById("study").style.display = "none";
      document.getElementById("shower").style.display = "none";
      document.getElementById("good-line").style.display = "none";
      document.getElementById("bad-line").style.display = "none";

    
       // Create the "Showering..." text element
      const showeringText = document.createElement("div");
      showeringText.textContent = "Showering...";
      showeringText.id = "showering-text";
      
      // Style the "Showering..." text (similar to "Studying..." text)
      showeringText.style.position = "absolute";
      showeringText.style.top = "50%";
      showeringText.style.left = "50%";
      showeringText.style.transform = "translate(-50%, -50%)";
      showeringText.style.fontSize = "30px";
      showeringText.style.fontWeight = "bold";
      showeringText.style.color = "white";
      showeringText.style.padding = "20px";
      showeringText.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // Semi-transparent background
      showeringText.style.borderRadius = "10px";
      
      // Append the text to the game screen
      document.body.appendChild(showeringText);
      
      // After 5 seconds, hide the "Showering..." text and show the buttons again
      setTimeout(() => {
        showeringText.style.display = "none";  // Hide the "Showering..." text
        document.getElementById("go-outside").style.display = "block";  // Show the "Study" button
      }, 5000); // Stay for 5 seconds before showing the buttons again

      if (aura > 100){
        currentScreen = "GIRL_YES";
        updateScreen();
       };
      
      break;
      

      case "TOUCH_GRASS":
        console.log("in touching grass");
    
        // Set the background image for the "Touching Grass" phase
        document.body.style.backgroundImage = "url('touchinggrass.png')";
    
        // Hide other buttons
        document.getElementById("touch-grass").style.display = "none";
        document.getElementById("start-exam").style.display = "none";
        document.getElementById("talk-to-girl").style.display = "none";
        document.getElementById("good-line").style.display = "none";
        document.getElementById("bad-line").style.display = "none";
    
        // Show the "Stop Touching Grass" button
        const stopButton = document.getElementById("stop-touch");
        stopButton.style.display = "block";
    
        // Start incrementing aura every second if not already started
        if (!isTouchingGrass) {
            isTouchingGrass = true;
            touchGrassTimer = setInterval(() => {
                aura += 2; // Add 2 aura points every second
                updateStatBars(); // Update the stats bars
            }, 1000); // 1 second interval
        }
    
        // Add the event listener for the "Stop Touching Grass" button
        stopButton.addEventListener("click", function() {
            console.log("Stopping Touching Grass");
    
            // Stop the aura increment by clearing the interval
            clearInterval(touchGrassTimer);
    
            // Hide the "Stop Touching Grass" button
            stopButton.style.display = "none";
    
            // Restore other buttons
            document.getElementById("touch-grass").style.display = "none";
            document.getElementById("start-exam").style.display = "none";
            document.getElementById("talk-to-girl").style.display = "none";
    
            // Set isTouchingGrass to false to ensure it doesn't start again
            isTouchingGrass = false;
        });
        break;
    
      
    case "EXAM":
      document.body.style.backgroundImage = "url('exam.png')";
      document.getElementById("touch-grass").style.display = "none";
      document.getElementById("start-exam").style.display = "none";
      document.getElementById("talk-to-girl").style.display = "none";
      document.getElementById("good-line").style.display = "none";
      document.getElementById("bad-line").style.display = "none";


      let correctAnswers = 0;  // Tracks the player's score
      const examQuestions = [
        { question: "What does 'CSS' stand for?", correctAnswer: "Cascading Style Sheets" },
        { question: "What is the output of 'console.log(5 + 3)' in JavaScript?", correctAnswer: "8" },
        { question: "What is 10 - 6?", correctAnswer: "4" },
        { question: "What is 3 * 3?", correctAnswer: "9" }
      ];

      let currentQuestionIndex = 0;  // Tracks the current question

      // Function to display the question and handle answer submission
      function displayQuestion() {
        const currentQ = examQuestions[currentQuestionIndex];
        gameScreenElement.innerHTML = `
          <h2>Question ${currentQuestionIndex + 1}</h2>
          <p>${currentQ.question}</p>
          <input type="text" id="user-answer" placeholder="Enter your answer here" />
          <button id="submit-answer">Submit</button>
        `;

        // Add event listener for the submit button
        document.getElementById("submit-answer").addEventListener("click", () => {
          const userAnswer = document.getElementById("user-answer").value.trim();

          // Check if the user's answer is correct
          if (userAnswer.toLowerCase() === currentQ.correctAnswer.toLowerCase()) {
            correctAnswers++;
          }

          // Move to the next question or end the exam
          currentQuestionIndex++;

          if (currentQuestionIndex < examQuestions.length) {
            displayQuestion(); // Display the next question
          } else {
            // Hide the stats bar and exam questions when the exam is finished
            statBarElement.style.display = "none";
            gameScreenElement.innerHTML = "";  // Clear the exam question display area

            // Determine the outcome of the exam after all questions
            if (correctAnswers >= 3) { // Passed with >= 75% correct answers
              currentScreen = "GAME_WIN";
              document.body.style.backgroundImage = "url('exampass.png')";
            } else { // Failed with < 75% correct answers
              currentScreen = "GAME_OVER";
              document.body.style.backgroundImage = "url('examfail.png')";
            }
            updateScreen(); // Update the screen after the exam is completed
          }
        });
      }

      displayQuestion(); // Start the exam by displaying the first question
      break;

    case "GAME_OVER":
        // Hide the stats bar and clear any game elements that are no longer needed
        statBarElement.style.display = "none";
        document.getElementById("good-line").style.display = "none";
        document.getElementById("bad-line").style.display = "none";

        document.body.style.backgroundImage = "url('examfail.png')";
        updateScreen();
        break;

    case "GAME_WIN":
        // Hide the stats bar and clear any game elements that are no longer needed
        statBarElement.style.display = "none";
        document.getElementById("good-line").style.display = "none";
        document.getElementById("bad-line").style.display = "none";

        document.body.style.backgroundImage = "url('exampass.png')";
        updateScreen();
        break;


    case "OUTSIDE":
      document.body.style.backgroundImage = "url('bggrass.png')";
  
      // Create the "Welcome to the outside world!" message
      const welcomeMessage = document.createElement("div");
      welcomeMessage.textContent = "Welcome to the outside world!";
      welcomeMessage.style.position = "absolute";
      welcomeMessage.style.top = "50%";
      welcomeMessage.style.left = "50%";
      welcomeMessage.style.transform = "translate(-50%, -50%)";
      welcomeMessage.style.fontSize = "30px";
      welcomeMessage.style.fontWeight = "bold";
      welcomeMessage.style.color = "white";
      welcomeMessage.style.padding = "20px";
      welcomeMessage.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // Semi-transparent background
      welcomeMessage.style.borderRadius = "10px";
      
      // Append the message to the game screen
      gameScreenElement.appendChild(welcomeMessage);
      
      // Wait for 3 seconds before hiding the message and showing buttons
      setTimeout(() => {
        welcomeMessage.style.display = "none";  // Hide the "Welcome to the outside world!" message
        
        // Show the buttons for "Touch Grass", "Final Exam", and "Talk to a Girl"
        document.getElementById("touch-grass").style.display = "block";
        document.getElementById("start-exam").style.display = "block";
        document.getElementById("talk-to-girl").style.display = "none";
      }, 3000);  // 3 seconds delay
      break;

    case "GIRL_YES":
      document.body.style.backgroundImage = "url('rizzwin.png')";
      document.getElementById("talk-to-girl").style.display = "none";
      document.getElementById("start-exam").style.display = "none";
      document.getElementById("touch-grass").style.display = "none";
      document.getElementById("good-line").style.display = "none";
      document.getElementById("bad-line").style.display = "none";
      statBarElement.style.display = "none";
      break;
    
  }
} 

// Show stats bar after an action is completed
function showStatsBar() {
  statBarElement.style.display = "block";  // Show stats bar
  updateStatBars();  // Update stats based on current values
}

// Hide controls initially
function hideControls() {
  controlsElement.style.display = "none";
}

const startExamButton = document.getElementById("start-exam");
  if (currentScreen === "TOUCH_GRASS" || degree > 100) {
    startExamButton.style.display = "block"; // Show the button
  } else {
    startExamButton.style.display = "none"; // Hide the button
  }

// Event listeners for buttons
document.getElementById("study").addEventListener("click", () => {
  degree += 2;  // Gain degree points
  currentScreen = "STUDY";
  updateScreen();
  showStatsBar();  // Show stats bar after completing the action
  
  // Hide the buttons
  document.getElementById("study").style.display = "none";
  document.getElementById("shower").style.display = "none";
  
  // Create and display the "Studying..." text
  const studyingText = document.createElement("div");
  studyingText.textContent = "Studying...";
  studyingText.id = "studying-text";
  
  // Style the text (positioning, background, etc.)
  studyingText.style.position = "absolute";
  studyingText.style.top = "50%";
  studyingText.style.left = "50%";
  studyingText.style.transform = "translate(-50%, -50%)";
  studyingText.style.fontSize = "30px";
  studyingText.style.fontWeight = "bold";
  studyingText.style.color = "white";
  studyingText.style.padding = "20px";
  studyingText.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // Semi-transparent background
  studyingText.style.borderRadius = "10px";
  
  // Append the text to the game screen
  gameScreenElement.appendChild(studyingText);
  
  // After 5 seconds, hide "Studying..." text and show the new message
  setTimeout(() => {
    studyingText.style.display = "none";  // Hide the "Studying..." text
    
    // Show the message "You've finished studying, now you can either shower or study some more"
    const finishedStudyingText = document.createElement("div");
    finishedStudyingText.textContent = "You've finished studying, now you can either shower or study some more.";
    finishedStudyingText.style.position = "absolute";
    finishedStudyingText.style.top = "50%";
    finishedStudyingText.style.left = "50%";
    finishedStudyingText.style.transform = "translate(-50%, -50%)";
    finishedStudyingText.style.fontSize = "30px";
    finishedStudyingText.style.fontWeight = "bold";
    finishedStudyingText.style.color = "white";
    finishedStudyingText.style.padding = "20px";
    finishedStudyingText.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // Semi-transparent background
    finishedStudyingText.style.borderRadius = "10px";
    
    // Append the new text to the screen
    gameScreenElement.appendChild(finishedStudyingText);
    
    // After 5 seconds, hide the message and show the buttons again
    setTimeout(() => {
      finishedStudyingText.style.display = "none"; // Hide the message
      // Show the study and shower buttons again
      document.getElementById("study").style.display = "block";
      document.getElementById("shower").style.display = "block";

    }, 2000); // Stay for 5 seconds before showing the buttons again
  }, 2000); // Stay for 5 seconds on the "Studying..." text
});

document.getElementById("shower").addEventListener("click", () => {
  aura += 2;  // Gain aura points
  showStatsBar();  // Show stats bar after completing the action
  gameScreenElement.style.backgroundImage = "url('shower.png')"; // Set the exam background
  currentScreen = "SHOWER";
  updateScreen();
});

document.getElementById("go-outside").addEventListener("click", () => {
  currentScreen = "OUTSIDE";
  updateScreen();
  showStatsBar();  // Show stats bar after completing the action
  document.getElementById("go-outside").style.display = "none";  
});

document.getElementById("touch-grass").addEventListener("click", () => {
  aura += 2;  // Gain aura points
  degree -= 2;
  currentScreen = "TOUCH_GRASS";
  updateScreen();
  showStatsBar();  // Show stats bar after completing the action
});

document.getElementById("good-line").addEventListener("click", () => {
  statBarElement.style.display = "none";
  
  currentScreen = "GIRL_YES";
  updateScreen();
  showStatsBar();
})

document.getElementById("bad-line").addEventListener("click", () => {
  currentScreen = "DORM";
  updateScreen();
  showStatsBar();

})

document.getElementById("start-exam").addEventListener("click", () => {
  currentScreen = "EXAM";
  updateScreen();
  showStatsBar();  // Show stats bar after completing the action
});

document.getElementById("stop-touch").addEventListener("click", () => {
  currentScreen = "TALK_TO_GIRL";
  updateScreen();
  showStatsBar();  // Show stats bar after completing the action
});

// Initialize game on page load
initGame();