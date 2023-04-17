import ExampleComponent from '../components/example.component';

import type WebPage from '../interfaces/webPage';

const { I } = inject();

class ExamplePage implements WebPage {
  path = '';

  title = 'Example Page';

  elements = {
    example: {
      locator: 'example',
      text: 'example',
    },
    exampleComponent: new ExampleComponent('Example'),
  };

  checkIfOnPage(): void {
    I.waitForVisible(this.elements.example.locator);
    I.see(this.elements.example.text);
  }

  async validatePageContent(): Promise<void> {
    I.waitForVisible(this.elements.example.locator);
    I.see(this.elements.example.text);
    await this.elements.exampleComponent.validateComponentContent();
  }
}

export = new ExamplePage();
