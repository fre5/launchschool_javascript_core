function doubleNumbers(numbers) {
  let counter = 0;
  while (counter < numbers.length) {
    numbers[counter] *= 2;
    counter += 1;
  }
  return numbers;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(doubleNumbers(myNumbers)); // => [2, 8, 6, 14, 4, 12]
console.log(myNumbers);                // => [1, 4, 3, 7, 2, 6]


function multiply(numbers, multiplier) {
  let multiplied = [];
  for (let index = 0; index < numbers.length; index += 1) {
    multiplied.push(numbers[index] * multiplier)
  }
  return multiplied;
}

myNumbers = [1, 4, 3, 7, 2, 6];
console.log(multiply(myNumbers, 3)); // => [3, 12, 9, 21, 6, 18]