import type WebComponent from '../interfaces/webComponent';

const { I } = inject();

class ExampleComponent implements WebComponent {
  root = {
    locator: 'example',
  };

  elements = {
    example: {
      locator: 'example',
      text: 'example',
    },
  };

  async validateComponentContent(): Promise<void> {
    await within(this.root.locator, () => {
      I.waitForVisible(this.elements.example.locator);
      I.see(this.elements.example.text);
    });
  }
}

export = new ExampleComponent();
