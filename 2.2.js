let numbers = [5, 15, 35, 25];
let max = numbers[0];

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
        max = numbers[i];
    }
}

console.log('Максимальный элемент массива:', max);

