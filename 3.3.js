const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция для проверки, является ли число квадратом целого числа
function isPerfectSquare(num) {
    if (num < 0) return false; // Отрицательные числа не могут быть квадратами

    const sqrt = Math.sqrt(num); // Находим квадратный корень числа
    return Number.isInteger(sqrt); // Проверяем, является ли квадратный корень целым числом
}

// Запрашиваем у пользователя число
rl.question('Введите число: ', (input) => {
    let num = parseInt(input); // Преобразуем введенное значение в число

    // Проверяем, является ли число квадратом целого числа
    if (isPerfectSquare(num)) {
        console.log(`${num} является квадратом целого числа.`);
    } else {
        console.log(`${num} не является квадратом целого числа.`);
    }

    rl.close(); // Закрываем интерфейс
});


