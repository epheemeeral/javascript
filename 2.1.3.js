const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let words = ["apple", "banana", "apricot", "grape", "avocado", "berry"];

rl.question('Введите букву для поиска: ', (input) => {
    let letter = input.toLowerCase();  // Преобразуем введенную букву в нижний регистр

    // Фильтруем строки, которые начинаются с введённой буквы
    let count = words.filter(word => word.toLowerCase().startsWith(letter)).length;

    console.log(`Количество строк, начинающихся с буквы "${letter}":`, count);

    rl.close();  // Закрываем интерфейс
});
