const STORE = [ {
    question: 'Who is the author of the Great Gatspy?',
    answers: [
        'A - John Lennon',
        'B - Jay Gatsby',
        'C - F. Scott Fitzgerald',
        'D - Zelda Fitzgerald',
    ],
    correctAnswer: 2,

},
{
    question: 'Which of the following is NOT a book by James Baldwin',
    answers: [
    'A - If Beale Street Could Talk',
    'B - Notes of a Native Son',
    'C The Fire Next to Me',
    'D - The Color Purple',
    ],
    correctAnswer: 3,
},
{
    question: 'What is the Address of the character Sherlock Holmes',
    answers: [
    'A - 42 Wallaby Way',
    'B - 30 Rockefeller Plaza',
    'C - 32 Windsor Gardens',
    'D - 221B Baker Street',
    ],
    correctAnswer: 3,
},
{
    question: 'Who is the narrator of the novel On The Road',
    answers: [
    'A - Neal Cassady',
    'B - Sal Paradise',
    'C - Dean Moriarty',
    'D - Carlo Marx',
    ],
    correctAnswer: 1,
},
{
    question: 'What year did George Orwell publish his book 1984',
    answers: [
    'A - 1949',
    'B - 1982',
    'C - 1984',
    'D - 2002',
    ],
    correctAnswer: 0,
},
{
    question: 'What day of the year does the book Ulysses take place?',
    answers: [
    'A - June 11th',
    'B - March 1st',
    'C - June 16th',
    'D - November 5th',
    ],
    correctAnswer: 2,
},
{
    question: 'Who wrote the novel Slaughterhouse Five?',
    answers: [
    'A - J.R.R. Tolkien',
    'B - Aldous Huxley',
    'C - George Orwell',
    'D - Kurt Vonnegut',
    ],
    correctAnswer: 3,
},
{
    question: 'Which novel opens and closes with the letters of Robert Walton?',
    answers: [
    'A - World of Walton',
    'B - Dracula',
    'C - Alice in Wonderland',
    'D - Frankenstein',
    ],
    correctAnswer: 3,
},
{
    question: 'Where does the novel the Outsiders take place?',
    answers: [
    'A - Dallas',
    'B - Wichita',
    'C - Tulsa',
    'D - Kansas City',
    ],
    correctAnswer: 2,
},
{
    question: "What was Mark Twain's real name?",
    answers: [
    'A - Tom Sawyer',
    'B - Henry Rodgers',
    'C - Samuel Clemens',
    'D - Mark Twain',
    ],
    correctAnswer: 2,
}
];

let questionNumber = 0;
let score = 0;

function renderStartPage() { 
  handleStartButton();


}

function renderRadioHtml(text,i) {
  return `
  <p>
    <input type="radio" name="death" id="death${i}" value="${i}" required>
    <label for="death${i}">${text}</label>
  </p>
  `;
}

function renderQuestionPage() {
  var question = STORE[questionNumber];
  var htmlString = "";
  htmlString += `
    <form class="js-form">
      <legend class="question">
        <h3>(${questionNumber + 1} // 10) ${question.question}
        </h3>
      </legend>
      <fieldset>
  `;
  for ( let i = 0; i < 4 ; i++ ) {
    htmlString += renderRadioHtml(question.answers[i],i);
  }
  htmlString += `
    <input type="submit" class="submitButton">
    </fieldset>
     </form>`
  $('main').html(htmlString);
  handleSubmitButton();
}

function handleStartButton() {
  $('.startButton').on('click', function(event) {
    $('#main').html('');
      renderQuestionPage();
  });

}

function handleSubmitButton() {
   $('.js-form').submit(function(event) {
     event.preventDefault();
     let guess = $('.selected').val();
     $('#main').html('');

  checkUserAnswer(guess);

  });
}

function checkUserAnswer(userAnswer) {
  handleFeedbackPage( (parseInt(userAnswer)===STORE[questionNumber].correctAnswer) );

}

function handleFeedbackPage(result) { 
  console.log('result - ',result);
  questionNumber++;
  if (questionNumber === STORE.length) {
    handleFinalPage();
  } else {
  var answerCorrectness;
  if (result) {
    score++;
    answerCorrectness = 'Correct!';
  } else {
    answerCorrectness = 'Oops! Unfortunately incorrect.';
  }
  
  var htmlString = "";
    htmlString += `<section class="feedback-page" role="main">
              <h3>${answerCorrectness}</h3>
                <button id="next-button">Next</button>
            </section>`;
  $('main').html(htmlString);
  handleNextButton();

}
}

function handleRestart() {
  renderStartPage();
}

function handleFinalPage() {
  var htmlString = '';
  htmlString += `<main role="main">
    <section class="results-page" role="main">
      <h1>You scored ${score + 1} / ${STORE.length}! ${finalAssessment(score)}</h1>
       <a href="file:///Users/timothy/Projects/Quiz/index.html">Take the quiz again</a>
    </section>
  </main>`;
  $('main').html(htmlString);

}

function finalAssessment(score) {
if (score<7) {
  return 'Hmm, not bad but maybe you would like to try again?';
} else {
  return 'Well Done! You are quite the Lit Lover!';
}
}
function handleNextButton() {
  $('#next-button').on('click', function(event) {
     $('#main').html('');
     renderQuestionPage();
  });
}

function handleSelectAnswer(){
  $('main').on('click','input[type="radio"]',function(event){
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
  });
}

function handleQuiz() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleSelectAnswer();
 
}

$(handleQuiz);