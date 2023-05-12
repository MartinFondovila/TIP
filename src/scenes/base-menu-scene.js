import BaseScene from "./base-scene.js";

class BaseMenuScene extends BaseScene {
  constructor(sceneName) {
    if (new.target === BaseMenuScene) {
      throw new TypeError(
        "No se puede instanciar esta clase porque es abstracta."
      );
    }
    super(sceneName);
    this.options = [];
    this.selectedOption;
    this.nextOptionStrategy;
  }

  createControls() {
    this.controls = this.input.keyboard.addKeys({
      moveLeft: this.keyCodes.LEFT,
      moveUp: this.keyCodes.UP,
      moveRight: this.keyCodes.RIGHT,
      moveDown: this.keyCodes.DOWN,
      back: this.keyCodes.ESC,
      select: this.keyCodes.ENTER,
      comodin: this.keyCodes.NUMPAD_ONE,
    });
  }

  setSelectedOption(option, argsIn, argsOut) {
    if (this.selectedOption) {
      this.selectedOption.selectedOut(argsOut);
    }
    this.selectedOption = option;
    this.selectedOption.selectedIn(argsIn);
  }

  setDefaultOption(argsIn, argsOut) {
    this.setSelectedOption(this.getDefaultOption(), argsIn, argsOut);
  }

  getDefaultOption() {
    return this.nextOptionStrategy.getDefaultOption(this.options);
  }

  handleSelectOnOption() {
    this.selectedOption.handleSelect();
  }

  disableControls() {
    Object.values(this.controls).forEach(
      (control) => (control.enabled = false)
    );
  }

  enableControls() {
    Object.values(this.controls).forEach((control) => {
      control.reset().enabled = true;
    });
  }
}

export default BaseMenuScene;
