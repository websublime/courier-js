import { Courier } from './courier';

window.addEventListener('load', () => {
  const courier = new Courier({
    api: 'http://localhost:8883/v1',
    token: ''
  });



  courier.sign().then((signature) => {
    const socket = courier.connect(signature);

    socket.onmessage = (payload) => {
      console.dir(payload);
    };

    courier.subscribe('system/events');
  });
});
