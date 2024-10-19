import './style.css';
import { Application } from './scripts/core/application';

function main() {
    try {
      new Application();
    }

    catch (err) {
      main();
    }
}

main();
