import type WebPage from '../interfaces/webPage';

const { I } = inject();

class ExamplePage implements WebPage {
  elements = {
    example: {
      locator: 'example',
      text: 'example',
    },
  };

  checkIfOnPage(): void {
    I.waitForVisible(this.elements.example.locator);
    I.see(this.elements.example.text);
  }

  validatePageContent(): void {
    I.waitForVisible(this.elements.example.locator);
    I.see(this.elements.example.text);
  }
}

export = new ExamplePage();
