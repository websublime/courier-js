type Action = 'publish' | 'broadcast';

type Options = {
  api: string,
  token: string,
  wsUrl?: string
};

type Audience = {
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string
};

type Topic = {
  id: string,
  topic: string,
  audience: Audience,
  audienceId: string,
  createdAt: string,
  updatedAt: string
};

type Hook = {
  topic: string,
  action: Action,
  message: Record<string, unknown>;
};

type Signature = {
  key: string,
  url: string
}

export class Courier {
  #options: Options;

  #ws: WebSocket;

  subscriptions = new Map([
    ['subscription', []]
  ]);

  constructor(options: Options) {
    this.#options = options;
  }

  async createAudience(): Promise<Audience> {
    const { api, token } = this.#options;

    const response = await fetch(`${api}/audience`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'POST'
    });

    return response.json();
  }

  async createTopic(): Promise<Topic> {
    const { api, token } = this.#options;

    const response = await fetch(`${api}/topic`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'POST'
    });

    return response.json();
  }

  async topics(): Promise<Topic[]> {
    const { api, token } = this.#options;

    const response = await fetch(`${api}/topic`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'GET'
    });

    return response.json();
  }

  async hook(payload: Hook): Promise<Hook> {
    const { api, token } = this.#options;

    const response = await fetch(`${api}/hook`, {
      body: JSON.stringify(payload),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'POST'
    });

    return response.json();
  }

  async sign(): Promise<Signature> {
    const { api, token } = this.#options;

    const response = await fetch(`${api}/sign`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'GET'
    });

    return response.json();
  }

  connect(signature: Signature): WebSocket {
    this.#ws = new WebSocket(signature.url);

    return this.#ws;
  }

  subscribe(topic: string): void {
    const subscriptions = this.subscriptions.get('subscription');
    subscriptions.push(topic);

    this.subscriptions.set('subscription', subscriptions);

    this.#ws.send(JSON.stringify({
      action: 'subscribe',
      topic
    }));
  }

  unsubscribe(topic: string): void {
    this.#ws.send(JSON.stringify({
      action: 'unsubscribe',
      topic
    }));
  }

  publish() {}

  broadcast() {}

  disconnect() {}

}
