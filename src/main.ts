import './style.css';
import { Application } from './core/application';

function main() {
    try {
      new Application();
    }

    catch (err) {
      main();
    }
}

main();
