export default interface WebComponent {
  validateComponentContent: () => void | Promise<void>;
}
