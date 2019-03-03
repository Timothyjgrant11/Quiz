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
    answerCorrectness = 'Congrats! That is correct.';
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
      <h1>You scored ${score} / ${STORE.length}! ${finalAssessment(score)}</h1>
    <a href="https://fully-implemented-houseplant-quiz-app-2--ahna.repl.co/">Take the quiz again</a>
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