export default interface MobileComponent {
  validateComponentContent: () => void | Promise<void>;
}
