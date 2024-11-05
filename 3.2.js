const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция для получения массива четных чисел
function getEvenNumbers(n) {
    let evenNumbers = []; // Инициализируем пустой массив для четных чисел

    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) { // Проверяем, является ли число четным
            evenNumbers.push(i); // Добавляем четное число в массив
        }
    }

    return evenNumbers; // Возвращаем массив четных чисел
}

// Запрашиваем у пользователя значение n
rl.question('Введите значение n: ', (input) => {
    let n = parseInt(input); // Преобразуем введенное значение в число

    // Проверяем, что n является положительным числом
    if (n > 0) {
        console.log(`Четные числа от 1 до ${n}:`, getEvenNumbers(n));
    } else {
        console.log('Пожалуйста, введите положительное число.');
    }

    rl.close(); // Закрываем интерфейс
});

