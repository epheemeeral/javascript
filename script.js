const canvas = document.getElementById('evolutionCanvas');
const ctx = canvas.getContext('2d');

// Устанавливаем размеры canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Класс для организмов
class Organism {
  constructor(x, y, speed, size, lifespan) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
    this.lifespan = lifespan; // Продолжительность жизни (в кадрах)
    this.age = 0; // Текущий возраст
    this.energy = 100; // Энергия для движения
    this.target = null; // Текущая цель (еда)
    this.color = `hsl(${Math.random() * 360}, 70%, 50%)`; // Случайный цвет
  }

  // Движение организма
  move() {
    if (this.target) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1) {
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
      } else {
        // Съедает пищу
        this.energy += 50;
        foods.splice(foods.indexOf(this.target), 1); // Удаляем пищу
        this.target = null;
      }
    }

    this.age++;
    this.energy -= 0.1; // Постепенно теряет энергию
  }

  // Находит ближайшую пищу
  findFood() {
    if (foods.length > 0) {
      let closestFood = null;
      let closestDistance = Infinity;

      for (const food of foods) {
        const dx = food.x - this.x;
        const dy = food.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < closestDistance) {
          closestDistance = dist;
          closestFood = food;
        }
      }

      this.target = closestFood;
    }
  }

  // Проверка, жив ли организм
  isAlive() {
    return this.age < this.lifespan && this.energy > 0;
  }

  // Отрисовка организма
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // Эволюция при смерти (порождает нового организма)
  evolve() {
    const mutationFactor = 0.2; // Насколько сильно изменяются параметры
    return new Organism(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.max(0.5, this.speed + (Math.random() - 0.5) * mutationFactor),
      Math.max(2, this.size + (Math.random() - 0.5) * mutationFactor),
      Math.max(100, this.lifespan + Math.floor((Math.random() - 0.5) * mutationFactor * 100))
    );
  }
}

// Класс для еды
class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
  }
}

// Массивы для организмов и еды
const organisms = [];
const foods = [];

// Инициализация организмов
for (let i = 0; i < 10; i++) {
  organisms.push(
    new Organism(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 2 + 1, // Скорость
      Math.random() * 3 + 5, // Размер
      Math.random() * 500 + 500 // Продолжительность жизни
    )
  );
}

// Функция для создания пищи
function spawnFood() {
  for (let i = 0; i < 5; i++) {
    foods.push(new Food(Math.random() * canvas.width, Math.random() * canvas.height));
  }
}

// Основной цикл симуляции
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Отрисовка еды
  foods.forEach(food => food.draw());

  // Обработка организмов
  for (let i = organisms.length - 1; i >= 0; i--) {
    const org = organisms[i];

    if (org.isAlive()) {
      if (!org.target) {
        org.findFood();
      }
      org.move();
      org.draw();
    } else {
      // Умирает и порождает новый организм
      organisms.splice(i, 1);
      organisms.push(org.evolve());
    }
  }

  // Добавляем новую пищу
  if (foods.length < 20) {
    spawnFood();
  }

  requestAnimationFrame(animate);
}

// Запуск симуляции
spawnFood();
animate();
