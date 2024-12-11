const scheduleTable = document.getElementById('schedule-table').querySelector('tbody');
const addItemButton = document.getElementById('add-item');

// Функция для добавления предмета
addItemButton.addEventListener('click', () => {
  const day = document.getElementById('day').value;
  const subject = document.getElementById('subject').value;
  const time = document.getElementById('time').value;

  if (!subject || !time) {
    alert('Пожалуйста, заполните все поля!');
    return;
  }

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${day}</td>
    <td>${subject}</td>
    <td>${time}</td>
    <td>
      <button class="delete">Удалить</button>
    </td>
  `;
  scheduleTable.appendChild(row);

  // Добавляем событие для кнопки "Удалить"
  row.querySelector('.delete').addEventListener('click', () => {
    row.remove();
  });

  // Очищаем поля формы
  document.getElementById('subject').value = '';
  document.getElementById('time').value = '';
});

// Добавляем событие для кнопок "Удалить" в начальном расписании
scheduleTable.querySelectorAll('.delete').forEach(button => {
  button.addEventListener('click', function () {
    this.closest('tr').remove();
  });
});
