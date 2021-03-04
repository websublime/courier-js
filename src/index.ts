import { Courier } from './courier';

const courier = new Courier({
  api: 'http://localhost:8883/v1',
  token: ''
});

console.dir(courier);
