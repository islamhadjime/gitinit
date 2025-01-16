import { process } from './process.mjs';

// Тестовые данные
const store = [
  { size: 2, quantity: 4 },
];

const order = [
  { id: 101, size: [2] },
  { id: 102, size: [1, 2], masterSize: 's2' },
];

// Запуск функции
const result = process(store, order);

// Вывод результата
console.log(result);
