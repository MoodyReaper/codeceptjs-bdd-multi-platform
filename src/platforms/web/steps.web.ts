// Custom step methods can be appended to 'I' object in this file

import { PAGE_LIST, type PageList } from './types/pageList';

const { ExamplePage } = inject();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const customActions = function () {
  return actor({
    // Define custom steps here, use 'this' to access default methods of 'I'
    // It is recommended to place a general 'login' function here
    amReallyOnPage(pageName: PageList): void {
      switch (pageName) {
        case PAGE_LIST.EXAMPLE_PAGE: {
          ExamplePage.checkIfOnPage();
        }
      }
    },
    async checkPageContent(pageName: PageList): Promise<void> {
      switch (pageName) {
        case PAGE_LIST.EXAMPLE_PAGE: {
          await ExamplePage.validatePageContent();
        }
      }
    },
  });
};

export = customActions;
