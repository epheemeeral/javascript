const canvas = document.getElementById('canvas');
const characterUpload = document.getElementById('character-upload');
const addTextBubbleButton = document.getElementById('add-text-bubble');
const clearCanvasButton = document.getElementById('clear-canvas');

// Добавление персонажа
characterUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('div');
      img.style.backgroundImage = `url(${e.target.result})`;
      img.style.backgroundSize = 'cover';
      img.style.backgroundPosition = 'center';
      img.classList.add('draggable');
      img.style.width = '150px';
      img.style.height = '150px';
      img.style.left = '10px';
      img.style.top = '10px';
      img.style.borderRadius = '10px';
      img.style.position = 'absolute';
      const resizeHandle = document.createElement('div');
      resizeHandle.classList.add('resize-handle');
      img.appendChild(resizeHandle);
      canvas.appendChild(img);
      makeDraggable(img);
      makeResizable(img, resizeHandle);
    };
    reader.readAsDataURL(file);
  }
});

// Добавление текстового пузыря
addTextBubbleButton.addEventListener('click', () => {
  const bubble = document.createElement('div');
  bubble.contentEditable = true;
  bubble.textContent = 'Введите текст';
  bubble.classList.add('text-bubble', 'draggable');
  bubble.style.left = '50px';
  bubble.style.top = '50px';
  const resizeHandle = document.createElement('div');
  resizeHandle.classList.add('resize-handle');
  bubble.appendChild(resizeHandle);
  canvas.appendChild(bubble);
  makeDraggable(bubble);
  makeResizable(bubble, resizeHandle);
});

// Очистка холста
clearCanvasButton.addEventListener('click', () => {
  canvas.innerHTML = '';
});

// Функция для добавления возможности перетаскивания элементов
function makeDraggable(element) {
  let offsetX, offsetY;

  element.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('resize-handle')) return;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    function onMouseMove(e) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

// Функция для изменения размера элементов
function makeResizable(element, handle) {
  handle.addEventListener('mousedown', (e) => {
    e.stopPropagation();

    function onMouseMove(e) {
      const rect = element.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      const newHeight = e.clientY - rect.top;

      if (newWidth > 50) element.style.width = `${newWidth}px`;
      if (newHeight > 50 && (element.tagName === 'DIV' || element.classList.contains('text-bubble'))) {
        element.style.height = `${newHeight}px`;
      }
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}
