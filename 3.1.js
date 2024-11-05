const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция проверки високосного года
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Запрашиваем у пользователя год
rl.question('Введите год: ', (input) => {
    let year = parseInt(input);  // Преобразуем введенное значение в число

    // Проверяем, является ли год високосным
    if (isLeapYear(year)) {
        console.log(`${year} год - високосный.`);
    } else {
        console.log(`${year} год - не високосный.`);
    }

    rl.close();  // Закрываем интерфейс
});

