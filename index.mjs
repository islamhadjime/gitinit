import { process } from './process.mjs';

const store = [
  { size: 2, quantity: 4 },
];

const order = [
  { id: 101, size: [2] },
  { id: 102, size: [1, 2], masterSize: 's2' },
];


const result = process(store, order);

console.log(result);
