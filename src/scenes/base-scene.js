import { SHARED_CONF } from "../utils.js";

class BaseScene extends Phaser.Scene {
  constructor(sceneName, pauseOnSwitch, pausePhysicsOnSwitch) {
    if (new.target === BaseScene) {
      throw new TypeError(
        "No se puede instanciar esta clase porque es abstracta."
      );
    }

    super(sceneName);
    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;
    this.inputPointerEvents = Phaser.Input.Events;
    this.sceneEvents = Phaser.Scenes.Events;
    this.animationEvents = Phaser.Animations.Events;
    this.inputKeyboard = Phaser.Input.Keyboard;
    this.inputKeyboardEvents = Phaser.Input.Keyboard.Events;
    this.loaderEvents = Phaser.Loader.Events;
    this.camerasEvents = Phaser.Cameras.Scene2D.Events;
    this.keyName = sceneName;

    this.hasToBePaused = pauseOnSwitch;
    this.hasToPausePhysics = pausePhysicsOnSwitch;

    this.conf = SHARED_CONF;
  }

  // Podria funcionar
  switchScene(sceneName, data) {
    if (this.scene.isPaused(sceneName)) {
      this.scene.resume(sceneName, data);
    } else if (this.scene.isSleeping(sceneName)) {
      this.scene.wake(sceneName, data);
    } else if (!this.scene.isActive(sceneName)) {
      this.scene.launch(sceneName, data);
    }
    if (this.scene.get(sceneName).hasToPausePhysics) {
      this.scene.get(sceneName).physics.resume();
    }

    this.scene.moveAbove(sceneName);

    if (this.hasToBePaused) {
      this.scene.pause(this.keyName);
    } else {
      this.scene.sleep(this.keyName);
      console.log("me dormi");
    }
    if (this.hasToPausePhysics) {
      this.physics.pause();
    }
  }
}

export default BaseScene;
