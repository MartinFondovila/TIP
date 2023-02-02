class BaseScene extends Phaser.Scene {
  constructor(sceneName) {
    if (new.target === BaseScene) {
      throw new TypeError(
        "No se puede instanciar esta clase porque es abstracta."
      );
    }

    super(sceneName);
    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;
    this.inputPointerEvents = Phaser.Input.Events;
    this.animationEvents = Phaser.Animations.Events;
    this.inputKeyboard = Phaser.Input.Keyboard;
    this.inputKeyboardEvents = Phaser.Input.Keyboard.Events;
  }

  create() {
    this.gameWidth = this.scale.width;
    this.gameHeight = this.scale.height;
  }
}

export default BaseScene;
