const PAGE_LIST = {
  EXAMPLE_PAGE: 'ExamplePage',
} as const;

type ObjectValues<T> = T[keyof T];

type PageList = ObjectValues<typeof PAGE_LIST>;

export { PAGE_LIST, type PageList };
