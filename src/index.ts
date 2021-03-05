/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
import './style.css';

import { Courier } from './courier';

function socketStatus(state: boolean) {
  const element = document.querySelector<HTMLDivElement>('.status');

  // eslint-disable-next-line no-unused-expressions
  state ? element.style.background = 'green' : element.style.background = 'red';
}

function message(payload) {
  const element = document.querySelector<HTMLDivElement>('.console');
  const paragraph = document.createElement('p');
  console.dir(payload);

  paragraph.textContent = JSON.stringify(Object(payload.data));

  element.appendChild(paragraph);
}

function socketHandler(socket: WebSocket) {
  socket.onopen = () => {
    socketStatus(true);
  };

  socket.onclose = () => {
    socketStatus(false);
  };

  socket.onmessage = (payload) => {
    message(payload);
  };

  socket.onerror = (error) => {
    console.log(error);
  };
}

window.addEventListener('load', async () => {
  const courier = new Courier({
    api: 'http://localhost:8883/v1',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiAiYmFzZXdyaXRlLmNvbSIsICJlbWFpbCI6ICJhZG1pbkBiYXNld3JpdGUuY29tIn0.jSmTQyBFJSpAKoNCvjmEXDhE54M11ST3cXBIc2ToG-c'
  });

  const signature = await courier.sign();
  let socket: WebSocket;

  // courier.subscribe('system/events');

  const buttonCreateTopic = document.getElementById('create-topic') as HTMLButtonElement;
  const buttonConnect = document.getElementById('connect') as HTMLButtonElement;
  const buttonCreateSubscription = document.getElementById('create-subscription') as HTMLButtonElement;
  const buttonCreateMessage = document.getElementById('create-message') as HTMLButtonElement;

  buttonConnect.addEventListener('click', async () => {
    if (socket) {
      courier.disconnect();
      socket = null;
      buttonConnect.textContent = 'Connect';
    } else {
      socket = courier.connect(signature);
      buttonConnect.textContent = 'Disconnect';
      socketHandler(socket);
    }
  });

  buttonCreateTopic.addEventListener('click', async () => {
    const topic = document.querySelector<HTMLInputElement>('#topic');

    const response = await courier.createTopic(topic.value);
    console.dir({ action: 'Topic created', response });
  });

  buttonCreateSubscription.addEventListener('click', async () => {
    const subscription = document.querySelector<HTMLInputElement>('#subscribe');

    courier.subscribe(subscription.value);
    console.dir({ action: 'Topic subscribed', response: subscription.value });
  });

  buttonCreateMessage.addEventListener('click', async () => {
    const msg = document.querySelector<HTMLInputElement>('#message');
    const payload = JSON.parse(msg.value);

    courier.publish(payload.topic, payload.message);
    console.dir({ action: 'Published message', response: payload });
  });

  console.dir(courier);
});
