import { observable, action, decorate } from 'mobx';

export class AppStore {
  count: number = 0;
  message: string = 'Welcome to KORU App!';

  increment = () => {
    this.count++;
  }

  decrement = () => {
    this.count--;
  }

  setMessage = (newMessage: string) => {
    this.message = newMessage;
  }

  reset = () => {
    this.count = 0;
    this.message = 'Welcome to KORU App!';
  }
}

decorate(AppStore, {
  count: observable,
  message: observable,
  increment: action,
  decrement: action,
  setMessage: action,
  reset: action,
});

export const appStore = new AppStore();
