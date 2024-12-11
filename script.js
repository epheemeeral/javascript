const pollOptionsContainer = document.getElementById('poll-options');
const resultsContainer = document.getElementById('results');
const addOptionButton = document.getElementById('add-option');
const newOptionInput = document.getElementById('new-option');
const pollQuestionInput = document.getElementById('poll-question');
const displayQuestion = document.getElementById('display-question');

let pollOptions = [];

// Обновление вопроса
pollQuestionInput.addEventListener('input', () => {
  const questionText = pollQuestionInput.value.trim();
  displayQuestion.textContent = questionText ? `Вопрос: ${questionText}` : 'Вопрос: [введите ваш вопрос выше]';
});

// Добавление нового варианта
addOptionButton.addEventListener('click', () => {
  const optionText = newOptionInput.value.trim();

  if (optionText === '') {
    alert('Введите текст для варианта ответа!');
    return;
  }

  // Добавляем новый вариант в массив
  pollOptions.push({ text: optionText, votes: 0 });

  // Очищаем поле ввода
  newOptionInput.value = '';

  // Обновляем интерфейс
  updatePollOptions();
  updateResults();
});

// Обновление вариантов опроса
function updatePollOptions() {
  pollOptionsContainer.innerHTML = '';

  pollOptions.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('poll-option');
    optionElement.innerHTML = `
      <span>${option.text}</span>
      <button data-index="${index}">Голосовать</button>
    `;

    // Добавляем обработчик для кнопки "Голосовать"
    optionElement.querySelector('button').addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      pollOptions[index].votes++;
      updateResults();
    });

    pollOptionsContainer.appendChild(optionElement);
  });
}

// Обновление результатов
function updateResults() {
  resultsContainer.innerHTML = '';
  const totalVotes = pollOptions.reduce((sum, option) => sum + option.votes, 0);

  pollOptions.forEach(option => {
    const resultBar = document.createElement('div');
    const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

    resultBar.classList.add('results-bar');
    resultBar.style.width = `${percentage}%`;
    resultBar.textContent = `${option.text}: ${percentage}% (${option.votes} голосов)`;

    resultsContainer.appendChild(resultBar);
  });
}

// Инициализация
updatePollOptions();
updateResults();
