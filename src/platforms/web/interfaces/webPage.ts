export default interface WebPage {
  checkIfOnPage: () => void | Promise<void>;
  validatePageContent: () => void | Promise<void>;
}
