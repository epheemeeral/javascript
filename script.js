// Пример начальной сетки Судоку (0 означает пустую ячейку)
const initialGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];
  
  const sudokuBoard = document.getElementById('sudoku-board');
  
  // Создание сетки Судоку
  function createBoard(grid) {
    sudokuBoard.innerHTML = '';
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement('input');
        cell.type = 'text';
        cell.maxLength = 1;
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.value = grid[row][col] === 0 ? '' : grid[row][col];
        cell.disabled = grid[row][col] !== 0; // Блокируем изначальные ячейки
        cell.addEventListener('input', validateInput);
        sudokuBoard.appendChild(cell);
      }
    }
  }
  
  // Проверка ввода: только цифры 1-9
  function validateInput(e) {
    const value = e.target.value;
    if (!/^[1-9]$/.test(value)) {
      e.target.value = ''; // Удаляем некорректный ввод
    }
  }
  
  // Проверка решения
  function checkSolution() {
    const cells = document.querySelectorAll('.cell');
    let isValid = true;
  
    // Сбрасываем состояние ячеек
    cells.forEach(cell => cell.classList.remove('invalid'));
  
    const currentGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
  
    cells.forEach(cell => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      currentGrid[row][col] = parseInt(cell.value) || 0;
    });
  
    // Проверяем каждую строку, колонку и блок 3x3
    for (let i = 0; i < 9; i++) {
      if (!isValidGroup(currentGrid[i]) || !isValidGroup(getColumn(currentGrid, i)) || !isValidGroup(getBlock(currentGrid, i))) {
        isValid = false;
      }
    }
  
    if (isValid) {
      alert('Congratulations! The solution is correct!');
    } else {
      alert('The solution is incorrect. Check your input.');
    }
  }
  
  // Получить колонку
  function getColumn(grid, col) {
    return grid.map(row => row[col]);
  }
  
  // Получить блок 3x3
  function getBlock(grid, blockIndex) {
    const rowStart = Math.floor(blockIndex / 3) * 3;
    const colStart = (blockIndex % 3) * 3;
    const block = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        block.push(grid[rowStart + r][colStart + c]);
      }
    }
    return block;
  }
  
  // Проверить, все ли элементы уникальны (1-9)
  function isValidGroup(group) {
    const nums = group.filter(num => num !== 0);
    return new Set(nums).size === nums.length;
  }
  
  // Сбросить игру
  function resetGame() {
    createBoard(initialGrid);
  }
  
  // События кнопок
  document.getElementById('check-solution').addEventListener('click', checkSolution);
  document.getElementById('reset').addEventListener('click', resetGame);
  
  // Инициализация игры
  createBoard(initialGrid);
  