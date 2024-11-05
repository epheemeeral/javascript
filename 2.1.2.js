const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numbers = [5, 12, 30, 8, 22, 15, 3];

rl.question('Введите значение N: ', (input) => {
    let N = parseInt(input);  // Преобразуем введенное значение в число
    let filteredNumbers = numbers.filter(num => num <= N);

    console.log('Массив после удаления чисел, больших N:', filteredNumbers);

    rl.close();  // Закрываем интерфейс
});
