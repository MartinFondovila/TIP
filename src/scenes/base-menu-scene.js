import BaseScene from "./base-scene.js";

class BaseMenuScene extends BaseScene {
  constructor(sceneName, pauseOnSwitch, pausePhysicsOnSwitch) {
    if (new.target === BaseMenuScene) {
      throw new TypeError(
        "No se puede instanciar esta clase porque es abstracta."
      );
    }
    super(sceneName, pauseOnSwitch, pausePhysicsOnSwitch);
    this.options = [];
  }

  createControls() {
    this.controls = this.input.keyboard.addKeys({
      moveLeft: this.keyCodes.LEFT,
      moveUp: this.keyCodes.UP,
      moveRight: this.keyCodes.RIGHT,
      moveDown: this.keyCodes.DOWN,
      back: this.keyCodes.ESC,
      select: this.keyCodes.ENTER,
    });
  }

  createBackOption() {
    this.back = this.add
      .text(this.conf.gameWidth - 10, this.conf.gameHeight - 10, "BACK", {
        fontSize: 40,
      })
      .setOrigin(1, 1)
      .setTint(0xffff00);
  }

  disableControls() {
    Object.values(this.controls).forEach(
      (control) => (control.enabled = false)
    );
  }

  enableControls() {
    Object.values(this.controls).forEach((control) => (control.enabled = true));
  }
}

export default BaseMenuScene;
