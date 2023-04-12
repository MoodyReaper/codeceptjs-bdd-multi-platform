import type MobileScreen from '../interfaces/mobileScreen';

const { I } = inject();

class ExampleScreen implements MobileScreen {
  elements = {
    example: {
      locator: 'example',
      text: 'example',
    },
  };

  checkIfOnScreen(): void {
    I.waitForVisible(this.elements.example.locator);
    I.see(this.elements.example.text);
  }

  validateScreenContent(): void {
    I.waitForVisible(this.elements.example.locator);
    I.see(this.elements.example.text);
  }
}

export = new ExampleScreen();
