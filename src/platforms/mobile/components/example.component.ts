import type MobileComponent from '../interfaces/mobileComponent';

const { I } = inject();

class ExampleComponent implements MobileComponent {
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
