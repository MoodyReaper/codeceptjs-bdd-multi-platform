export default interface MobileScreen {
  checkIfOnScreen: () => void | Promise<void>;
  validateScreenContent: () => void | Promise<void>;
}
