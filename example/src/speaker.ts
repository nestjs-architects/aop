import { Logging } from './logging.aspect';

export class Speaker {
  @Logging()
  speak() {
    console.log('I am not a singleton');
  }
}
